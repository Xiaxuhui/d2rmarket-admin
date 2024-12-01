<template>
  <Table :columns="columns" :data-source="dataSource" :pagination="{ pageSize: 5 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key && column.key !== 'name' && column.key !== 'opt'">
        <input
          class="border-[#D9D9D9] border-[1px] px-[11px] h-[32px] leading-[32px] rounded-[6px]"
          :value="modelValue[record.id]"
          :disabled="disabled"
          @input="(e) => valueChange(e, record.id)"
        />
      </template>
      <template v-if="column.key && column.key === 'opt' && !disabled">
        <div @click="record['del'](record.id)" class="text-[#ed6f6f] cursor-pointer">delete</div>
      </template>
    </template>
  </Table>
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import { ColumnsType } from 'ant-design-vue/es/table';
  import { ref, watch } from 'vue';

  const props = defineProps({
    columns: {
      type: Array as PropType<ColumnsType>,
      default: () => [],
    },
    dataSource: {
      type: Array as PropType<{ name: string; id: number; key?: number; [key: string]: any }[]>,
      default: () => [],
    },
    modelValue: {
      type: Object as PropType<{ [key: string]: string }>,
      default: () => ({}),
    },
    disabled: Boolean,
  });

  const emits = defineEmits(['update:modelValue']);

  const valueMap = ref({});

  const valueChange = (e, id) => {
    valueMap.value[id] = e.target.value;
    emits('update:modelValue', valueMap.value);
  };

  watch(
    () => props.modelValue,
    () => {
      if (Object.keys(props.modelValue).length !== Object.keys(valueMap.value).length) {
        valueMap.value = {};
        for (let key in props.modelValue) {
          valueMap.value[key] = props.modelValue[key];
        }
      }
    },
  );
</script>
