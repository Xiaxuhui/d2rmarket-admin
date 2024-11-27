import { BasicColumn, FormProps } from '@/components/Table';
import { ORDER_TEXT } from '@/contants';
import { getColorText } from '@/utils';
import { formatToDateTime } from '@/utils/dateUtil';
import { ColumnsType } from 'ant-design-vue/lib/table';

export const getWithDrawFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `email`,
        label: `Email:`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `uid`,
        label: `Uid:`,
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
      title: 'Uid',
      dataIndex: 'uid',
      fixed: 'left',
      width: 200,
    },

    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: 'New Message',
      dataIndex: 'num',
    },
    {
      title: 'Detail',
      width: 200,
      dataIndex: 'operation',
    },
  ];
}

export const columns: ColumnsType<any> = [
  {
    title: 'OrderId',
    dataIndex: 'id',
  },
  {
    title: 'Create Time',
    dataIndex: 'ctime',
    customRender({ value }) {
      return formatToDateTime(value * 1000);
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    customRender({ value }) {
      return <div style={{ color: getColorText(value) }}>{ORDER_TEXT[value]}</div>;
    },
  },
  {
    title: 'Detail',
    dataIndex: 'detail',
    key: 'detail',
  },
  {
    title: 'Operation',
    dataIndex: 'operation',
  },
];
