// ImageViewer.style.ts
import styled from "styled-components";

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CoverDiv = styled.div`
  width: 100%;
  height: 500px; /* Fixed height for the cover */
  display: flex;
  justify-content: center;
  overflow: auto; /* Allow scrolling when zoomed */
`;

export const Controls = styled.div`
  position: absolute;
  bottom: 40px;
  margin: 20px;
  display: flex;
  justify-content: center;
  width: 500px;

  button {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    background-color: rgb(0 0 0 / 27%);
  }
`;

export const StyledImage = styled.img<{ rotation: number; scale: number; transformOrigin: string }>`
  max-width: none;
  max-height: none;
  height: auto;
  width: auto;
  transform: rotate(${(props) => props.rotation}deg) scale(${(props) => props.scale});
  transform-origin: ${(props) => props.transformOrigin}; 
  transition: transform 0.3s ease-in-out;
  object-fit: contain;
`;
