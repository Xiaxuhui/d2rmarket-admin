import { BasicColumn, FormProps } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';

export const getWithDrawFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `timeGap`,
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
        field: 'type',
        defaultValue: 1,
        component: 'Input',
        show: false,
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
      dataIndex: 'channel',
    },
    {
      title: '平台',
      dataIndex: 'platform',
    },
    {
      title: '任务ID',
      dataIndex: 'v1',
    },
    {
      title: '消耗豆',
      dataIndex: 'v2',
    },
    {
      title: '充值',
      dataIndex: 'v3',
    },
    {
      title: '成本',
      dataIndex: 'v4',
    },
    {
      title: '新用户数',
      dataIndex: 'v5',
    },
    {
      title: '打开次数',
      dataIndex: 'v6',
    },
    {
      title: '注册率',
      dataIndex: 'v7',
    },
    {
      title: '充值人数',
      dataIndex: 'v8',
    },
    {
      title: '充值率',
      dataIndex: 'v8',
    },
    {
      title: '平均观看时长',
      dataIndex: 'v9',
    },
  ];
}
