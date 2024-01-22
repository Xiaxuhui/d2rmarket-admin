<template>
  <div class="m-4 bg-white">
    <BasicForm class="local_form" @register="register" @submit="handleSubmit">
      <template #resetBefore>
        <a-button class="mr-2" @click="back">返回</a-button>
      </template>
    </BasicForm>
  </div>
</template>
<script lang="tsx" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useRouter } from 'vue-router';

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '添加任务',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'field1',
      component: 'Input',
      label: '平台：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '小程序路径：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field3',
      component: 'Input',
      label: '对应剧集：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field4',
      component: 'Select',
      label: '隶属：',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: 'xlsx',
            value: 'xlsx',
            key: 'xlsx',
          },
          {
            label: 'html',
            value: 'html',
            key: 'html',
          },
          {
            label: 'csv',
            value: 'csv',
            key: 'csv',
          },
          {
            label: 'txt',
            value: 'txt',
            key: 'txt',
          },
        ],
      },
    },
    {
      field: 'field5',
      component: 'Select',
      label: '分销商：',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: 'xlsx',
            value: 'xlsx',
            key: 'xlsx',
          },
          {
            label: 'html',
            value: 'html',
            key: 'html',
          },
          {
            label: 'csv',
            value: 'csv',
            key: 'csv',
          },
          {
            label: 'txt',
            value: 'txt',
            key: 'txt',
          },
        ],
      },
    },
  ];
  const { createMessage } = useMessage();

  const { back } = useRouter();

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
