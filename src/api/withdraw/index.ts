import { defHttp } from '@/utils/http/axios';

enum Api {
  add = '/manage/addWithdrawalRecord',
  list = '/manage/withdrawalSelectPage',
  update = '/manage/updateWithdrawalRecord',
  detail = '/manage/withdrawalDetail',
}

/**
 * @description: Get user menu based on id
 */

export const add = (params) => {
  return defHttp.get({ url: Api.add, params });
};

export const list = (params) => {
  return defHttp.get({ url: Api.list, params });
};

export const update = (params) => {
  return defHttp.get({ url: Api.update, params });
};

export const detail = (params) => {
  return defHttp.get({ url: Api.detail, params });
};
