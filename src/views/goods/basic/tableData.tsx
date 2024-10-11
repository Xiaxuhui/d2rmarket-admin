import { BasicColumn, FormProps } from '@/components/Table';
import { TYPE_SELECTION } from '@/contants';

export const getFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `type`,
        label: `Type:`,
        component: 'Select',
        componentProps: {
          options: TYPE_SELECTION,
        },
        colProps: {
          xl: 10,
          xxl: 6,
        },
      },
    ],
  };
};

export const getSeriesColumns: () => BasicColumn[] = () => {
  return [
    {
      title: '剧名',
      dataIndex: 'name',
      width: 150,
      ellipsis: true,
    },
    {
      title: '剧描述',
      dataIndex: 'info',
    },
    {
      title: '设置时间',
      dataIndex: 'time',
      width: 150,
    },
  ];
};

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: 'Type',
      width: 300,
      dataIndex: 'type',
    },
    {
      title: 'Operation',
      align: 'center',
      dataIndex: 'operation',
    },
  ];
}
