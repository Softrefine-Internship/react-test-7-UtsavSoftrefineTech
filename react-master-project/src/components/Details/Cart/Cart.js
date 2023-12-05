import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";

const Cart = ({ cartData }) => {
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
          onClick={() => alert("Add Cart")}
        >
          Add Cart
        </Button>
      </Box>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          overflowY: "auto",
          maxHeight: "520px",
        }}
      >
        {cartData && cartData.length > 0 ? (
          cartData.map((cartItem) => (
            <Paper key={cartItem.id} elevation={3} className="m-4 p-4 mr-auto">
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
                <List style={{ padding: "0px" }}>
                  {cartItem.products.map((product) => (
                    <ListItem
                      key={product.productId}
                      style={{ padding: "0px" }}
                    >
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
            </Paper>
          ))
        ) : (
          <Typography variant="body2">No cart data available.</Typography>
        )}
      </div>
    </>
  );
};

export default Cart;
