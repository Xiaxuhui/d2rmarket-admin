import { defHttp } from '@/utils/http/axios';

enum Api {
  orderList = '/manage/withdrawalSelectPage',
  order = '/manage/order',
}

/**
 * @description: Get user menu based on id
 */

export const orderList = (params) => {
  return defHttp.get({ url: Api.orderList, params });
};

export const order = (params) => {
  return defHttp.get({ url: Api.order, params });
};
