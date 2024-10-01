import { styled, Z_INDEX } from 'styles/theme';

export const SuccessPopupStyles = {
  Wrapper: styled.div<{ positionTop?: string, alertColor?:string}>`
    padding: 12px 19px;
    background: ${({ theme, alertColor}) => alertColor==='red'?theme.colors.red:theme.colors.swampGreen};
    border-radius: 5px;
    position: absolute;
    // right: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: ${Z_INDEX.s};
    // top: ${({ positionTop }) => `${positionTop}px` || '56px'};
    // bottom: ${({ positionTop }) => `${positionTop}px` || '56px'};
    bottom: 60px;
    max-width: 290px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  `,
  Title: styled.p<{ alertColor?:string}>`
    color: ${({ theme }) => theme.colors.lightGray};
    text-align: center;
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    font-size: ${({ theme }) => theme.size.default};
  `,
};
