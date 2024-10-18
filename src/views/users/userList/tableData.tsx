import { BasicColumn, FormProps } from '@/components/Table';
import * as api from '@/api/sys/series';

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

export function getDiversityColumns(): BasicColumn[] {
  return [
    {
      title: '片名',
      dataIndex: 'title',
      fixed: 'left',
      edit: true,
      editComponent: 'Input',
    },
    {
      title: '是否上架',
      dataIndex: 'state',
      edit: true,
      editComponent: 'Switch',
      editComponentProps() {
        return { checkedValue: 1, unCheckedValue: 0 };
      },
      editRender({ currentValue }) {
        return +currentValue > 0 ? '是' : '否';
      },
    },
    {
      title: '是否推荐',
      dataIndex: 'recommendState',
      edit: true,
      editComponentProps() {
        return { checkedValue: 1, unCheckedValue: 0 };
      },
      editComponent: 'Switch',
      editRender({ currentValue }) {
        return currentValue ? '是' : '否';
      },
    },
    {
      title: '金豆价格',
      dataIndex: 'price',
      edit: true,
    },
    {
      title: '权重',
      dataIndex: 'hotLevel',
      edit: true,
    },
    {
      title: '剧集ID',
      dataIndex: 'fileId',
      edit: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 300,
    },
  ];
}

export const getBasicData = async (params: PagegationType) => {
  const res = await api.getSeriesList(params);
  return res.list;
};

export const getSeriesList = async () => {
  const arr: any = [];
  for (let index = 0; index < 40; index++) {
    arr.push({
      name: `仙剑奇侠传${index}`,
      info: '古装神话',
      time: '2023-12-12',
    });
  }
  return arr;
};
