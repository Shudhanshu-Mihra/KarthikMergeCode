import { apiServices } from 'services/api-service';
import {  ICreateSupplierAcc, IUpdateSupplierAcc } from '../types/master.types';


type Direction = 'supplier' | 'payment-type';

export const createTabAccItem = (
  payload: ICreateSupplierAcc,
  urlDirection: Direction
) => {
  const URL = `${urlDirection}/create`;
  return apiServices.postData(URL, payload);
};
export const updateTabAccItem = (
  payload: IUpdateSupplierAcc,
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
  supplierId: string,
  urlDirection: Direction,
  active_account?: string | null
) => {
  const URL = `${urlDirection}/get/${supplierId}`;
  return apiServices.fetchData(URL, { active_account });
};
export const deleteTabItem = (
  supplierId: string,
  urlDirection: Direction,
  active_account?: string | null
) => {
  const URL = `${urlDirection}/delete/${supplierId}`;
  return apiServices.deleteData(URL, { active_account });
};
