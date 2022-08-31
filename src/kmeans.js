/**
 * @Step 1 - for k=5, get initial centroids
 */

const getInitialCentroids = (pixels, k) => {
  const totalPixels = pixels.length;
  const centroids = [];
  const points = {};
  //randomly assign centroid
  while (centroids.length < k) {
    // Returns a random integer from 0 to 6 pixels:
    const pixelIndex = Math.floor(Math.random() * totalPixels);
    const pixelStr = pixels[pixelIndex].toString();
    if (!points[pixelStr]) {
      centroids.push(pixels[pixelIndex]);
      points[pixelStr] = pixelIndex;
    }
  }
  //return 5 unique centroids
  return centroids;
};

/**
 * @Step 2
 */
const getSqDistance = (pixel, centroid) => {
  const distArr = [];
  for (let i = 0; i < pixel.length; i++) {
    distArr.push(pixel[i] - centroid[i]);
  }
  return distArr.reduce((p, c) => p + c * c, 0);
};

const getClusters = (pixels, centroids) => {
  let clusters = {};
  //iterating over pixel array
  for (let i = 0; i < pixels.length; i++) {
    let min_dist, nearestCentroid;
    //centroids..to get dist
    for (const centroid of centroids) {
      const distance = getSqDistance(pixels[i], centroid);
      if (min_dist === undefined || distance < min_dist) {
        min_dist = distance;
        nearestCentroid = centroid;
      }
    }
    // add pixel to the nearest centroid cluster
    if (!clusters[nearestCentroid])
      clusters[nearestCentroid] = { points: [], indexes: [] };

    clusters[nearestCentroid].points.push(pixels[i]);
    clusters[nearestCentroid].indexes.push(i);
  }

  return clusters;
};

/**
 * @Step 3
 */
const getMeanPixel = (clusterPoints) => {
  const totalPoints = clusterPoints.length;
  const means = [];
  for (let j = 0; j < clusterPoints[0].length; j++) {
    means.push(0);
  }
  for (let i = 0; i < clusterPoints.length; i++) {
    const point = clusterPoints[i];
    for (let j = 0; j < point.length; j++) {
      const val = point[j];
      means[j] = means[j] + val / totalPoints;
    }
  }
  // console.log("means:", means);
  return means;
};

const getNewCentroidsByMean = (clusters) => {
  const newCentroids = [];

  for (const centroid in clusters) {
    newCentroids.push(getMeanPixel(clusters[centroid].points));
  }

  return newCentroids;
};

const checkTermination = (
  oldCentroids,
  centroids,
  max_epochs,
  epochs,
  oldClusters,
  clusters
) => {
  if (JSON.stringify(oldCentroids) === JSON.stringify(centroids)) return false;
  if (JSON.stringify(oldClusters) === JSON.stringify(clusters)) return false;
  if (epochs === max_epochs) return false;

  return true;
};

//Main algorithm
export const kmeans = (pixels, k) => {
  if (!pixels || pixels.length < k) return;
  const max_epochs = 50;
  let epoch = 0;
  let centroids = getInitialCentroids(pixels, k);
  let clusters = {};
  let oldCentroids, oldClusters;
  // console.log("Centroids", centroids);
  while (
    checkTermination(
      oldCentroids,
      centroids,
      max_epochs,
      epoch,
      oldClusters,
      clusters
    )
  ) {
    oldCentroids = [...centroids];
    oldClusters = { ...clusters };
    epoch++;
    // console.log("epoch:", epoch);
    clusters = getClusters(pixels, centroids);
    // console.log("clusters:", clusters);
    centroids = getNewCentroidsByMean(clusters);
    // console.log("centroids:", centroids);
  }

  // 9. Set value of all elements in the cluster equal to their centroid, do this for all 5 clusters
  let outputPixels = [...pixels];
  for (const centroid of centroids) {
    for (const index of clusters[centroid].indexes) {
      outputPixels[index] = centroid;
    }
  }

  return outputPixels;
};

// 3x3 = 6 | k =5
// 1. find 5 random centroid indices
// 2. distance between a given pixel and 5 centroid pixels
// 3. assign this pixel to the shortest distance centroid pixel cluster
// 4. Repeat for every pixel
// 5. We have 5 clusters now...for each cluster find mean or centroid
// 6. Set this as the new centroid and do for all these cluster
// 7. Repeat step 2, 3 and 4 for these new centroids
// 8. For termination:
//      8.a) all centroids are same after the iteration
//      8.b) all old clusters are equal to new clusters
//      8.c) max epochs reached
//      8.d) sum of all distances from centroid are less than min then stop[OPTIONAL]
// 9. Set value of all elements in the cluster equal to their centroid , do this for all 5 clusters
