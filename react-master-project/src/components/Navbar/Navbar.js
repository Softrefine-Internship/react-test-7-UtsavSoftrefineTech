import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
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
          <Button variant="contained" color="info" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button variant="contained" color="success">
            Sign Up
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
