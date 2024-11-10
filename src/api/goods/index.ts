import { TYPE_ENUM } from '@/contants';
import { ContentTypeEnum } from '@/enums/httpEnum';
import { defHttp } from '@/utils/http/axios';

enum Api {
  baseList = '/gm/propBaseList',
  addTag = '/gm/addPropAffix',
  propBase = '/gm/propBase',
  addPropBase = '/gm/addPropBase',
  goodsList = '/gm/productList',
  addProduct = '/gm/addProduct',
  updateProduct = '/gm/updateProduct',
  productData = '/gm/productData',
}

export const addTag = (params) => {
  return defHttp.post({ url: Api.addTag, params });
};

export const baseList = (params) => {
  return defHttp.get({ url: Api.baseList, params });
};

export const deleteTag = (params) => {
  return defHttp.post({ url: Api.addTag, params });
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

export const deletePropBase = (params: { deleteId: number }) => {
  return defHttp.post({ url: Api.addPropBase, params });
};

export const goodsList = (params) => {
  return defHttp.get({ url: Api.goodsList, params });
};

export const addProduct = (params) => {
  return defHttp.post({
    url: Api.addProduct,
    params,
    headers: { 'Content-Type': ContentTypeEnum.JSON },
  });
};

export const productData = (params) => {
  return defHttp.get({ url: Api.productData, params });
};

export const updateProduct = (params) => {
  return defHttp.post({ url: Api.updateProduct, params });
};
