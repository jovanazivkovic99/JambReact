import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";
import UploadButton from "./UploadButton/UploadButton";
import CalculateButton from "./CalculateButton/CalculateButton";
import axios from "axios";

const ParentComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const uploadResponse = await axios
          .post("http://localhost:8081/template/save", formData)
          .catch((error) => {
            console.log("Error occurred while uploading image: ", error);
          });

        console.log("Upload Response:", uploadResponse); // Log upload response

        await new Promise((resolve) => setTimeout(resolve, 10000));
        const imageId = uploadResponse.data;

        console.log("Image ID:", imageId); // Log imageId

        const tableDataResponse = await axios.get(
          `http://localhost:8081/template/table/${imageId}`
        );

        console.log("Table Data Response:", tableDataResponse); // Log table data response

        const { rows } = tableDataResponse.data;

        setTableData(rows);

        if (rows.length > 0) {
          const firstRow = rows[0];
          const newColumns = Object.keys(firstRow).map((key) => ({
            accessorKey: key,
            header: key,
          }));
          setColumns(newColumns);
        } else {
          setColumns([]);
        }
      } catch (error) {
        console.error("Error uploading image or fetching table data: ", error);
      }
    };

    if (selectedFile) {
      fetchTableData();
    }
  }, [selectedFile]);

  const handleFileSelected = (file) => {
    setSelectedFile(file);
  };
 
  return (
    <>
    <UploadButton onFileSelected={handleFileSelected} />
    <Box paddingX="5em" style={{ maxHeight: "100vh", overflowY: "auto" }}>
        <MaterialReactTable
          columns={columns}
          data={tableData}
          enableColumnActions={false}
          enableColumnFilters={false}
          enablePagination={false}
          enableSorting={false}
          enableBottomToolbar={false}
          enableTopToolbar={false}
          muiTableBodyRowProps={{ hover: false }}
          muiTableProps={{
            sx: {
              maxWidth: "100%", // restrict table width to 100% of its container
              maxHeight: "500px", // Adjust this value as needed
              overflowX: "auto", // allow horizontal scrolling if the table's width exceeds its container's width
              overflowY: "auto", // allow vertical scrolling if the table's height exceeds its container's height
              border: "0.5px solid rgba(81, 81, 81, 0.5)",
            },
          }}
          
          muiTableHeadCellProps={{
            sx: {
                display: 'none'
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              minWidth: "30px", // Adjust as needed
              maxWidth: "100px", // Adjust as needed
              padding: "0.4em",
              border: "0.5px solid rgba(81, 81, 81, 0.5)",
              bgcolor:"#fcf5c7",
              textAlign:"center"
            },
          }}
        />
      </Box>
      <CalculateButton template={tableData} />

    </>
  );
};

export default ParentComponent;
