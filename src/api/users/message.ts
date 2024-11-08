import { defHttp } from '@/utils/http/axios';

enum Api {
  messageList = '/app/queryMsg',
  sendMessage = '/gm/sendMsg',
  userMessageList = '/gm/queryMsgList',
}

export const userMessageList = (params) => {
  return defHttp.post({ url: Api.userMessageList, params });
};

export const messageList = (params) => {
  return defHttp.post({ url: Api.messageList, params });
};

export const sendMessage = (params) => {
  return defHttp.post(
    { url: Api.sendMessage, params },
    {
      successMessageMode: 'none',
    },
  );
};
