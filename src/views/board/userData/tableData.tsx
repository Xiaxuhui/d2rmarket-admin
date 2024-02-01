import { BasicColumn, FormProps } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';

export const getWithDrawFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `investId`,
        label: `投流id：`,
        component: 'Input',
        colProps: {
          xl: 8,
        },
      },
      {
        field: `id`,
        label: `userId：`,
        component: 'Input',
        colProps: {
          xl: 8,
        },
      },
      {
        field: `userName`,
        label: `用户名：`,
        component: 'Input',
        colProps: {
          xl: 8,
        },
      },
      {
        field: `isVip`,
        label: `会员类型：`,
        colProps: {
          xl: 8,
        },
        component: 'Select',
        componentProps: {
          options: [
            {
              label: '是',
              value: 1,
            },
            {
              label: '否',
              value: 0,
            },
          ],
        },
      },
      {
        field: `channelId`,
        label: `渠道商id`,
        component: 'Input',
        colProps: {
          xl: 8,
        },
      },
      {
        field: '[startTime, endTime]',
        label: '日期范围',
        component: 'RangePicker',
        colProps: {
          xl: 8,
        },
        componentProps: {
          format: 'YYYY-MM-DD',
          placeholder: ['开始日期', '结束日期'],
          valueFormat: 'YYYY-MM-DD',
          onChange(value) {
            console.log(value);
          },
        },
      },
    ],
  };
};

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

export function detailColumns(): BasicColumn[] {
  return [
    {
      title: '订单号',
      dataIndex: 'id',
      fixed: true,
    },
    {
      title: '时间',
      dataIndex: 'time',
      customRender({ value }) {
        const time = formatToDateTime(value);
        return <div>{time}</div>;
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      customRender({ value }) {
        return <div>{stateEnum[value]}</div>;
      },
    },
    {
      title: '金额',
      dataIndex: 'moneyCost',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '平台单号',
      dataIndex: 'orderId',
    },
    {
      title: '支付方式',
      dataIndex: 'platform',
      customRender({ value }) {
        return <div>{platformEnum[value]}</div>;
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      customRender() {
        return '完成';
      },
    },
  ];
}

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '用户id',
      dataIndex: 'id',
      fixed: 'left',
    },
    {
      title: '昵称',
      dataIndex: 'name',
    },
    {
      title: '会员',
      dataIndex: 'vipEndTime',
      customRender({ value }) {
        return Date.now() > value ? '否' : '是';
      },
    },
    {
      title: '账户余额',
      dataIndex: 'bean',
    },
    {
      title: '分销商id',
      dataIndex: 'channel',
    },
    {
      title: '投放任务ID',
      dataIndex: 'ad',
    },
    {
      title: '注册时间',
      dataIndex: 'time',
      width: 200,
      customRender({ value }) {
        const time = formatToDateTime(value);
        return <div>{time}</div>;
      },
    },
    {
      title: '操作',
      width: 80,
      dataIndex: 'operation',
      fixed: 'right',
    },
  ];
}
