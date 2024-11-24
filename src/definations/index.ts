export interface IUserMessage {
  uid: number;
  name: string;
  qid: number;
  num: number;
  time: number;
}

export interface IOrder {
  address: string;
  amount: number;
  ctime: number;
  coupon: number;
  details: {
    id: number;
    oid: number;
    pid: number;
    name: string;
    sid: number;
    num: number;
    price: number;
    discount: number;
  }[];
  email: string;
  etime: number;
  id: number;
  ltime: number;
  name: string;
  num: number;
  ptime: number;
  status: number;
  uid: number;
}
