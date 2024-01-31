<template>
  <BasicModal v-bind="$attrs" @ok="handleSubmit" @register="register" title="详情">
    <BasicForm class="local_form" @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';

  const emit = defineEmits(['submit']);

  const schemas: FormSchema[] = [
    {
      field: 'data',
      component: 'Input',
      label: '描述',
      required: true,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'weight',
      component: 'Input',
      label: '权重',
      required: true,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'price',
      component: 'Input',
      label: '价格',
      required: true,
      colProps: {
        span: 8,
      },
    },
  ];

  const [registerForm, methods] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: {
      span: 24,
    },
    showResetButton: false,
    showSubmitButton: false,
  });

  const [register, { setModalProps }] = useModalInner((data) => {
    setModalProps({ width: 1200 });
    console.log(data);
  });
  const handleSubmit = async () => {
    if (!(await methods.validate())) {
      return;
    }
    emit('submit', methods.getFieldsValue());
  };
</script>
<style scoped>
  .row {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }

  .item + .item {
    margin-left: 20px;
  }

  .item span {
    color: #000;
    font-weight: bold;
  }
</style>
