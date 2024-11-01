import { BasicColumn, FormProps } from '@/components/Table';
import { QUALITY_SELECTION, QUALITY_TEXT, TYPE_SELECTION, TYPE_TEXT } from '@/contants';
import { formatToDateTime } from '@/utils/dateUtil';

export const getPromoteFormConfig: () => Partial<FormProps> = () => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `name`,
        label: `Name:`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `id`,
        label: `Id:`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `type`,
        label: `Type:`,
        component: 'Select',
        componentProps: {
          options: TYPE_SELECTION,
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `location`,
        label: `Location:`,
        component: 'ApiSelect',
        componentProps: {
          options: [],
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `quality`,
        label: `Quality:`,
        component: 'Select',
        componentProps: {
          options: QUALITY_SELECTION,
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `role`,
        label: `RoleSpecific:`,
        component: 'Select',
        componentProps: {
          options: [],
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
};

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      fixed: 'left',
    },
    {
      title: 'name',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: 'img',
      dataIndex: 'img',
      customRender({ value }) {
        return <img src={value} alt="" />;
      },
    },
    {
      title: 'type',
      dataIndex: 'type',
      customRender({ value }) {
        return <div>{TYPE_TEXT[value]}</div>;
      },
    },
    {
      title: 'quality',
      dataIndex: 'quality',
      customRender({ value }) {
        return <div>{QUALITY_TEXT[value]}</div>;
      },
    },
    {
      title: 'role specific',
      dataIndex: 'role',
      customRender({ value }) {
        return <div>{value}</div>;
      },
    },
    {
      title: 'ctime',
      dataIndex: 'ctime',
      customRender({ value }) {
        return formatToDateTime(value);
      },
    },
    {
      title: 'inventory',
      dataIndex: 'inventory',
    },
    {
      title: 'status',
      dataIndex: 'status',
    },
    {
      title: 'price',
      dataIndex: 'price',
    },
    {
      title: 'operation',
      width: 350,
      dataIndex: 'operation',
    },
  ];
}
