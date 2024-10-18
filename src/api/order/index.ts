import { defHttp } from '@/utils/http/axios';

enum Api {
  orderList = '/order/list',
}

/**
 * @description: Get user menu based on id
 */

export const orderList = (params) => {
  return defHttp.get({ url: Api.orderList, params });
};
