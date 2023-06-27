import React from "react";

const UploadButton = ({ onFileSelected }) => {
  const fileSelectedHandler = (event) => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      onFileSelected(event.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={fileSelectedHandler} />
      <button onClick={fileSelectedHandler}>Upload</button>
    </div>
  );
};

export default UploadButton;
