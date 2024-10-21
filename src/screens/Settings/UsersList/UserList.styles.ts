import { styled } from 'styles/theme';

export const UserListStyles = {
  // Section: styled.section`
  //   width: 100%;
  //   height: 100%;
  //   background: ${({ theme }) => theme.colors.white};
  //   display: flex;
  //   padding : 0px;
  //   flex-direction: column;
  //   justify-content: flex-start;
  //   position: relative;
  // `,
  Section: styled.section`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  justify-content: flex-start; /* Ensures content starts from the top */
  align-items: stretch; /* Ensures content doesn't add space */
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`,
  TableWrapper: styled.div`
    width: 100%;
  `,
  LoaderWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  `,
  ContentWrapper: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    flex: 1 0 auto;
  `,
  LoaderWrapperSettingd: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  `,
  paginationPosition: styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: max-content;
    margin-left: -30px;
  `,
};
