import { defBusinessHttp } from '@/utils/http/axios';
import { Serie, SerieDetail } from './model/seriesModel';

enum API {
  /** 短剧列表 */
  LIST = '/manage/searchBlog',
  /** 短剧详情 -> 分集管理 */
  Detail = '/manage/blogDetail',
}

export const getSeriesList = (params: PagegationType) => {
  return defBusinessHttp.post<Serie>(API.LIST, {
    pageNum: params.page,
    pageSize: params.pageSize,
  });
};

export const getDetail = (id: string) => {
  return defBusinessHttp.get<SerieDetail>(API.Detail, { params: { blogId: id } });
};
