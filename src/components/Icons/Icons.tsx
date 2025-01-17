import { FunctionComponent, SVGProps } from 'react';

import { ReactComponent as showPassword } from 'assets/icons/show-password.svg';
import { ReactComponent as capiumLogo } from 'assets/icons/capium-icon.svg';
import { ReactComponent as arrowDown } from 'assets/icons/arrow-down.svg';
import { ReactComponent as arrowRight } from 'assets/icons/arrow-right.svg';
import { ReactComponent as arrowLeft } from 'assets/icons/arrow-left.svg';
import { ReactComponent as checkmark } from 'assets/icons/checkmark.svg';
import { ReactComponent as searchIcon } from 'assets/icons/search-icon.svg';
import { ReactComponent as calendar } from 'assets/icons/calendar.svg';
import { ReactComponent as warning } from 'assets/icons/warning.svg';
import { ReactComponent as closeWindow } from 'assets/icons/close-window-icon.svg';
import { ReactComponent as avatar } from 'assets/icons/avatar.svg';
import { ReactComponent as notification } from 'assets/icons/bell.svg';
import { ReactComponent as checkbox } from 'assets/icons/checkbox.svg';
import { ReactComponent as helpIcon } from 'assets/icons/help.svg';
import { ReactComponent as infoIcon } from 'assets/icons/info-icon.svg';
import { ReactComponent as accountIcon } from 'assets/icons/account-icon.svg';
import { ReactComponent as edit } from 'assets/icons/edit.svg';
import { ReactComponent as hidePassword } from 'assets/icons/hide-password.svg';
import { ReactComponent as remove } from 'assets/icons/remove.svg';
import { ReactComponent as removeCross } from 'assets/icons/remove-cross.svg';
import { ReactComponent as accepted } from 'assets/icons/approved.svg';
import { ReactComponent as awaitingApproval } from 'assets/icons/awaiting-approval.svg';
import { ReactComponent as completed } from 'assets/icons/completed.svg';
import { ReactComponent as rejected } from 'assets/icons/decline.svg';
import { ReactComponent as metric } from 'assets/icons/metric.svg';
import { ReactComponent as processing } from 'assets/icons/processing.svg';
import { ReactComponent as review } from 'assets/icons/review.svg';
import { ReactComponent as shadowedMetric } from 'assets/icons/shadowed-metric.svg';
import { ReactComponent as settingsAvatar } from 'assets/icons/settings-avatar.svg';
import { ReactComponent as deletePhotoIcon } from 'assets/icons/delete-photo-icon.svg';
import { ReactComponent as threeDots } from 'assets/icons/three-dots.svg';
import { ReactComponent as receiptHubLogo } from 'assets/icons/receiptHub-logo.svg';
import { ReactComponent as active } from 'assets/icons/active.svg';
import { ReactComponent as insertLogo } from 'assets/icons/insert-logo.svg';
import { ReactComponent as cloudUpload } from 'assets/icons/cloud-upload.svg';
import { ReactComponent as dropDownArrow } from 'assets/icons/dropdown-arrow.svg';
import { ReactComponent as tableArrow } from 'assets/icons/table-arrow.svg';
import { ReactComponent as smallSearchIcon } from 'assets/icons/small-search-icon.svg';
import { ReactComponent as profileIcon } from 'assets/icons/profile-icon.svg';
import { ReactComponent as logoutIcon } from 'assets/icons/logout-icon.svg';
import { ReactComponent as googleIcon } from 'assets/icons/google-icon.svg';
import { ReactComponent as approvedMark } from 'assets/icons/approved-mark.svg';
import { ReactComponent as loderIcon } from 'assets/icons/loderIcon.svg';
import { ReactComponent as addSign } from 'assets/icons/add-sign.svg';
import { ReactComponent as downloadIcon } from 'assets/icons/Download.svg';
import { ReactComponent as RotateIcon } from 'assets/icons/Rotate.svg';
import { ReactComponent as ZoomInIcon } from 'assets/icons/ZoomIn.svg';
import { ReactComponent as ZoomOutIcon } from 'assets/icons/ZoomOut.svg';


import { string } from 'yup/lib/locale';

