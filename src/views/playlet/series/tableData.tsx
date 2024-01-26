import { BasicColumn, FormProps } from '@/components/Table';
import { SelectValue } from 'ant-design-vue/es/select';
import { tv } from 'tailwind-variants';
import * as api from '@/api/sys/series';

enum STATE_ENUM {
  END = 1,
  UPDATE = 0,
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
  [STATE_ENUM.UPDATE]: '更新中',
};

export const getFormConfig: ({ label }: { label: string }) => Partial<FormProps> = ({ label }) => {
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
        component: 'LabelSelector',
        componentProps: {
          defaultValue: (label ? +label : null) as SelectValue,
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `updateState`,
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
              value: 1,
            },
            {
              label: '更新中',
              value: 0,
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

export const getSeriesColumns: () => BasicColumn[] = () => {
  return [
    {
      title: '剧名',
      dataIndex: 'name',
      width: 150,
      ellipsis: true,
    },
    {
      title: '剧描述',
      dataIndex: 'info',
    },
    {
      title: '设置时间',
      dataIndex: 'time',
      width: 150,
    },
  ];
};

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '集数',
      dataIndex: 'meta',
      width: 50,
      customRender({ value }) {
        let meta = [];
        if (value) {
          meta = JSON.parse(value) ?? [];
        }
        return <div>{meta.length}</div>;
      },
    },
    // {
    //   title: '更新至',
    //   width: 50,
    //   customRender({ value }) {
    //     return <div class={colorText({ color: value })}>{stateEnum[value]}</div>;
    //   },
    // },
    {
      title: '是否完结',
      dataIndex: 'updateState',
      customRender({ value }) {
        return <div class={colorText({ color: value })}>{stateEnum[value] ?? ''}</div>;
      },
    },
    {
      title: '权重',
      dataIndex: 'weight',
    },
    {
      title: '片方',
      dataIndex: 'uName',
    },
    {
      title: '操作',
      width: 300,
      dataIndex: 'operation',
    },
  ];
}

export function getDiversityColumns(): BasicColumn[] {
  const stateMap = {
    '-1': '删除',
    0: '异常',
    10: '等待中',
    5: '正常',
    200: '可公开',
    300: '已完成',
  };

  return [
    {
      title: '片名',
      dataIndex: 'title',
      fixed: 'left',
      edit: true,
      editComponent: 'Input',
    },
    {
      title: '小程序地址',
      dataIndex: 'num',
    },
    {
      title: '是否推荐',
      dataIndex: 'f',
      edit: true,
      editComponent: 'Switch',
      customRender() {
        return '是';
      },
    },
    {
      title: '金豆价格',
      width: 100,
      dataIndex: 'state',
    },
    {
      title: '点赞',
      dataIndex: 'link',
    },
    {
      title: '状态',
      dataIndex: 'state',
      customRender({ value }) {
        if (stateMap[value]) {
          return stateMap[value];
        } else {
          return '未知的状态：' + value;
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
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
