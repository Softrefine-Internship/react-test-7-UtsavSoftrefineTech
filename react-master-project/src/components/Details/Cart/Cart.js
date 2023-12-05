import React from "react";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";

const Cart = ({ cartData }) => {
  return (
    <div style={{ overflowY: "auto", maxHeight: "520px" }}>
      {cartData && cartData.length > 0 ? (
        cartData.map((cartItem) => (
          <Card key={cartItem.id} sx={{ border: 1, marginBottom: 2 }}>
            <CardContent>
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
                <List style={{ paddingLeft: 2 }}>
                  {cartItem.products.map((product) => (
                    <ListItem key={product.productId}>
                      Product ID: {product.productId}, Quantity:{" "}
                      {product.quantity}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2">
                  No products in the cart.
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body2">No cart data available.</Typography>
      )}
    </div>
  );
};

export default Cart;
