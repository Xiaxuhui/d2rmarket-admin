import { defHttp } from '@/utils/http/axios';

enum Api {
  orderList = '/manage/statisticPurchaseRecordPage',
  order = '/manage/purchaseRecordPage',
  promote = '/manage/DataView',
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

export const promote = (params) => {
  return defHttp.get({ url: Api.promote, params });
};
