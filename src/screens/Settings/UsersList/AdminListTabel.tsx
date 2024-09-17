import { FC } from 'react';
import { styled } from 'styles/theme';
import { TableButton } from 'components/TableButton/TableButton';
import { Icon } from 'components/Icons/Icons';
import { useUserListState } from './UserList.state';
import { id } from 'date-fns/locale';
import { deleteAdminUser } from '../settings.api';
// Define the column names
const TABLE_COLUMN_NAMES = [
  { id: 'id', name: 'ID' },
  { id: 'name', name: 'Name' },
  { id: 'email', name: 'Email' },
  { id: 'role', name: 'Role' },
  { id: 'active', name: 'Active Status' },
  { id: 'actions', name: 'Actions' }
];

// Styles for the table
// const Styled = {
//   Head: styled.div`
//     display: grid;
//    grid-template-columns: repeat(6, minmax(100px, 150px));
//     border-top: solid 1px ${({ theme }) => theme.colors.borderWhite};
//     border-bottom: solid 1px ${({ theme }) => theme.colors.lightBlack};
//     height: 49px;
//     width: 100%;
//     padding-left: 19px;
//     padding-right: 9px;
//   `,
//   Row: styled.div`
//     display: grid;
//     grid-template-columns: repeat(6, minmax(100px, 150px));
//     padding: 10px;
//     border-bottom: solid 1px ${({ theme }) => theme.colors.borderWhite};
//   `,
//   Text: styled.div<{ alignRight?: boolean }>`
//     color: ${({ theme }) => theme.colors.lightBlack};
//     font-size: ${({ theme }) => theme.size.default};
//     text-align: ${({ alignRight }) => (alignRight ? 'right' : 'left')};
//   `,
//   EmptyContentWrapper: styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     min-height: 50px;
//     background-color: ${({ theme }) => theme.colors.white};
//     color: ${({ theme }) => theme.colors.lightBlack};
//     border-bottom: solid 1px ${({ theme }) => theme.colors.borderWhite};
//   `,
//   ActionWrapper: styled.div`
//   display: flex;
  
// `,
// ActionButton: styled.button`
//   background: transparent;
//   border: none;
//   cursor: pointer;
//   &:disabled {
//     cursor: not-allowed;
//     opacity: 0.5;
//   }
// `,
// };
const Styled = {
  Container: styled.div`
    width: 100%;
    overflow-x: auto;
  `,
  Head: styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1.5fr 2fr 1fr 1fr 1fr;
    border-top: solid 1px ${({ theme }) => theme.colors.borderWhite};
    border-bottom: solid 1px ${({ theme }) => theme.colors.lightBlack};
    height: 49px;
    width: 100%;
    padding-left: 19px;
    padding-right: 9px;
  `,
  Row: styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1.5fr 2fr 1fr 1fr 1fr;
    padding: 10px;
    border-bottom: solid 1px ${({ theme }) => theme.colors.borderWhite};
  `,
  Text: styled.div<{ alignRight?: boolean }>`
    color: ${({ theme }) => theme.colors.lightBlack};
    font-size: ${({ theme }) => theme.size.default};
    text-align: ${({ alignRight }) => (alignRight ? 'right' : 'left')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  EmptyContentWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.lightBlack};
    border-bottom: solid 1px ${({ theme }) => theme.colors.borderWhite};
  `,
  ActionWrapper: styled.div`
    display: flex;
  `,
  ActionButton: styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `,
};
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

interface UsersTableProps {
  users: User[];
  requestSort: (columnId: string) => void;
  sortField: string;
  sortOrder: string;
}

export const AdminListTabel: FC<UsersTableProps> = ({ users, requestSort, sortField, sortOrder }) => {

  const {
    onEditIconClickHandler,
    onClickDeleteUserButton,
  } = useUserListState();
  return (
    <>
      <Styled.Head>
        {TABLE_COLUMN_NAMES.map((item) => {
          const isSorted = sortField === item.id && sortOrder !== '';
          return (
            <Styled.Text key={item.id}>
              <TableButton isSorted={isSorted} onClick={() => requestSort(item.id)}>
                {item.name}
              </TableButton>
            </Styled.Text>
          );
        })}
      </Styled.Head>

      {users.length  ? (
        users.map((user, index) => (
          <Styled.Row key={user.id}>
            <Styled.Text>{index + 1}</Styled.Text>
            <Styled.Text>{user.name}</Styled.Text>
            <Styled.Text>{user.email}</Styled.Text>
            <Styled.Text>{user.role}</Styled.Text>
            <Styled.Text>{user.active ? 'Active' : 'Inactive'}</Styled.Text>
            <Styled.ActionWrapper>
            <Styled.ActionButton onClick={() => onEditIconClickHandler(user.id)}>
                <Icon type="edit" />
              </Styled.ActionButton>
              <Styled.ActionButton onClick={() => deleteAdminUser(user.id)}>
                <Icon type="remove" />
              </Styled.ActionButton>
            </Styled.ActionWrapper>
             
          </Styled.Row>
        ))
      ) : (
        <Styled.EmptyContentWrapper>No users found</Styled.EmptyContentWrapper>
      )}
    </>
  );
};
