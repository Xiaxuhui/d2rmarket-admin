import { BasicColumn, FormProps } from '@/components/Table';

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
