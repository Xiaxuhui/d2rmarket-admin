import { BasicColumn, FormProps } from '@/components/Table';

export const getFormConfig: ({ label }: { label: string }) => Partial<FormProps> = () => {
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
        field: `name`,
        label: `Name:`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
};

export const getBasicColumns: () => BasicColumn[] = () => {
  return [
    {
      title: 'Uid',
      dataIndex: 'id',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      ellipsis: true,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      ellipsis: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: 'Points',
      dataIndex: 'point',
    },
    {
      title: 'Order Record',
      dataIndex: 'record',
      customRender() {
        return <a onClick={() => {}}>record</a>;
      },
    },
  ];
};
