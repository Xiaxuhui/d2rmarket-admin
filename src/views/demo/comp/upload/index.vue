<template>
  <PageWrapper title="上传组件示例">
    <Alert message="基础示例" />

    <Alert message="嵌入表单,加入表单校验" />

    <BasicForm @register="register" class="my-5" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { PageWrapper } from '@/components/Page';
  import { Alert } from 'ant-design-vue';

  const schemas: FormSchema[] = [];
  const [register] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: {
      span: 16,
    },
  });
</script>
