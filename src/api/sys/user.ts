import { defHttp } from '@/utils/http/axios';
import { LoginParams } from './model/userModel';

import { ErrorMessageMode } from '#/axios';
// import { useUserStoreWithOut } from '@/store/modules/user';

enum Api {
  Login = '/gm/login',
  Logout = '/gm/logout',
  GetUserInfo = '/gm/basic',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  Home = '/manage/homePage',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getHomeData(params: any) {
  return defHttp.post({
    url: Api.Home,
    params,
  });
}

/**
 * @description: getUserInfo
 */
export async function getUserInfo() {
  return defHttp.get({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
