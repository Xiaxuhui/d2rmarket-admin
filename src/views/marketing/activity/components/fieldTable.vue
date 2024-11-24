<template>
  <Table :columns="columns" :data-source="dataSource" :pagination="{ pageSize: 5 }" rowKey="id">
    <template #bodyCell="{ column, index }">
      <template v-if="column.key">
        <div class="flex">
          <span class="mr-1" v-if="column.key === 'num'">>=</span>
          <input
            class="border-[#D9D9D9] border-[1px] px-[11px] h-[32px] leading-[32px] rounded-[6px]"
            :value="modelValue[index][column.key]"
            :disabled="disabled"
            @input="(e) => valueChange(e, index, column.key)"
          />
          <span class="ml-1" v-if="column.key === 'discount'">%</span>
        </div>
      </template>
    </template>
  </Table>
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import { reactive, watch } from 'vue';

  const props = defineProps({
    dataSource: {
      type: Array as PropType<{ num: string; discount: string }[]>,
      default: () => [],
    },
    modelValue: {
      type: Array as PropType<{ [key: string]: string }[]>,
      default: () => [],
    },
    disabled: Boolean,
  });

  const columns = [
    {
      title: 'num',
      key: 'num',
    },
    {
      title: 'discount',
      key: 'discount',
    },
  ];

  const emits = defineEmits(['update:modelValue']);

  const valueArray = reactive(Array.from({ length: 3 }, () => ({})));

  const valueChange = (e, index, name) => {
    valueArray[index][name] = e.target.value;
    emits('update:modelValue', valueArray);
  };

  watch(
    () => props.modelValue,
    (val) => {
      if (val.length <= 3) {
        for (let i = 0; i < val.length; i++) {
          valueArray[i] = val[i];
        }
      }
    },
  );
</script>
