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
        field: `name`,
        label: `用户ID：`,
        component: 'Input',
      },
      {
        field: `producer`,
        label: `隶属：`,
        component: 'Input',
      },
      {
        field: `producer`,
        label: `类型：`,
        component: 'Input',
      },
      {
        field: '[startDate, endDate]',
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
      dataIndex: 'uid',
    },
    {
      title: 'initiateTime',
      dataIndex: '时间',
      customRender({ value }) {
        const time = formatToDateTime(value);
        return <div>{time}</div>;
      },
    },
    {
      title: '用户',
      dataIndex: 'name',
    },
    {
      title: '分销商',
      dataIndex: 'bankName',
    },
    {
      title: '类型',
      dataIndex: 'bankName',
    },
    {
      title: '提现金额',
      dataIndex: 'money',
      customRender({ value }) {
        return <div>{value / 10000}</div>;
      },
    },
    {
      title: '商品',
      dataIndex: 'bankName',
    },
    {
      title: '支付方式',
      dataIndex: 'bankName',
    },
    {
      title: '平台单号',
      dataIndex: 'bankName',
    },
    {
      title: '状态',
      dataIndex: 'state',
      customRender({ value }) {
        return <div>{stateEnum[value]}</div>;
      },
    },
  ];
}
