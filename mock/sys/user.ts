import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util';

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'admin',
      realName: 'Admin',
      avatar: '',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      account: '1',
      homePath: '/dashboard/analysis',
      limitList: '2001',
      limitGroup: '1',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: 'test user',
      avatar: '',
      desc: 'tester',
      account: '2',
      token: 'fakeToken2',
      homePath: '/dashboard/workbench',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  ];
}

export default [
  // mock user login
  {
    url: '/basic-api/manage/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { account, pwd } = body;
      const checkUser = createFakeUserList().find(
        (item) => item.username === account && pwd === item.password,
      );
      if (!checkUser) {
        return resultError('Incorrect account or password！');
      }
      const { userId, username: _username, token, realName, desc, roles, account: ac } = checkUser;
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
        desc,
        account: ac,
      });
    },
  },
  {
    url: '/basic-api/manage/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.account === token);
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/basic-api/order/list',
    method: 'get',
    response: () => {
      return resultSuccess([
        {
          orderId: 1,
          uid: 1,
          email: 'xiaxuhui@gmail.com',
          status: 1,
          price: 100,
          time: Date.now(),
        },
      ]);
    },
  },
  {
    url: '/basic-api/manage/goodsPriceRatePage',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultSuccess([
        {
          id: 1,
          uid: 1000,
          name: 'xiaXuHui',
          new: 5,
          qid: 256001,
        },
      ]);
    },
  },
  {
    url: '/basic-api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' });
    },
  },
  {
    url: '/basic-api/testRetry',
    statusCode: 405,
    method: 'get',
    response: () => {
      return resultError('Error!');
    },
  },
] as MockMethod[];
