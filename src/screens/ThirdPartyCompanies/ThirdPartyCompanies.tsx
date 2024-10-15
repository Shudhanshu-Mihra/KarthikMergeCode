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
      formikEditCompany,
      formikAddCompany,
      handleRevoke,
      setIsEdit,
      handleCloseModal,
      handleEditSaveCompany,
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
      visibleToken,
      isLoading,
      EditCompany,
      isEditCompany,
      handleAddSaveCompany
    } = useThirdPartyCompaniesState();


    useEffect(() => {
      fetchThirdPartyCompaniesData()
    },[])
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

          {ThirdPartyCompanyAllData.map((company, index) => (
            <Styled.GridRow key={index}>
              <div>{company.name}</div>
              <div>{company.active}</div>
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
              {/* <div>{company.tpc_token}</div> */}
              <div>{company.tpc_wh}</div>
              <div>
                <Styled.ActionButton onClick={() => handleEditCompany(company.id , company.name)}>
                  <Icon type="edit" />
                </Styled.ActionButton>
                <Styled.ActionButton onClick={() => handleRemoveToken(company.id)}>
                  <Icon type="remove" />
                </Styled.ActionButton>
                <Styled.ActionButton onClick={() => handleRefreshToken(company.id)}>
                  <Icon type="Reassign" />
                </Styled.ActionButton>
                <button onClick={() => handleRevoke(company.id)}>Revoke</button>
              </div>
            </Styled.GridRow>
          ))}
        </Styled.GridWrapper>
        {isModalOpen && (
          <ModalBox
            modalFields={AddCompany}
            text={'Add Company'}
            isLoading={isLoading}
            isDisableButton={false}
            onCloseModalWindowHandler={handleCloseModal}
            onSaveButtonCLickHandler={handleAddSaveCompany}
            onEnterCreateItemClick={()=>{}}
            isModalWindowOpen={isModalOpen}
            headerText={isEdit ? 'Edit Company' : 'Insert Company'}
            formikMeta={formikAddCompany.getFieldMeta}
            formikProps={formikAddCompany.getFieldProps}
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
        {isEditCompany && (
          <ModalBox
            modalFields={EditCompany }
            text={'Edit Company'}
            isLoading={isLoading}
            isDisableButton={false}
            onCloseModalWindowHandler={handleCloseModal}
            onSaveButtonCLickHandler={handleEditSaveCompany}
            onEnterCreateItemClick={()=>{}}
            isModalWindowOpen={isEditCompany}
            headerText={'Edit Company'}
            formikMeta={formikEditCompany.getFieldMeta}
            formikProps={formikEditCompany.getFieldProps}
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
