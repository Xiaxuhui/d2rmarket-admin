import { BasicColumn } from '@/components/Table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '标签名',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: '操作',
      width: 300,
      flag: 'ACTION',
      align: 'center',
      dataIndex: 'operation',
    },
  ];
}

export const getBasicData = () => {
  const arr: any = [];
  for (let index = 0; index < 40; index++) {
    arr.push({
      id: `${index}`,
      name: `标签${index}`,
    });
  }

  return arr;
};
