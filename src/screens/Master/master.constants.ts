export const ModalWIndowConstants = {
  addCategory: 'Insert Category',
  editCategory: 'Edit Category',
  addCustomer: 'Insert Customer',
  editCustomer: 'Edit Customer'
};

export const TAB_INITIAL_STATE = {
  isEdit: false,
  searchValue: '',
  modalInputValue: '',
  modalInputDate:'',
  modalInputPaymentRefName: '',
  prevInputValue: '',
  isLoading: false,
  isEmptyData: false,
  isFetchingData: true,
  isFocus: false,
  isHeaderPanel: false,
  isSearching: false,
  searchedItems: [],
  isContentLoading: false,
  selected: 0,
};

export const mockedItem = {
  id: '1',
  created: '10.20.22',
  name: 'type',
  creator: {
    id: 'abc1',
    name: 'User',
    role: 'Owner',
  },
};
