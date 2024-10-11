import { FC, useState } from "react";
import { ThirdPartyCompaniesStyles as Styled } from "./ThirdPartyCompanies.style";
import { SuccessPopup } from "components/SuccessPopup";
import { ReUseSearch } from "ReUseComponents/reUseSearch/ReUseSearch";
import { ReUseActionButton } from "ReUseComponents/reUseActionButton/ReUseActionButton";
import { Icon } from 'components/Icons/Icons';
import { ModalBox } from 'screens/Settings/UsersList/ModalBox'; // Import ModalBox
import { useFormik } from 'formik'; // Assuming formik is being used
import { useThirdPartyCompaniesState } from "./ThirdPartyCompanies.state";
import { DeleteModalWindow } from "components/DeleteModalWindow";

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
    isEdit,
    selectedCompanyName,
    setIsModalOpen,
    isDeleteModalOpen} = useThirdPartyCompaniesState();
  
  const thirdParties = [
    { name: "Company A", status: "Active", token: "abcd1234", webHook: "https://webhook.companyA.com" },
    { name: "Company B", status: "Inactive", token: "efgh5678", webHook: "https://webhook.companyB.com" },
  ];

  return (
    <Styled.Section>
      <h1>Third-Party Companies</h1>
      <br />
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
            <div>{company.token}</div>
            <div>{company.webHook}</div>
            <div>
              <Styled.ActionButton onClick={() => handleEditCompany(company.name)}>
                <Icon type="edit" />
              </Styled.ActionButton>
              <Styled.ActionButton onClick={() => handleRemoveToken(company.name)}>
                <Icon type="remove" />
              </Styled.ActionButton>
              <Styled.ActionButton onClick={() => handleRefreshToken(company.name)}>
                <Icon type="Reassign" />
              </Styled.ActionButton>
              <button onClick={() => handleRevoke(company.name)}>Revoke</button>
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
    </Styled.Section>
  );
};
