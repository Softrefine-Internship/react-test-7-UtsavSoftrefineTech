import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FaProductHunt, FaShoppingCart, FaUser } from "react-icons/fa";

const Sidebar = ({ handleMenuClick }) => {
  const listItemStyle = {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#424242", // Material-UI color for grey 700
    },
  };

  return (
    <List
      sx={{
        backgroundColor: "#212121",
        color: "white",
        height: "calc(100vh - 64px)",
        width: "20%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ListItem sx={listItemStyle} onClick={() => handleMenuClick("products")}>
        <FaProductHunt style={{ marginRight: "8px" }} />
        <ListItemText primary="Product" />
      </ListItem>
      <ListItem sx={listItemStyle} onClick={() => handleMenuClick("carts")}>
        <FaShoppingCart style={{ marginRight: "8px" }} />
        <ListItemText primary="Cart" />
      </ListItem>
      <ListItem sx={listItemStyle} onClick={() => handleMenuClick("users")}>
        <FaUser style={{ marginRight: "8px" }} />
        <ListItemText primary="User" />
      </ListItem>
    </List>
  );
};

export default Sidebar;
