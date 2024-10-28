<template>
  <FormItem label="Affix">
    <FormTag
      v-model:value="valueArr"
      title="Add Affix"
      no-confirm
      @add="addAffix"
      @delete="deleteAffix"
  /></FormItem>
</template>
<script lang="ts" setup>
  import { addTag, deleteTag } from '@/api/goods';
  import { FormItem } from '@/components/FormItem';
  import { FormTag } from '@/components/Tags';
  import { message } from 'ant-design-vue';
  import { ref } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Object as PropType<{ name: string; id: number | string }[]>,
      default: () => ({}),
    },
  });

  const valueArr = ref<{ name: string; id: number | string }[]>([]);

  const emits = defineEmits(['update:modelValue']);

  const addAffix = (name: string) => {
    addTag({ name })
      .then((res) => {
        valueArr.value = [...props.modelValue, { name: res.name, id: res.id }];
        emits('update:modelValue', [...props.modelValue, { name: res.name, id: res.id }]);
      })
      .catch((err) => {
        message.error(err.msg || err.message);
      });
  };

  const deleteAffix = (id) => {
    deleteTag({ id })
      .then(() => {
        const handleArr = props.modelValue.filter((item) => item.id !== id);
        valueArr.value = [...handleArr];
        emits('update:modelValue', handleArr);
      })
      .catch((err) => {
        message.error(err.msg || err.message);
      });
  };
</script>
