import { BasicColumn, FormProps } from '@/components/Table';
import { ORDER_SELECTION, ORDER_TEXT } from '@/contants';
import { useGlobSetting } from '@/hooks/setting';
import { getColorText, numberFixed } from '@/utils';
import { formatToDateTime } from '@/utils/dateUtil';
import { Image } from 'ant-design-vue';

const { appDomain } = useGlobSetting();

export const getWithDrawFormConfig: (query: Record<string, any>) => Partial<FormProps> = ({
  email,
}) => {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'id',
        label: 'OrderId',
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: 'status',
        label: 'Status',
        component: 'Select',
        componentProps: {
          options: ORDER_SELECTION,
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: 'email',
        label: 'Email',
        component: 'Input',
        defaultValue: email ? email : '',
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
      title: 'OrderId',
      dataIndex: 'id',
      fixed: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      fixed: true,
      customRender({ value }) {
        return <div style={{ color: getColorText(value) }}>{ORDER_TEXT[value]}</div>;
      },
    },
    {
      title: 'Uid',
      dataIndex: 'uid',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Attachment',
      dataIndex: 'attachments',
      customRender({ value }) {
        const imgFile = (value || [])[0] || {};
        const { url, name } = imgFile;
        if (!url) {
          return null;
        }
        return (
          <div class={'flex items-center justify-center'}>
            <Image
              class={'rounded-[4px]'}
              width={100}
              height={100}
              src={`${appDomain}${url}`}
              alt={name}
            />
          </div>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'relAmount',
      customRender({ value }) {
        return numberFixed((+value || 0) / 100, 2);
      },
    },
    {
      title: 'Coupon Id',
      dataIndex: 'coupon',
      customRender({ value }) {
        return value ? value : '-';
      },
    },
    {
      title: 'Create Time',
      dataIndex: 'ctime',
      customRender({ value }) {
        return formatToDateTime(value * 1000);
      },
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
    },
    {
      title: 'Operation',
      width: 250,
      dataIndex: 'operation',
    },
  ];
}
