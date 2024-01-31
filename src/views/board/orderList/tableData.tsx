import { BasicColumn, FormProps } from '@/components/Table';

enum STATE_ENUM {
  vip = 1,
  dou = 2,
  blogs = 3,
  blog = 4,
}

const stateEnum = {
  [STATE_ENUM.vip]: '花钱买VIP',
  [STATE_ENUM.dou]: '花钱买豆子',
  [STATE_ENUM.blogs]: '购买合集博客',
  [STATE_ENUM.blog]: '购买单集博客',
};

enum PLATFORM_ENUM {
  weChat = 101,
  pay = 401,
}

const platformEnum = {
  [PLATFORM_ENUM.weChat]: '微信',
  [PLATFORM_ENUM.pay]: '支付宝',
};

export const getWithDrawFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'type',
        label: '类型',
        component: 'Select',
        componentProps: {
          options: [
            {
              label: '买VIP',
              value: 1,
            },
            {
              label: '买豆子',
              value: 2,
            },
            {
              label: '买合集博客',
              value: 3,
            },
            {
              label: '买单集博客',
              value: 4,
            },
          ],
        },
      },
      {
        field: 'userId',
        label: '用户id',
        component: 'Input',
      },
      {
        field: 'userName',
        label: '用户名',
        component: 'Input',
      },
      {
        field: 'purchaseRecordId',
        label: '订单号',
        component: 'Input',
      },
      {
        field: 'channelId',
        label: '分销商',
        component: 'Input',
      },
      {
        field: 'parentId',
        label: '隶属的分销商',
        component: 'Input',
      },
      {
        field: 'investId',
        label: '投流任务',
        component: 'Input',
      },
      {
        field: 'orderId',
        label: '平台订单',
        component: 'Input',
      },
      {
        field: '[startTime, endTime]',
        label: '日期范围',
        component: 'RangePicker',
        componentProps: {
          format: 'YYYY-MM-DD',
          placeholder: ['开始日期', '结束日期'],
        },
      },
    ],
  };
};

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '订单号',
      dataIndex: 'id',
    },
    {
      title: '订单用户',
      dataIndex: 'uid',
    },
    {
      title: '订单用户名',
      dataIndex: 'uName',
    },
    {
      title: '分销商ID',
      dataIndex: 'channelID',
    },
    {
      title: '分销商名称',
      dataIndex: 'channelName',
    },
    {
      title: '类型',
      dataIndex: 'type',
      customRender({ value }) {
        return <div>{stateEnum[value]}</div>;
      },
    },
    {
      title: '豆子',
      dataIndex: 'beanCost',
    },
    {
      title: '钱',
      dataIndex: 'moneyCost',
    },
    {
      title: '获得的豆子',
      dataIndex: 'beanGain',
    },
    {
      title: '花豆子购买博客id',
      dataIndex: 'blog',
    },
    {
      title: '平台号id',
      dataIndex: 'orderId',
    },
    {
      title: '平台方式',
      dataIndex: 'platform',
      customRender({ value }) {
        return <div>{platformEnum[value]}</div>;
      },
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: 'vip天数',
      dataIndex: 'vipDays',
    },
    {
      title: '时间',
      dataIndex: 'time',
    },
  ];
}
