import { TYPE_ENUM } from '@/contants';
import { defHttp } from '@/utils/http/axios';

enum Api {
  baseList = '/gm/propBaseList',
  addTag = '/gm/addPropAffix',
  propBase = '/gm/propBase',
  addPropBase = '/gm/addPropBase',
  goodsList = '/gm/productList',
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
  return defHttp.get<{
    affixList: {
      descTpl: string;
      id: number;
      name: string;
      pid: number;
      position: number;
      type: TYPE_ENUM;
    }[];
    affixs: string;
    ctime: number;
    id: number;
    imgList: {
      ctime: number;
      id: number;
      name: string;
      url: string;
    }[];
    imgs: string;
    ltime: number;
    name: string;
    type: TYPE_ENUM;
  }>({ url: Api.propBase, params: { id } });
};

export const addPropBase = (params) => {
  return defHttp.post({ url: Api.addPropBase, params });
};

export const goodsList = (params) => {
  return defHttp.get({ url: Api.goodsList, params });
};
