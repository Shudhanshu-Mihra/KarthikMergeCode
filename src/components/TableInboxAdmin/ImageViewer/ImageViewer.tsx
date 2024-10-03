// import React, { useState } from "react";
// import styled from "styled-components";

// const ImageWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin: 20px;
// `;
// const CoverDiv = styled.div`
// width:100%;
// overflow:hidden;`;
// const Controls = styled.div`
//   margin: 20px;
//   display: flex;
//   justify-content: space-around;
//   width: 300px;

//   button {
//     padding: 10px;
//     font-size: 16px;
//     cursor: pointer;
//   }
// `;

// const StyledImage = styled.img<{ rotation: number; scale: number }>`
//   max-width: 100%;
//   max-height: 100%;
//   transform: rotate(${(props) => props.rotation}deg) scale(${(props) => props.scale});
//   transition: transform 0.3s ease-in-out;
// `;

// interface ImageViewerProps {
//   imageUrl: string;
// }

// export const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
//   const [rotation, setRotation] = useState(0);
//   const [scale, setScale] = useState(1);

//   // Rotate image
//   const rotateImage = (angle: number) => {
//     setRotation((prevRotation) => prevRotation + angle);
//   };

//   // Zoom image
//   const zoomImage = (factor: number) => {
//     setScale((prevScale) => Math.min(Math.max(prevScale + factor, 0.1), 3)); // Limit zoom range between 0.1 and 3
//   };

//   // Download image
//   const downloadImage = () => {
//     const link = document.createElement("a");
//     link.href = imageUrl;
//     link.download = "image.jpg"; // You can change the file name
//     link.click();
//   };

//   return (
//       <ImageWrapper>
//           <CoverDiv>
              
//       <StyledImage src={imageUrl} rotation={rotation}  scale={scale} alt="Preview" />
//           </CoverDiv>
      
//       <Controls>
//         <button onClick={() => rotateImage(90)}>Rotate 90°</button>
//         <button onClick={() => zoomImage(0.1)}>Zoom In</button>
//         <button onClick={() => zoomImage(-0.1)}>Zoom Out</button>
//         <button onClick={downloadImage}>Download</button>
//       </Controls>
//     </ImageWrapper>
//   );
// };


// import React, { useState, useRef, useEffect } from "react";
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
//   overflow: hidden;
//   cursor: ${(props: { isDragging: boolean }) => (props.isDragging ? "grabbing" : "grab")};
// //   position: relative;
// `;

// const Controls = styled.div`
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
// }

// export const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
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

//   // Zoom image
//   const zoomImage = (factor: number) => {
//     // setScale((prevScale) => Math.min(Math.max(prevScale + factor, 0.1), 3)); // Limit zoom range between 0.1 and 3
 
//     setScale((prevScale) => Math.min(Math.max(prevScale + factor, 1), 3));  };

//   // Download image
//   const downloadImage = () => {
//     const link = document.createElement("a");
//     link.href = imageUrl;
//     link.download = "image.jpg"; // You can change the file name
//     link.click();
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
//   }, []);

//   return (
//     <ImageWrapper>
//       <CoverDiv
//         ref={imageWrapperRef}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//         isDragging={isDragging}
//       >
//         <StyledImage
//           src={imageUrl}
//           rotation={rotation}
//           scale={scale}
//           translateX={translateX}
//           translateY={translateY}
//           alt="Preview"
//         />
//       </CoverDiv>

//       <Controls>
//         <button onClick={() => rotateImage(90)}>Rotate 90°</button>
//         <button onClick={() => zoomImage(0.1)}>Zoom In</button>
//         <button onClick={() => zoomImage(-0.1)}>Zoom Out</button>
//         <button onClick={downloadImage}>Download</button>
//       </Controls>
//     </ImageWrapper>
//   );
// };


import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const CoverDiv = styled.div`
  width: 100%;
  height: 500px;
  display:flex;
  justify-content:center;
  overflow: auto;
  cursor: ${(props: { isDragging: boolean }) => (props.isDragging ? "grabbing" : "grab")};
`;

const Controls = styled.div`
position:absolute;
bottom:0;
  margin: 20px;
  display: flex;
  justify-content: space-around;
  width: 500px;

  button {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const StyledImage = styled.img<{ rotation: number; scale: number; translateX: number; translateY: number }>`
  max-width: 100%;
  max-height: 100%;
  transform: rotate(${(props) => props.rotation}deg)
    scale(${(props) => props.scale}) translate(${(props) => props.translateX}px, ${(props) => props.translateY}px);
  transition: transform 0.3s ease-in-out;
  cursor: ${(props) => (props.scale > 1 ? "grab" : "default")};
