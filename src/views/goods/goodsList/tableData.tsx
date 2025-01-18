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
    labelWidth: 150,
    submitButtonOptions: {
      text: 'Search(查询)',
    },
    resetButtonOptions: {
      text: 'Reset(重置)',
    },
    schemas: [
      {
        field: `name`,
        label: `Name(名称):`,
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
        label: `Type(类型):`,
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
        label: `Quality(品质):`,
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
        label: `RoleSpecific(角色专属):`,
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
      title: 'name(名称)',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: 'img(图片)',
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
      title: 'type(类型)',
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
      title: 'quality(品质)',
      dataIndex: 'quality',
      customRender({ value }) {
        return <div>{QUALITY_TEXT[value] || '-'}</div>;
      },
    },
    {
      title: 'role specific(角色专属)',
      dataIndex: 'role',
      customRender({ value }) {
        if (!value) {
          return '-';
        }
        return <div>{ROLE_TEXT[value]}</div>;
      },
    },
    {
      title: 'activity id(活动id)',
      dataIndex: 'discounts',
      customRender({ value }) {
        if (!value) {
          return '-';
        }
        return value;
      },
    },
    {
      title: 'ctime(创建时间)',
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
      title: 'status(状态)',
      dataIndex: 'state',
      customRender({ value }) {
        return STATUS_TEXT[value];
      },
    },
    {
      title: 'hot(热销状态)',
      dataIndex: 'hot',
      customRender({ value }) {
        return value ? 'hot sale' : 'Non-hot';
      },
    },
    {
      title: 'operation(操作)',
      width: 500,
      dataIndex: 'operation',
    },
  ];
}
