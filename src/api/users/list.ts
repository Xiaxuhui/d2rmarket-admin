import { defHttp } from '@/utils/http/axios';

enum Api {
  userList = '/gm/userList',
}

export const userList = (params) => {
  return defHttp.get({ url: Api.userList, params });
};
