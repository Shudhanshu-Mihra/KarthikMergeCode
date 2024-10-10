// ImageViewer.tsx
import React from "react";
import { Icon } from "components/Icons";
import { useImageViewerState } from "./ImageViewer.state";
import { ImageWrapper, CoverDiv, Controls, StyledImage } from "./ImageViewer.style";

interface ImageViewerProps {
  imageUrl: string;
  download: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl, download }) => {
  const { rotation, scale, transformOrigin, rotateImage, zoomImage, handleDownloadClick } =
    useImageViewerState(imageUrl, download);

  return (
    <ImageWrapper>
      <CoverDiv>
        <StyledImage
          src={imageUrl}
          rotation={rotation}
          scale={scale}
          transformOrigin={transformOrigin}
          alt="Preview"
        />
      </CoverDiv>

      <Controls>
        <button onClick={() => rotateImage(90)}>
          <Icon type="RotateIcon" />
        </button>
        <button onClick={() => zoomImage(0.1)}>
          <Icon type="ZoomInIcon" />
        </button>
        <button onClick={() => zoomImage(-0.1)}>
          <Icon type="ZoomOutIcon" />
        </button>
        <button onClick={handleDownloadClick}>
          <Icon type="downloadIcon" />
        </button>
      </Controls>
    </ImageWrapper>
  );
};
