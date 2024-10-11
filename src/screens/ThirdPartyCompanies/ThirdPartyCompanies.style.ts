import styled from "styled-components";

export const ThirdPartyCompaniesStyles = {
  Section: styled.section`
    padding: 40px;
    background-color: #f9f9f9;
  `,

  Header: styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
  `,

  AddEditHeading: styled.h2`
    font-size: 20px;
    margin: 20px 0;
    color: #555;
    padding:10px;
  `,

  AddEditDescription: styled.p`
    font-size: 16px;
    margin-bottom: 30px;
    color: #777;
  `,

  GridWrapper: styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
  `,
  HeaderActions: styled.div`
    display: flex;
    justify-content: space-between;  // Space between search and button
    align-items: center;
    margin-bottom: 20px;  // Optional margin to space them from the content below
  `,
  GridHeader: styled.div`
    display: contents;
    div {
      font-weight: bold;
      padding: 10px;
      border-bottom: 2px solid #e0e0e0;
      color: #333;
    }
  `,

  GridRow: styled.div`
  display: contents;
  
  div {
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    color: #555;
  }
  
  button {
    padding: 8px 12px;
    margin-right: 10px;
    background-color: #6c757d;  // Neutral dark gray for regular buttons
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #5a6268;  // Darker gray on hover
    }

    &:first-child {
      background-color: #28a745;  // Green for edit button
      &:hover {
        background-color: #218838;  // Darker green on hover
      }
    }

    &:nth-child(2) {
      background-color: #ffc107;  // Yellow for delete button
      &:hover {
        background-color: #e0a800;  // Darker yellow on hover
      }
    }

    &:nth-child(3) {
      background-color: #17a2b8;  // Cyan for refresh button
      &:hover {
        background-color: #138496;  // Darker cyan on hover
      }
    }

    &:last-child {
      background-color: #dc3545;  // Red for delete
      &:hover {
        background-color: #c82333;  // Darker red on hover
      }
    }
  }
`,
 ActionButton: styled.button`
      background: transparent;
      border: none;
      cursor: pointer;
      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `,
  PaginationWrapper: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
  `,
};
