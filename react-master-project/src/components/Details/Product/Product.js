import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";

const Product = ({ productData }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState(""); // "add", "update"
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  });

  const handleOpenDialog = (mode, product) => {
    setDialogMode(mode);
    setSelectedProduct(product);

    if (mode === "update") {
      setNewProduct({
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
      });
    }

    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setNewProduct({
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "",
    });
    setDialogMode("");
    setSelectedProduct(null);
    setDialogOpen(false);
  };

  const handleAddProduct = () => {
    // Perform API call to add the new product
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });

    setNewProduct({
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "",
    });

    handleCloseDialog();
  };

  const handleUpdateProduct = () => {
    // Perform API call to update the selected product
    fetch(`https://fakestoreapi.com/products/${selectedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
    handleCloseDialog();
  };

  const handleDeleteProduct = () => {
    // Perform API call to delete the selected product
    fetch(`https://fakestoreapi.com/products/${selectedProduct.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
    handleCloseDialog();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const columnDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Title", field: "title", sortable: true, filter: true },
    { headerName: "Price", field: "price", sortable: true, filter: true },
    { headerName: "Category", field: "category", sortable: true, filter: true },
    {
      headerName: "Rating",
      field: "rating.rate",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Actions",
      sortable: false,
      filter: false,
      cellRendererFramework: (params) => (
        <div>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleOpenDialog("update", params.data)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleDeleteProduct(params.data)}
          >
            Delete
          </Button>
        </div>
      ),
      width: 200,
    },
  ];

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          PRODUCTS
        </Typography>
        <Button
          sx={{
            marginBottom: "16px",
          }}
          variant="contained"
          onClick={() => handleOpenDialog("add", null)}
        >
          Add Product
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogMode === "add" ? "Add New Product" : "Update Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {dialogMode === "add" ? (
            <Button onClick={handleAddProduct}>Add</Button>
          ) : (
            <Button onClick={handleUpdateProduct}>Update</Button>
          )}
        </DialogActions>
      </Dialog>

      <div
        className="ag-theme-alpine"
        style={{ height: "500px", width: "100%" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={productData}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default Product;
