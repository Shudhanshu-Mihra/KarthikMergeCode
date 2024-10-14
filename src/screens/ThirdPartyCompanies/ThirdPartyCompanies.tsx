import { FC, useState } from "react";
import { ThirdPartyCompaniesStyles as Styled } from "./ThirdPartyCompanies.style";
import { SuccessPopup } from "components/SuccessPopup";
import { ReUseSearch } from "ReUseComponents/reUseSearch/ReUseSearch";
import { ReUseActionButton } from "ReUseComponents/reUseActionButton/ReUseActionButton";
import { Icon } from 'components/Icons/Icons';
import { ModalBox } from 'screens/Settings/UsersList/ModalBox';
import { useFormik } from 'formik';
import { useThirdPartyCompaniesState } from "./ThirdPartyCompanies.state";
import { DeleteModalWindow } from "components/DeleteModalWindow";
import { ConformRefreshWindow } from "components/ConformRefresh/ConformRefreshWindow";
import { RevokeModalWindow } from "components/RevokeModalWindow";

export const ThirdPartyCompanies: FC = () => {

  const {
    AddCompany, 
    isModalOpen,
    formik,
    handleRevoke,
    setIsEdit,
    handleCloseModal,
    handleSaveCompany,
    handleRefreshToken,
    handleRemoveToken,
    handleEditCompany,
    onChangeActiveValueHandler, 
    handleCloseDeleteModal,
    handleConfirmDelete,
    setConformRefreshOpen,
    handleCloseConfirmRefresh,
    handleConfirmRefresh,
    isEdit,
    selectedCompanyName,
    setIsModalOpen,
    isConformRefreshOpen,
    isDeleteModalOpen,
    isRevokemodalBox,
    handleConfirmRevoke,
    handleCloseConfirmRevoke,
    handleCopyToken,
    handleViewToken,
    visibleToken
  } = useThirdPartyCompaniesState();
  
  const thirdParties = [
    { name: "Company A", status: "Active", token: "abcd1234", webHook: "https://webhook.companyA.com" },
    { name: "Company B", status: "Inactive", token: "efgh5678", webHook: "https://webhook.companyB.com" },
  ];

  return (
    <Styled.Section>
      <Styled.HeaderActions>
        <ReUseSearch
          searchValue={''}
          onChangeSearchValueHandler={() => {}}
        />
        <ReUseActionButton
          displayText="Add a Company"
          buttonType="actionButton"
          themedButton="primary"
          onClick={() => {
            setIsEdit(false);
            setIsModalOpen(true);
          }}
          widthType="primary"
          displayIconType="addPlus"
        />
      </Styled.HeaderActions>
      <Styled.GridWrapper>
        <Styled.GridHeader>
          <div>Name</div>
          <div>Status</div>
          <div>Token</div>
          <div>Webhook</div>
          <div>Action</div>
        </Styled.GridHeader>

        {thirdParties.map((company, index) => (
          <Styled.GridRow key={index}>
            <div>{company.name}</div>
            <div>{company.status}</div>
            {/* <div>{company.token}</div> */}
            <Styled.TokenField>
            <span>{visibleToken === company.token ? company.token : "******"}</span>
            <Styled.TokenIcons>
            <Styled.ActionButton onClick={() => handleViewToken(company.token)}>
                <Icon type="View" />
              </Styled.ActionButton>
              <Styled.ActionButton onClick={() => handleCopyToken(company.token)}>
                <Icon type="Copy" />
              </Styled.ActionButton>
            </Styled.TokenIcons>
            </Styled.TokenField>
            <div>{company.webHook}</div>
            <div>
              <Styled.ActionButton onClick={() => handleEditCompany(company.name)}>
                <Icon type="edit" />
              </Styled.ActionButton>
              <Styled.ActionButton onClick={() => handleRemoveToken(company.name)}>
                <Icon type="remove" />
              </Styled.ActionButton>
              <Styled.ActionButton onClick={() => handleRefreshToken()}>
                <Icon type="Reassign" />
              </Styled.ActionButton>
              <Styled.ActionButton >
              <button onClick={() => handleRevoke(company.name)}>Revoke</button>
              </Styled.ActionButton>
            </div>
          </Styled.GridRow>
        ))}
      </Styled.GridWrapper>
      {isModalOpen && (
        <ModalBox
          modalFields={AddCompany}
          text={isEdit ? 'Edit Company' : 'Add Company'}
          isLoading={false}
          isDisableButton={false}
          onCloseModalWindowHandler={handleCloseModal}
          onSaveButtonCLickHandler={handleSaveCompany}
          onEnterCreateItemClick={()=>{}}
          isModalWindowOpen={isModalOpen}
          headerText={isEdit ? 'Edit Company' : 'Insert Company'}
          formikMeta={formik.getFieldMeta}
          formikProps={formik.getFieldProps}
          onCloseDeleteModalWindowHandler={handleCloseModal}
          onDeleteButtonClickHandler={handleConfirmDelete}
          isDeleteModalWindowOpen={false}
          deleteItemName={selectedCompanyName}
          isEdit={isEdit}
          isInvitation={false}
          isUserList
          categoryName="company"
          isPAllChecked={false}
          permissionState={[]}
          setPAllChecked={() => {}}
          PermissionsForAPIHandler={() => {}}
          role={''}
        />
      )}
        {isDeleteModalOpen && (
        <DeleteModalWindow
          onCloseDeleteModalWindowHandler={handleCloseDeleteModal}
          onDeleteButtonClickHandler={handleConfirmDelete}
          isDeleteModalWindowOpen={isDeleteModalOpen}
          deleteItemName={'current Company'}  
          isLoading={false}  
          categoryName="user"  
        />
      )}
        {isConformRefreshOpen && (
            <ConformRefreshWindow
            onCloseDeleteModalWindowHandler={handleCloseConfirmRefresh}
            onDeleteButtonClickHandler={handleConfirmRefresh}
            isDeleteModalWindowOpen={isConformRefreshOpen}
            deleteItemName={' current Company'}  
            isLoading={false}  
            categoryName="user"  
          />
      )}
      {isRevokemodalBox && (
            <RevokeModalWindow
            onCloseDeleteModalWindowHandler={handleCloseConfirmRevoke}
            onDeleteButtonClickHandler={handleConfirmRevoke}
            isDeleteModalWindowOpen={isRevokemodalBox}
            deleteItemName={' current Company'}  
            isLoading={false}  
            categoryName="user"  
          />
      )}
    </Styled.Section>
  );
};
