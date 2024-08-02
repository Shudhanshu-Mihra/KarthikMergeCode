import { styled } from 'styles/theme';
import { css } from 'styled-components';
import { Link } from "react-router-dom";


import { IReUseActionButtonProps, ILink } from './ReUseActionButton';

const THEME = {
  primary: css`
    background-color: ${(props) => props.theme.colors.darkRed};
    color: ${(props) => props.theme.colors.white};
  `,
  secondary: css`
    background-color: ${(props) => props.theme.colors.lightGray};
    color: ${(props) => props.theme.colors.black};
  `,
  capium: css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.lightBlack};
    border: 1px solid rgba(34, 43, 56, 0.2);
  `,
  roundedRed: css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.darkRed};
    color: ${(props) => props.theme.colors.white};
    border-radius: 50px;
  `,
  roundedWhite: css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.darkRed};
    border: ${(props) => `1px solid ${props.theme.colors.darkRed}`};
    border-radius: 50px;
    box-shadow: none;
  `,
};

const WIDTH = {
  auth: css`
    width: 100%;
  `,
  primary: css`
    width: auto;
    border-radius:6px;
  `,
  rounded: css`
    min-width: 100px;
    width: max-content;
    height: 60px;
  `,
  roundedBig: css`
    width: max-content;
    height: 40px;
    box-shadow: none;
  `,
};

export const reUseActionButtonStyle = {
  Button: styled.button<IReUseActionButtonProps>`
    font-size: ${(props) => props.fontSize};
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 600;
    // border-radius: 6px;
    width: ${(props) => props.customWidth ? props.customWidth : `max-content`};
    min-width: max-content;
    box-shadow: ${(props) => `0px 0px 5px ${props.theme.colors.boxShadowBlackButton}`};
    background-color: ${(props) => props.theme.colors.lightGray};
    ${(props) => props.themedButton && THEME[props.themedButton]};
    // ${(props) => props.widthType && WIDTH[props.widthType]};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    opacity: ${(props) => (props.disabled ? 0.8 : 1)};
    padding-inline: ${(props) => props.paddingInline && !props.customWidth ? props.paddingInline : "0px"};
    text-align: center;
    flex: 0 0 ${(props) => props.customWidth ? props.customWidth : `max-content`};
    margin: ${(props) => props.margin};
    height: 40px;
    min-height: 40px;
    `,

  BtnLink: styled(Link) <ILink>`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding-inline: ${(props) => props.paddingInline ? props.paddingInline : "0px"};
      // padding-inline: ${(props) => props.paddingInline && !props.customWidth ? props.paddingInline : "0px"};
      font-size: inherit;
      color: inherit;
    `,

  displayContent: styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    // &:not(:last-child) {
    // margin-right: 14px;
    }

    svg {
      stroke: ${(props) => props.theme.colors.white}; 
      fill: ${(props) => props.theme.colors.white}; 
      height: 12px;
      width: auto;
    }
  `,
  textlink: styled.button<IReUseActionButtonProps>`
    font-size: ${(props) => props.theme.size.default};
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 14px;
    font-weight: 600;
    border-radius: 6px;
    width: max-content;
    box-shadow: ${(props) => `0px 0px 5px ${props.theme.colors.boxShadowBlackButton}`};
    background-color: ${(props) => props.theme.colors.lightGray};
    ${(props) => props.themedButton && THEME[props.themedButton]};
    // ${(props) => props.widthType && WIDTH[props.widthType]};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    opacity: ${(props) => (props.disabled ? 0.8 : 1)};
    padding: 10px 20px;
  `,
};


// cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
// opacity: ${(props) => (props.disabled ? 0.8 : 1)};

// ButtonLink: styled(Link)<IReUseActionButtonProps>`
//     font-size: ${(props) => props.fontSize};
//     font-family: 'Source Sans Pro', sans-serif;
//     font-weight: 600;
//     // border-radius: 6px;
//     width: ${(props) => props.customWidth ? props.customWidth : `max-content` };
//     min-width: max-content;
//     box-shadow: ${(props) => `0px 0px 5px ${props.theme.colors.boxShadowBlackButton}`};
//     background-color: ${(props) => props.theme.colors.lightGray};
//     ${(props) => props.themedButton && THEME[props.themedButton]};
//     ${(props) => props.widthType && WIDTH[props.widthType]};

//     padding-inline: ${(props) => props.paddingInline ? props.paddingInline : "0px"};
//     padding-block: ${(props) => props.paddingBlock ? props.paddingBlock : "0px"};
//     margin: ${(props) => props.margin};
//     // height: 40px;
//     `,