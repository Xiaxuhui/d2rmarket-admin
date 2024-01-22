import { BasicColumn, FormProps } from '@/components/Table';
import { tv } from 'tailwind-variants';

enum STATE_ENUM {
  END = 10,
}

const colorText = tv({
  variants: {
    color: {
      [STATE_ENUM.END]: 'text-red',
    },
  },
});

const stateEnum = {
  [STATE_ENUM.END]: '已完结',
};

export const getPromoteFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `name`,
        label: `任务ID：`,
        component: 'Input',
      },
      {
        field: `producer`,
        label: `平台：`,
        component: 'Input',
      },
      {
        field: `producers`,
        label: `分销商：`,
        component: 'Input',
      },
    ],
  };
};

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '任务ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 200,
    },
    {
      title: '分销商',
      dataIndex: 'info',
      ellipsis: true,
    },
    {
      title: '隶属',
      dataIndex: 'num',
    },
    {
      title: '推广链接',
      dataIndex: 'end',
      ellipsis: true,
    },
    {
      title: '平台',
      dataIndex: 'num',
    },
    {
      title: '小程序路径',
      dataIndex: 'num',
    },
    {
      title: '对应剧集',
      dataIndex: 'num',
    },
    {
      title: '状态',
      dataIndex: 'state',
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
