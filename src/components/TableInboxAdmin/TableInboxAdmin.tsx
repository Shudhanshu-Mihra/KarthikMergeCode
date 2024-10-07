// import { FC, memo } from 'react';
// import { format } from 'date-fns';

// import { CheckboxItem } from 'components/Checkbox/Checkbox';

// import { setIsSorted } from 'services/utils';

// import { TableButton } from '../TableButton/TableButton';
// import { TableInboxAdminItem } from './TableInboxAdminItem/TableInboxAdminItem';
// import { TableInboxAdminStyles as Styled } from './TableInboxAdmin.style';
// import { TABLE_COLUMN_NAMES } from './TableInboxAdmin.constants';

// export const TableInboxAdmin: FC<TableInboxAdminProps> = memo((props) => {
//   const {
//     onCheckedItemHandler,
//     onCheckedPublishMockFuncHandler,
//     // onCheckedAllItemsHandler,
//     onCheckedPaidHandler,
//     onCheckedApproveHandler,
//     receiptList,
//     // isAllChecked,
//     dateFormat,
//     sortField,
//     sortOrder,
//     requestSort,
//   } = props;
//   // console.log('receiptList and sortField', receiptList);
//   return (
//     <>
//       <Styled.Head>
//         <Styled.Text>ID</Styled.Text>
//         {TABLE_COLUMN_NAMES.map((item) => {
//           const isSorted = setIsSorted(sortField, sortOrder, item.id);
//           return (
//             <Styled.Selector
//               key={item.id}
//               id={item.id}
//               onClick={requestSort}
//               isSorted={sortField === item.id}
//               textAlignRight={["currency",'net', 'tax', 'total',"vat_code"].includes(item.id)}
//             >
//               <TableButton isSorted={isSorted}>{item.name}</TableButton>
//             </Styled.Selector>
//           );
//         })}
//         {/* <Styled.Text>Status</Styled.Text> */}
//       </Styled.Head>
//       {receiptList?.length ? (
//         receiptList?.map((receipt,index) => (
//           <TableInboxAdminItem
//             // paymentStatus={receipt.payment_status}
//             // approveStatus={receipt.approve_status}
//             approveStatus={receipt.approved_status}
//             publishStatus={receipt.publish_status}
//             key={receipt.id}
//             selectedReceiptIndex={index}
//             type={receipt.type}
//             customId={receipt.custom_id}
//             receiptId={receipt.id}
//             photos={receipt.photos }
//             currency={'120'}
//             // category={receipt.category?.name}
//             // date={receipt?.created || '---'}
//             // date={'---'}
//             date={receipt.created}
//             net={receipt.net}
//             total={receipt.total}
//             vatCode={receipt.vat_code}
//             tax={receipt.tax}
//             status={receipt.status}
//             supplier={receipt.type_user}
//             onCheckedPaidHandler={onCheckedPaidHandler}
//             onCheckedApproveHandler={onCheckedApproveHandler}
//             onCheckedPublishMockFuncHandler={onCheckedPublishMockFuncHandler}
//             onCheckedItemHandler={onCheckedItemHandler}
//             dateFormat={dateFormat}
//           />
//         ))
//       ) : (
//         <Styled.EmptyContentWrapper>
//           No records found
//         </Styled.EmptyContentWrapper>
//       )}
//     </>
//   );
// });

import { FC, memo } from 'react';
import { format } from 'date-fns';

import { CheckboxItem } from 'components/Checkbox/Checkbox';
import { setIsSorted } from 'services/utils';
import { TableButton } from '../TableButton/TableButton';
import { TableInboxAdminItem } from './TableInboxAdminItem/TableInboxAdminItem';
import { TableInboxAdminStyles as Styled } from './TableInboxAdmin.style';
import { TABLE_COLUMN_NAMES } from './TableInboxAdmin.constants';

export const TableInboxAdmin: FC<TableInboxAdminProps> = memo((props) => {
  const {
    onCheckedItemHandler,
    onCheckedPublishMockFuncHandler,
    onCheckedPaidHandler,
    onCheckedApproveHandler,
    receiptList,
    dateFormat,
    sortField,
    sortOrder,
    requestSort,
  } = props;

  return (
    <>
      <Styled.Head>
        <Styled.Text>Icon</Styled.Text>
        <Styled.Text>Flag</Styled.Text>
        <Styled.Text>ID</Styled.Text>
        {TABLE_COLUMN_NAMES.map((item) => {
          const isSorted = setIsSorted(sortField, sortOrder, item.id);
          return (
            <Styled.Selector
              key={item.id}
              id={item.id}
              onClick={requestSort}
              isSorted={sortField === item.id}
              textAlignRight={['currency', 'net', 'tax', 'total', 'vat_code'].includes(item.id)}
            >
              <TableButton isSorted={isSorted}>{item.name}</TableButton>
            </Styled.Selector>
          );
        })}
      </Styled.Head>

      {receiptList?.length ? (
        receiptList?.map((receipt, index) => {
          // Format date using date-fns with a fallback in case receipt.created is missing or invalid
          const formattedDate = receipt.created
            ? format(new Date(receipt.created), dateFormat || 'MMM dd, yyyy')
            : '---';
          return (
            <TableInboxAdminItem
              key={receipt.id}
              selectedReceiptIndex={index}
              approveStatus={receipt.approved_status}
              publishStatus={receipt.publish_status}
              type={receipt.type}
              customId={receipt.custom_id}
              receiptId={receipt.id}
              photos={receipt.photos}
              currency={'120'} // Use default if not provided
              date={formattedDate}
              net={receipt.net}
              total={receipt.total}
              vatCode={receipt.vat_code}
              tax={receipt.tax}
              status={receipt.status}
              supplier={receipt.type_user}
              onCheckedPaidHandler={onCheckedPaidHandler}
              onCheckedApproveHandler={onCheckedApproveHandler}
              onCheckedPublishMockFuncHandler={onCheckedPublishMockFuncHandler}
              onCheckedItemHandler={onCheckedItemHandler}
              dateFormat={dateFormat}
              is_flagged={receipt.is_flagged}
            />
          );
        })
      ) : (
        <Styled.EmptyContentWrapper>No records found</Styled.EmptyContentWrapper>
      )}
    </>
  );
});
