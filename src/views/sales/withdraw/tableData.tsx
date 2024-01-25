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

export const getWithDrawFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `name`,
        label: `分销商：`,
        component: 'Input',
      },
      {
        field: `producer`,
        label: `隶属：`,
        component: 'Input',
      },
      {
        field: '[startDate, endDate]',
        label: '日期范围',
        component: 'RangePicker',
        componentProps: {
          format: 'YYYY-MM-DD',
          placeholder: ['开始日期', '结束日期'],
        },
      },
    ],
  };
};

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '时间',
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
      title: '提现金额',
      dataIndex: 'end',
    },
    {
      title: '当前余额',
      dataIndex: 'num',
    },
    {
      title: '提现信息',
      dataIndex: 'num',
    },
    {
      title: '状态',
      dataIndex: 'state',
      // format(state) {
      //   return stateEnum[state];
      // },
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
