import { BasicColumn, FormProps } from '@/components/Table';
import { tv } from 'tailwind-variants';

enum STATE_ENUM {
  del = -1,
  normal = 1,
  disabled = 2,
}

const colorText = tv({
  variants: {
    color: {
      [STATE_ENUM.del]: 'text-red',
      [STATE_ENUM.disabled]: 'text-red',
    },
  },
});

const stateEnum = {
  [STATE_ENUM.del]: '删除',
  [STATE_ENUM.normal]: '正常',
  [STATE_ENUM.disabled]: '禁用',
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
      // {
      //   field: `level`,
      //   label: `等级：`,
      //   component: 'Select',
      //   colProps: {
      //     xl: 12,
      //     xxl: 8,
      //   },
      //   componentProps: {
      //     options: [
      //       {
      //         label: '一级',
      //         value: 1,
      //       },
      //       {
      //         label: '二级',
      //         value: 2,
      //       },
      //       {
      //         label: '三级',
      //         value: 3,
      //       },
      //     ],
      //   },
      // },
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
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '上级分销商',
      dataIndex: 'parentName',
    },
    {
      title: '备注',
      dataIndex: 'notes',
    },
    {
      title: '账号',
      dataIndex: 'account',
      align: 'center',
    },
    {
      title: '密码',
      dataIndex: 'pwd',
      align: 'center',
    },
    {
      title: '可提现金额',
      dataIndex: 'remain_m',
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
      title: '操作',
      width: 300,
      align: 'center',
      dataIndex: 'operation',
    },
  ];
}
