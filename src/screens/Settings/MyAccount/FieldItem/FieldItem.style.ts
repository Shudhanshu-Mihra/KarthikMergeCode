import { styled } from 'styles/theme';

export const FieldItemStyles = {
  Label: styled.p`
    font-weight: ${(props: any) => props.theme.fontWeight.semiBold};
    font-size: ${(props: any) => props.theme.size.default};
    color: ${(props: any) => props.theme.colors.lightBlack};
    margin-bottom: 10px;
  `,
  FieldWrapper: styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    margin-right: 50px;
    margin-bottom: 24px;
    &:nth-child(2n) {
      margin-right: 0px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  `,
};
