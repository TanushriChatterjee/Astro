// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";

// Define custom styles
const useStyles = makeStyles(() => ({
  container: {
    marginTop: "80px",
    marginBottom: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  dataGrid: {
    width: "95%",
    maxWidth: "992px",
    height: "370px",

    "@media (max-width: 600px)": {
      maxWidth: "340px",
      margin: "8px",
    },
    "@media (min-width: 601px) and (max-width: 960px)": {
      maxWidth: "800px",
      margin: "16px",
    },
    "& .MuiDataGrid-root": {
      backgroundColor: "#f0fdfa",
      border: "1px solid #6b7280",
      boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
    },
    "& .super-app-theme--header": {
      backgroundColor: "#5eead4",
    },
  },
}));

// Define the AstrologersList component
const AstrologersList: React.FC = () => {
  const [astrologers, setAstrologers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const navigate = useNavigate();
  
  // Define column definitions
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "gender",
      headerName: "Gender",
      headerAlign: "center",
      align: "center",
      width: 120,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "languages",
      headerName: "Languages",
      headerAlign: "center",
      align: "center",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "specialties",
      headerName: "Specialties",
      headerAlign: "center",
      align: "center",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "edit",
      headerName: "Edit",
      headerAlign: "center",
      align: "center",
      width: 100,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => (
        <button
          style={{
            border: "none", 
            color: "green",
            background: "none", 
            cursor: "pointer"
          }}
          onClick={() => handleEdit(params.row._id)}
        >
          <EditIcon />
        </button>
      ),
    },
  ];

  const handleEdit = (astrologerId: string) => {
    console.log(`Edit astrologer with ID: ${astrologerId}`);
    navigate(`/astrologers/${astrologerId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/astrologers"
        );
        setAstrologers(
          response.data.map((astrologer: any, index: number) => ({
            id: index + 1,
            _id: astrologer._id,
            name: astrologer.name,
            gender: astrologer.gender,
            email: astrologer.email,
            languages: astrologer.languages.join(", "),
            specialties: astrologer.specialties.join(", "),
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching astrologers:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <h2 style={{fontWeight: '900'}}>ASTROLOGER LIST</h2>
        {loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={300} />
          </Box>
        ) : (
          <div className={classes.dataGrid}>
            <DataGrid
              rows={astrologers}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5, 10, 25]}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AstrologersList;
