import { defHttp } from '@/utils/http/axios';

enum Api {
  add = '/manage/addWithdrawalRecord',
  list = '/manage/withdrawalSelectPage',
  update = '/manage/updateWithdrawalRecord',
  detail = '/manage/withdrawalDetail',
  withdraw = '/manage/withdrawal',
  record = '/manage/withdrawalRecordPage',
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

export const withdraw = (params) => {
  return defHttp.get({ url: Api.withdraw, params });
};

export const record = (params) => {
  return defHttp.get({ url: Api.record, params });
};
