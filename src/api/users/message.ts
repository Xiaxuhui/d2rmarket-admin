import { defHttp } from '@/utils/http/axios';

enum Api {
  messageList = '/app/queryMsg?uid=1000',
  sendMessage = '/gm/sendMsg?uid=1000',
  userMessageList = '/gm/queryMsgList?uid=1000',
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
