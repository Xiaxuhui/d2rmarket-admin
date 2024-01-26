import { BasicColumn } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';
import { tv } from 'tailwind-variants';

enum STATE_ENUM {
  DEL = -1,
  OPEN = 1,
  CLOSE = 2,
}

const stateEnum = {
  [STATE_ENUM.DEL]: '删除',
  [STATE_ENUM.OPEN]: '开启',
  [STATE_ENUM.CLOSE]: '关闭',
};

const colorText = tv({
  variants: {
    color: {
      [STATE_ENUM.OPEN]: 'text-red',
    },
  },
});

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '展示ID',
      dataIndex: 'id',
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '链接',
      dataIndex: 'data',
    },
    {
      title: '备注',
      dataIndex: 'notes',
    },
    {
      title: '权重',
      dataIndex: 'weight',
    },
    {
      title: '需要跳转视频ID',
      dataIndex: 'v1',
    },
    {
      title: '备注',
      dataIndex: 'notes',
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
      title: '状态',
      dataIndex: 'state',
      customRender({ value }) {
        return <div class={colorText({ color: value })}>{stateEnum[value]}</div>;
      },
    },
    {
      title: '操作',
      width: 200,
      dataIndex: 'operation',
      fixed: 'right',
    },
  ];
}
