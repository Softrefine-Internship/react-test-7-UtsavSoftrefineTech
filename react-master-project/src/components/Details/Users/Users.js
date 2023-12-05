import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const User = ({ userData }) => {
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
  ];

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  return (
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
  );
};

export default User;
