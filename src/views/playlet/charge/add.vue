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
  import { addCharge, detailCharge, updateCharge } from '@/api/playlet/charge';
  import { useRouter, useRoute } from 'vue-router';
  import { onMounted } from 'vue';

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '添加充值方案',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '商品名称：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'data',
      component: 'Input',
      label: '商品介绍：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'type',
      component: 'Select',
      label: '类型：',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: 'vip',
            value: '1',
            key: 'vip',
          },
          {
            label: '豆子',
            value: '2',
            key: '豆子',
          },
        ],
      },
    },
    {
      field: 'price',
      component: 'Input',
      label: '价格：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'vipDays',
      component: 'Input',
      label: 'vip天数：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'vipExp',
      component: 'Input',
      label: 'vip经验：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'bean',
      component: 'Input',
      label: '豆子数：',
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
  ];
  const { back } = useRouter();
  const route = useRoute();
  const id = route.query.id;
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
    const res = await detailCharge({ id });
    if (res) {
      methods.setFieldsValue(res);
    }
  }

  onMounted(() => {
    if (id) {
      getData();
    }
  });

  async function handleSubmit(values: any) {
    if (id) {
      await updateCharge(Object.assign(values, { priceRateId: id }));
      return;
    }
    await addCharge(Object.assign(values, { uid: 2 }));
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
