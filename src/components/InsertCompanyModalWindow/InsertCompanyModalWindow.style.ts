import { styled } from 'styles/theme';

import { modalContentStyles, overlay } from 'constants/modal-window.constants';

export const CompanyModalWindowStyles = {
  content: {
    ...modalContentStyles,
    maxWidth: '420px',
    height: 'auto ',
    maxHeight:'90vh' ,
    minHeight:'max-content' ,
    // padding:'0px 0px 10px 0px',
  },
  overlay,
};
export const InsertCompanyModalWindowStyles = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 30px 5px 30px;
    width: 100%;
    max-height:60vh;
    overflow-y:auto;
    flex: 0 0 calc(100% - 140px);
  `,
  SubTitle:styled.div`
      font-weight: 600;
    font-size: 14px;
    color: #404A5F;
    line-height: 3;
    `
  ,Label:styled.div`
      font-weight: 600;
    font-size: 14px;
    color: #404A5F;
    line-height: 3;
    `,
  Header:styled.div`
  width:100%;
  padding:0px 30px 10px;
  display:flex;
      gap: 20px;
`
  ,TabButton: styled.button<{ isActive: boolean }>`
  border:none;
  color: ${({ isActive }) => (isActive ? 'red' : '#404A5F')};
   border-bottom: ${({ isActive }) => (isActive ? '2px solid #DF1C29' : '2px solid transparent')};
    font-weight: 600;
    padding:5px 0px 5px 0px;
    background-color:transparent;
        // color: ${({ theme }) => theme.colors.lightBlack};

  `,
  ContentSecond:styled.div`
  `,
  List:styled.ul`
  list-style-type: none;
  padding: 0;
`,
  ListItem:styled.li`
  display: flex;
  align-items: center;
  padding: 8px;
  // margin: 4px 0;
  background: transparent;
    border-bottom: 1px solid #ddd;
      justify-content:space-between;
`,ItemImage:styled.img`
width: max-content;
height: 50px;
margin-right: 10px;
`,ItemButton:styled.button`
margin-left: auto;
  padding: 5px 10px;
  background: #2C9F1C;
  color: white;
  border: none;
  cursor: pointer;
border-radius:5px;
  &:hover {
    background: #29711f;
  }`,
  ItemTextAndButton:styled.div`
  display:flex;
  align-items:center;
  gap:5px;
  `,
  WrapHeader:styled.div`
  height:85%;
  width:100%;
  // overflow-y:auto;
  `,
  RedText:styled.span`
  display:flex;
  align-items:center;
  gap:5px;
  color:red;
  `,
  textWithIcon:styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:7px;
  `,
  IconHolder:styled.div``,
  RedTextWrapper:styled.div`
  background-color:transparent;
  padding:0;
  margin :0;
  cursor:pointer;
  `
  ,
};
