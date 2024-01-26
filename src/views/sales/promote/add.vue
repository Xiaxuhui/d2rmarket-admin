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
  import { onMounted } from 'vue';
  import { detailPromote, addPromote } from '@/api/promote';
  import { useRouter, useRoute } from 'vue-router';

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
      field: 'channelId',
      component: 'Input',
      label: '推广渠道：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'link',
      component: 'Input',
      label: '推广链接：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'link2',
      component: 'Input',
      label: '内部链接：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'pf',
      component: 'Input',
      label: '平台：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'notes',
      component: 'Input',
      label: '备注：',
      colProps: {
        span: 8,
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
  const route = useRoute();
  const id = route.query.id;

  const { back } = useRouter();

  const [register, methods] = useForm({
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

  async function getData() {
    const res = await detailPromote({ investId: id });
    if (res) {
      methods.setFieldsValue(res);
    }
  }

  onMounted(() => {
    if (id) {
      getData();
    }
  });

  function handleSubmit(values: any) {
    addPromote(values);
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
