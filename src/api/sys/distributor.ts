import { defHttp } from '@/utils/http/axios';

enum Api {
  list = '/manage/selectChildChannel',
  detail = '/manage/channelDetail',
  update = '/manage/updateChannel',
  childList = '/manage/childChannelPage',
  addChildList = '/manage/addChannel',
  addPriceRate = '/manage/addPriceRate',
  updatePriceRate = '/manage/updatePriceRate',
  deletePriceRate = '/manage/deletePriceRate',
}

/**
 * @description: Get user menu based on id
 */

export const distributorList = (params) => {
  return defHttp.get({ url: Api.list, params });
};

export const distributorChildList = (params) => {
  return defHttp.get({ url: Api.childList, params });
};

export const distributorDetail = (params) => {
  return defHttp.get({ url: Api.detail, params });
};

export const addChild = (params) => {
  return defHttp.get({ url: Api.addChildList, params });
};
export const updateDistributor = (params) => {
  return defHttp.get({ url: Api.update, params });
};

export const addPriceRate = (params) => {
  return defHttp.get({ url: Api.addPriceRate, params });
};

export const updatePriceRate = (params) => {
  return defHttp.get({ url: Api.updatePriceRate, params });
};
export const deletePriceRate = (params) => {
  return defHttp.get({ url: Api.deletePriceRate, params });
};
