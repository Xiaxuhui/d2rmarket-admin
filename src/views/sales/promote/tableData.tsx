import { BasicColumn, FormProps } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';
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

export const getPromoteFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `investId`,
        label: `任务ID：`,
        component: 'Input',
      },
      {
        field: `pf`,
        label: `平台：`,
        component: 'Input',
      },
      {
        field: `channelId`,
        label: `渠道：`,
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
    },
    {
      title: '渠道名',
      dataIndex: 'channelId',
      ellipsis: true,
    },
    {
      title: '内容',
      dataIndex: 'data',
    },
    {
      title: '推广链接',
      dataIndex: 'link',
      ellipsis: true,
    },
    {
      title: '内部链接',
      dataIndex: 'link2',
    },
    {
      title: '平台',
      dataIndex: 'pf',
    },
    {
      title: '备注',
      dataIndex: 'notes',
    },
    {
      title: '创建时间',
      dataIndex: 'startTime',
      width: 200,
      customRender({ value }) {
        const time = formatToDateTime(value);
        return <div>{time}</div>;
      },
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
