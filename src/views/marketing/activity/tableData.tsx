import { BasicColumn, FormProps } from '@/components/Table';
import { formatToDateTime } from '@/utils/dateUtil';

export const getFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `id`,
        label: `Activity Id:`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `name`,
        label: `Name:`,
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
      title: 'Activity Id',
      dataIndex: 'id',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: 'Desc',
      dataIndex: 'note',
      ellipsis: true,
    },
    {
      title: 'Valid Date',
      dataIndex: 'code',
      width: 400,
      customRender({ record }) {
        const { start, end, forever } = record;
        if (forever) {
          return 'indefinite';
        }
        return formatToDateTime(start) + '～' + formatToDateTime(end);
      },
    },
    {
      title: 'operation',
      width: 350,
      dataIndex: 'operation',
    },
  ];
};
