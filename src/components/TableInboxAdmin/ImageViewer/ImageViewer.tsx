// import axios from "axios";
// import React, { useState, useRef, useEffect } from "react";
// import { getImageUrlFromAws } from "screens/RIDATA/RIdata.api";
// import styled from "styled-components";

// const ImageWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin: 20px;
// `;

// const CoverDiv = styled.div`
//   width: 100%;
//   height: 500px;
//   display: flex;
//   justify-content: center;
//   overflow: auto;
//   cursor: ${(props: { isDragging: boolean }) => (props.isDragging ? "grabbing" : "grab")};
// `;

// const Controls = styled.div`
//   position: absolute;
//   bottom: 0;
//   margin: 20px;
//   display: flex;
//   justify-content: space-around;
//   width: 500px;

//   button {
//     padding: 10px;
//     font-size: 16px;
//     cursor: pointer;
//   }
// `;

// const StyledImage = styled.img<{ rotation: number; scale: number; translateX: number; translateY: number }>`
//   max-width: 100%;
//   max-height: 100%;
//   transform: rotate(${(props) => props.rotation}deg)
//     scale(${(props) => props.scale}) translate(${(props) => props.translateX}px, ${(props) => props.translateY}px);
//   transition: transform 0.3s ease-in-out;
//   cursor: ${(props) => (props.scale > 1 ? "grab" : "default")};
// `;

// interface ImageViewerProps {
//   imageUrl: string;
//   download:string;
// }

// export const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl,download }) => {
//   const [rotation, setRotation] = useState(0);
//   const [scale, setScale] = useState(1);
//   const [isDragging, setIsDragging] = useState(false);
//   const [translateX, setTranslateX] = useState(0);
//   const [translateY, setTranslateY] = useState(0);
//   const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

//   const imageWrapperRef = useRef<HTMLDivElement>(null);

//   // Rotate image
//   const rotateImage = (angle: number) => {
//     setRotation((prevRotation) => prevRotation + angle);
//   };

//   // Zoom image and reset translate values when zooming out
//   const zoomImage = (factor: number) => {
//     setScale((prevScale) => {
//       const newScale = Math.min(Math.max(prevScale + factor, 1), 3);
//       if (newScale === 1) {
//         setTranslateX(0);
//         setTranslateY(0);
//       }
//       return newScale;
//     });
//   };

//   // Download image as a file
//   const downloadImage = async (download: string) => {
//     try {
//       const payload = { keys: [download || ''] };
//       const response = await getImageUrlFromAws(payload);
//       const blob = await fetch(response.data.url).then(res => res.blob());
//       const blobUrl = window.URL.createObjectURL(blob);
  
//       const link = document.createElement("a");
//       link.href = blobUrl;
//       const fileName = "downloaded-image.png";
//       link.download = fileName;
  
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
  
//       window.URL.revokeObjectURL(blobUrl);
//     } catch (error) {
//       console.error("Error downloading the image:", error);
//     }
//   };

//   const handleDownloadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     console.log("download:-",download);
//     downloadImage(download);
//   };

