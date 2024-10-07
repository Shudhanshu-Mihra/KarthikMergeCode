import { FC, useEffect, useState } from 'react';
import { DashboardStyles as Styled } from './Dashboard.style';
import { useDashboardState } from './Dashboard.state';
import { ReUseDatePicker } from 'ReUseComponents/reUseDatePicker/ReuseDatePicker';
import { ReUseStatusFilter } from 'ReUseComponents/reUseStatusFilter/ReUseStatusFilter';
import { CustomSelect } from 'components/CustomSelect';
import { Icon } from 'components/Icons';
import { colors } from 'react-select/dist/declarations/src/theme';
import { theme } from 'styles/theme';
import { getAdminLinks } from 'constants/header-links';
import { useMyAccountState } from 'screens/Settings/MyAccount/MyAccount.state';
import ProgressImage from '../../assets/temp-image/progress.png';
import { useUserListState } from 'screens/Settings/UsersList/UserList.state';
import { getAllAdminUsers } from 'screens/Settings/settings.api';
export const Dashboard: FC = () => {
  const {
    navigateToInvites,
    user,
    datePickerRef,
    dateFilterValue,
    isDatePickerOpen,
    datePickerValue,
    formattedDate,
    isInputDate,
    onChangeDate,
    setIsDatePickerOpen,
    onChangeDateFilterValueHandler,
    onClickOutsideDatePickerHandler,
    onChangeStatusValueHandler,
    statusValue,
    dashboardDataHandler,
    onChangeUserValueHandler,
    userValue,
    dashboardMetrics,
    allAdminusers,
  saveAllAdminUsers
 
  } = useDashboardState();
// const{
//   allAdminusers,
//   saveAllAdminUsers
// } = useUserListState();

useEffect(()=>{
  saveAllAdminUsers();
 },[])
  // getAdminLinks(role);
  const [selectedUser, setSelectedUser] = useState<string>('Users');
  const [selectedStatus, setSelectedStatus] = useState<string>('Status');

  // const { onChangeStatusValueHandler, statusValue } = useDashboardState();
  // useEffect(() => {
  //   if (!user.active) {
  //     navigateToInvites();
  //     return;
  //   }
  // }, [user.active]);
  const {
		role
	} = useMyAccountState();

  const userFilterOptions: IOption[] = [
    { value: 'all', label: `All` }, 
    ...allAdminusers.map((user) => ({
      value: user.id,
      label: user.name,
    })),
  ];
  return (
    <Styled.LayoutWrapper>
      
        <Styled.MainWrapper>
          <Styled.TopSection>
          {role !== 'support-admin'&& (
            <Styled.Dropdown>
              <CustomSelect
                onChangeValueHandler={onChangeUserValueHandler}
                options={userFilterOptions}
                value={userValue}
                paginate
              />
            </Styled.Dropdown>
          )}
            {/* <Styled.Dropdown>
            <ReUseStatusFilter onChangeStatusValueHandler={onChangeStatusValueHandler} statusValue={statusValue} />
            </Styled.Dropdown> */}
            <Styled.DateDropdown>
              <ReUseDatePicker
                datePickerRef={datePickerRef}
                dateFilterValue={dateFilterValue}
                isDatePickerOpen={isDatePickerOpen}
                dateValue={datePickerValue}
                formattedDate={formattedDate}
                isInputDate={isInputDate}
                onChangeDate={onChangeDate}
                setIsDatePickerOpen={setIsDatePickerOpen}
                onChangeDateFilterValueHandler={onChangeDateFilterValueHandler}
                onClickOutsideDatePickerHandler={onClickOutsideDatePickerHandler}
              />
            </Styled.DateDropdown>
          </Styled.TopSection>

          <Styled.PurchasesContainer>
            <Styled.PurchasesTitle>Purchases</Styled.PurchasesTitle>
            <Styled.PurchasesMetrics>
              <Styled.Metric>
              <Styled.IconWithText statusColor="green">
                <Icon type='Inflow' width={30}/>
                <h3>Inflow</h3>
              </Styled.IconWithText>
              <Styled.DataNumber>
                {dashboardMetrics.receipt.inflow}
                </Styled.DataNumber>
              </Styled.Metric>
              <Styled.Metric>
              <Styled.IconWithText statusColor="red">
              <Icon type='Outflow' width={30} />
                <h3>Outflow</h3>
              </Styled.IconWithText>
              <Styled.DataNumber>{dashboardMetrics.receipt.outflow}</Styled.DataNumber>
                
              </Styled.Metric>
            </Styled.PurchasesMetrics>
          </Styled.PurchasesContainer>
          <Styled.SalesWrapper>
          <Styled.PurchasesContainer>
            <Styled.PurchasesTitle>Sales</Styled.PurchasesTitle>
            <Styled.PurchasesMetrics>
            <Styled.Metric>
              <Styled.IconWithText statusColor="green">
              <Icon type='Inflow' width={30}/>
                <h3>Inflow</h3>
              </Styled.IconWithText>
              <Styled.DataNumber>
                {dashboardMetrics.sales.inflow}
                </Styled.DataNumber>
              </Styled.Metric>
              <Styled.Metric>
              <Styled.IconWithText statusColor="red">
              <Icon type='Outflow' width={30}/>
                <h3>Outflow</h3>
              </Styled.IconWithText>
              <Styled.DataNumber>{dashboardMetrics.sales.outflow}</Styled.DataNumber>
              </Styled.Metric>
            </Styled.PurchasesMetrics>
          </Styled.PurchasesContainer>
          </Styled.SalesWrapper>
        </Styled.MainWrapper>
    </Styled.LayoutWrapper>
  );
};
