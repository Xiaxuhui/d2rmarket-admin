import { defHttp } from '@/utils/http/axios';

enum Api {
  messageList = '/app/queryMsg?uid=100',
  sendMessage = '/gm/sendMsg?uid=100',
  userMessageList = '/gm/queryMsgList?uid=100',
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
