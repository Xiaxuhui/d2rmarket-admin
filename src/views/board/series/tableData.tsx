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
        colProps: {
          xl: 8,
        },
      },
      {
        field: `channel`,
        label: `分销商：`,
        component: 'Input',
        colProps: {
          xl: 8,
        },
      },
      {
        field: `parentChannel`,
        label: `隶属：`,
        component: 'Input',
        colProps: {
          xl: 8,
        },
      },
      {
        field: `adId`,
        label: `任务ID：`,
        component: 'Input',
        colProps: {
          xl: 8,
        },
      },
      {
        field: '[startTime, endTime]',
        label: '日期范围',
        component: 'RangePicker',
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
      dataIndex: 'k2',
    },
    {
      title: '分销商',
      dataIndex: 'uName',
    },
    {
      title: '任务',
      dataIndex: 'name',
    },
    {
      title: '观看次数',
      dataIndex: 'bankName',
    },
    {
      title: '会员人数',
      dataIndex: 'bankName',
    },
    {
      title: '平均时长',
      dataIndex: 'bankName',
    },
    {
      title: '平均集数',
      dataIndex: 'bankName',
    },
    {
      title: '消费人数',
      dataIndex: 'bankName',
    },
    {
      title: '人均金额',
      dataIndex: 'bankName',
    },
  ];
}
