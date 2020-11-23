import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";

function Narbar() {
  const { user, logout } = useContext(AuthContext);

  const narbar = user ? (
    <AppBar>
      <Toolbar className="nav-container">
        <Fragment>
          <Button color="inherit" component={Link} to="/">
            {user.username}
          </Button>
          <Button color="inherit" component={Link} onClick={logout}>
            <ExitToAppIcon />
          </Button>
        </Fragment>
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar>
      <Toolbar className="nav-container">
        <Fragment>
          <Button color="inherit" component={Link} to="/">
            <HomeIcon />
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>
        </Fragment>
      </Toolbar>
    </AppBar>
  );

  return narbar;
}

export default Narbar;
