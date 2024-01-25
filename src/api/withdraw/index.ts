import { defHttp } from '@/utils/http/axios';

enum Api {
  add = '/manage/addInvest',
  list = '/manage/investSelectPage',
  del = '/manage/deleteInvest',
  update = '/manage/updateInvest',
  detail = '/manage/investDetail',
}

/**
 * @description: Get user menu based on id
 */

export const addWithdraw = (params) => {
  return defHttp.get({ url: Api.add, params });
};

export const listWithdraw = (params) => {
  return defHttp.get({ url: Api.list, params });
};

export const delWithdraw = (params) => {
  return defHttp.get({ url: Api.del, params });
};

export const updateWithdraw = (params) => {
  return defHttp.get({ url: Api.update, params });
};

export const detailWithdraw = (params) => {
  return defHttp.get({ url: Api.detail, params });
};
