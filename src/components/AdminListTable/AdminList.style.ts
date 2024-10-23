import styled from "styled-components";

export const TableStyles = {
   
    Container: styled.div`
    width: 100%;
    height: calc(100% - 90px); /* Match height with original styles */
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  `,
  Head: styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1.5fr 2fr 1fr 1fr 1fr;
    border-top: solid 1px ${({ theme }) => theme.colors.borderWhite};
    border-bottom: solid 1px ${({ theme }) => theme.colors.lightBlack};
    height: 6%; 
    padding-left: 10px;
    padding-right: 10px;
    // background-color: ${({ theme }) => theme.colors.lighterGrey};
  `,
  Row: styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1.5fr 2fr 1fr 1fr 1fr;
    border-bottom: solid 1px ${({ theme }) => theme.colors.borderWhite};
    height: max-content;
    padding-left: 10px;
    padding-right: 10px;
    background-color: ${({ theme }) => theme.colors.white};
  `,
  Text: styled.div<{ alignRight?: boolean }>`
    color: ${({ theme }) => theme.colors.lightBlack};
    font-size: 14px; /* Match text size with common styles */
    text-align: ${({ alignRight }) => (alignRight ? 'right' : 'left')};
    white-space: nowrap;
    overflow: hidden;
    padding: 10px 0;
  `,
  EmptyContentWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.lightBlack};
    border-bottom: solid 1px ${({ theme }) => theme.colors.borderWhite};
  `,
  ActionWrapper: styled.div`
    display: flex;
    // gap: 10px;
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
  };
  