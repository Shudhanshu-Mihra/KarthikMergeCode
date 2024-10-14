  import { FC, useEffect, useState } from "react";
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
      state,
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
      handleConfirmRefreshYes,
      isEdit,
      selectedCompanyName,
      setIsModalOpen,
      fetchThirdPartyCompaniesData,
      ThirdPartyCompanyAllData,
      isConformRefreshOpen,
      isDeleteModalOpen,
      isRevokemodalBox,
      handleConfirmRevoke,
      handleYesConfirmRevoke,
      handleCloseConfirmRevoke,
      handleCopyToken,
      handleViewToken,
      visibleToken} = useThirdPartyCompaniesState();
    
    // const thirdParties = [
    //   { name: "Company A", status: "Active", token: "abcd1234", webHook: "https://webhook.companyA.com" },
    //   { name: "Company B", status: "Inactive", token: "efgh5678", webHook: "https://webhook.companyB.com" },
    // ];

    useEffect(() => {
      fetchThirdPartyCompaniesData()
    },[])
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

          {ThirdPartyCompanyAllData.map((company, index) => (
            <Styled.GridRow key={index}>
              <div>{company.name}</div>
              <div>{company.active ? 'Active' : 'Inactive' }</div>
              <Styled.TokenField>
            <span>{visibleToken === company.tpc_token ? company.tpc_token : "******"}</span>
            <Styled.TokenIcons>
            <Styled.ActionButton onClick={() => handleViewToken(company.tpc_token)}>
                <Icon type="View" />
              </Styled.ActionButton>
              <Styled.ActionButton onClick={() => handleCopyToken(company.tpc_token)}>
                <Icon type="Copy" />
              </Styled.ActionButton>
            </Styled.TokenIcons>
            </Styled.TokenField>
            <Styled.WebHook>
              <div className="webhook">{company.tpc_wh}</div>
            </Styled.WebHook>
              <div>
                <Styled.ActionButton onClick={() => handleEditCompany(company.id)}>
                  <Icon type="edit" />
                </Styled.ActionButton>
                <Styled.ActionButton onClick={() => handleRefreshToken(company.id)}>
                  <Icon type="Reassign" />
                </Styled.ActionButton>
                {/* {!company.tpc_token.startsWith("Revoked") && (
                <Styled.ActionButton onClick={() => handleRevoke(company.id)}>
                  <Icon type="remove" />
                </Styled.ActionButton>
              )} */}
              <Styled.RevokeButton onClick={() => handleRevoke(company.id)}>Revoke</Styled.RevokeButton>
                {/* <button >Revoke</button> */}
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
            // onSaveButtonCLickHandler={async () => {
            //   await onFormSubmitHandler(formik.values);
            //   onModalWindowCancelClickButtonHandler(); 
            //   setCreateSuccessUser(true);
            // }}
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
          {isConformRefreshOpen && (
              <ConformRefreshWindow
              onCloseDeleteModalWindowHandler={handleCloseConfirmRefresh}
              onDeleteButtonClickHandler={handleConfirmRefreshYes}
              isDeleteModalWindowOpen={isConformRefreshOpen}
              deleteItemName={' current Company'}  
              isLoading={false}  
              categoryName="user"  
            />
        )}
        {isRevokemodalBox && (
              <RevokeModalWindow
              onCloseDeleteModalWindowHandler={handleCloseConfirmRevoke}
              onDeleteButtonClickHandler={handleYesConfirmRevoke}
              isDeleteModalWindowOpen={isRevokemodalBox}
              // deleteItemName={' current Company'}  
              deleteItemName={state.companyName}  
              isLoading={false}  
              categoryName="user"  
            />
        )}
      </Styled.Section>
    );
  };
