import styled from "styled-components";
export const ThirdPartyCompaniesStyles = {
  Section: styled.section`
  padding: 30px;
  background-color: #f9f9f9;
`,

  HeaderActions: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
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
  min-height: 20px; 
  div {
    text-align: left; 
    padding-left: 10px; 
  }
`,

GridRow: styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  // padding: 2px;
  max-height: 50px;
   overflow-wrap: break-word; /* Enable text wrapping */
    word-wrap: break-word; /* For older browsers */
    word-break: break-word; /* Break long words */
  border-bottom: solid 1px ${({ theme }) => theme.colors.borderWhite};
  color: #404A5F;
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
      width: 16px;
      height: 16px;
    }
  `,
  TokenField : styled.div`
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
 TokenIcons : styled.div`
  display: none;
  align-items: center;

  button {
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 8px; 
  }

  button:last-child {
    margin-right: 0;
  }
`,
// WebHook:styled.div`
//   overflow-wrap: break-word; 
//   word-wrap: break-word; 
//   white-space: normal; 
//   overflow: hidden; 
//   max-width: 100%; 
// &:hover {
//   opacity: 0.8;
// }
// svg {
//   fill: #333;
//   width: 16px;
//   height: 16px;
// }
// `,
// WebHookIcons : styled.div`
// display: none;
// align-items: center;

// button {
//   background: none;
//   border: none;
//   cursor: pointer;
//   margin-right: 8px; 
// }

// button:last-child {
//   margin-right: 0;
// }
// `,

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
    margin-right: 8px;
  }

  button:last-child {
    margin-right: 0;
  }
`,

};
