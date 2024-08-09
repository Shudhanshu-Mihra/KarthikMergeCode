import { FC, useEffect } from 'react';
import { DashboardStyles as Styled } from './Dashboard.style';
import { useDashboardState } from './Dashboard.state';
import {Purchases} from './newAttributes/Purchases';
import {Sales} from './newAttributes/Sales';
import {UpdatesTimeLine} from './attributes/UpdatesTimeLine';
import { ReUseDatePicker } from 'ReUseComponents/reUseDatePicker/ReuseDatePicker';

export const Dashboard: FC = () => {
  const {
    // getReceiptsStatisticHandler,
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
  } = useDashboardState();

  useEffect(() => {
    if (!user.active) {
      navigateToInvites();
      return;
    }
    // getReceiptsStatisticHandler();
  }, [user.active]);

  return (
    <Styled.Wrapper>
      <Styled.TopSection>
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
      <Styled.MainWrapper>
        <Styled.PurchaseSummaryWrapper>
          <Purchases />
        </Styled.PurchaseSummaryWrapper>
        <Styled.SalesWrapper>
          <Sales />
        </Styled.SalesWrapper>
        <Styled.UpdatesTimeLineWrapper>
          <UpdatesTimeLine />
        </Styled.UpdatesTimeLineWrapper>
      </Styled.MainWrapper>
    </Styled.Wrapper>
  );
};
