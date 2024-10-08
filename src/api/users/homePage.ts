import { defHttp } from '@/utils/http/axios';

enum Api {
  add = '/manage/addDisplay',
  list = '/manage/displayPage',
  update = '/manage/updateDisplay',
  detail = '/manage/display',
  del = '/manage/deleteDisplay',
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

export const del = (params) => {
  return defHttp.get({ url: Api.del, params });
};
