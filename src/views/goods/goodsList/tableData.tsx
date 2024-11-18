import { BasicColumn, FormProps } from '@/components/Table';
import {
  QUALITY_SELECTION,
  QUALITY_TEXT,
  ROLE_SELECTION,
  ROLE_TEXT,
  STATUS_TEXT,
  TYPE_SELECTION,
  TYPE_TEXT,
} from '@/contants';
import { useGlobSetting } from '@/hooks/setting';
import { formatToDateTime } from '@/utils/dateUtil';
import { Image } from 'ant-design-vue';

const { appDomain } = useGlobSetting();

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
          options: ROLE_SELECTION,
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
      dataIndex: 'imageUrl',
      align: 'center',
      customRender({ value }) {
        if (!value) {
          return null;
        }
        return (
          <div class={'flex items-center justify-center'}>
            <Image
              class={'rounded-[4px]'}
              width={100}
              height={100}
              src={`${appDomain}${value}`}
              alt={value}
            />
          </div>
        );
      },
    },
    {
      title: 'type',
      dataIndex: 'ptype',
      customRender({ value, record }) {
        return (
          <div>
            {TYPE_TEXT[value]}/{record.typeName}
          </div>
        );
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
        if (!value) {
          return null;
        }
        return <div>{ROLE_TEXT[value]}</div>;
      },
    },
    {
      title: 'ctime',
      dataIndex: 'ctime',
      customRender({ value }) {
        return formatToDateTime(value * 1000);
      },
    },
    // {
    //   title: 'inventory',
    //   dataIndex: 'inventory',
    // },
    {
      title: 'status',
      dataIndex: 'state',
      customRender({ value }) {
        return STATUS_TEXT[value];
      },
    },
    // {
    //   title: 'price',
    //   dataIndex: 'price',
    // },
    {
      title: 'operation',
      width: 350,
      dataIndex: 'operation',
    },
  ];
}
