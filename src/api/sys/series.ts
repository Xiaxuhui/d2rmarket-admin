import { defBusinessHttp } from '@/utils/http/axios';
import { Serie, SerieDetail } from './model/seriesModel';

enum API {
  /** 短剧列表 */
  LIST = '/manage/searchBlog',
  /** 短剧详情 -> 分集管理 */
  Detail = '/manage/blogDetail',
  /** 短剧详情 -> 分集管理 -> 添加分集 */
  ADD = '/manage/addBlog',
}

export const getSeriesList = (params: PagegationType) => {
  return defBusinessHttp.post<Serie>(API.LIST, params);
};

export const getDetail = (id: string) => {
  return defBusinessHttp.get<SerieDetail>(API.Detail, { params: { blogId: id } });
};

export const createSerie = (params: { title: string; fileId: string; parentBlog: string }) => {
  return defBusinessHttp.post<SerieDetail>(API.ADD, {
    ...params,
    type: 0,
    state: 0,
    price: 0,
    weight: 0,
  });
};
