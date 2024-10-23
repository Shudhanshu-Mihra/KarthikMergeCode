import styled from 'styled-components';
import { COLORS } from '../../styles/theme';

export const ReUseComponentStyles = {
  ContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: ${COLORS.white};
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  `,

  Title: styled.h1`
    font-size: 24px;
    color:#404A5F;
    margin-bottom: 10px;
  `,

  Description: styled.p`
    font-size: 14px;
    color:#404A5F;
    font-weight:600;
    margin-bottom: 0px;
  `,

  SubTitle: styled.h2`
    font-size: 14px;
    color: ${COLORS.darkGray};
    margin-bottom: 8px;
  `,

  ButtonsWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
  `,

  DropdownWrapper: styled.div`
    margin: 10px 0;
    width: 100%;
  `,
  Dropdown: styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: ${COLORS.white};
  color: ${COLORS.darkGray};
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  appearance: none;
  outline: none;

  &:hover {
    border-color: ${COLORS.gray};
  }

  &:focus {
    border-color: ${COLORS.blue};
    box-shadow: 0px 0px 3px ${COLORS.blue};
  }
`,
  Button: styled.button`
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    background-color: red;
    color: ${COLORS.white};
    border: none;
    &:disabled {
      background-color: ${COLORS.lightGray};
      cursor: not-allowed;
    }
  `,
  DropdownCheck: styled.div`
  margin-top : 20px;
  width:100%;
  `,
  CloseIconWrapper: styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  cursor: pointer;
`,
};
