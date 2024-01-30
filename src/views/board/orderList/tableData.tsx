import { BasicColumn, FormProps } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';

enum STATE_ENUM {
  DEL = -1,
  WAIT = 1,
  SUCCESS = 2,
  REJECT = 3,
  CANCEL = 4,
}

const stateEnum = {
  [STATE_ENUM.DEL]: '删除',
  [STATE_ENUM.WAIT]: '等待处理',
  [STATE_ENUM.SUCCESS]: '处理成功',
  [STATE_ENUM.REJECT]: '驳回',
  [STATE_ENUM.CANCEL]: '用户取消',
};

export const getWithDrawFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `adId`,
        label: `用户ID：`,
        component: 'Input',
      },
      {
        field: `parentChannel`,
        label: `隶属：`,
        component: 'Input',
      },
      {
        field: `producer`,
        label: `类型：`,
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
      dataIndex: 'k1',
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
      title: '用户',
      dataIndex: 'k3',
    },
    {
      title: '分销商',
      dataIndex: 'k4',
    },
    {
      title: '类型',
      dataIndex: 'k5',
    },
    {
      title: '提现金额',
      dataIndex: 'k6',
      customRender({ value }) {
        return <div>{value / 10000}</div>;
      },
    },
    {
      title: '商品',
      dataIndex: 'k7',
    },
    {
      title: '支付方式',
      dataIndex: 'k8',
    },
    {
      title: '平台单号',
      dataIndex: 'k9',
    },
    {
      title: '状态',
      dataIndex: 'k10',
      customRender({ value }) {
        return <div>{stateEnum[value]}</div>;
      },
    },
  ];
}
