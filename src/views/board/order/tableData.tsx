import { BasicColumn, FormProps } from '@/components/Table';

enum STATE_ENUM {
  vip = 1,
  dou = 2,
  blogs = 3,
  blog = 4,
}

const stateEnum = {
  [STATE_ENUM.vip]: '花钱买VIP',
  [STATE_ENUM.dou]: '花钱买豆子',
  [STATE_ENUM.blogs]: '购买合集博客',
  [STATE_ENUM.blog]: '购买单集博客',
};

export const getWithDrawFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'statisticType',
        label: '统计类型',
        component: 'Select',
        componentProps: {
          options: [
            {
              label: '按小时',
              value: 1,
            },
            {
              label: '按天',
              value: 2,
            },
            {
              label: '按周',
              value: 3,
            },
          ],
        },
        colProps: {
          xl: 8,
        },
      },
      {
        field: 'type',
        label: '类型',
        component: 'Select',
        componentProps: {
          options: [
            {
              label: '买VIP',
              value: 1,
            },
            {
              label: '买豆子',
              value: 2,
            },
            {
              label: '买合集博客',
              value: 3,
            },
            {
              label: '买单集博客',
              value: 4,
            },
          ],
        },
        colProps: {
          xl: 8,
        },
      },
      {
        field: '[startTime, endTime]',
        label: '日期范围',
        component: 'RangePicker',
        valueFormat: 'YYYY-MM-DD',
        componentProps: {
          format: 'YYYY-MM-DD',
          placeholder: ['开始日期', '结束日期'],
        },
        colProps: {
          xl: 8,
        },
      },
    ],
  };
};

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '时间',
      dataIndex: 'dateTime',
      // customRender({ value }) {
      //   const time = formatToDateTime(value);
      //   return <div>{time}</div>;
      // },
    },
    {
      title: '总计花豆子',
      dataIndex: 'totalBean',
    },
    {
      title: '总计花钱',
      dataIndex: 'totalMoney',
    },
    {
      title: '总计豆子价值钱',
      dataIndex: 'equivalentMoney',
      // customRender({ value }) {
      //   return <div>{value / 10000}</div>;
      // },
    },
    {
      title: '类型',
      dataIndex: 'type',
      customRender({ value }) {
        return <div>{stateEnum[value]}</div>;
      },
    },
    // {
    //   title: '次数',
    //   dataIndex: 'k6',
    // },
    {
      title: '操作',
      width: 100,
      dataIndex: 'operation',
      align: 'center',
    },
  ];
}
