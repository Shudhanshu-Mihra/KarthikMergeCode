// ImageViewer.state.ts
import { useState } from "react";
import { getImageUrlFromAws } from "screens/RIDATA/RIdata.api";

export const useImageViewerState = (imageUrl: string, download: string) => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState("0 0"); // Start with top-left

  const rotateImage = (angle: number) => {
    setRotation((prevRotation) => prevRotation + angle);
    setTransformOrigin("50% 50%"); // Set origin to center for rotation
  };

  const zoomImage = (factor: number) => {
    setScale((prevScale) => {
      const newScale = Math.min(Math.max(prevScale + factor, 1), 3);
      return newScale;
    });
    setTransformOrigin("0 0"); // Set origin to top-left for zooming
  };

  const downloadImage = async (download: string) => {
    try {
      const payload = { keys:[ download || ''] };
      const response = await getImageUrlFromAws(payload);
      const blob = await fetch(response.data.url).then((res) => res.blob());
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      const fileName = "downloaded-image.png"; // Change the filename as needed
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const handleDownloadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    downloadImage(download);
  };

  return { rotation, scale, transformOrigin, rotateImage, zoomImage, handleDownloadClick };
};
