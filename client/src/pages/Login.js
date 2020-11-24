import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

const useStyles = makeStyles(() => ({
  form: {
    textAlign: "center",
  },
  pageTitle: {
    margin: "10px auto 20px auto",
    fontSize: 32,
  },
  textField: {
    margin: "10px auto 20px auto",
  },
  button: {
    marginTop: 20,
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

function Login(props) {
  const classes = useStyles();
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState("");
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      context.login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h3" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="username"
            name="username"
            type="username"
            label="Username"
            className={classes.textField}
            value={values.username}
            //helperText={errors.email}
            error={errors.username ? true : false}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            //helperText={errors.password}
            error={errors.password ? true : false}
            value={values.password}
            onChange={handleChange}
            fullWidth
          />
          {Object.keys(errors).length > 0 && (
            <Typography variant="body2" className={classes.customError}>
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </Typography>
          )}
          <Button
            variant="contained"
            type="submit"
            color="primary"
            className={classes.button}
          >
            Login
            {loading && (
              <CircularProgress size={24} className={classes.progress} />
            )}
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
