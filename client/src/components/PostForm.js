import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const useStyles = makeStyles(() => ({
  form: {
    textAlign: "center",
  },
  textField: {
    margin: "10px auto 20px auto",
  },
  button: {
    marginBottom: 20,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
  },
  progress: {
    position: "absolute",
  },
}));

function PostForm() {
  const classes = useStyles();
  const [values, setValues] = useState({
    body: "",
  });
  const handleChange = (event) => {
    setValues({ body: event.target.value });
  };
  const [postPost, { error, loading }] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      const newPost = result.data.createPost;
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [newPost, ...data.getPosts] },
      });
      values.body = "";
    },
    variables: values,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    postPost();
  };
  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          id="post"
          name="post"
          label="Create a post"
          variant="outlined"
          className={classes.textField}
          value={values.body}
          onChange={handleChange}
          fullWidth
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          className={classes.button}
          fullWidth
        >
          Submit
          {loading && (
            <CircularProgress size={24} className={classes.progress} />
          )}
        </Button>
      </form>
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
      }
      comments {
        id
        body
        username
      }
    }
  }
`;

export default PostForm;
