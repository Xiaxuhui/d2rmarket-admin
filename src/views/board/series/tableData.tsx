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
        componentProps: {
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
        colProps: {
          xl: 8,
        },
      },
      {
        field: 'type',
        defaultValue: 3,
        component: 'Input',
        show: false,
      },
      {
        field: `value`,
        label: `剧名：`,
        component: 'Input',
        colProps: {
          xl: 8,
        },
      },
      {
        field: '[startTime, endTime]',
        label: '日期范围',
        component: 'RangePicker',
        valueFormat: 'YYYY-MM-DD',
        componentProps: {
          format: 'YYYY-MM-DD',
          placeholder: ['开始日期', '结束日期'],
        },
        colProps: {
          xl: 8,
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
      title: '剧名',
      dataIndex: 'name',
    },
    {
      title: '观看次数',
      dataIndex: 'v1',
    },
    {
      title: '会员人数',
      dataIndex: 'v2',
    },
    {
      title: '平均时长',
      dataIndex: 'v3',
    },
    {
      title: '平均次数',
      dataIndex: 'v4',
    },
    {
      title: '消费人数',
      dataIndex: 'v5',
    },
    {
      title: '人均金额',
      dataIndex: 'v6',
    },
  ];
}
