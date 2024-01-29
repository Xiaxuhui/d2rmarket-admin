<template>
  <div>
    <FormItem :name="field" :label="label" :labelCol="{ prefixCls: 'series-label' }">
      <a-button type="primary" @click="openModal(true, 1)">{{ actionOptions.text }}</a-button>
      <Table class="mt-2" :columns="columns" :dataSource="value" :pagination="{ pageSize: 20 }">
        <template #bodyCell="{ column, text, record }">
          <template v-if="editProps.includes(column.dataIndex || '')">
            <div>
              <a-input
                v-if="state.editableData[record.key]"
                v-model:value="state.editableData[record.key][column.dataIndex]"
                style="margin: -5px 0"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <TableAction
              stopButtonPropagation
              :actions="[
                {
                  label: '编辑',
                  icon: 'fe:edit',
                  ifShow: Boolean(!state.editableData[record.key]),
                  onClick() {
                    edit(record.key);
                  },
                },
                {
                  label: '取消',
                  icon: 'material-symbols:cancel-outline',
                  ifShow: Boolean(state.editableData[record.key]),
                  onClick() {
                    cancel(record.key);
                  },
                },
                {
                  label: '保存',
                  icon: 'material-symbols:save-outline',
                  ifShow: Boolean(state.editableData[record.key]),
                  onClick() {
                    save(record.key);
                  },
                },
              ]"
            />
          </template>
        </template>
      </Table>
    </FormItem>

    <FormModal
      @register="registerModal"
      @change="getSelectRowKeys"
      :columns="actionOptions.props.columns"
      :api="actionOptions.api"
      :title="actionOptions.props.title"
    />
  </div>
</template>

<script lang="ts" setup>
  import { Table, FormItem } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import { reactive, watch } from 'vue';
  import { ColumnType } from 'ant-design-vue/lib/table/interface';
  import { DataIndex } from 'ant-design-vue/lib/vc-table/interface';
  import { cloneDeep } from 'lodash-es';
  import { TableAction } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import FormModal from './formModal.vue';

  defineOptions({
    name: 'FormTable',
  });

  const props = defineProps({
    label: {
      type: String,
      default: null,
    },
    field: {
      type: String,
      default: null,
    },
    api: {
      type: Function as PropType<PromiseFn>,
      default: () => Promise.resolve(),
    },
    actionOptions: {
      type: Object as PropType<{
        text: string;
        api: PromiseFn;
        props: {
          title: string;
          columns: Record<string, any>[];
        };
      }>,
      default: () => ({}),
    },
    value: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
    columns: {
      type: Array as PropType<ColumnType[]>,
      default: () => [],
    },
    editProps: {
      type: Array as PropType<DataIndex[]>,
      default: () => [],
    },
  });

  const emit = defineEmits(['update:value']);

  const [registerModal, { openModal }] = useModal();

  const state = reactive({
    editableData: {},
    dataSource: [] as Record<string, any>[],
  });

  watch(
    () => props.value,
    (val) => {
      if (val && val.length) {
        state.dataSource = cloneDeep(val);
      }
    },
  );

  const edit = (key: string) => {
    state.editableData[key] = cloneDeep(props.value.filter((item) => key === item.key)[0]);
  };

  const cancel = (key: string) => {
    delete state.editableData[key];
  };

  const save = (key: string) => {
    Object.assign(state.dataSource.filter((item) => key === item.key)[0], state.editableData[key]);
    delete state.editableData[key];
    emit('update:value', state.dataSource);
  };

  const getSelectRowKeys = (rowKeys) => {
    state.dataSource.push(rowKeys);
    // console.log('rowKeys1', rowKeys);
  };
</script>
<style lang="less">
  .series-label {
    width: 120px;
  }
</style>
