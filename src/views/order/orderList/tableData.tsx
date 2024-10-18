import { BasicColumn, FormProps } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';

export const getWithDrawFormConfig: (query: Record<string, any>) => Partial<FormProps> = ({
  startTime,
  endTime,
}) => {
  console.log('startTime,endTime,', startTime, endTime);
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'orderId',
        label: 'OrderId',
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: 'email',
        label: 'Email',
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
};

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'OrderId',
      dataIndex: 'orderId',
      fixed: true,
    },
    {
      title: 'Uid',
      dataIndex: 'uid',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Create Time',
      dataIndex: 'time',
      customRender({ value }) {
        return formatToDateTime(value);
      },
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Operation',
      width: 300,
      dataIndex: 'operation',
    },
  ];
}
