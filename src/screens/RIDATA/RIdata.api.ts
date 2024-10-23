import Axios from 'axios';

import { apiServices } from 'services/api-service';
import { removeEmptyField } from 'services/utils';

import { IFlagPayload, IGetReceiptsInvoiceParams, IImageView, IPostEmail  } from './types/RIdata.type';


export const getReceipts = (params?: IGetReceiptsInvoiceParams) => {
  const URL = '/admin/uploads';

  params && removeEmptyField(params);
  return apiServices.fetchData(URL, params);
};

export const getImageUrlFromAws = (ImageKey:IImageView) => {
  const URL = '/aws/presiged';
  return apiServices.postData(URL, ImageKey);
};

export const sendFlagData = (payload:IFlagPayload) => {
  const URL = `common/flag-update/${payload.entity}/${payload.id}`;
  return apiServices.updateData(URL,payload);
};
