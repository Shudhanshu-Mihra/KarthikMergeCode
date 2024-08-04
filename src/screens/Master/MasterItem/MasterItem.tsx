import { FC } from 'react';

import { TableMasterItem } from 'components/Table/TableMaster/TableMasterItem';

import { useMasterItemState } from './MasterItem.state';
import { idText } from 'typescript';

interface MasterItemProps {
  userRole: TRoles;
  categoryId: string;
  categoryName: string;
  createdDate: string;
  categoryCreator: string;
  dateFormat: string;
  onDeleteIconClickHandler: (itemId: string) => Promise<void>;
  onEditIconClickHandler: (itemId: string) => Promise<void>;
}

export const MasterItem: FC<MasterItemProps> = (props) => {
  const {
    categoryCreator,
    categoryId,
    categoryName,
    createdDate,
    dateFormat,
    userRole,
    onDeleteIconClickHandler,
    onEditIconClickHandler,
  } = props;

  const { onDeleteIconHandler, onEditIconHandler } = useMasterItemState({
    categoryId,
    onDeleteIconClickHandler,
    onEditIconClickHandler,
  });
  return (
    <TableMasterItem
      userRole={userRole}
      categoryName={categoryName}
      createdDate={createdDate}
      categoryCreator={categoryCreator}
      dateFormat={dateFormat}
      onDeleteIconHandler={onDeleteIconHandler}
      onEditIconHandler={onEditIconHandler}
      id={categoryId}
    />
  );
};
