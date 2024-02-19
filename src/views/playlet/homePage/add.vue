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
  import { detail, add, update } from '@/api/playlet/homePage';
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
      field: 'type',
      component: 'Select',
      label: '类型：',
      componentProps: {
        options: [
          {
            label: '小程序',
            value: '1',
            key: '1',
          },
        ],
      },
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
      field: 'weight',
      component: 'Input',
      label: '权重：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'v1',
      component: 'Input',
      label: '跳转视频ID：',
      colProps: {
        span: 8,
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
    const res = await detail({ id });
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
    if (id) {
      update({ ...values, id });
    } else {
      add(values);
    }
    back();
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
