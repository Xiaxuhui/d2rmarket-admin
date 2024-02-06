import { defHttp } from '@/utils/http/axios';
import { LabelModel } from './model/labelModel';

enum Api {
  LIST = '/manage/listTVTags',
  ADD = '/manage/addTVTag',
  REMOVE = '/manage/deleteTag',
  UPDATE = '/manage/updateTVTag',
  SEARCH_CHANNEL = '/manage/searchChannel',
}

export const getLabelList = () => {
  return defHttp.get<LabelModel[]>({ url: Api.LIST });
};

export const addLabel = (name: string, sort: number) => {
  return defHttp.get({ url: Api.ADD, params: { name, parent: 0, w: sort } });
};

export const removeLabel = (id: string) => {
  return defHttp.get({ url: Api.REMOVE, params: { id } });
};

export const updateLabel = (params: LabelModel) => {
  return defHttp.get({ url: Api.UPDATE, params: { ...params, parent: 0 } });
};

export const searchChannel = (params) => {
  return defHttp.get({ url: Api.SEARCH_CHANNEL, params });
};
