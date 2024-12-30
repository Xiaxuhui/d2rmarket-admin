import { ORDER_TEXT } from '@/contants';
import { getColorText } from '@/utils';
import { formatToDateTime } from '@/utils/dateUtil';
import { ColumnsType } from 'ant-design-vue/lib/table';

export const columns: ColumnsType<any> = [
  {
    title: 'OrderId(订单id)',
    dataIndex: 'id',
  },
  {
    title: 'Create Time(创建时间)',
    dataIndex: 'ctime',
    customRender({ value }) {
      return formatToDateTime(value * 1000);
    },
  },
  {
    title: 'Status(状态)',
    dataIndex: 'status',
    customRender({ value }) {
      return <div style={{ color: getColorText(value) }}>{ORDER_TEXT[value]}</div>;
    },
  },
  {
    title: 'Detail(详情)',
    dataIndex: 'detail',
    key: 'detail',
  },
  {
    title: 'Operation(操作)',
    dataIndex: 'operation',
  },
];
