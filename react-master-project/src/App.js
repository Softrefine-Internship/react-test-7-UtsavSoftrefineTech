import React, { useState } from "react";
import { CssBaseline, Box } from "@mui/material";
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
      <div style={{ position: "relative" }}>
        <CssBaseline />
        <Navbar />
        <Box>
          <Box display="flex">
            <Sidebar handleMenuClick={handleMenuClick} />
            <Main selectedMenu={selectedMenu} />
          </Box>
        </Box>
      </div>
    </>
  );
}

export default App;
