import { ROUTES } from './routes';

// const SUPPLIERS = 'Suppliers';
// const SUPPLIER_ACCOUNTS = 'Supplier Accounts';
// const CATEGORIES = 'Categories';
// const CUSTOMERS = 'Customers';
// const CUSTOMER_ACCOUNTS = 'Customer Accounts';
// const PAYMENT_METHODS = 'Payment Methods';

// export const MASTER_TABS = [SUPPLIERS, SUPPLIER_ACCOUNTS, CATEGORIES, CUSTOMERS, CUSTOMER_ACCOUNTS,];

export const ADMIN_LINKS = [
  { title: 'DASHBOARD', route: ROUTES.home, iconName: 'dashboardIcon' },
  // { title: 'PURCHASES', route: ROUTES.purchaseInvoices, iconName: 'purchasesIcon' },
  // { title: 'SALES', route: ROUTES.salesInvoices, iconName: 'salesIcon' },
  // { title: 'EXPENSE REPORT', route: ROUTES.expenseReport, iconName: 'expReportIcon'},
  // { title: 'MANAGE', route: ROUTES.manage, tabs: MASTER_TABS, iconName: 'manageIcon' },
  { title: 'DATA', route: ROUTES.pendingriData, iconName: 'salesIcon' },
  {title:'USERS',route: ROUTES.usersList, iconName: 'invitesIcon'},
  {title:'COMPANIES', route:ROUTES.thirdPartyCompanies, iconName:'expReportIcon'}
  //  { title: 'USERS', route: ROUTES.settings, iconName: 'settingsIcon', isLast: true },
  // { title: 'HELP & SUPPORT', route: ROUTES.support, isLast: true },
];

export const CUSTOMER_LINKS = [
  { title: 'Dashboard', route: ROUTES.home },
  { title: 'Inbox', route: ROUTES.home },
];

// export const HELP_LINK = [
//   { title: '', route: ROUTES.support, iconName:'helpIcon' },
// ];

export const getAvatarLinks = (logout: () => void) => [
  { title: 'Profile', route: ROUTES.profile, iconName: 'profileIcon' },
  {
    title: 'Logout',
    route: ROUTES.login,
    iconName: 'logoutIcon',
    onClick: logout,
  },
];
export const SUPPORT_CENTER_ROUTE = 'https://support.google.com/';
//new
export const getAdminLinks = (userRole: string) => {
  if (userRole === 'support-admin') {
    return ADMIN_LINKS.filter(link => link.title !== 'USERS' && link.title !== 'COMPANIES');
  }
  else if(userRole !== 'superadmin'){
    return ADMIN_LINKS.filter(link => link.title !== 'COMPANIES');
  }
  return ADMIN_LINKS;
};
