import { defHttp } from '@/utils/http/axios';

enum Api {
  orderList = '/gm/orderList?',
  updateOrder = '/gm/updateOrder',
  orderCount = '/gm/orderCount',
}

/**
 * @description: Get user menu based on id
 */

export const orderList = (params) => {
  return defHttp.get({ url: Api.orderList, params }, { isReturnNativeResponse: true });
};

export const updateOrder = (params) => {
  return defHttp.post({ url: Api.updateOrder, params });
};

export const orderCount = (params) => {
  return defHttp.get({ url: Api.orderCount, params }, { successMessageMode: 'none' });
};
