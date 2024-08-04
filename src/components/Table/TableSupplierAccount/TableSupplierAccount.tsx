import React, { memo } from "react";

import { TableMasterProps } from "screens/Master/types/master.types";
import { TableButton } from "../TableButton/TableButton";
import { ItemSupplierAccount } from "./itemsSupplierAccount";

import { TableSupplierAccountStyles as Styled } from "./TableSupplierAccount.style";

export const TableSupplierAccount: React.FC<TableMasterProps> = memo((props) => {
  const {
    categories,
    dateFormat,
    tabName,
    // tabPurchase,
    onDeleteIconClickHandler,
    onEditIconClickHandler,
    searchValue,
    searchedItems,
    userRole,
  } = props;

  return (
    <>
      <Styled.Head>
      <Styled.Column width="200">
          <TableButton>ID</TableButton>
        </Styled.Column>
      
        <Styled.Column width="200">
          <TableButton>Name</TableButton>
        </Styled.Column>
        <Styled.Column width="200">
          <TableButton>Code</TableButton>
        </Styled.Column>
        <Styled.Column width="200">
          <TableButton>Purchase-Receipts</TableButton>
        </Styled.Column>
        <Styled.Column>
          <TableButton>Created On</TableButton>
        </Styled.Column>
        <Styled.Column width="200">
          <TableButton>Created By</TableButton>
        </Styled.Column>
        <Styled.Actions>Actions</Styled.Actions>
        {/* <Styled.Actions>Action</Styled.Actions> */}

      </Styled.Head>
      {searchedItems?.length && searchValue ? (
        searchedItems?.map((category) => (
          <ItemSupplierAccount
          userRole={userRole}
          supaccID={category.id}
          categoryName={category.name}
          createdDate={category.created}
          categoryCreator={category.creator.name}
          dateFormat={dateFormat}
          onDeleteIconHandler={onDeleteIconClickHandler}
          onEditIconHandler={onEditIconClickHandler}
          key={category.id}
          />
        ))
      ) : searchValue && !searchedItems?.length ? (
        <Styled.EmptyContentWrapper>
          No results found
        </Styled.EmptyContentWrapper>
      ) : (
        categories?.map((category) => (
          <ItemSupplierAccount
          userRole={userRole}
          supaccID={category.id}
          categoryName={category.name}
          createdDate={category.created}
          categoryCreator={category.creator.name}
          dateFormat={dateFormat}
          onDeleteIconHandler={onDeleteIconClickHandler}
          onEditIconHandler={onEditIconClickHandler}
          key={category.id}
          />
        ))
      )}
    </>
  );  
});
