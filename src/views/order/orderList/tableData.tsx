import { BasicColumn, FormProps } from '@/components/Table';
import { ORDER_TEXT } from '@/contants';
import { useGlobSetting } from '@/hooks/setting';
import { numberFixed } from '@/utils';
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
      dataIndex: 'amount',
      customRender({ value }) {
        return numberFixed((+value || 0) / 100, 2);
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
      title: 'Status',
      dataIndex: 'status',
      customRender({ value }) {
        return ORDER_TEXT[value];
      },
    },
    {
      title: 'Operation',
      width: 150,
      dataIndex: 'operation',
    },
  ];
}
