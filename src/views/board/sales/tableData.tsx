import { BasicColumn, FormProps } from '@/components/Table';

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
              label: '按小时',
              value: 1,
            },
            {
              label: '按天',
              value: 2,
            },
            {
              label: '按周',
              value: 3,
            },
          ],
        },
      },
      {
        field: 'type',
        defaultValue: 2,
        component: 'Input',
        show: false,
      },
      {
        field: `channel`,
        label: `分销商：`,
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
      // customRender({ value }) {
      //   const time = formatToDateTime(value);
      //   return <div>{time}</div>;
      // },
    },
    {
      title: '分销商',
      dataIndex: 'channel',
    },
    {
      title: '隶属',
      dataIndex: 'par',
    },
    {
      title: '消耗豆',
      dataIndex: 'v1',
      // customRender({ value }) {
      //   return <div>{value / 10000}</div>;
      // },
    },
    {
      title: '充值',
      dataIndex: 'v2',
    },
    {
      title: '充值人数',
      dataIndex: 'v3',
    },
    {
      title: '新用户数',
      dataIndex: 'v4',
    },
    {
      title: '新用户充值',
      dataIndex: 'v5',
    },
    {
      title: '新用户付费率',
      dataIndex: 'v6',
    },
    {
      title: '充值笔数',
      dataIndex: 'v7',
    },
    {
      title: '回传笔数',
      dataIndex: 'v8',
    },
  ];
}
