import styled from "styled-components";

export const ThirdPartyCompaniesStyles = {
  Section: styled.section`
    padding: 30px;
    background-color: #f9f9f9;
  `,

  HeaderActions: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    color: #404A5F;
  `,

  GridWrapper: styled.div`
    display: flex;
    flex-direction: column;
    color: #404A5F;
  `,
  GridHeader: styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    font-size: 14px;
    font-weight: 600;
    padding: 10px 0;
    margin-bottom: 5px;
    border-bottom: 1px solid #404A5F;
    color: #404A5F;
     height: 6%;
    align-items: center; 
    border-top: solid 1px ${({ theme }) => theme.colors.borderWhite};
    
    div {
      text-align: left; /* Align text to the left */
      padding-left: 10px;
    }
  `,

  GridRow: styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    max-height: 50px; 
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    border-bottom: solid 1px ${({ theme }) => theme.colors.borderWhite};
    color: #404A5F;
    align-items: center; 
    
    div {
      text-align: left; 
      padding-left: 10px;
    }
  `,

  ActionButton: styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    color: #404A5F;
    &:hover {
      opacity: 0.8;
    }
    svg {
      fill: #333;
      width: 14px;
      height: 14px;
    }
  `,
  ActionButtonClose: styled.button`
    background: none;
    border: none;
    cursor: pointer;
    &:hover {
     color: #404A5F;
     opacity: 0.7;
    }
    svg {
      width: 18px;
      height: 18px;
    }
  `,
  ActionButtonNew: styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #404A5F;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  svg {
    fill:#404A5F;
    width: 20px;
    height: 20px;
  }
`,
  TokenField: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    span {
      margin-right: 8px; 
    }

    &:hover div {
      display: flex; 
    }
  `,
  TokenIcons: styled.div`
    display: none;
    align-items: center;

    button {
      background: none;
      border: none;
      cursor: pointer;
    }

    button:last-child {
      margin-right: 0;
    }
  `,

  WebHook: styled.div`
    position: relative;
    display: flex;
    align-items: center;

    &:hover div {
      display: flex;
    }
  `,

  WebHookIcons: styled.div`
    display: none;
    align-items: center;

    button {
      background: none;
      border: none;
      cursor: pointer;
    }

    button:last-child {
      margin-right: 0;
    }
  `,
  Tooltip: styled.div`
    position: absolute;
    top: -30px; /* Adjust this value based on where you want the tooltip */
    left: 50%;
    transform: translateX(-50%);
    background-color: #404A5F;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  `,
  Copied: styled.div`
 position: fixed;
  top: 86px;  
  right: 13%; 
  background-color: #404A5F;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  opacity: 0.9;
  z-index: 1000; 
  transition: opacity 0.3s ease; 
`
};
