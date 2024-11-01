<template>
  <div>
    <ApiSelect
      :api="optionsListApi"
      v-model:value="selectValue"
      showSearch
      optionFilterProp="label"
      resultField="list"
      labelField="name"
      valueField="id"
      @options-change="optionsChange"
    />
    <FieldTable class="mt-[10px]" v-model="emitData" :columns="columns" :data-source="dataSource" />
  </div>
</template>
<script lang="ts" setup>
  import { optionsListApi } from '@/api/demo/select';
  import { ApiSelect } from '@/components/Form';
  import { ColumnsType } from 'ant-design-vue/es/table';
  import FieldTable from './fieldTable.vue';
  import { computed, ref, watch } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Array as PropType<{ name: string; value: number }[]>,
      default: () => [],
    },
    columns: {
      type: Array as PropType<ColumnsType>,
      default: () => [],
    },
  });

  const emits = defineEmits(['update:modelValue']);

  const emitData = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emits('update:modelValue', val);
    },
  });

  const options = ref();

  const selectValue = ref();

  const dataSource = ref<Record<string, any>[]>([]);

  const optionsChange = (val) => {
    options.value = val;
  };

  const cacheSet = ref(new Set());

  watch(selectValue, (val) => {
    if (val) {
      for (let opt of options.value) {
        if (opt.value === val && !cacheSet.value.has(opt.value)) {
          cacheSet.value.add(opt.value);
          dataSource.value.push({
            key: +opt.value,
            id: opt.value,
            name: opt.label,
            value: '',
            del() {
              cacheSet.value.delete(opt.value);
              dataSource.value = dataSource.value.filter((item) => item.id !== opt.value);
            },
          });
          console.log('dataSource.value', dataSource.value);
        }
      }
    }
  });
</script>
