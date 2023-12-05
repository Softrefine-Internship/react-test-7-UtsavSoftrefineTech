import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { auth, db } from "./Auth/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOpenLoginDialog = () => setOpenLogin(true);
  const handleOpenSignUpDialog = () => setOpenSignUp(true);

  const handleCloseDialog = () => {
    setOpenLogin(false);
    setOpenSignUp(false);
    // Reset the form
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Fetch user data after sign-in
      const user = auth.currentUser;

      // Store user data in Firestore
      if (user) {
        const usersCollection = collection(db, "users");
        await addDoc(usersCollection, {
          uid: user.uid,
          email: user.email,
          // Add more user data as needed
        });
      }

      handleCloseDialog();
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Fetch user data after sign-up
      const user = auth.currentUser;

      // Store user data in Firestore
      if (user && password) {
        const usersCollection = collection(db, "users");
        await addDoc(usersCollection, {
          uid: user.uid,
          email: user.email,
          password: password,
          // Add more user data as needed
        });
      }

      handleCloseDialog();
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "white" }}
          >
            React Master Project
          </Typography>
          <div>
            <Button
              variant="contained"
              color="info"
              sx={{ mr: 2 }}
              onClick={handleOpenLoginDialog}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleOpenSignUpDialog}
            >
              Sign Up
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* LOGIN DIALOG */}
      <Dialog open={openLogin} onClose={handleCloseDialog}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignIn}>Sign In</Button>
        </DialogActions>
      </Dialog>

      {/* SIGNUP DIALOG */}
      <Dialog open={openSignUp} onClose={handleCloseDialog}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignUp}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
