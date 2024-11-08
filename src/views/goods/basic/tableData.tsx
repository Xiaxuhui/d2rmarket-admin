import { BasicColumn, FormProps } from '@/components/Table';
import { TYPE_SELECTION, TYPE_TEXT } from '@/contants';

export const getFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `type`,
        label: `Type:`,
        component: 'Select',
        componentProps: {
          options: TYPE_SELECTION,
        },
        colProps: {
          xl: 10,
          xxl: 6,
        },
      },
    ],
  };
};

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: 'Type',
      width: 300,
      dataIndex: 'type',
      format(text) {
        return TYPE_TEXT[text];
      },
    },
    {
      title: 'Operation',
      align: 'center',
      dataIndex: 'operation',
    },
  ];
}
