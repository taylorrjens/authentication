import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
import { auth } from "./firebase";

export function SignIn(props) {
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        props.history.push("/app");
      }
    });

    return unsubscribe;
  }, [props.history]);

  const handleSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" variant="h6">
            Sign In
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper style={{ width: "400px", marginTop: 30, padding: "40px" }}>
          <TextField
            fullWidth={true}
            placeholder="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            placeholder="password"
            style={{ marginTop: 20 }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
              alignItems: "center"
            }}
          >
            <div>
              Don't have an account? <Link to="/signup">Sign up!</Link>
            </div>
            <Button onClick={handleSignIn} color="primary" variant="contained">
              Sign In
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export function SignUp(props) {
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        props.history.push("/app");
      }
    });

    return unsubscribe;
  }, [props.history]);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" variant="h6">
            Sign Up
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper style={{ width: "400px", marginTop: 30, padding: "40px" }}>
          <TextField
            fullWidth={true}
            placeholder="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            value={password}
            type={"password"}
            onChange={e => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            placeholder="password"
            style={{ marginTop: 20 }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
              alignItems: "center"
            }}
          >
            <div>
              Already have an account? <Link to="/">Sign In!</Link>
            </div>
            <Button onClick={handleSignUp} color="primary" variant="contained">
              Sign Up
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export function App(props) {
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });

    return unsubscribe;
  }, [props.history]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  if (!user) {
    return <div />;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color="inherit"
            variant="h6"
            style={{ marginLeft: 15, flexGrow: 1 }}
          >
            News
          </Typography>
          <Typography color="inherit" style={{ marginRight: 30 }}>
            Hi {user.email}!
          </Typography>
          <Button onClick={handleSignOut} type={"password"} color="inherit">
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawer_open}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        I'm a drawer
      </Drawer>
    </div>
  );
}
