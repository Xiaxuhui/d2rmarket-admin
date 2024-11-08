<template>
  <Table :columns="columns" :data-source="dataSource" :pagination="{ pageSize: 5 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key && column.key !== 'name' && column.key !== 'opt'">
        <input
          class="border-[#D9D9D9] border-[1px] px-[11px] h-[32px] leading-[32px] rounded-[6px]"
          :value="modelValue[record.id]"
          @input="(e) => valueChange(e, record.id)"
        />
      </template>
      <template v-if="column.key && column.key === 'opt'">
        <div @click="record['del'](record.id)" class="text-[#ed6f6f] cursor-pointer">delete</div>
      </template>
    </template>
  </Table>
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import { ColumnsType } from 'ant-design-vue/es/table';
  import { reactive } from 'vue';

  defineProps({
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
  });

  const emits = defineEmits(['update:modelValue']);

  const valueMap = reactive({});

  const valueChange = (e, id) => {
    valueMap[id] = e.target.value;
    emits('update:modelValue', valueMap);
  };
</script>
