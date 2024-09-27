import React, { useEffect, useState } from 'react';
import { useRIdataState } from './RIdata.state';
import { IReceiptInvoiceData } from './types/RIdata.type'; // Import the correct type
import { ReUseStatusFilter } from 'ReUseComponents/reUseStatusFilter/ReUseStatusFilter';
// import { ReUseActionMenu } from 'ReUseComponents/reUseActionMenu/ReUseActionMenu';
// import { ReUseDatePicker } from 'ReUseComponents/reUseDatePicker/ReuseDatePicker';
import { ReUseSearch } from 'ReUseComponents/reUseSearch/ReUseSearch';
import { RIdata as Styled } from './RIdata.style';
import { TableInboxAdmin } from 'components/TableInboxAdmin';
import { LoaderComponent } from 'components/Loader';


export const RIdata = () => {
  const {
    receiptInvoiceData,
    onFetchReceiptsHandler,
    isContentLoading,
    onChangeSearchValueHandler,
    searchValue,
    onBlurHandler,
    onFocusSearchHandler,
    onChangeStatusValueHandler,
    statusValue,
    company,
    RIdataParams,
    sortField,
    sortOrder,
	  requestSort,
	  debouncedValue
  } = useRIdataState();

  useEffect(() => {
    const params = {
		...RIdataParams,
		// take: 100,
    };
    // onFetchReceiptsHandler(RIdataParams);
    onFetchReceiptsHandler(params);
  }, [onFetchReceiptsHandler , debouncedValue]);
	
  if (isContentLoading) {
	  return (
		<LoaderComponent theme='preview'/>
	  ); // Display a loading message while fetching data
  }

  // Derive isEmptyData based on recieptInvoiceData
  const derivedIsEmptyData = receiptInvoiceData.length === 0;

  if (derivedIsEmptyData) {
    return <p>No data available.</p>; // Display a message if no data is found
  }
  
  return (
    <>
      {/* adding the header part  */}
				<Styled.ActionPanelPlaceHolder>
					<ReUseSearch searchValue={searchValue} onChangeSearchValueHandler={onChangeSearchValueHandler} onBlurHandler={onBlurHandler} onFocusSearchHandler={onFocusSearchHandler} />
					<ReUseStatusFilter onChangeStatusValueHandler={onChangeStatusValueHandler} statusValue={statusValue} />
				</Styled.ActionPanelPlaceHolder>
      {/* table component  */}
      <Styled.TableWrapper>
				<TableInboxAdmin	
					receiptList={receiptInvoiceData}
          // dateFormat={createdFormattedDate}
					dateFormat={company.date_format}
					sortField={sortField}
					sortOrder={sortOrder}
					requestSort={requestSort}
					isContentLoading={isContentLoading}
					isFetchingReceipts
				/>	
      </Styled.TableWrapper>
      
     
    </>
  );
};
