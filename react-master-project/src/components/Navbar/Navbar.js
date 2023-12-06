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
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);

  const handleOpenLoginDialog = () => {
    setOpenLogin(true);
    setError(null); // Clear any previous errors
  };
  const handleOpenSignUpDialog = () => {
    setOpenSignUp(true);
    setError(null); // Clear any previous errors
  };

  const handleCloseDialog = () => {
    setOpenLogin(false);
    setOpenSignUp(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      // Fetch user data after sign-in
      const user = auth.currentUser;

      // Store user data in Firestore
      if (user) {
        const usersCollection = collection(db, "users");
        await addDoc(usersCollection, {
          uid: user.uid,
          email: user.email,
          password: user.password,
        });
      }

      // Update login state
      setIsLoggedIn(true);
      console.log("User logged in:", user);

      handleCloseDialog();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      // Ensure that password is not empty and matches confirm password
      if (!password || password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Fetch user data after sign-up
      const user = userCredential.user;

      // Store user data in Firestore user profiles collection
      if (user) {
        const usersCollection = collection(db, "user_profiles");

        // Use UID as the document ID
        await setDoc(doc(usersCollection, user.uid), {
          email: user.email,
          password: password,
        });
      }

      // Update login state
      setIsLoggedIn(true);
      console.log("User signed up:", user);

      handleCloseDialog();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);

      // Update login state
      setIsLoggedIn(false);
      console.log("User logged out");
    } catch (error) {
      console.error("Error signing out:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("User signed in with Google");
      handleCloseDialog();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
            {isLoggedIn ? (
              <Button
                variant="contained"
                color="error"
                sx={{ mr: 2 }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
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
              </>
            )}
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
          <Button
            variant="contained"
            sx={{ mt: 2, width: "100%" }}
            color="info"
            onClick={handleSignInWithGoogle}
          >
            Sign In with Google
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSignIn} disabled={loading}>
            Sign In
          </Button>
        </DialogActions>
        {error && (
          <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
            {error}
          </Typography>
        )}
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
          <Button
            variant="contained"
            sx={{ mt: 2, width: "100%" }}
            color="info"
            onClick={handleSignInWithGoogle}
          >
            Sign Up with Google
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSignUp}
            disabled={loading || password !== confirmPassword}
          >
            Sign Up
          </Button>
        </DialogActions>
        {error && (
          <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
            {error}
          </Typography>
        )}
      </Dialog>
    </>
  );
};

export default Navbar;
