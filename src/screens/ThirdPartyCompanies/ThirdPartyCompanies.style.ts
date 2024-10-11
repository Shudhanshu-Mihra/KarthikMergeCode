import styled from "styled-components";

export const ThirdPartyCompaniesStyles = {
  Section: styled.section`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    h1 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  `,

  HeaderActions: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  `,

  GridWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-top: 1px solid #e0e0e0;
  `,

  GridHeader: styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    font-weight: bold;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
    div {
      text-align: center;
    }
  `,
  GridRow: styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
    div {
      text-align: center;
    }
  `,

  ActionButton: styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    &:hover {
      opacity: 0.8;
    }
    svg {
      fill: #333;
      width: 16px;
      height: 16px;
    }
  `,
};
