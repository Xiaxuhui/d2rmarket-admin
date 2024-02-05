export interface GrowCardItem {
  icon?: string;
  title?: string;
  name?: string;
  total?: number;
  color?: string;
  action?: string;
  prefix?: string;
  actionFn?: () => void;
  recordFn?: () => void;
}

export const getGrowCardList: (
  openWithdraw?: () => void,
  openDetail?: () => void,
) => GrowCardItem[] = (openWithdraw, openDetail) => [
  {
    title: '点击数',
    icon: 'click-volume|svg',
    name: 'v1',
    color: 'blue',
    action: '日',
  },
  {
    title: '新增用户',
    icon: 'user-add|svg',
    name: 'v2',
    color: 'blue',
    action: '日',
  },
  {
    title: '新增充值用户',
    icon: 'charge|svg',
    name: 'v3',
    color: 'blue',
    action: '日',
  },
  {
    title: '充值用户',
    icon: 'charge-user|svg',
    name: 'v4',
    color: 'blue',
    action: '日',
  },
  {
    title: '充值金额',
    icon: 'money|svg',
    name: 'v5',
    color: 'blue',
    action: '日',
  },
  {
    title: '消费金豆',
    icon: 'gold-bean|svg',
    name: 'v6',
    color: 'blue',
    action: '日',
  },
  {
    title: '我的余额',
    icon: 'cash|svg',
    name: 'remain_m',
    actionFn: () => {
      openWithdraw?.();
    },
    recordFn() {
      openDetail?.();
    },
  },
  {
    title: 'VIP数量',
    icon: 'vip|svg',
    name: 'vipNum',
  },
  {
    title: '下属分销商数',
    icon: 'salesman|svg',
    name: 'sonChannelNum',
  },
  {
    title: '投流任务数',
    icon: 'task|svg',
    name: 'investNum',
  },
  {
    title: '我的剧集',
    icon: 'total-sales|svg',
    name: 'blogNum',
  },
  {},
];
