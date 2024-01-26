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

export const addPromote = (params) => {
  return defHttp.get({ url: Api.add, params });
};

export const listPromote = (params) => {
  return defHttp.get({ url: Api.list, params });
};

export const delPromote = (params) => {
  return defHttp.get({ url: Api.del, params });
};

export const updatePromote = (params) => {
  return defHttp.get({ url: Api.update, params });
};

export const detailPromote = (params) => {
  return defHttp.get({ url: Api.detail, params });
};
