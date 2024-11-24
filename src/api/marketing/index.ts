import { defHttp } from '@/utils/http/axios';

enum Api {
  activityList = '/gm/discountList',
  addDiscount = '/gm/addDiscount',
  activityDetail = '/gm/discount',
  couponList = '/gm/couponList',
  addCoupon = '/gm/addCoupon',
  couponDetail = '/gm/coupon',
}

export const activityList = (params) => {
  return defHttp.get({ url: Api.activityList, params });
};

export const detailActivity = (id: number) => {
  return defHttp.get({ url: Api.activityDetail, params: { id } });
};

export const addActivity = (params) => {
  return defHttp.post({
    url: Api.addDiscount,
    params,
  });
};

export const deleteActivity = (id: number) => {
  return defHttp.post({
    url: Api.addDiscount,
    params: {
      deleteId: id,
    },
  });
};

export const couponList = (params) => {
  return defHttp.get({ url: Api.couponList, params });
};

export const detailCoupon = (id: number) => {
  return defHttp.get({ url: Api.couponDetail, params: { id } });
};

export const addCoupon = (params) => {
  return defHttp.post({
    url: Api.addCoupon,
    params,
  });
};

export const deleteCoupon = (id: number) => {
  return defHttp.post({
    url: Api.addCoupon,
    params: {
      deleteId: id,
    },
  });
};
