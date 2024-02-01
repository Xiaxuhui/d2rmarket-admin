export interface GrowCardItem {
  icon?: string;
  title?: string;
  value?: number;
  total?: number;
  color?: string;
  action?: string;
  prefix?: string;
  actionFn?: boolean | (() => void);
  recordFn?: () => void;
}

export const getGrowCardList: (
  data: any,
  openWithdraw?: () => void,
  openDetail?: () => void,
) => GrowCardItem[] = (data, openWithdraw, openDetail) => [
  {
    title: '点击数',
    icon: 'click-volume|svg',
    value: data.v1,
    color: 'blue',
    action: '日',
  },
  {
    title: '新增用户',
    icon: 'user-add|svg',
    value: data.v2,
    color: 'blue',
    action: '日',
  },
  {
    title: '新增充值用户',
    icon: 'charge|svg',
    value: data.v3,
    color: 'blue',
    action: '日',
  },
  {
    title: '充值用户',
    icon: 'charge-user|svg',
    value: data.v4,
    color: 'blue',
    action: '日',
  },
  {
    title: '充值金额',
    icon: 'money|svg',
    value: data.v5,
    color: 'blue',
    action: '日',
  },
  {
    title: '消费金豆',
    icon: 'gold-bean|svg',
    value: data.v6,
    color: 'blue',
    action: '日',
  },
  {
    title: '我的余额',
    icon: 'cash|svg',
    value: data.remain_m / 10000,
    actionFn: data.canRemain
      ? () => {
          openWithdraw?.();
        }
      : false,
    recordFn() {
      openDetail?.();
    },
  },
  {
    title: 'VIP数量',
    icon: 'vip|svg',
    value: 8000,
  },
  {
    title: '下属分销商数',
    icon: 'salesman|svg',
    value: 5000,
  },
  {
    title: '投流任务数',
    icon: 'task|svg',
    value: 2000,
  },
  {
    title: '我的剧集',
    icon: 'total-sales|svg',
    value: 20000,
  },
  {},
  {},
];
