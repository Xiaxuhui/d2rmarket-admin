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

export const getFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `name`,
        label: `剧名：`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `tag`,
        label: `标签：`,
        component: 'Select',
        colProps: {
          xl: 12,
          xxl: 8,
        },
        componentProps: {
          mode: 'multiple',
          options: [
            {
              label: '言情',
              value: 1,
            },
            {
              label: '古装',
              value: 2,
            },
          ],
        },
      },
      {
        field: `state`,
        label: `状态：`,
        component: 'Select',
        colProps: {
          xl: 12,
          xxl: 8,
        },
        componentProps: {
          options: [
            {
              label: '已完结',
              value: 10,
            },
            {
              label: '更新中',
              value: 20,
            },
          ],
        },
      },
      {
        field: `producer`,
        label: `片方：`,
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
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 200,
    },
    {
      title: '主剧信息',
      dataIndex: 'info',
      ellipsis: true,
    },
    {
      title: '集数',
      dataIndex: 'num',
      width: 50,
    },
    {
      title: '更新至',
      width: 50,
      dataIndex: 'end',
    },
    {
      title: '是否完结',
      width: 100,
      dataIndex: 'state',
      // format(state) {
      //   return stateEnum[state];
      // },
      customRender({ value }) {
        return <div class={colorText({ color: value })}>{stateEnum[value]}</div>;
      },
    },
    {
      title: '链接',
      width: 150,
      dataIndex: 'link',
    },
    {
      title: '权重',
      width: 50,
      dataIndex: 'weight',
    },
    {
      title: '片方',
      width: 150,
      dataIndex: 'producer',
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
