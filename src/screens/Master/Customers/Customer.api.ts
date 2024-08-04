import { apiServices } from 'services/api-service';
import {   ICreateCustomer, IUpdateCustomer } from '../types/master.types';


type Direction = 'customers' | 'payment-type';

export const createTabCustomItem = (
  payload: ICreateCustomer,
  urlDirection: Direction
) => {
  const URL = `${urlDirection}/create`;
  return apiServices.postData(URL, payload);
};
export const updateTabCustomItem = (
  payload: IUpdateCustomer,
  urlDirection: Direction
) => {
  const URL = `${urlDirection}/update`;
  return apiServices.changeData(URL, payload);
};
export const getAllTabItems = (
  urlDirection: Direction,
  params?: ISearchParams
) => {
  const URL = `${urlDirection}/get-many`;
  return apiServices.fetchData(URL, params);
};

export const getTabItemById = (
  customerId: string,
  urlDirection: Direction,
  active_account?: string | null
) => {
  const URL = `${urlDirection}/get/${customerId}`;
  return apiServices.fetchData(URL, { active_account });
};
export const deleteTabItem = (
  customerId: string,
  urlDirection: Direction,
  active_account?: string | null
) => {
  const URL = `${urlDirection}/delete/${customerId}`;
  return apiServices.deleteData(URL, { active_account });
};
