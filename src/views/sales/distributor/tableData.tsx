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
  [STATE_ENUM.END]: '下线',
};

export const getFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `name`,
        label: `分销商：`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `level`,
        label: `等级：`,
        component: 'Select',
        colProps: {
          xl: 12,
          xxl: 8,
        },
        componentProps: {
          options: [
            {
              label: '一级',
              value: 1,
            },
            {
              label: '二级',
              value: 2,
            },
            {
              label: '三级',
              value: 3,
            },
          ],
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
      title: '等级',
      dataIndex: 'level',
      width: 100,
      fixed: 'left',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 130,
    },
    {
      title: '佣金比例',
      dataIndex: 'percent',
      align: 'center',
    },
    {
      title: '账户余额',
      dataIndex: 'amount',
      align: 'center',
    },
    {
      title: '状态',
      width: 80,
      dataIndex: 'state',
      customRender({ value }) {
        return <div class={colorText({ color: value })}>{stateEnum[value]}</div>;
      },
    },
    {
      title: '下级',
      dataIndex: 'num',
      width: 80,
    },
    {
      title: '操作',
      width: 250,
      align: 'center',
      dataIndex: 'operation',
    },
  ];
}

export async function getTreeTableData() {
  return (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        level: 1,
        id: `${index}`,
        name: 'John Brown',
        num: index === 5 ? 0 : 20,
        state: 10,
        percent: '50%',
        amount: 20,
      });
    }
    return arr;
  })();
}

export const getModalData = async () => {
  const arr: any = [];
  for (let index = 0; index < 40; index++) {
    arr.push({
      level: 1,
      id: `${index}`,
      name: 'John Brown',
      num: index === 5 ? 0 : 20,
      state: 10,
      percent: '50%',
      amount: 20,
    });
  }
  return arr;
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
