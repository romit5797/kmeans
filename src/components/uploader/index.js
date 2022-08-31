import React from "react";
import "./index.css";
import icon from "../../assets/upload.png";
function Uploader({ imageHandler }) {
  return (
    <div className="image-upload">
      <label htmlFor="file-input">
        <div className="label-wrapper">
          <img src={icon} className="img" />
          <div className="label-text">Please select an image to upload</div>
        </div>
      </label>

      <input
        id="file-input"
        type="file"
        onChange={imageHandler}
        accept=".jpg,.jpeg"
      />
    </div>
  );
}

export default Uploader;
