<!-- ABOUT THE PROJECT -->
## About The Project

This is a basic React app which computes output image by using the pixel colors (RGB) in input image as data points, run k-means algorithm with K=5. The cluster center RGB is used to color the image. So, resultant image looks like input image but only using 5 colors.

### Built With

* [React.js](https://reactjs.org)

### Live Demo

🔗 [kmeans App](https://kmeans-ck.web.app/)


### Setup

1. Clone the github repo
   ```sh
   git clone https://github.com/romit5797/kmeans.git
   ```
2. Install node dependencies
   ```sh
   npm install
   ```
3. Run the app
   ```sh
   npm run start
    ```

## Features

- K-means algorithm implementation using React.js
- Using HTML Canvas for image pixel manipulation

## Project structure

```sh
.
├── package.json
├── public
├── src
│   ├── components
│   │   ├── box
│   │   │   ├── index.css
│   │   │   └── index.js
│   │   ├── spinner
│   │   │   ├── index.css
│   │   │   └── index.js
│   │   ├── uploader
│   │   │   ├── index.css
│   │   │   └── index.js
│   │   ├── ui
│   │   │   └── petView.dart
│   ├── assets
│   │   ├── upload-basic.png
│   │   └── upload.png
│   ├── kmeans.js
│   ├── index.js
│   ├── index.css
│   ├── App.js
└── └── App.css
```




