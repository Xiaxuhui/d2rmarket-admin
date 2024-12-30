import { BasicColumn, FormProps } from '@/components/Table';
import { PageEnum } from '@/enums/pageEnum';
import { router } from '@/router';

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
        field: `email`,
        label: `Email(邮箱):`,
        component: 'Input',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
      {
        field: `name`,
        label: `Name(名字):`,
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
      title: 'Uid(用户id)',
      dataIndex: 'id',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Email(邮箱)',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: 'First Name(姓)',
      dataIndex: 'firstName',
      ellipsis: true,
    },
    {
      title: 'Last Name(名)',
      dataIndex: 'lastName',
      ellipsis: true,
    },
    {
      title: 'Name(名字)',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: 'Points(积分)',
      dataIndex: 'point',
    },
    {
      title: 'Order Record(订单记录)',
      dataIndex: 'record',
      customRender({ record }) {
        return (
          <a
            onClick={() => {
              router.push({
                path: PageEnum.ORDER_LIST,
                query: {
                  email: record.email,
                },
              });
            }}
          >
            record
          </a>
        );
      },
    },
  ];
};
