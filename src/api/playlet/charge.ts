import { defHttp } from '@/utils/http/axios';
import { Charge } from './model/charge';

enum Api {
  addCharge = '/manage/addGoodsPriceRate',
  list = '/manage/goodsPriceRatePage',
  del = '/manage/deleteGoodsPriceRate',
  update = '/manage/updateGoodsPriceRate',
  detail = '/manage/goodsPriceRate',
}

/**
 * @description: Get user menu based on id
 */

export const addCharge = (params: Charge) => {
  return defHttp.get({ url: Api.addCharge, params });
};

export const chargeList = (params) => {
  return defHttp.get({ url: Api.list, params });
};

export const delCharge = (params) => {
  return defHttp.get({ url: Api.del, params });
};

export const updateCharge = (params) => {
  return defHttp.get({ url: Api.update, params });
};

export const detailCharge = (params) => {
  return defHttp.get({ url: Api.detail, params });
};
