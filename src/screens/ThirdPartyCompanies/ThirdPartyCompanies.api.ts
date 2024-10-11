import Axios from 'axios';

import { apiServices } from 'services/api-service';
import { removeEmptyField } from 'services/utils';

import { IGetThirdPartyDataParams} from './types/ThirdPartyCompanies.type';


export const getThirdPartyAllData = (params?: IGetThirdPartyDataParams) => {
  const URL = 'company/third-party-companies';
  params && removeEmptyField(params);
  return apiServices.fetchData(URL, params);
};

// export const getImageUrlFromAws = (ImageKey:IImageView) => {
//   const URL = '/aws/presiged';
//   return apiServices.postData(URL, ImageKey);
// };
