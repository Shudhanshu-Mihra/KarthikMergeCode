import { FC, useEffect } from "react";

import { EmptyData } from "components/EmptyData";
import { LoaderComponent } from "components/Loader";
import { MasterModalWindowsBox } from "components/MasterModalWindowsBox";

import { useCategoriesTabState } from "./CategoriesTab.state";
import { CategoriesTabStyles as Styled } from "./CategoriesTab.style";
import { CategoryContent } from "./CategoryContent";

import { EMPTY_DATA_STRINGS_MASTER as Strings } from "constants/strings";

export const CategoriesTab: FC = () => {
  const {
    isLoading,
    isModalWindowOpen,
    modalInputValue,
    onChangeCategoryNameValueHandler,
    onChangeSearchValueHandler,
    onCreateCategoryHandler,
    onEnterCreateCategoryClick,
    onGetAllCategoriesHandler,
    onModalWindowToggle,
    searchValue,
    categoriesList,
    count,
    date_format,
    isDeleteModalWindowOpen,
    onDeleteModalWindowToggle,
    onDeleteItemClickHandler,
    onDeleteButtonClickHandler,
    selectedCategory,
    isEdit,
    onEditItemClickHandler,
    isDisableButton,
    onSaveButtonClickHandler,
    onModalWindowCancelClickButtonHandler,
    onChangeItemsPerPage,
    onChangePaginationInputValue,
    onChangePage,
    onEnterGoToClick,
    onGoToClick,
    onForwardClick,
    onBackwardClick,
    onChangePagesAmount,
    onBlurHandler,
    onFocusSearchHandler,
    currentPage,
    inputPaginationValue,
    itemsPerPage,
    pages,
    isFetchingData,
    isEmptyData,
    debouncedValue,
    isFocus,
    isContentLoading,
    isSearching,
    searchedItems,
    active_account,
    userRole,
  } = useCategoriesTabState();

  useEffect(() => {
    !searchValue &&
      onGetAllCategoriesHandler({
        take: +itemsPerPage.value,
        skip: currentPage * +itemsPerPage.value,
      });
  }, [searchValue, active_account]);

  useEffect(() => {
    debouncedValue &&
      onGetAllCategoriesHandler(
        {
          search: debouncedValue,
        },
        isSearching
      );
  }, [debouncedValue]);

  useEffect(() => {
    if (!count) return;
    onChangePagesAmount(+itemsPerPage.value, count);
  }, [count, itemsPerPage]);

  return (
    <>
      <MasterModalWindowsBox
        isLoading={isLoading}
        onCloseModalWindowHandler={onModalWindowCancelClickButtonHandler}
        onChangePaginationInputValueHandler={onChangeCategoryNameValueHandler}
        onEnterCreateItemClick={onEnterCreateCategoryClick}
        onSaveButtonCLickHandler={
          isEdit ? onSaveButtonClickHandler : onCreateCategoryHandler
        }
        isModalWindowOpen={isModalWindowOpen}
        inputValue={modalInputValue}
        text="Name"
        onDeleteButtonClickHandler={onDeleteButtonClickHandler}
        deleteItemName={`‘${selectedCategory?.name}’`}
        categoryName="category"
        isDeleteModalWindowOpen={isDeleteModalWindowOpen}
        onCloseDeleteModalWindowHandler={onDeleteModalWindowToggle}
        isDisableButton={isDisableButton}
        headerText={isEdit ? "Edit Category" : "Add Category"}
      />
      {isFetchingData ? (
        <Styled.LoaderWrapper>
          <LoaderComponent theme="preview" />
        </Styled.LoaderWrapper>
      ) : !isFetchingData && isEmptyData && !categoriesList?.length ? (
        <EmptyData
          isUploadFile={false}
          buttonText={Strings.categories.buttonText}
          firstSubtitle={Strings.categories.firstSubtitle}
          secondSubtitle={Strings.categories.secondSubtitle}
          title={Strings.categories.title}
          onClick={onModalWindowToggle}
          userRole={userRole}
        />
      ) : (
        <CategoryContent
          userRole={userRole}
          isContentLoading={isContentLoading}
          isFetchingData={isFetchingData}
          isFocus={isFocus}
          categories={categoriesList}
          currentPage={currentPage}
          dateFormat={date_format}
          inputPaginationValue={inputPaginationValue}
          onAddClickButtonHandler={onModalWindowToggle}
          onBackwardClick={onBackwardClick}
          onChangePaginationInputValue={onChangePaginationInputValue}
          onChangeItemsPerPage={onChangeItemsPerPage}
          onChangeSearchValueHandler={onChangeSearchValueHandler}
          onDeleteIconClickHandler={onDeleteItemClickHandler}
          onEditIconClickHandler={onEditItemClickHandler}
          onForwardClick={onForwardClick}
          onEnterGoToClick={onEnterGoToClick}
          onGoToClick={onGoToClick}
          pages={pages}
          itemsPerPage={itemsPerPage}
          searchValue={searchValue}
          tabName="Name"
          onBlurHandler={onBlurHandler}
          onFocusSearchHandler={onFocusSearchHandler}
          onChangePage={onChangePage}
          searchedItems={searchedItems}
        />
      )}
    </>
  );
};
