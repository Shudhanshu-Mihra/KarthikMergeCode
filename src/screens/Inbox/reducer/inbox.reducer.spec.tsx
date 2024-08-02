import { mockedReceipts } from '../inbox.constants';
import {
  inboxReducer,
  INBOX_INITIAL_STATE,
  selectReceipt,
  setIsFetchingDate,
  setReceipts,
  updateReceipt,
} from './inbox.reducer';

const state = { ...INBOX_INITIAL_STATE, receipts: mockedReceipts };

describe('Ibox reducer', () => {
  it('setIsFetchingDate works well', () => {
    expect(inboxReducer(INBOX_INITIAL_STATE, setIsFetchingDate(true))).toEqual({
      ...INBOX_INITIAL_STATE,
      isFetchingData: true,
    });
  });

  it('selectReceipt works well', () => {
    expect(inboxReducer(state, selectReceipt(0))).toEqual({
      ...state,
      selectedReceiptIndex: 0,
      selectedReceipt: mockedReceipts[0],
    });
  });

  it('updateReceipt works well', () => {
    expect(
      inboxReducer(state, updateReceipt({ ...mockedReceipts[0], tax: 10 }))
    ).toEqual({
      ...state,
      receipts: [{ ...state.receipts[0], tax: 10 }],
    });
  });

  it('setReceipts works well', () => {
    expect(
      inboxReducer(
        state,
        setReceipts({
          totalCount: mockedReceipts.length,
          count: mockedReceipts.length,
          data: mockedReceipts,
        })
      )
    ).toEqual({
      ...state,
      count: mockedReceipts.length,
      receipts: mockedReceipts,
    });
  });
});
