import React, { useState } from "react";
import Title from "../title/Title";
import "./styles.css";

const UploadButton = ({ onFileSelected }) => {
  const [selectedFileName, setSelectedFileName] = useState(""); // State to store the selected file name

  const fileSelectedHandler = (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      onFileSelected(file);
      setSelectedFileName(file.name); // Set the selected file name
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
        {/* Display the selected file name */}
        <input
          id="file"
          type="file"
          name="file"
          className="inputfile"
          onChange={fileSelectedHandler}
        />
        <button className="upload-button" onClick={fileSelectedHandler}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadButton;
