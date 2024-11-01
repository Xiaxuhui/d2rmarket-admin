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
  import { computed } from 'vue';

  enum TEXT_TYPE {
    NUM = 1,
    STR,
    ENUM,
  }

  const props = defineProps({
    modelValue: {
      type: Object as PropType<{ name: string; id: number | string }[]>,
      default: () => [],
    },
  });

  const valueArr = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emits('update:modelValue', val);
    },
  });

  const emits = defineEmits(['update:modelValue']);

  const addAffix = (name: string) => {
    addTag({ name, descTpl: `%d ${name}`, type: TEXT_TYPE.NUM })
      .then((res) => {
        valueArr.value = [...valueArr.value, { name: res.name, id: res.id }];
      })
      .catch((err) => {
        message.error(err.msg || err.message);
      });
  };

  const deleteAffix = (id) => {
    deleteTag({ id })
      .then(() => {
        const handleArr = valueArr.value.filter((item) => item.id !== id);
        valueArr.value = handleArr;
      })
      .catch((err) => {
        message.error(err.msg || err.message);
      });
  };
</script>
