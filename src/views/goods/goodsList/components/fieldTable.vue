<template>
  <Table :columns="columns" :data-source="dataSource" :pagination="{ pageSize: 5 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key && column.key !== 'name' && column.key !== 'opt'">
        <Input :value="record[column.key]" />
      </template>
      <template v-if="column.key && column.key === 'opt'">
        <div @click="record['del']" class="text-[#ed6f6f] cursor-pointer">delete</div>
      </template>
    </template>
  </Table>
</template>
<script lang="ts" setup>
  import { Table, Input } from 'ant-design-vue';
  import { ColumnsType } from 'ant-design-vue/es/table';
  import { computed } from 'vue';

  const props = defineProps({
    columns: {
      type: Array as PropType<ColumnsType>,
      default: () => [],
    },
    modelValue: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
  });

  const emits = defineEmits(['update:modelValue']);

  const dataSource = computed({
    get() {
      console.log('props.modelValue', props.modelValue);
      return [
        { key: 1, name: 'level', value: 10 },
        { key: 2, name: 'strength', value: 10 },
      ]; // props.modelValue;
    },
    set(val) {
      emits('update:modelValue', val);
    },
  });
</script>
