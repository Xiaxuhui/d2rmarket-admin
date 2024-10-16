export enum IMessageType {
  TEXT = 1,
  IMG,
}

export enum IMessageState {
  UNREAD,
  READ,
}

export interface IMessage {
  data: string;
  id: number;
  qid: number;
  rid: number;
  time: number;
  type: IMessageType;
  uid: number;
  name: string;
  state: IMessageState;
}
