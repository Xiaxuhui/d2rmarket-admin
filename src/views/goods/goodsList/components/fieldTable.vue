<template>
  <Table :columns="columns" :data-source="dataSource" :pagination="{ pageSize: 10 }" rowKey="id">
    <template #bodyCell="{ column, index }">
      <template v-if="column.key && column.key !== 'name' && column.key !== 'opt'">
        <input
          class="border-[#D9D9D9] border-[1px] px-[11px] h-[32px] leading-[32px] rounded-[6px]"
          :value="modelValue[index][column.key]"
          :disabled="disabled"
          @input="(e) => valueChange(e, index, column.key)"
        />
      </template>
    </template>
  </Table>
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import { ColumnsType } from 'ant-design-vue/es/table';
  import { reactive, watch } from 'vue';

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
      type: Array as PropType<{ [key: string]: string }[]>,
      default: () => [],
    },
    disabled: Boolean,
  });

  const emits = defineEmits(['update:modelValue']);

  const valueArray = reactive(Array.from({ length: 10 }, () => ({})));

  const valueChange = (e, index, name) => {
    valueArray[index][name] = e.target.value;
    emits('update:modelValue', valueArray);
  };

  watch(
    () => props.modelValue,
    (val) => {
      if (val.length < 10) {
        for (let i = 0; i < val.length; i++) {
          valueArray[i] = val[i];
        }
      }
    },
  );
</script>
