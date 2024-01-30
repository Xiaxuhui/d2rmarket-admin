import { defBusinessHttp, defHttp } from '@/utils/http/axios';
import { SerieDetail } from './model/seriesModel';

enum API {
  /** 短剧列表 */
  LIST = '/manage/searchBlog',
  /** 短剧详情 -> 分集管理 */
  Detail = '/manage/blogDetail',
  /** 短剧详情 -> 分集管理 -> 添加分集 */
  ADD = '/manage/addBlog',
  UPDATE = '/manage/updateBlog',
  DELETE = '/manage/deleteBlog',
  LIST_CATEGORY = '/manage/listCategory',
}

export const getSeriesList = (params: PagegationType) => {
  return defHttp.post({ url: API.LIST, params });
};

export const updateSeriesList = (params: PagegationType) => {
  return defHttp.post({ url: API.UPDATE, params });
};

export const getDetail = (id: string) => {
  return defHttp.get({ url: API.Detail, params: { blogId: id } });
};

export const deleteSeries = (id: string) => {
  return defBusinessHttp.get<SerieDetail>(API.DELETE, { params: { blogId: id } });
};

export const createSerie = (params) => {
  return defHttp.post<SerieDetail>({ url: API.ADD, params });
};

export const listCategory = () => {
  return defHttp.get({ url: API.LIST_CATEGORY });
};
