import { defHttp } from '@/utils/http/axios';

enum Api {
  baseList = '/gm/propBaseList',
  addTag = '/gm/addPropAffix',
  propBase = '/gm/propBase',
  addPropBase = '/gm/addPropBase',
}

export const addTag = (params) => {
  return defHttp.post({ url: Api.addTag, params });
};

export const baseList = (params) => {
  return defHttp.get({ url: Api.baseList, params });
};

export const deleteTag = ({ id }) => {
  return defHttp.post({ url: Api.addTag, params: { id } });
};

export const propBase = (id) => {
  return defHttp.get({ url: Api.propBase, params: { id } });
};

export const addPropBase = (params) => {
  return defHttp.get({ url: Api.addPropBase, params });
};
