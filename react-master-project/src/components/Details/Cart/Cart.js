import React, { useState } from "react";
import axios from "axios";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import "./Cart.css";

const API_URL = "https://fakestoreapi.com/carts";

const Cart = ({ cartData }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState(""); // "add", "update"
  const [selectedCart, setSelectedCart] = useState(null);
  const [newCart, setNewCart] = useState({
    userId: "",
    date: "",
    products: [],
  });

  const handleOpenDialog = (mode, cart) => {
    setDialogMode(mode);
    setSelectedCart(cart);

    if (mode === "update") {
      setNewCart({
        userId: cart.userId,
        date: cart.date,
        products: cart.products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
      });
    }

    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setNewCart({
      userId: "",
      date: "",
      products: [],
    });
    setDialogMode("");
    setSelectedCart(null);
    setDialogOpen(false);
  };

  const handleAddCart = () => {
    axios
      .post(API_URL, newCart, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., update state or re-fetch data
      })
      .catch((error) => {
        console.error("Error adding cart:", error);
      })
      .finally(() => {
        handleCloseDialog();
      });
  };

  const handleUpdateCart = () => {
    axios
      .put(`${API_URL}/${selectedCart.id}`, newCart, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., update state or re-fetch data
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      })
      .finally(() => {
        handleCloseDialog();
      });
  };

  const handleDeleteCart = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then((response) => {
        console.log(response.data);
        // Handle success, e.g., update state or re-fetch data
      })
      .catch((error) => {
        console.error("Error deleting cart:", error);
      })
      .finally(() => {
        handleCloseDialog();
        // Handle success, e.g., update state or re-fetch data
        alert("Cart deleted successfully!");
      });
  };

  const handleProductInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedProducts = [...newCart.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };
    setNewCart((prevCart) => ({
      ...prevCart,
      products: updatedProducts,
    }));
  };

  const handleAddProductField = () => {
    setNewCart((prevCart) => ({
      ...prevCart,
      products: [...prevCart.products, { productId: "", quantity: "" }],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCart((prevCart) => ({
      ...prevCart,
      [name]: value,
    }));
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          CARTS
        </Typography>
        <Button
          sx={{
            marginBottom: "16px",
          }}
          variant="contained"
          onClick={() => handleOpenDialog("add", null)}
        >
          Add Cart
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogMode === "add" ? "Add New Cart" : "Update Cart"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="User ID"
            name="userId"
            value={newCart.userId}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={newCart.date}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          {newCart.products.map((product, index) => (
            <div key={index}>
              <TextField
                label={`Product ${index + 1} ID`}
                name={`productId`}
                value={product.productId}
                onChange={(e) =>
                  handleProductInputChange(e, index, "productId")
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label={`Product ${index + 1} Quantity`}
                name={`quantity`}
                type="number"
                value={product.quantity}
                onChange={(e) => handleProductInputChange(e, index, "quantity")}
                fullWidth
                margin="normal"
              />
            </div>
          ))}

          <Button onClick={handleAddProductField}>Add Product</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {dialogMode === "add" ? (
            <Button onClick={handleAddCart}>Add</Button>
          ) : (
            <Button onClick={handleUpdateCart}>Update</Button>
          )}
        </DialogActions>
      </Dialog>

      <div className="custom-scroll">
        {cartData &&
          cartData.length > 0 &&
          cartData.map((cartItem) => (
            <Paper
              key={cartItem.id}
              elevation={3}
              sx={{ m: 4, p: 4, mr: "auto" }}
            >
              <Typography variant="subtitle1">
                <span style={{ fontWeight: "bold" }}>User ID:</span>{" "}
                {cartItem.userId || "N/A"}
              </Typography>
              <Typography variant="subtitle1">
                <span style={{ fontWeight: "bold" }}>Date:</span>{" "}
                {cartItem.date || "N/A"}
              </Typography>
              <Typography variant="subtitle1">
                <span style={{ fontWeight: "bold" }}>Products:</span>
              </Typography>
              {cartItem.products && cartItem.products.length > 0 ? (
                <List sx={{ padding: 0 }}>
                  {cartItem.products.map((product) => (
                    <ListItem key={product.productId} sx={{ padding: 0 }}>
                      <ListItemText
                        primary={`Product ID: ${product.productId}, Quantity: ${product.quantity}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2">
                  No products in the cart.
                </Typography>
              )}
              <Box
                sx={{
                  marginTop: "16px",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    marginRight: "8px",
                  }}
                  onClick={() => handleOpenDialog("update", cartItem)}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteCart(cartItem.id)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          ))}
      </div>
    </>
  );
};

export default Cart;
