import { BasicColumn, FormProps } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';

enum STATE_ENUM {
  DEL = -1,
  WAIT = 1,
  SUCCESS = 2,
  REJECT = 3,
  CANCEL = 4,
}

const stateEnum = {
  [STATE_ENUM.DEL]: '删除',
  [STATE_ENUM.WAIT]: '等待处理',
  [STATE_ENUM.SUCCESS]: '处理成功',
  [STATE_ENUM.REJECT]: '驳回',
  [STATE_ENUM.CANCEL]: '用户取消',
};

export const getWithDrawFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      // {
      //   field: `name`,
      //   label: `分销商：`,
      //   component: 'Input',
      // },
      {
        field: `channelId`,
        label: `渠道ID：`,
        component: 'Input',
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
              label: '等待处理',
              value: 1,
            },
            {
              label: '处理完成',
              value: 2,
            },
            {
              label: '驳回',
              value: 3,
            },
            {
              label: '用户取消',
              value: 4,
            },
          ],
        },
      },
      // {
      //   field: '[startDate, endDate]',
      //   label: '日期范围',
      //   component: 'RangePicker',
      //   componentProps: {
      //     format: 'YYYY-MM-DD',
      //     placeholder: ['开始日期', '结束日期'],
      //   },
      // },
    ],
  };
};

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '提现记录id',
      dataIndex: 'id',
      ellipsis: true,
    },
    {
      title: '用户id',
      dataIndex: 'uid',
    },
    {
      title: '用户名',
      dataIndex: 'uName',
    },
    {
      title: '提现金额',
      dataIndex: 'money',
      customRender({ value }) {
        return <div>{value / 10000}</div>;
      },
    },
    {
      title: '银行卡账户姓名',
      dataIndex: 'name',
    },
    {
      title: '银行名称',
      dataIndex: 'bankName',
    },
    {
      title: '银行卡号',
      dataIndex: 'bankCard',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '备注',
      dataIndex: 'notes',
    },
    {
      title: 'initiateTime',
      dataIndex: '创建时间',
      customRender({ value }) {
        const time = formatToDateTime(value);
        return <div>{time}</div>;
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      customRender({ value }) {
        return <div>{stateEnum[value]}</div>;
      },
    },
    {
      title: 'dealUid',
      dataIndex: '处理用户id',
    },
    {
      title: 'dealUName',
      dataIndex: '处理用户名',
    },
    {
      title: 'dealNotes',
      dataIndex: '处理用户备注',
    },
    {
      title: 'dealTime',
      dataIndex: '处理用户备注',
      customRender({ value }) {
        const time = formatToDateTime(value);
        return <div>{time}</div>;
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
