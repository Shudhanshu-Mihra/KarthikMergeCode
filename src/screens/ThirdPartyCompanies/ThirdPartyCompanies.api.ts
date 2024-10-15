import Axios from 'axios';

import { apiServices } from 'services/api-service';
import { removeEmptyField } from 'services/utils';

import { ICreateThirdPartyCompany, IGetThirdPartyDataParams, IUpdateThirdPartyCompany} from './type/ThirdPartyCompanies.type';


export const getThirdPartyAllData = (params?: IGetThirdPartyDataParams) => {
  const URL = 'company/third-party-companies';
  params && removeEmptyField(params);
  return apiServices.fetchData(URL, params);
};

export const updateThirdPartyCompany = (payload: IUpdateThirdPartyCompany) => {
  const URL = `company/update/${payload.id}`;
  return apiServices.changeData(URL, payload);
};

export const createThirdPartyCompany = (payload: ICreateThirdPartyCompany) => {
  const URL = 'company/third-party-companies';
  return apiServices.postData(URL, payload);
};
export const getSelectedThirdPartyData = (id: string) => {
    const URL = `company/third-party-companies/${id}`;
    return apiServices.fetchData(URL);
  };

  export const getThirdPartyRefreshToken= (id: string) => {
    const URL = `company/third-party-companies/${id}/refresh-token`;
    return apiServices.fetchData(URL);
};
  
export const getThirdPartyRevoke= (id: string) => {
    const URL = `company/third-party-companies/${id}/revoke-token`;
    return apiServices.fetchData(URL);
};
  

