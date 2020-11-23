import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const useStyles = makeStyles(() => ({
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
}));

function Home() {
  const classes = useStyles();
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  dayjs.extend(relativeTime);

  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        data &&
        data.getPosts.map((post) => (
          <Card key={post.id} className={classes.card}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {post.username}
              </Typography>
              <Typography variant="h5" component="h2">
                {post.body}
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                component={Link}
                to={`/posts/${post.id}`}
              >
                {dayjs(post.createdAt).fromNow()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
