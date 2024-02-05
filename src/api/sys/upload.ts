import { defHttp } from '@/utils/http/axios';
import { GetUploadInfoModel } from './model/uploadModel';

enum Api {
  GET_UPLOAD_PATH = '/manage/fileUploadPath',
}

export const getFileUploadAPI = (params: { sha256: string; size: number; type: number }) => {
  return defHttp.get<GetUploadInfoModel>({ url: Api.GET_UPLOAD_PATH, params });
};
