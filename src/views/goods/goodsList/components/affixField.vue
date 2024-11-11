<template>
  <div>
    <ApiSelect
      :api="optionsListApi"
      v-model:value="selectValue"
      showSearch
      alwaysLoad
      optionFilterProp="label"
      labelField="label"
      valueField="value"
      @options-change="optionsChange"
    />
    <UniteTable
      class="mt-[10px]"
      v-model="valueMap"
      :columns="columns"
      :data-source="dataSource"
      :disabled="disabled"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ApiSelect } from '@/components/Form';
  import { ColumnsType } from 'ant-design-vue/es/table';
  import { DefaultOptionType } from 'ant-design-vue/es/vc-select/Select';
  import UniteTable from './uniteTable.vue';
  import { computed, ref, watch } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Object as PropType<{ [key: string]: string }>,
      default: () => ({}),
    },
    columns: {
      type: Array as PropType<ColumnsType>,
      default: () => [],
    },
    selections: {
      type: Array as PropType<(DefaultOptionType & { value: string })[]>,
      default: () => [],
    },
    disabled: Boolean,
  });

  const emits = defineEmits(['update:modelValue']);

  const dataSource = ref<{ name: string; id: number; key?: number; [key: string]: any }[]>([]);

  // watch(
  //   () => props.selections,
  //   () => {
  //     selectValue.value = '';
  //     valueMap.value = {};
  //     dataSource.value = [];
  //   },
  // );

  const valueMap = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emits('update:modelValue', val);
    },
  });

  const options = ref();

  const selectValue = ref();

  const optionsListApi = async () => {
    return props.selections.map((item) => {
      return { label: item.label, value: item.value + '' };
    });
  };

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
            del(id) {
              if (id + '' === selectValue.value) {
                selectValue.value = '';
              }
              cacheSet.value.delete(id + '');
              dataSource.value = dataSource.value.filter((item) => item.id !== id);
              delete valueMap.value[id];
            },
          });
        }
      }
    }
  });

  watch(
    () => props.modelValue,
    (val) => {
      if (Object.keys(val).length && !dataSource.value.length) {
        dataSource.value = props.selections
          .filter((item) => {
            return !!val[item.value];
          })
          .map((opt) => {
            cacheSet.value.add(+opt.value! + '');
            return {
              key: +opt.value!,
              id: +opt.value!,
              name: opt.label,
              del(id) {
                if (id + '' === selectValue.value) {
                  selectValue.value = '';
                }
                cacheSet.value.delete(id + '');
                dataSource.value = dataSource.value.filter((item) => item.id !== id);
                delete valueMap.value[id];
              },
            };
          });
      }
    },
  );
</script>
