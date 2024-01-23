import { defBusinessHttp } from '@/utils/http/axios';
import { Serie } from './model/seriesModel';

enum API {
  LIST = '/manage/searchBlog',
}

export const getSeriesList = (params: PagegationType) => {
  return defBusinessHttp.post<Serie>(API.LIST, {
    pageNum: params.page,
    pageSize: params.pageSize,
  });
};
