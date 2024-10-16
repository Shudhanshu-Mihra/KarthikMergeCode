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
import { theme } from "styles/theme";

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
      handleCloseDeleteModal,
      handleConfirmDelete,
      setConformRefreshOpen,
      handleCloseConfirmRefresh,
      handleConfirmRefresh,
      handleConfirmRefreshYes,
      isEdit,
      selectedCompanyName,
      setSelectedCompanyName,
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
      isLoading,
      EditCompany,
      isEditCompany,
      handleAddSaveCompany,
      handleCopyWebHook,
      webhookVisibility, 
      toggleWebhookVisibility,
      visibleToken,
      setIsSuccessPopupOpen,
      isSuccessPopupOpen,
      isCreateCompany,
      copied
    } = useThirdPartyCompaniesState();

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
            widthType="primary"
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
              <div>{company.name}
              </div>
              <div>{company.active ? 'Active' : 'Inactive' }</div>
              <Styled.TokenField>
            <span>{visibleToken === company.tpc_token ? company.tpc_token : "******"}</span>
            <Styled.TokenIcons>
            <Styled.ActionButtonNew onClick={() => handleViewToken(company.tpc_token)}>
                <Icon type="View" />
              </Styled.ActionButtonNew>
              <Styled.ActionButtonNew onClick={() => handleCopyWebHook(company.tpc_token)}>
                <Icon type="Copy"/>
              </Styled.ActionButtonNew>
              {copied && <Styled.Copied><div>copied!</div></Styled.Copied>}
            </Styled.TokenIcons>
            </Styled.TokenField>

            <Styled.WebHook>
              {/* {company.tpc_wh.length > 25 ? `${company.tpc_wh.substring(0, 25)}...` : company.tpc_wh} */}
              {webhookVisibility[index]
                ? company.tpc_wh
                : (company.tpc_wh.length > 25 ? `${company.tpc_wh.substring(0, 25)}...` : company.tpc_wh)}
              <Styled.WebHookIcons>
              <Styled.ActionButtonNew onClick={() => handleCopyToken(company.tpc_wh)}>
              <Icon type="Copy"  />
              </Styled.ActionButtonNew>
              
              {copied && <Styled.Copied><div>copied!</div></Styled.Copied>}
              
              {company.tpc_wh.length > 25 && (
                  <Styled.ActionButtonNew onClick={() => toggleWebhookVisibility(index)}>
                    <Icon type="View" />
                  </Styled.ActionButtonNew>
                )}
              </Styled.WebHookIcons>
            </Styled.WebHook>
              <div>
                <Styled.ActionButton onClick={() => handleEditCompany(company.id , company.name)}>
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
              <Styled.ActionButtonClose onClick={() => {setSelectedCompanyName(company.name); handleRevoke(company.id); }}>
                  <Icon type="Revoke"/>
                </Styled.ActionButtonClose>
              {/* <Styled.RevokeButton onClick={() => handleRevoke(company.id)}>Revoke</Styled.RevokeButton> */}
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
          categoryName={''}  
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
              categoryName={selectedCompanyName}
            />
        )}
        {isSuccessPopupOpen && (
        <SuccessPopup
        positionTop="45"
        isShowPopup={isSuccessPopupOpen}
        closePopupFc={()=> setIsSuccessPopupOpen(false)}
        titleText={!isCreateCompany ? "Company is not created , Try Again":"New company was successfully"}
        alertColor={!isCreateCompany ? "red" :undefined}
      />)}
      </Styled.Section>
    );
  };
