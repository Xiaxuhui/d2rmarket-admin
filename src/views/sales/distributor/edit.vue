<template>
  <div class="m-4 bg-white">
    <BasicForm class="local_form" @register="register" @submit="handleSubmit">
      <template #resetBefore>
        <a-button class="mr-2" @click="back">返回</a-button>
      </template>
      <template #submitBefore>
        <a-button type="primary" class="mr-2">添加下级</a-button>
      </template>
      <template #advanceBefore>
        <a-button type="primary" danger class="mr-2">禁用</a-button>
      </template>
    </BasicForm>
    <SeriesModal @register="registerModal" />
  </div>
</template>
<script lang="tsx" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';
  import { Input } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { useModal } from '@/components/Modal';
  import SeriesModal from './components/seriesModal.vue';
  import FormTable from './components/formTable.vue';
  import { onMounted } from 'vue';

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '添加分销商',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'field1',
      component: 'Input',
      label: '用户名：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '昵称：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field3',
      component: 'Input',
      label: '密码：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field4',
      component: 'Input',
      label: '隶属：',
      colProps: {
        span: 8,
      },
      componentProps: {
        disabled: true,
      },
    },
    {
      field: 'field5',
      component: 'Switch',
      label: '可添加下级：',
      colProps: {
        span: 8,
      },
      componentProps: {},
    },
    {
      field: 'field6',
      component: 'Switch',
      label: '可提现：',
      colProps: {
        span: 8,
      },
      componentProps: {},
    },
    {
      field: 'field7',
      component: 'Input',
      label: '分成：',
      helpMessage: '与上级分成比例',
      colProps: {
        span: 8,
      },
      suffix: '%',
    },
    {
      field: 'field8',
      component: 'Input',
      label: '抽成：',
      helpMessage: '渠道总抽成比例',
      colProps: {
        span: 8,
      },
      suffix: '%',
    },
    {
      field: 'field9',
      component: 'Input',
      label: '片方分成：',
      helpMessage: '片方与上级分成比例',
      render: ({ model, field }) => {
        return (
          <div class="relative">
            <Input v-model:value={model[field]} placeholder="请输入" />
            <a
              class="absolute w-[60px] right-[-100px] top-1/2 translate-y-[-50%]"
              onClick={() => {
                openModal(true, { [field]: model[field] });
              }}
            >
              相关短剧
            </a>
          </div>
        );
      },
      colProps: {
        span: 8,
      },
      suffix: '%',
    },
    {
      field: 'field10',
      component: 'Input',
      label: '推广剧集：',
      colProps: {
        span: 16,
      },
      renderColContent({ model, field }) {
        return (
          <>
            <FormTable
              field="field10"
              label="推广剧集："
              v-model:value={model[field]}
              columns={seriesColumns}
              editProps={['price']}
              actionOptions={{
                text: '添加剧集',
                api: () => {
                  return Promise.resolve([{ id: '321', price: 11 }]);
                },
                props: {
                  title: '选择剧集',
                  columns: [
                    {
                      title: 'id',
                      dataIndex: 'id',
                      width: 100,
                    },
                    {
                      title: 'price',
                      dataIndex: 'price',
                      width: 100,
                    },
                  ],
                },
              }}
            />
          </>
        );
      },
    },
    {
      field: 'field11',
      component: 'Input',
      label: '推广道具：',
      colProps: {
        span: 16,
      },
      renderColContent({ model, field }) {
        return (
          <>
            <FormTable
              label="推广道具："
              field="field11"
              v-model:value={model[field]}
              columns={seriesColumns}
              editProps={['price']}
              actionOptions={{
                text: '添加道具',
                api: () => {
                  return Promise.resolve([{ id: '321', price: 11 }]);
                },
                props: {
                  title: '选择道具',
                  columns: [
                    {
                      title: 'id',
                      dataIndex: 'id',
                      width: 100,
                    },
                    {
                      title: 'price',
                      dataIndex: 'price',
                      width: 100,
                    },
                  ],
                },
              }}
            />
          </>
        );
      },
    },
  ];
  const { createMessage } = useMessage();

  const { back } = useRouter();

  const [registerModal, { openModal }] = useModal();

  const [register, { setFieldsValue }] = useForm({
    labelWidth: 120,
    isNotRow: true,
    schemas,
    actionColOptions: {
      span: 12,
    },
    submitButtonOptions: {
      text: '提交',
    },
    showResetButton: true,
    showSubmitButton: true,
  });

  const seriesColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'price',
      dataIndex: 'price',
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ];

  onMounted(() => {
    setFieldsValue({
      field1: '夏旭辉',
      field2: '麻瓜',
      field3: '123456',
      field4: '半次元',
      field5: true,
      field6: true,
      field7: 17,
      field8: 17,
      field9: 17,
      field10: [{ id: 123, price: 10 }],
      field11: [{ id: 321, price: 11 }],
    });
  });

  function handleSubmit(values: any) {
    console.log('submit values', values);
    createMessage.success('click search,values:' + JSON.stringify(values));
  }
</script>
<style lang="less" scoped>
  :deep(.local_form) .local_typeValue {
    width: calc(100% - 120px);
    margin-bottom: 0;
    margin-left: -1px;
    border-right: 0;

    .ant-input {
      border-radius: 0 6px 6px 0;
    }
  }
</style>
