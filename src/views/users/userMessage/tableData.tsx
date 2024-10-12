import { BasicColumn, FormProps } from '@/components/Table';
import { tv } from 'tailwind-variants';

enum STATE_ENUM {
  OPEN = 1,
  CLOSE = 0,
}

const colorText = tv({
  variants: {
    color: {
      [STATE_ENUM.OPEN]: 'text-red',
    },
  },
});

const stateEnum = {
  [STATE_ENUM.OPEN]: '启用',
  [STATE_ENUM.CLOSE]: '禁用',
};

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
      title: '分销商',
      dataIndex: 'channelName',
      ellipsis: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      fixed: 'left',
      width: 200,
    },
    {
      title: '详情',
      dataIndex: 'data',
    },
    {
      title: '价格',
      dataIndex: 'price',
      format(state) {
        return Number(state) / 10000;
      },
    },
    {
      title: '权重',
      dataIndex: 'weight',
    },
    {
      title: '状态',
      dataIndex: 'state',
      format(state) {
        return stateEnum[state];
      },
      customRender({ value }) {
        return <div class={colorText({ color: value })}>{stateEnum[value]}</div>;
      },
    },
    {
      title: '操作',
      width: 300,
      dataIndex: 'operation',
    },
  ];
}

export const getBasicData = async (params) => {
  console.log('params', params);
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
