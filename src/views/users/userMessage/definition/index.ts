export enum IMessageType {
  TEXT = 1,
  IMG,
}

export interface IMessage {
  data: string;
  id: number;
  qid: number;
  rid: number;
  time: number;
  type: IMessageType;
  uid: number;
}
