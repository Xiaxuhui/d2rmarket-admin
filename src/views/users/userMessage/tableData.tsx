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
      width: 300,
      dataIndex: 'operation',
    },
  ];
}

export const getBasicData = async () => {
  const arr: any = [];
  for (let index = 0; index < 40; index++) {
    arr.push({
      id: `${index}`,
      info: '这是一条主剧信息的测试文案，这是一条主剧信息的测试文案，这是一条主剧信息的测试文案',
      num: 10,
      end: 9,
      state: 10,
      link: 'https://www.google.com',
      weight: index,
      producer: '半次元出品',
    });
  }

  return arr;
};
