<template>
  <div class="m-4 p-4 bg-white">
    <BasicForm class="local_form" @register="register" @submit="handleSubmit">
      <template #resetBefore>
        <a-button class="mr-2" @click="back">返回</a-button>
      </template>
    </BasicForm>
    <SeriesModal @register="registerModal" />
  </div>
</template>
<script lang="tsx" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useRoute, useRouter } from 'vue-router';
  import { useModal } from '@/components/Modal';
  import SeriesModal from './components/seriesModal.vue';

  const { id } = useRoute().query;
  const isEditStatus = Boolean(id);

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: isEditStatus ? '编辑剧集' : '添加新的剧集',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'field1',
      component: 'Input',
      label: '标题',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field1',
      component: 'InputTextArea',
      label: '简介',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field1',
      component: 'Input',
      label: '小程序地址',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field2',
      component: 'Switch',
      label: '上架',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field2',
      component: 'Switch',
      label: '已完结',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field2',
      component: 'InputNumber',
      label: '总集数',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '片方',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '片方分成',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field1',
      component: 'ImageUpload',
      label: '封面',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field1',
      component: 'Select',
      label: '分类',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field1',
      component: 'Select',
      label: '标签',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field1',
      component: 'InputNumber',
      label: '权重',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field1',
      component: 'InputNumber',
      label: '单集价',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field1',
      component: 'InputNumber',
      label: '总价',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field1',
      component: 'Select',
      label: '相关推荐',
      colProps: {
        span: 8,
      },
    },
  ];
  const { createMessage } = useMessage();

  const { back } = useRouter();

  const [registerModal] = useModal();

  const [register] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: {
      span: 24,
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
