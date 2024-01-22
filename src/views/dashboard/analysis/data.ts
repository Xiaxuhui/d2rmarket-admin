export interface GrowCardItem {
  icon?: string;
  title?: string;
  value?: number;
  total?: number;
  color?: string;
  action?: string;
  prefix?: string;
  actionFn?(): void;
}

export const getGrowCardList: () => GrowCardItem[] = () => [
  {
    title: '点击数',
    icon: 'click-volume|svg',
    value: 2000,
    color: 'blue',
    action: '日',
  },
  {
    title: '新增用户',
    icon: 'user-add|svg',
    value: 20000,
    color: 'blue',
    action: '日',
  },
  {
    title: '新增充值用户',
    icon: 'charge|svg',
    value: 8000,
    color: 'blue',
    action: '日',
  },
  {
    title: '充值用户',
    icon: 'charge-user|svg',
    value: 5000,
    color: 'blue',
    action: '日',
  },
  {
    title: '消费金豆',
    icon: 'gold-bean|svg',
    value: 2000,
    color: 'blue',
    action: '日',
  },
  {
    title: '我的余额',
    icon: 'cash|svg',
    value: 20000,
    actionFn() {
      console.log('提现');
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
