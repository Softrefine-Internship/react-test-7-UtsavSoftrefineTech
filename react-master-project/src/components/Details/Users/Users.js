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
  CircularProgress,
} from "@mui/material";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const User = ({ userData }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState(""); // "add", "update"
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: {
      firstname: "",
      lastname: "",
    },
    username: "",
    email: "",
    phone: "",
    address: {
      city: "",
      street: "",
      zipcode: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const handleOpenDialog = (mode, user) => {
    setDialogMode(mode);
    setSelectedUser(user);

    if (mode === "update") {
      setNewUser({
        name: {
          firstname: user.name.firstname,
          lastname: user.name.lastname,
        },
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: {
          city: user.address.city,
          street: user.address.street,
          zipcode: user.address.zipcode,
        },
      });
    }

    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setNewUser({
      name: {
        firstname: "",
        lastname: "",
      },
      username: "",
      email: "",
      phone: "",
      address: {
        city: "",
        street: "",
        zipcode: "",
      },
    });
    setDialogMode("");
    setSelectedUser(null);
    setDialogOpen(false);
  };

  const handleAddUser = () => {
    setLoading(true);

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      })
      .finally(() => {
        setLoading(false);
        handleCloseDialog();
      });
  };

  const handleUpdateUser = () => {
    setLoading(true);

    fetch(`${API_URL}/${selectedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      })
      .finally(() => {
        setLoading(false);
        handleCloseDialog();
      });
  };

  const handleDeleteUser = (id) => {
    setLoading(true);

    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      })
      .finally(() => {
        setLoading(false);
        handleCloseDialog();
        alert(`User ${id} is successfully deleted!`);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setNewUser((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setNewUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const columnDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    {
      headerName: "First Name",
      field: "name.firstname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last Name",
      field: "name.lastname",
      sortable: true,
      filter: true,
    },
    { headerName: "Username", field: "username", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Phone", field: "phone", sortable: true, filter: true },
    { headerName: "City", field: "address.city", sortable: true, filter: true },
    {
      headerName: "Street",
      field: "address.street",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Zipcode",
      field: "address.zipcode",
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
            onClick={() => handleDeleteUser(params.data.id)}
          >
            Delete
          </Button>
        </div>
      ),
      width: 200,
    },
  ];

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          USERS
        </Typography>
        <Button
          sx={{
            marginBottom: "16px",
          }}
          variant="contained"
          onClick={() => handleOpenDialog("add", null)}
        >
          Add User
        </Button>
      </Box>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={userData}
          domLayout="autoHeight"
          pagination={true}
          paginationPageSize={5}
          defaultColDef={defaultColDef}
        />
      </div>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogMode === "add" ? "Add New User" : "Update User"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="name.firstname"
            value={newUser.name.firstname}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="name.lastname"
            value={newUser.name.lastname}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Username"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={newUser.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="address.city"
            value={newUser.address.city}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Street"
            name="address.street"
            value={newUser.address.street}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Zipcode"
            name="address.zipcode"
            value={newUser.address.zipcode}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          {dialogMode === "add" ? (
            <Button onClick={handleAddUser} disabled={loading}>
              {loading ? <CircularProgress size={20} /> : "Add"}
            </Button>
          ) : (
            <Button onClick={handleUpdateUser} disabled={loading}>
              {loading ? <CircularProgress size={20} /> : "Update"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default User;
