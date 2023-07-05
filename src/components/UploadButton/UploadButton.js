import React, { useState } from "react";
import Title from "../title/Title";
import "./styles.css";

const UploadButton = ({ onFileSelected }) => {
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const [selectedFileName, setSelectedFileName] = useState(""); // State to store the selected file name

  const fileChosenHandler = (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file); // Store the file
      setSelectedFileName(file.name); // Set the selected file name
    }
  };

  const fileUploadHandler = () => {
    if (selectedFile) {
      onFileSelected(selectedFile); // Upload the stored file
    }
  };

  return (
    <div className="upload-area">
      <Title text="Yamb Online Calculator" />
      <div className="upload-button-container">
        <label htmlFor="file" className="file-input-label">
          Choose Image
        </label>
        <span className="selected-file-name">{selectedFileName}</span>{" "}
        <input
          id="file"
          type="file"
          name="file"
          className="inputfile"
          onChange={fileChosenHandler}
        />
        <button className="upload-button" onClick={fileUploadHandler}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadButton;
