import { BasicColumn } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '标签名',
      dataIndex: 'name',
      edit: true,
      editComponent: 'Input',
      editComponentProps: {
        placeholder: '请输入新的标签名称',
      },
    },
    {
      title: '权重',
      dataIndex: 'w',
      edit: true,
      editComponent: 'InputNumber',
    },
    {
      title: '是否是父标签',
      dataIndex: 'parent',
      customRender({ value }) {
        return <div>{value === 0 ? '否' : '是'}</div>;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'time',
      customRender({ value }) {
        const time = formatToDateTime(value);
        return <div>{time}</div>;
      },
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
