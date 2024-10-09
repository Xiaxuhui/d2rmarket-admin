<template>
  <div class="p-4 bg-[#fff]">
    <BasicForm class="local_form" @register="register" @submit="handleSubmit" />
  </div>
</template>
<script lang="ts" setup>
  import { useForm, FormSchema, BasicForm } from '@/components/Form';

  const schemas: FormSchema[] = [
    {
      field: 'location',
      component: 'FormTag',
      label: 'Location:',
    },
  ];

  const [register] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: {
      span: 24,
    },
    submitButtonOptions: {
      text: 'submit',
    },
    showResetButton: false,
    showSubmitButton: true,
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };
</script>
