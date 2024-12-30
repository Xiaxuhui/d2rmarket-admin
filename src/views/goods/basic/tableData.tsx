import { BasicColumn, FormProps } from '@/components/Table';
import { TYPE_SELECTION, TYPE_TEXT } from '@/contants';

export const getFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    submitButtonOptions: {
      text: 'Search(查询)',
    },
    resetButtonOptions: {
      text: 'Reset(重置)',
    },
    schemas: [
      {
        field: `type`,
        label: `Type(类型):`,
        component: 'Select',
        componentProps: {
          options: TYPE_SELECTION,
        },
        colProps: {
          xl: 10,
          xxl: 6,
        },
      },
      {
        field: `name`,
        label: `Name(名称):`,
        component: 'Input',
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
      title: 'Name(名称)',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: 'Type(类型)',
      width: 300,
      dataIndex: 'type',
      format(text) {
        return TYPE_TEXT[text];
      },
    },
    {
      title: 'Operation(操作)',
      align: 'center',
      dataIndex: 'operation',
    },
  ];
}
