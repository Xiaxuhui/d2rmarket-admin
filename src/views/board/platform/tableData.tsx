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
        defaultValue: 3600000,
        colProps: {
          xl: 8,
        },
        componentProps: {
          defaultValue: 3600000,
          options: [
            {
              label: '按小时统计',
              value: 3600000,
            },
            {
              label: '按日统计',
              value: 3600000 * 24,
            },
          ],
        },
      },
      {
        field: 'type',
        defaultValue: 5,
        component: 'Input',
        show: false,
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
      title: '充值',
      dataIndex: 'v1',
    },
    {
      title: '消耗',
      dataIndex: 'v2',
    },
    {
      title: 'ROI',
      dataIndex: 'v3',
    },
    {
      title: '新用户',
      dataIndex: 'v4',
    },
    {
      title: '新用户充值',
      dataIndex: 'v5',
    },
    {
      title: '新用户付费率',
      dataIndex: 'v6',
      customRender({ value }) {
        return `${value}%`;
      },
    },

    {
      title: '充值笔数',
      dataIndex: 'v7',
    },
    {
      title: '回传笔数',
      dataIndex: 'v8',
    },
    {
      title: '回传金额',
      dataIndex: 'v9',
    },
    {
      title: '登陆用户',
      dataIndex: 'v10',
    },
    {
      title: '平均观看时长',
      dataIndex: 'v11',
    },
    {
      title: '平均观看集数',
      dataIndex: 'v12',
    },
  ];
}
