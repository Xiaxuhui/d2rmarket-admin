import { defHttp } from '@/utils/http/axios';

enum Api {
  location = '/app/seasons',
  addTags = '/gm/addSeasons',
}

export const locationTags = () => {
  return defHttp.get<
    {
      code: string;
      id: number;
      name: string;
      time: number;
    }[]
  >({ url: Api.location });
};

export const addTags = (params: { name: string }) => {
  return defHttp.post({ url: Api.addTags, params });
};

export const delTags = (params: { id: number }) => {
  return defHttp.post({ url: Api.addTags, params: { name: '', id: params.id } });
};
