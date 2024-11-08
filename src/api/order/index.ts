import { defHttp } from '@/utils/http/axios';

enum Api {
  orderList = '/gm/orderList?',
  updateOrder = '/gm/updateOrder',
}

/**
 * @description: Get user menu based on id
 */

export const orderList = (params) => {
  return defHttp.get({ url: Api.orderList, params });
};

export const updateOrder = (params) => {
  return defHttp.post({ url: Api.updateOrder, params });
};