import { ReactComponent as dashboardIcon } from 'assets/icons/header-dashboard.svg';
import { ReactComponent as purchasesIcon } from 'assets/icons/header-purchases.svg';
import { ReactComponent as salesIcon } from 'assets/icons/header-sales.svg';
import { ReactComponent as expReportIcon } from 'assets/icons/header-expReport.svg';
import { ReactComponent as manageIcon } from 'assets/icons/header-manage.svg';
import { ReactComponent as invitesIcon } from 'assets/icons/header-invites.svg';
import { ReactComponent as settingsIcon } from 'assets/icons/header-settings.svg';
import { ReactComponent as addPlus } from 'assets/icons/addPlus.svg';
import { ReactComponent as locationIcon } from 'assets/icons/location-icon.svg';
import { ReactComponent as deleteAccount } from 'assets/icons/delete.svg';
import { ReactComponent as sideBarUSer } from 'assets/icons/SideBarUsers.svg';
import { ReactComponent as termAndService } from 'assets/icons/termOfService.svg';
import { ReactComponent as privecy } from 'assets/icons/privecy.svg';
import { ReactComponent as resetIcon } from 'assets/icons/reset.svg';
import { ReactComponent as Inflow } from '../../assets/icons/green-inflow.svg';
import { ReactComponent as Outflow } from 'assets/icons/outflow-red.svg';
import { ReactComponent as Reassign } from 'assets/icons/re-assign.svg';
import { ReactComponent as Delete } from 'assets/icons/delete.svg';
import { ReactComponent as View } from 'assets/icons/view-eye.svg';
import { ReactComponent as Copy } from 'assets/icons/copy.svg';
import { ReactComponent as Revoke } from 'assets/icons/revoke.svg';
import { ReactComponent as Image } from 'assets/icons/image.svg';
import { ReactComponent as FlagIcon } from 'assets/icons/Flag.svg';
import { useToggle } from 'hooks/useToggle';
import { ReactComponent as ActiveUser } from 'assets/icons/active-user.svg';
import { ReactComponent as InActiveUsers } from 'assets/icons/inactive-user.svg';
const ICONS: Record<string, FunctionComponent<SVGProps<SVGSVGElement>>> = {
  profileIcon,
  googleIcon,
  logoutIcon,
  dashboardIcon,
  purchasesIcon,
  invitesIcon,
  salesIcon,
  addSign,
  expReportIcon,
  manageIcon,
  settingsIcon,
  smallSearchIcon,
  tableArrow,
  dropDownArrow,
  cloudUpload,
  insertLogo,
  receiptHubLogo,
  deletePhotoIcon,
  settingsAvatar,
  accountIcon,
  hidePassword,
  infoIcon,
  helpIcon,
  showPassword,
  capiumLogo,
  arrowDown,
  arrowRight,
  arrowLeft,
  checkmark,
  searchIcon,
  calendar,
  warning,
  closeWindow,
  avatar,
  notification,
  checkbox,
  edit,
  remove,
  removeCross,
  accepted,
  awaitingApproval,
  completed,
  rejected,
  metric,
  approvedMark,
  processing,
  review,
  shadowedMetric,
  threeDots,
  active,
  addPlus,
  deleteAccount,
  sideBarUSer,
  locationIcon,
  termAndService,
  privecy,
  resetIcon,
  loderIcon,
  Inflow,
  Outflow,
  Reassign,
  Delete,
  View,
  Copy,
  Revoke,
  Image,
  downloadIcon,
  RotateIcon,
  ZoomOutIcon,
  ZoomInIcon,
  FlagIcon,
  ActiveUser,
  InActiveUsers
};

export const Icon = (props: {
  className?: string;
  fill?: string;
  width?: number | string;
  height?: number | string;
  maxWidth?: number;
  maxHeight?: number;
  borderRadius?: number | string;
  backgroundColor?: string;
  key?: string;
  id?: string;
  type: string;
  stroke?: string;
  // const onModalWindowToggleHandler = () => {
  //   // onGetCompaniesHandler();
  //   onModalWindowToggle();
  // };
}) => {
  const NewIcon = ICONS[props.type];
  if (!NewIcon) {
    return null;
  }


  return (
    <NewIcon
      id={props.id}
      style={{
        borderRadius: props.borderRadius,
        fill: props.fill,
        width: props.width,
        stroke:props.stroke,
        height: props.height,
        maxWidth: props.maxWidth,
        maxHeight: props.maxHeight,
        backgroundColor: props.backgroundColor
      }}
      className={props.className}
    />
  );
};
