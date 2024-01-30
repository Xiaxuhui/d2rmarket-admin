import { BasicColumn, FormProps } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';

export const getWithDrawFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `name`,
        label: `分销商：`,
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
      title: '分销商',
      dataIndex: 'uid',
    },
    {
      title: '任务',
      dataIndex: 'uName',
    },
    {
      title: '金额',
      dataIndex: 'money',
      customRender({ value }) {
        return <div>{value / 10000}</div>;
      },
    },
    {
      title: '类型',
      dataIndex: 'name',
    },
    {
      title: '次数',
      dataIndex: 'bankName',
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
      title: '操作',
      width: 200,
      dataIndex: 'operation',
      fixed: 'right',
    },
  ];
}
