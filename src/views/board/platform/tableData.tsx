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
        colProps: {
          xl: 8,
        },
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
      dataIndex: 'uid',
    },
    {
      title: '消耗',
      dataIndex: 'uName',
    },
    {
      title: 'ROI',
      dataIndex: 'uName',
    },
    {
      title: '新用户',
      dataIndex: 'uName',
    },
    {
      title: '新用户充值',
      dataIndex: 'uName',
    },
    {
      title: '新用户付费率',
      dataIndex: 'uName',
    },

    {
      title: '充值笔数',
      dataIndex: 'name',
    },
    {
      title: '回传笔数',
      dataIndex: 'bankName',
    },
    {
      title: '回传金额',
      dataIndex: 'bankName',
    },
    {
      title: '登陆用户',
      dataIndex: 'bankName',
    },
    {
      title: '平均观看时长',
      dataIndex: 'bankName',
    },
    {
      title: '平均观看集数',
      dataIndex: 'bankName',
    },
  ];
}
