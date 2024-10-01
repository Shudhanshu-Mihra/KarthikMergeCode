import { FC, useEffect } from 'react';

import { SuccessPopupStyles as Styled } from './SuccessPopup.style';

interface ISuccessPopupProps {
  delay?: number;
  positionTop?: string;
  closePopupFc: () => void;
  isShowPopup: boolean;
  titleText: string;
  alertColor?: string;
}
export const SuccessPopup: FC<ISuccessPopupProps> = (props) => {
  const { titleText, delay, isShowPopup, positionTop, closePopupFc, alertColor } = props;

  useEffect(() => {
    isShowPopup && setTimeout(closePopupFc, delay || 3000);
  }, [isShowPopup]);

  return (
    <>
      {isShowPopup ? (
        <Styled.Wrapper positionTop={positionTop} alertColor={alertColor}>
          <Styled.Title>{titleText}</Styled.Title>
        </Styled.Wrapper>
      ) : null}
    </>
  );
};
