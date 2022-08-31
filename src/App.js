import "./App.css";
import { kmeans } from "./kmeans";
import { useState, useRef } from "react";
import Uploader from "./components/uploader";
import Box from "./components/box";

function App() {
  const isProcessing = useRef(false);
  const [img, setImg] = useState();
  const [outputImg, setOutputImg] = useState();

  const convertToRGB = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i += 4) {
      newArr.push([arr[i], arr[i + 1], arr[i + 2]]);
    }
    return newArr;
  };

  const imageHandler = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    let img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      if (
        img.height <= 256 &&
        img.width <= 256 &&
        img.height > 2 &&
        img.width > 2
      ) {
        isProcessing.current = true;
        setImg((prev) => url);

        setTimeout(() => {
          const canvas = document.createElement("CANVAS");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          const pixels = convertToRGB(data);
          const outputArr = kmeans(pixels, 5);
          for (let i = 0; i < data.length; i++) {
            for (const value of outputArr[i / 4]) {
              data[i] = Math.round(value);
              i++;
            }
          }

          ctx.putImageData(imgData, 0, 0);
          const dataURL = canvas.toDataURL("image/jpg");
          isProcessing.current = false;
          setOutputImg(dataURL);
        }, 500);
      } else {
        alert(
          "Upload failed. Image dimension should be between 3x3 to 256x256"
        );
      }
    };
  };

  return (
    <div className="root">
      {!img && <Uploader imageHandler={imageHandler} />}

      {img && (
        <div className="row">
          <div className="vertical-spacing" />
          <Box
            title="Input"
            img={img}
            isInput={true}
            isProcessing={false}
            imageHandler={imageHandler}
          />

          <div className="spacing" />

          <Box
            title="Output"
            img={outputImg}
            isInput={false}
            isProcessing={isProcessing.current}
            imageHandler={imageHandler}
          />

          <div className="vertical-spacing" />
        </div>
      )}
    </div>
  );
}

export default App;
