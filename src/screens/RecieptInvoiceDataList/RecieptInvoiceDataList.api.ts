import Axios from 'axios';

import { apiServices } from 'services/api-service';

import { CONFIG } from 'constants/config';

export const updateReceiptItem = (payload: IUpdateReceiptItemPayload , headerStringData:any) => {
  const URL = `admin/uploads/${headerStringData.type}/${headerStringData.id}/${headerStringData.status}`;
  return apiServices.changeData(URL, payload);
};

export const updateInvoiceItem = (payload: IUpdateInvoiceItemPayload , headerStringData:any) => {
  const URL = `admin/uploads/${headerStringData.type}/${headerStringData.id}/${headerStringData.status}`;
  return apiServices.changeData(URL, payload);
};

export const getRecieptDiscriptionDetails = (payload: IGetRecieptDiscriptionDetailsPayload) => {
  const id = payload.id;
  const URL = `receipt/${id}`;
  return apiServices.fetchData(URL, payload);
};

export const getReceiptImage = (
  imageName: string,
  token: string,
  active_account?: string
) => {
  const URL = `${CONFIG.apiUrl}receipt/images/${imageName}`;
  return Axios.get(URL, {
    params: { active_account },
    headers: {
      'Content-Type': 'image/jpeg',
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob',
  });
};

type TDirection = 'category' | 'supplier' | 'payment-type' | 'expense-report';

export const getAllMasterItems = (
  urlDirection: TDirection,
  active_account?: string
) => {
  const URL = `${urlDirection}/get-all`;
  return apiServices.fetchData(URL, { active_account });
};
