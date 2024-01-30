import { defHttp } from '@/utils/http/axios';

enum Api {
  LIST = '/manage/listTVTags',
  ADD = '/manage/addTVTag',
  REMOVE = '/manage/deleteTag',
  UPDATE = '/manage/updateRecommend',
  SEARCH_CHANNEL = '/manage/searchChannel',
}

export const updateRecommend = (params) => {
  return defHttp.get({ url: Api.UPDATE, params });
};