//   // Handle mouse drag for moving the image when zoomed
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (scale > 1) {
//       setIsDragging(true);
//       setLastMousePosition({ x: e.clientX, y: e.clientY });
//     }
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (isDragging) {
//       const dx = e.clientX - lastMousePosition.x;
//       const dy = e.clientY - lastMousePosition.y;
//       setTranslateX((prev) => prev + dx);
//       setTranslateY((prev) => prev + dy);
//       setLastMousePosition({ x: e.clientX, y: e.clientY });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Handle mouse scroll for zooming
//   const handleWheel = (e: WheelEvent) => {
//     e.preventDefault();
//     zoomImage(e.deltaY > 0 ? -0.1 : 0.1);
//   };

//   useEffect(() => {
//     const wrapper = imageWrapperRef.current;
//     if (wrapper) {
//       wrapper.addEventListener("wheel", handleWheel, { passive: false });
//     }

//     return () => {
//       if (wrapper) {
//         wrapper.removeEventListener("wheel", handleWheel);
//       }
//     };
//     console.log("ImageViewerHeader :- ",download);

//   }, []);

//   return (
//     <ImageWrapper>
//       <div style={{ overflow: "hidden", width: "100%" }}>
//         <CoverDiv
//           ref={imageWrapperRef}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseUp}
//           isDragging={isDragging}
//         >
//           <StyledImage
//             src={imageUrl}
//             rotation={rotation}
//             scale={scale}
//             translateX={translateX}
//             translateY={translateY}
//             alt="Preview"
//           />
//         </CoverDiv>
//       </div>

//       <Controls>
//         <button onClick={() => rotateImage(90)}>Rotate 90°</button>
//         <button onClick={() => zoomImage(0.1)}>Zoom In</button>
//         <button onClick={() => zoomImage(-0.1)}>Zoom Out</button>
//         <button onClick={handleDownloadClick}>Download</button>
//       </Controls>
//     </ImageWrapper>
//   );
// };
import { Icon } from "components/Icons";
import React, { useState, useRef, useEffect } from "react";
import { ReUseActionButton } from "ReUseComponents/reUseActionButton/ReUseActionButton";
import { getImageUrlFromAws } from "screens/RIDATA/RIdata.api";
import styled from "styled-components";

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // margin: 20px;
`;

const CoverDiv = styled.div`
  width: 100%;
  height: 500px; /* Fixed height for the cover */
  display: flex;
  justify-content: center;
  overflow: auto; /* Allow scrolling when zoomed */
`;

const Controls = styled.div`
  position: absolute;
    bottom: 40px;
  margin: 20px;
  display: flex;
  // justify-content: space-around;
  justify-content:center;
  width: 500px;

  button {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    background-color:rgb(0 0 0 / 27%);
    
  }
`;

const StyledImage = styled.img<{ rotation: number; scale: number }>`
  max-width: none; /* Allow the image to overflow its container */
  max-height: none; /* Allow the image to overflow its container */
  height: ${(props) => `${props.scale * 100}%`}; /* Scale height based on zoom */
  transform: rotate(${(props) => props.rotation}deg) scale(${(props) => props.scale});
  transition: transform 0.3s ease-in-out;
`;

interface ImageViewerProps {
  imageUrl: string;
  download: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl, download }) => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  const rotateImage = (angle: number) => {
    setRotation((prevRotation) => prevRotation + angle);
  };

  const zoomImage = (factor: number) => {
    setScale((prevScale) => {
      const newScale = Math.min(Math.max(prevScale + factor, 1), 3);
      return newScale;
    });
  };

  const downloadImage = async (download: string) => {
    try {
      const payload = { keys: [download || ''] };
      const response = await getImageUrlFromAws(payload);
      const blob = await fetch(response.data.url).then(res => res.blob());
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

  return (
    <ImageWrapper>
      <CoverDiv>
        <StyledImage
          src={imageUrl}
          rotation={rotation}
          scale={scale}
          alt="Preview"
        />
      </CoverDiv>

      <Controls>
      {/* <ReUseActionButton buttonType='actionButton' displayText='Rotate' onClick={() => rotateImage(90)} widthType='roundedBig' margin='0 0 0 auto' themedButton='roundedWhite' displayIconType="processing"/> */}
        <button onClick={() => rotateImage(90)}><Icon type="RotateIcon"/></button>
        <button onClick={() => zoomImage(0.1)}><Icon type="ZoomInIcon"/></button>
        <button onClick={() => zoomImage(-0.1)}><Icon type="ZoomOutIcon"/></button>
        <button onClick={handleDownloadClick}><Icon type="downloadIcon"/></button>
      </Controls>
    </ImageWrapper>
  );
};
