import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  CircularProgress,
} from "@mui/material";

const API_URL = "https://fakestoreapi.com/products";

const Product = ({ productData }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState(""); // "add", "update"
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOpenDialog = (mode, product) => {
    setDialogMode(mode);
    setSelectedProduct(product);

    if (mode === "update") {
      reset({
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
    reset({
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

  const handleAddProduct = (data) => {
    setLoading(true);

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      })
      .finally(() => {
        setLoading(false);
        handleCloseDialog();
      });
  };

  const handleUpdateProduct = (data) => {
    setLoading(true);

    fetch(`${API_URL}/${selectedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      })
      .finally(() => {
        setLoading(false);
        handleCloseDialog();
      });
  };

  const onSubmit = (data) => {
    if (dialogMode === "add") {
      handleAddProduct(data);
    } else if (dialogMode === "update") {
      handleUpdateProduct(data);
    }
  };

  const handleDeleteProduct = (id) => {
    setLoading(true);

    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      })
      .finally(() => {
        setLoading(false);
        handleCloseDialog();
        alert(`Product ${id} is successfully deleted!`);
      });
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
      cellRenderer: (params) => (
        <div>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleOpenDialog("update", params.data)}
            sx={{
              marginRight: "8px",
            }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleDeleteProduct(params.data.id)}
          >
            Delete
          </Button>
        </div>
      ),
      width: 200,
    },
  ];

  return (
    <Box>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{
                required: "Title is required",
                pattern: {
                  value: /^[A-Za-z0-9 &,.'-]+$/i,
                  message:
                    "Title must be alphanumeric characters, comma, apostrophe, period, and hyphen only",
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Title"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              defaultValue={0}
              rules={{
                required: "Price is required",
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Price must be number only",
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Price"
                  type="number"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                required: "Description is required",
                pattern: {
                  value: /^[A-Za-z0-9 &,.'()-]+$/i,
                  message:
                    "Description must be alphanumeric characters, comma, apostrophe, period, hyphen, and parentheses only",
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Description"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
            <Controller
              name="image"
              control={control}
              defaultValue=""
              rules={{
                required: "Image is required",
                pattern: {
                  value: /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/,
                  message: "Image must be a valid URL",
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Image"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.image}
                  helperText={errors.image?.message}
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{
                required: "Category is required",
                pattern: {
                  value: /^[A-Za-z0-9 ,.'()-]+$/i,
                  message:
                    "Category must be alphanumeric characters, comma, apostrophe, period, hyphen, and parentheses only",
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Category"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />
              )}
            />
            <DialogActions>
              <Button onClick={handleCloseDialog} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <CircularProgress size={20} /> : "Submit"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <div className="ag-theme-alpine" style={{ height: "500", width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={productData}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
        />
      </div>
    </Box>
  );
};

export default Product;