`;

interface ImageViewerProps {
  imageUrl: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  const imageWrapperRef = useRef<HTMLDivElement>(null);

  // Rotate image
  const rotateImage = (angle: number) => {
    setRotation((prevRotation) => prevRotation + angle);
  };

  // Zoom image and reset translate values when zooming out
  const zoomImage = (factor: number) => {
    setScale((prevScale) => {
      const newScale = Math.min(Math.max(prevScale + factor, 1), 3);
      if (newScale === 1) {
        setTranslateX(0);
        setTranslateY(0);
      }
      return newScale;
    });
  };

  // Download image as a file
//     const downloadImage = async () => {
//         console.log("test done");
//     const response = await fetch(imageUrl); // Fetch the image as a blob
//     const blob = await response.blob(); // Convert to blob
//     const url = window.URL.createObjectURL(blob); // Create a temporary URL for downloading
//       console.log("url", url);
//       const link = document.createElement("a");
//     //   console.log("link", link);
      
//     link.href = url;
//     link.download = "image"; // You can change the file name
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link); // Remove the link after download

//     window.URL.revokeObjectURL(url); // Release the URL object
//   };

// const downloadImage = async () => {
//     try {
//       console.log("Downloading image...");
      
//       const response = await fetch(imageUrl);
      
//       if (!response.ok) {
//         throw new Error(`Error fetching image: ${response.statusText}`);
//       }
  
//       const blob = await response.blob(); // Convert response to a blob
//       const url = window.URL.createObjectURL(blob); // Create a temporary URL
  
//       const link = document.createElement("a");
//       link.href = url;
  
//       // Extract the file name and extension from the URL (if needed)
//       const fileName = imageUrl.split("/").pop()?.split("?")[0] || "downloaded-image";
//       link.download = fileName; // Set the file name for download
  
//       document.body.appendChild(link);
//       link.click(); // Trigger the download
//       document.body.removeChild(link); // Clean up
  
//       window.URL.revokeObjectURL(url); // Release the URL object after use
  
//       console.log("Image downloaded successfully!");
//     } catch (error) {
//       console.error("Error downloading the image:", error);
//     }
    //   };
    
    const downloadImage = (url: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = "downloaded-image.jpg"; // File name for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    
      const handleDownloadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log('Downloading image...');
        downloadImage(imageUrl);
    };
    
  // Handle mouse drag for moving the image when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - lastMousePosition.x;
      const dy = e.clientY - lastMousePosition.y;
      setTranslateX((prev) => prev + dx);
      setTranslateY((prev) => prev + dy);
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle mouse scroll for zooming
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    zoomImage(e.deltaY > 0 ? -0.1 : 0.1);
  };

  useEffect(() => {
    const wrapper = imageWrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
      <ImageWrapper>
          <div style={{overflow:"hidden" , width:"100%"}}>
              
      <CoverDiv
        ref={imageWrapperRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        isDragging={isDragging}
          >
        <StyledImage
          src={imageUrl}
          rotation={rotation}
          scale={scale}
          translateX={translateX}
          translateY={translateY}
          alt="Preview"
        />
      </CoverDiv>
      </div>

      <Controls>
        <button onClick={() => rotateImage(90)}>Rotate 90°</button>
        <button onClick={() => zoomImage(0.1)}>Zoom In</button>
        <button onClick={() => zoomImage(-0.1)}>Zoom Out</button>
        <button onClick={handleDownloadClick}>Download</button>
      </Controls>
    </ImageWrapper>
  );
};


// import React, { useState, useRef, useEffect } from "react";
// import styled from "styled-components";

// const ImageWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
// `;

// const CoverContainer = styled.div`
//   width: 100%;
//   height: calc(100vh - 100px); /* Full height minus space for controls */
//   overflow-y: auto;
//   overflow-x: hidden;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const CoverDiv = styled.div`
//   width: 100%;
//   max-width: 100%;
//   height: auto;
//   overflow: auto;
//   cursor: ${(props: { isDragging: boolean }) => (props.isDragging ? "grabbing" : "grab")};
// `;

// const Controls = styled.div`
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
//   width: 100%;
//   height: auto;
//   transform: rotate(${(props) => props.rotation}deg)
//     scale(${(props) => props.scale}) translate(${(props) => props.translateX}px, ${(props) => props.translateY}px);
//   transition: transform 0.3s ease-in-out;
//   cursor: ${(props) => (props.scale > 1 ? "grab" : "default")};
// `;

// interface ImageViewerProps {
//   imageUrl: string;
// }

// export const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl }) => {
//   const [rotation, setRotation] = useState(0);
//   const [scale, setScale] = useState(1);
//   const [isDragging, setIsDragging] = useState(false);
//   const [translateX, setTranslateX] = useState(0);
//   const [translateY, setTranslateY] = useState(0);
//   const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

//   const imageWrapperRef = useRef<HTMLDivElement>(null);

//   const rotateImage = (angle: number) => {
//     setRotation((prevRotation) => prevRotation + angle);
//   };

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

//   const downloadImage = async () => {
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "image.jpg";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     window.URL.revokeObjectURL(url);
//   };

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
//   }, []);

//   return (
//     <ImageWrapper>
//       <CoverContainer>
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
//       </CoverContainer>

//       <Controls>
//         <button onClick={() => rotateImage(90)}>Rotate 90°</button>
//         <button onClick={() => zoomImage(0.1)}>Zoom In</button>
//         <button onClick={() => zoomImage(-0.1)}>Zoom Out</button>
//         <button onClick={downloadImage}>Download</button>
//       </Controls>
//     </ImageWrapper>
//   );
// };
