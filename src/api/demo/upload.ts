import { defBusinessHttp } from '@/utils/http/axios';
import { GetUploadInfoModel } from '../sys/model/uploadModel';

enum Api {
  GET_UPLOAD_PATH = '/manage/s3FileUploadPath',
}

export const getFileUploadAPI = (params: { sha256: string; size: number; type: number }) => {
  return defBusinessHttp.get<GetUploadInfoModel>(Api.GET_UPLOAD_PATH, { params });
};
