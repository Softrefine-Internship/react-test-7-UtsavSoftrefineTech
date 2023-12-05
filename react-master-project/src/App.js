import React, { useState } from "react";
import { CssBaseline, Container, Box } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Details/Main";

function App() {
  const [selectedMenu, setSelectedMenu] = useState("products");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box>
        <Box display="flex">
          <Sidebar handleMenuClick={handleMenuClick} />
          <Main selectedMenu={selectedMenu} />
        </Box>
      </Box>
    </>
  );
}

export default App;
