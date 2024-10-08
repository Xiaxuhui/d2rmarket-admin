<template>
  <BasicModal v-bind="$attrs" @register="register" title="提现">
    <BasicForm class="local_form" @register="registerForm" @submit="handleSubmit" />
    <template #footer> </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { withdraw } from '@/api/withdraw';

  const emits = defineEmits(['refresh']);

  const [register, { closeModal }] = useModalInner();

  const schemas: FormSchema[] = [
    {
      field: 'money',
      component: 'Input',
      label: '提现金额：',
      required: true,
      colProps: {
        span: 20,
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '银行卡账户名：',
      required: true,
      colProps: {
        span: 20,
      },
    },
    {
      field: 'bankName',
      component: 'Input',
      label: '银行名称：',
      required: true,
      colProps: {
        span: 20,
      },
    },
    {
      field: 'bankCard',
      component: 'Input',
      label: '银行卡号：',
      required: true,
      colProps: {
        span: 20,
      },
    },
    {
      field: 'phone',
      component: 'Input',
      label: '手机号：',
      required: true,
      colProps: {
        span: 20,
      },
    },
    {
      field: 'idCard',
      component: 'Input',
      label: '身份证号：',
      required: true,
      colProps: {
        span: 20,
      },
    },
    {
      field: 'notes',
      component: 'Input',
      label: '提现备注：',
      colProps: {
        span: 20,
      },
    },
  ];

  const [registerForm] = useForm({
    labelWidth: 160,
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

  const handleSubmit = async (params) => {
    await withdraw({ ...params, money: params.money * 10000 });
    emits('refresh');
    closeModal();
  };
</script>
