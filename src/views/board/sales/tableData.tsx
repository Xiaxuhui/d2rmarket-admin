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

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '时间',
      dataIndex: 'time',
      customRender({ value }) {
        const time = formatToDateTime(value);
        return <div>{time}</div>;
      },
    },
    {
      title: '分销商',
      dataIndex: 'k2',
    },
    {
      title: '隶属',
      dataIndex: 'k3',
    },
    {
      title: '消耗豆',
      dataIndex: 'k4',
      customRender({ value }) {
        return <div>{value / 10000}</div>;
      },
    },
    {
      title: '充值',
      dataIndex: 'k5',
    },
    {
      title: '充值人数',
      dataIndex: 'k6',
    },
    {
      title: '新用户数',
      dataIndex: 'k7',
    },
    {
      title: '新用户充值',
      dataIndex: 'k8',
    },
    {
      title: '新用户付费率',
      dataIndex: 'k9',
    },
    {
      title: '充值笔数',
      dataIndex: 'k10',
    },
    {
      title: '回传笔数',
      dataIndex: 'k11',
    },
  ];
}
