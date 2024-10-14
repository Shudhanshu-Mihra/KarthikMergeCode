import Axios from 'axios';

import { apiServices } from 'services/api-service';
import { removeEmptyField } from 'services/utils';

import { IGetThirdPartyDataParams} from './type/ThirdPartyCompanies.type';


export const getThirdPartyAllData = (params?: IGetThirdPartyDataParams) => {
  const URL = 'company/third-party-companies';
  params && removeEmptyField(params);
  return apiServices.fetchData(URL, params);
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
  

