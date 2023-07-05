import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";
import UploadButton from "../UploadButton/UploadButton";
import CalculateButton from "../CalculateButton/CalculateButton";
import axios from "axios";
import styled from "@emotion/styled";
//import { Loader } from "@mantine/core";

const ParentComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // add this line

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setIsLoading(true); // set loading state to true
        const formData = new FormData();
        formData.append("image", selectedFile);

        const uploadResponse = await axios.post(
          "http://localhost:8081/template/save",
          formData
        );
        console.log("Upload Response:", uploadResponse);

        await new Promise((resolve) => setTimeout(resolve, 10000));

        const imageId = uploadResponse.data;
        console.log("Image ID:", imageId);

        const tableDataResponse = await axios.get(
          `http://localhost:8081/template/table/${imageId}`
        );
        console.log("Table Data Response:", tableDataResponse);

        console.log("Table Data Response Data:", tableDataResponse.data);

        // Since your response is a 2D array, where each cell object contains both value and isValid,
        // you should directly assign the response data to your tableData state variable.
        setTableData(tableDataResponse.data);
        if (tableDataResponse.data.length > 0) {
          const firstRow = tableDataResponse.data[0];
          const newColumns = firstRow.map((cell, index) => ({
            accessorKey: index.toString(), // change this line
            header: `Column ${index + 1}`,
          }));
          setColumns(newColumns);
        } else {
          setColumns([]);
        }
      } catch (error) {
        console.error("Error uploading image or fetching table data: ", error);
      }
      finally {
        setIsLoading(false); // set loading state to false in the finally block
      }
    };

    if (selectedFile) {
      fetchTableData();
    }
  }, [selectedFile]);

  useEffect(() => {
    console.log("Log table data:", tableData);
  }, [tableData]);

  const handleFileSelected = (file) => {
    setSelectedFile(file);
  };

  const MaterialReactTableBox = styled(Box)`
    max-width: max-content;
  `;

  let updatedTableData = [...tableData];

  return (
    <>
      <UploadButton onFileSelected={handleFileSelected} />
      {/* <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginX="auto"
        style={{
          maxHeight: "100vh",
          maxWidth: "50%",
        }}
      >  */}
      <MaterialReactTableBox>
      {/* {isLoading ? (
          <Loader /> // Show loader if isLoading is true
        ) : ( */}
        <MaterialReactTable
          columns={columns}
          data={tableData.map((row) => row.map((cell) => cell.value))} // convert each cell object into its value for the table
          enableColumnActions={false}
          enableColumnFilters={false}
          enablePagination={false}
          enableSorting={false}
          enableBottomToolbar={false}
          enableTopToolbar={false}
          muiTableBodyRowProps={{ hover: false }}
          state={{ isLoading }} // add this line
          enableColumnResizing
          muiTableProps={{
            sx: {
              border: "0.5px solid rgba(81, 81, 81, 0.5)",
              overflowX: "auto",
              maxWidth: "100%",
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              display: "none",
            },
          }}
          muiTableBodyCellProps={(cellInfo) => {
            const row = tableData[cellInfo.row.index];
            const cell = row[cellInfo.column.id];
            const cellIsValid = cell ? cell.valid : true;

            return {
              align: "center",
              sx: {
                padding: "0.4em",
                border: "0.5px solid rgba(81, 81, 81, 0.5)",
                bgcolor: cellIsValid ? "#ffffff" : "#fea49f",
                textAlign: "center",
                whiteSpace: "normal",
                overflow: "visible",
                overflowWrap: "break-word", // This line was added
              },
            };
          }}
          enableEditing
          editingMode="table"
          muiTableBodyCellEditTextFieldProps={({ cell }) => {
            const commonProps = {
              variant: "filled",
              inputProps: {
                style: { height: "25px", padding: "0px" },
              },
              InputProps: {
                style: {
                  height: "25px",
                  padding: "10px",
                },
              },
            };

            if (parseInt(cell.column.id, 10) === 0) {
              return {
                ...commonProps,
                disabled: true, // disable the TextField component
              };
            }

            return {
              // onChange i onBlur - mora oba da ima. prebacila sam setTableData(updatedTableData);
              // iz onChange u onBlur jer je pre toga cim promenim vrednost u celiji gubio fokus
              // i svaki put za svaku cifru mora opet da se klikne na celiju kako bi se unela
              ...commonProps,
              onChange: (event) => {
                const updatedTableData = [...tableData];
                updatedTableData[cell.row.index][cell.column.id].value =
                  event.target.value;
              },
              onBlur: () => {
                setTableData(updatedTableData);
              }
            };
          }}

        />
        {/* )} */}
      </MaterialReactTableBox>
      {/* </Box> */}
      <CalculateButton template={tableData} />
    </>
  );
};

export default ParentComponent;
