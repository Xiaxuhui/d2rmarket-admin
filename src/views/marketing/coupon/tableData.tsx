import { BasicColumn, FormProps } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';

export const getFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `note`,
        label: `Desc:`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `code`,
        label: `Code:`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
};

export const getBasicColumns: () => BasicColumn[] = () => {
  return [
    {
      title: 'Coupon Id',
      dataIndex: 'id',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Desc',
      dataIndex: 'note',
      ellipsis: true,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      ellipsis: true,
    },
    {
      title: 'Rest',
      dataIndex: 'used',
      customRender({ record }) {
        const { used, num } = record;
        return num - used;
      },
    },

    {
      title: 'Valid Date',
      dataIndex: 'code',
      width: 400,
      customRender({ record }) {
        const { start, end } = record;
        return formatToDateTime(start) + '~' + formatToDateTime(end);
      },
    },
    {
      title: 'operation',
      width: 350,
      dataIndex: 'operation',
    },
  ];
};
