import { FC, useEffect } from 'react';

import { LoaderComponent } from 'components/Loader';
// import { SuccessPopup } from 'components/SuccessPopup';
// import { LinkSocAccModalWindow } from 'components/LinkSocAccModalWindow';

import { useMyAccountState } from './MyAccount.state';
import { MyAccountStyles as Styled } from './MyAccount.style';
import { Buttons } from './Buttons';
import { AccountFields } from './AccountFields';

export const MyAccount: FC = () => {
  const {
    accountsFields,
    isResetPassword,
    resetPasswordFields,
    isFetchingData,
    formik,
    isLoading,
    resetPasswordFormik,
    isDisabledButton,
    isShowSuccesPopup,
    isShowNewPassword,
    isShowConfirmPassword,
    linkSocAccFormik,
    countryValue,
    isLinkSocialAccButton,
    isLinkSocAccWindowOpen,
    isCreatingAcc,
    setLinkSocAccWindowToggle,
    setIsShowNewPassword,
    setIsShowConfirmPassword,
    onChangeLinkedCountryValueHandler,
    setIsShowSuccesPopup,
    onCancelbuttonClickHandler,
    getProfileHandler,
    setIsResetPassword,
    onSettingsClickButtonHandler,
    onSubmitHandler,
  } = useMyAccountState();

  useEffect(() => {
    getProfileHandler();
  }, []);

  return (
    <Styled.LayoutWrapper>
      {/* <LinkSocAccModalWindow
        isLoading={isCreatingAcc}
        isModalWindowOpen={isLinkSocAccWindowOpen}
        onCloseModalWindowHandler={setLinkSocAccWindowToggle}
        onChangeCountryValueHandler={onChangeLinkedCountryValueHandler}
        onFormHandleSubmit={linkSocAccFormik.handleSubmit}
        setIsShowConfirmPassword={setIsShowConfirmPassword}
        setIsShowPassword={setIsShowNewPassword}
        onChange={linkSocAccFormik.handleChange}
        onBlur={linkSocAccFormik.handleBlur}
        isValid={linkSocAccFormik.isValid && linkSocAccFormik.dirty}
        isShowConfirmPassword={isShowConfirmPassword}
        isShowPassword={isShowNewPassword}
        values={linkSocAccFormik.values}
        errors={linkSocAccFormik.errors}
        touched={linkSocAccFormik.touched}
        countryValue={countryValue}
      />
      <SuccessPopup
        positionTop="0"
        isShowPopup={isShowSuccesPopup}
        closePopupFc={setIsShowSuccesPopup}
        titleText={
          isLinkSocialAccButton
            ? 'The social account has been successfully linked'
            : isResetPassword
            ? 'The password has been successfully changed'
            : 'User profile has been successfully changed'
        }
      /> */}
      {isFetchingData ? (
        <Styled.LoaderWrapper>
          <LoaderComponent theme="preview" />
        </Styled.LoaderWrapper>
      ) : (
        <Styled.ContentWrapper isResetPassword={isResetPassword}>
          <Styled.Form onSubmit={onSubmitHandler}>
            <AccountFields
              isResetPassword={isResetPassword}
              resetPasswordFields={resetPasswordFields}
              formikProps={formik.getFieldProps}
              formikMeta={formik.getFieldMeta}
              resetPasswordFormikProps={resetPasswordFormik.getFieldProps}
              resetPasswordFormikMeta={resetPasswordFormik.getFieldMeta}
              accountsFields={accountsFields}
            />
            <Buttons
              settingsButtonText={
                isLinkSocialAccButton
                  ? 'Link Social Account'
                  : isResetPassword
                  ? 'Settings'
                  : 'Reset Password'
              }
              onClickSettingsButtonHandler={
                isLinkSocialAccButton
                  ? setLinkSocAccWindowToggle
                  : isResetPassword
                  ? onSettingsClickButtonHandler
                  : setIsResetPassword
              }
              onCancelbuttonClickHandler={onCancelbuttonClickHandler}
              isDisabledButton={isDisabledButton}
              isLoading={isLoading}
              isCancelButton={isResetPassword}
            />
          </Styled.Form>
        </Styled.ContentWrapper>
      )}
    </Styled.LayoutWrapper>
  );
};
