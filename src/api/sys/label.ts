import { defBusinessHttp, defHttp } from '@/utils/http/axios';
import { LabelModel } from './model/labelModel';
import { AppResponse } from './model/model';

enum Api {
  LIST = '/manage/listTVTags',
  ADD = '/manage/addTVTag',
  REMOVE = '/manage/deleteTag',
  UPDATE = '/manage/updateTVTag',
}

export const getLabelList = () => {
  return defHttp.get<LabelModel[]>({ url: Api.LIST });
};

export const addLabel = (name: string, sort: number) => {
  return defBusinessHttp.get<AppResponse<string>>(Api.ADD, {
    params: { name, parent: 0, w: sort },
  });
};

export const removeLabel = (id: string) => {
  return defBusinessHttp.get(Api.REMOVE, {
    params: { id },
  });
};

export const updateLabel = (params: LabelModel) => {
  return defBusinessHttp.get(Api.UPDATE, {
    params: { ...params, parent: 0 },
  });
};
