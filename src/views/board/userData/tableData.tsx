import { BasicColumn, FormProps } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';

export const getWithDrawFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `time_gap`,
        label: `统计间隔：`,
        component: 'Select',
        componentProps: {
          options: [
            {
              label: '按月统计',
              value: 1,
            },
            {
              label: '按日统计',
              value: 2,
            },
          ],
        },
      },
      {
        field: `channel`,
        label: `分销商：`,
        component: 'Input',
      },
      {
        field: `parentChannel`,
        label: `隶属：`,
        component: 'Input',
      },
      {
        field: `adId`,
        label: `任务ID：`,
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

export function detailColumns(): BasicColumn[] {
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
      title: '类型',
      dataIndex: 'k3',
    },
    {
      title: '金额',
      dataIndex: 'k4',
    },
    {
      title: '商品',
      dataIndex: 'k5',
    },
    {
      title: '支付方式',
      dataIndex: 'k6',
    },
    {
      title: '平台单号',
      dataIndex: 'k7',
    },
    {
      title: '状态',
      dataIndex: 'k8',
    },
  ];
}

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'uid',
    },
    {
      title: '昵称',
      dataIndex: 'uName',
    },
    {
      title: '会员',
      dataIndex: 'name',
    },
    {
      title: '账户余额',
      dataIndex: 'bankName',
    },
    {
      title: '分销商',
      dataIndex: 'bankName',
    },
    {
      title: '投放任务ID',
      dataIndex: 'bankName',
    },
    {
      title: '注册时间',
      dataIndex: 'bankName',
    },
    {
      title: '最近登陆',
      dataIndex: 'bankName',
    },
    {
      title: '观看时长',
      dataIndex: 'bankName',
    },
    {
      title: '操作',
      width: 200,
      dataIndex: 'operation',
      fixed: 'right',
    },
  ];
}
