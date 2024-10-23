import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActionMeta } from 'react-select';
import { useToggle } from 'hooks/useToggle';
import { format } from 'date-fns';
import { IState } from 'services/redux/reducer';
import {
  getLastMonthDateRange,
  getTodayDateRange,
  getYesterdayDateRange,
  getThisMonthDateRange,
  getThisYearDateRange,
  getLastYearDateRange,
  getThisWeekDateRange,
  getLastWeekDateRange,
} from 'services/utils';
import { useSelectFiles } from 'hooks/useSelectFiles';
import { DASHBOARD_INITIAL_STATE, getTimeFilterOptions } from './dashboard.constants';
import { setAndFormatDateToISO } from 'services/utils';
import { IAdminUserDropdown, ITimeFIlterValue, IUserInfoData } from './types';
import { ROUTES } from '../../constants/routes';
import { adminDashboard } from './dashboard.api'; 
import { getAllAdminUsers } from 'screens/Settings/settings.api';
export interface IuseDashboardState {
  isFetchingDashboard: boolean;
  dateFilterValue: {
    value: string;
    label: string;
  };
  isContentLoading: boolean;
  datePickerValue: Date | null;
  datePickerRangeValue: Date[] | null;
  formattedDate: string;
  isInputDate: boolean;
  isLoading: boolean;
  statusValue: {
    value: string;
    label: string;
  };
  userValue:{
    value: string;
    label: string;
  };
}
export const useDashboardState = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const getCompanyLogo = useGetCompanyLogo();
  const {
    dashboard: { metric, receipts, companies },
    user: {
      user:{role,
        id},
        user
    },
  } = useSelector((state: IState) => state);
  useEffect(() => {
      dashboardDataHandler('', '', id);
  }, []);
  const date_format = 'MMM-dd-yyyy';
  const [state, setState] = useState<IuseDashboardState>(DASHBOARD_INITIAL_STATE);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userIdFinal, setUserId] = useState('');

  useEffect(() => {
    setStartDate('');
    setEndDate('');
    setUserId('');
  }, []);

  const timeFilterOptions = getTimeFilterOptions();

  interface Task {
    source: string;
    status: string;
    count: string;
  }
  const initialMetrics = {
    sales: { inflow: 0, outflow: 0 },
    receipt: { inflow: 0, outflow: 0 },
  };
  const [dashboardMetrics, setDashboardMetrics] = useState(initialMetrics);

  const dashboardDataHandler = async (dateStart: string, dateEnd: string,support_Id?: string) => {
    try {
      const params: { date_start: string; date_end: string; support_member_id?: string } = {
        date_start: dateStart,
        date_end: dateEnd,
        support_member_id: support_Id
        
      };
      if (role === 'support-admin') {
        params.support_member_id = id;
      }
      const response = await adminDashboard(params);
      const tasks = response.data?.tasks || [];
      const dashboardMetrics = {
        sales: {
          inflow: 0,
          outflow: 0,
        },
        receipt: {
          inflow: 0,
          outflow: 0,
        },
      };
      tasks.forEach((task: Task) => {
        const count = Number(task.count) || 0; 
        if (task.source === 'sale-invoice') {
          if (task.status === 'pending') {
            dashboardMetrics.sales.inflow += count; 
          
          }else if(task.status === 'completed'){
            dashboardMetrics.sales.outflow += count;
          }
        } else if (task.source === 'receipt') {
          if (task.status === 'pending') {
            dashboardMetrics.receipt.inflow += count;
            
          }else if(task.status === 'completed'){
            dashboardMetrics.sales.outflow += count;
          }
        }
      });
      setDashboardMetrics(dashboardMetrics);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const totalReceiptCount =
    Number(metric?.accepted) +
    Number(metric?.rejected) +
    Number(metric?.processing) +
    Number(metric?.review);
  const [isLoading, setIsLoading] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  useEffect(() => {
    if (role === 'support-admin') {
      dashboardDataHandler('', '', id);
      console.log("use Effect was called");
    }
    else{
      dashboardDataHandler('', '', '');
    }
  }, []);
  const onChangeStatusValueHandler = async (
    newValue: any,
    actionMeta: ActionMeta<unknown>
  ) => {
    setState((prevState) => ({
      ...prevState,
      statusValue: {
        value: newValue.value,
        label: `Status - ${newValue.label}`,
      },
    }));
  };
  // const onChangeUserValueHandler = async (
  //   newValue: any,
  //   actionMeta: ActionMeta<unknown>
  // ) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     userValue: {
  //       value: newValue.value === 'All' || 'all' ? '' : newValue.value,
  //       label: `User - ${newValue.label}`,
  //     },
  //   }));
  //     const userId = newValue.value; 
  //     setUserId(userId);
  //   await dashboardDataHandler(startDate, endDate, userId);
  // };

  const onChangeUserValueHandler = async (
    newValue: any,
    actionMeta: ActionMeta<unknown>
) => {
    const selectedUserValue = newValue.value;
    setState((prevState) => ({
        ...prevState,
        userValue: {
            value: selectedUserValue === 'All' || selectedUserValue === 'all' ? '' : selectedUserValue,
            label: `User - ${newValue.label}`,
        },
    }));

    const userId = selectedUserValue === 'All' || selectedUserValue === 'all' ? '' : selectedUserValue;
    setUserId(userId);

    // Call dashboardDataHandler without userId if the value is 'All'
    await dashboardDataHandler(startDate, endDate, userId);
};

  const onSelectFiles = useSelectFiles();
  const navigateToInvites = () => navigate(ROUTES.invites, { replace: true });
  const onSelectFilesHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    onSelectFiles({
      files: event.target.files,
      location,
      route: 'inbox/files-upload-preview',
    });

  const dateHashMapping: Record<
    string,
    { date_start: string; date_end: string }
  > = {
    Today: getTodayDateRange(),
    Yesterday: getYesterdayDateRange(),
    'Last Week': getLastWeekDateRange(),
    'This Week':getThisWeekDateRange(),
    'This Month':getThisMonthDateRange(),
    'Last Month': getLastMonthDateRange(),
    'This Year':getThisYearDateRange(),
    'Last Year':getLastYearDateRange()
  };

  const onChangeCategoryFieldHandler = (
    newValue: any,
    actionMeta: ActionMeta<unknown>
  ) => {
    // getReceiptsStatisticHandler(dateHashMapping[newValue.value], true);
  };

  const datePickerRef = useRef<HTMLButtonElement>(null);

  const [isDatePickerOpen, setIsDatePickerOpen] = useToggle();

  const onClickOutsideDatePickerHandler = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    datePickerRef.current &&
      !datePickerRef?.current.contains(event.target as Node) &&
      setIsDatePickerOpen();
  };
  const formatDateToYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const[allAdminusers, setAllAdminUsers] = useState<IAdminUserDropdown[]>([]);
  const saveAllAdminUsers = async () => {
    const params = {
      take: 50, 
      skip: 0,    
    };
    try {
      const response = await getAllAdminUsers(params); 
      console.log("response.data", response.data);
      setAllAdminUsers(response.data.data); 
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeDate = async (date: Date) => {
    if (Array.isArray(date)) {
      const isEqual = Array.isArray(state.datePickerRangeValue) 
        ? state.datePickerRangeValue[0]?.toISOString() === date[0].toISOString() 
        && state.datePickerRangeValue[1]?.toISOString() === date[1].toISOString() 
        : null;
  
      setState((prevState) => ({
        ...prevState,
        dateRangeValue: isEqual ? null : date,
        formattedDate: isEqual ? '' : `${format(date[0], date_format)} - ${format(date[1], date_format)}`,
      }));
  
      setIsDatePickerOpen();
      const dateStart = formatDateToYYYYMMDD(date[0]);
      const dateEnd = formatDateToYYYYMMDD(date[1]);
      setEndDate(dateEnd);
      setStartDate(dateStart);
      await dashboardDataHandler(dateStart, dateEnd, userIdFinal);
    } else {
      const isEqual = state.datePickerValue?.toISOString() === date.toISOString();
      setState((prevState) => ({
        ...prevState,
        dateValue: isEqual ? null : date,
        formattedDate: isEqual ? '' : format(date, date_format),
      }));
  
      setIsDatePickerOpen();
      const dateStart = formatDateToYYYYMMDD(date);
      const dateEnd = formatDateToYYYYMMDD(date);
      setEndDate(dateEnd);
      setStartDate(dateStart);
      await dashboardDataHandler(dateStart, dateEnd, userIdFinal);
    }
  };
  
  const statusFilterOptions = [
    { value: 'all', label: `All` },
    { value: 'processing', label: `Processing` },
    { value: 'accepted', label: `Accepted` },
    { value: 'review', label: `Review` },
    { value: 'rejected', label: `Rejected` },
  ];
  const onChangeDateFilterValueHandler = async (
    newValue: any,
    actionMeta?: ActionMeta<unknown>
  ) => {
    let dateRange;
    if (newValue?.value !== 'range' && newValue?.value !== 'customdate') {
      switch (newValue.value) {
        case 'today':
          dateRange = getTodayDateRange();
          break;
        case 'yesterday':
          dateRange = getYesterdayDateRange();
          break;
        case 'thisweek':
          dateRange = getThisWeekDateRange();
          break;
        case 'lastweek':
          dateRange = getLastWeekDateRange();
          break;
        case 'thismonth':
          dateRange = getThisMonthDateRange();
          break;
        case 'lastmonth':
          dateRange = getLastMonthDateRange();
          break;
        case 'thisyear':
          dateRange = getThisYearDateRange();
          break;
        case 'lastyear':
          dateRange = getLastYearDateRange();
          break;
        default:
          dateRange = { date_start: '', date_end: '' };
      }
      const formattedDateStart = dateRange?.date_start
        ? formatDateToYYYYMMDD(new Date(dateRange.date_start))
        : '';
      const formattedDateEnd = dateRange?.date_end
        ? formatDateToYYYYMMDD(new Date(dateRange.date_end))
        : '';

        setStartDate(formattedDateStart);
        setEndDate(formattedDateEnd);
        await dashboardDataHandler(formattedDateStart, formattedDateEnd, userIdFinal);
      setState((prevState) => ({
        ...prevState,
        dateFilterValue: {
          value: newValue.value,
          label: `Date - ${newValue.label}`,
        },
        statusValue: {
          value: 'all',
          label: `Status - All`,
        },
        formattedDate: `${formattedDateStart} - ${formattedDateEnd}`,
        isInputDate: false,
      }));
     
    } else if (newValue.value === 'range') {
      setState((prevState) => ({
        ...prevState,
        dateFilterValue: {
          value: newValue.value,
          label: `Date - ${newValue.label}`,
        },
        formattedDate: '',
        isInputDate: true,
      }));
    } else if (newValue.value === 'customdate') {
      setState((prevState) => ({
        ...prevState,
        dateFilterValue: {
          value: newValue.value,
          label: `Date - ${newValue.label}`,
        },
        formattedDate: '',
        isInputDate: false,
      }));
    }
  };
  return {
    ...state,
    navigateToInvites,
    onSelectFilesHandler,
    // getReceiptsStatisticHandler,
    onChangeCategoryFieldHandler,
    isLoading,
    isContentLoading,
    companies,
    totalReceiptCount,
    timeFilterOptions,
    receipts,
    // company,
    user,
    datePickerRef,
    isDatePickerOpen,
    // formattedDate,
    // isInputDate,
    onChangeDate,
    setIsDatePickerOpen,
    onChangeDateFilterValueHandler,
    onClickOutsideDatePickerHandler,
    statusFilterOptions,
    onChangeStatusValueHandler,
    onChangeUserValueHandler,
    dashboardDataHandler,
    dashboardMetrics,
    allAdminusers,
    saveAllAdminUsers 
  };
};
