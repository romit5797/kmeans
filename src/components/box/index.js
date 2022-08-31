import React from "react";
import "./index.css";
import icon from "../../assets/upload-basic.png";
import Spinner from "../spinner";

function Box({ title, img, isInput, isProcessing, imageHandler }) {
  return (
    <div className="content-box-gray">
      <div className="title">
        <div className="title-row">
          <div>{title}</div>
          {isInput && (
            <div className="image-upload">
              <label htmlFor="file-input">
                <img className="upload-icon" src={icon} alt="" />
              </label>

              <input
                id="file-input"
                type="file"
                onChange={imageHandler}
                accept=".jpg,.jpeg"
              />
            </div>
          )}
        </div>
      </div>

      <div className="content">
        <div>{isProcessing ? <Spinner /> : <img src={img} alt="" />}</div>
      </div>
    </div>
  );
}

export default Box;
