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
      componentProps: {
        type: 'password',
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
  ];
  const { createMessage } = useMessage();

  const { back } = useRouter();

  const [registerModal, { openModal }] = useModal();

  const [register] = useForm({
    labelWidth: 120,
    isNotRow: true,
    schemas,
    actionColOptions: {
      span: 10,
    },
    submitButtonOptions: {
      text: '提交',
    },
    showResetButton: true,
    showSubmitButton: true,
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
