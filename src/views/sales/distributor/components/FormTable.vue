<template>
  <div>
    <FormItem :name="field" :label="label" :labelCol="{ prefixCls: 'series-label' }">
      <a-button type="primary" v-if="actionOptions.api" @click="openModal(true, 1)">{{
        actionOptions.text
      }}</a-button>
      <Table
        class="mt-2"
        :columns="columns"
        :dataSource="value"
        :pagination="state.pagination"
        :row-key="rowKey"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="editProps.includes(column.dataIndex || '')">
            <div>
              <a-input
                v-if="state.editableData[record[rowKey]]"
                v-model:value="state.editableData[record[rowKey]][column.dataIndex]"
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
                  ifShow: Boolean(!state.editableData[record[rowKey]]),
                  onClick() {
                    edit(record[props.rowKey]);
                  },
                },
                {
                  label: '取消',
                  icon: 'material-symbols:cancel-outline',
                  ifShow: Boolean(state.editableData[record[rowKey]]),
                  onClick() {
                    cancel(record[props.rowKey]);
                  },
                },
                {
                  label: '保存',
                  icon: 'material-symbols:save-outline',
                  ifShow: Boolean(state.editableData[record[rowKey]]),
                  onClick() {
                    save(record[props.rowKey]);
                    if (props.isItem) {
                      const { price, channelId, goodsId, type, id } = record;
                      if (channelId === props.userId) {
                        if (
                          price !==
                          state.dataSource.filter((item) => record.goodsId === item.goodsId)[0]
                            .price
                        ) {
                          updatePriceRate({
                            channelId: props.userId,
                            list: [{ priceRateId: id, price: price * 10000 }],
                          }).then(() => {
                            emit('value-change');
                          });
                        }
                      } else {
                        addPriceRate({
                          channelId: props.userId,
                          list: [{ goodsId, type, price: price * 10000 }],
                        }).then(() => {
                          emit('value-change');
                        });
                      }
                    }
                  },
                },
                {
                  label: '恢复',
                  icon: 'ri:device-recover-line',
                  ifShow: isItem && record.channelId === userId,
                  onClick() {
                    deletePriceRate([record.id]).then(() => {
                      emit('value-change');
                    });
                  },
                },
                {
                  label: '删除',
                  icon: 'ic:outline-delete-outline',
                  color: 'error',
                  ifShow: !isItem,
                  onClick() {
                    deleteData(record[props.rowKey]);
                  },
                },
              ]"
            />
          </template>
        </template>
      </Table>
    </FormItem>

    <SeriesModal
      v-if="actionOptions.api"
      @register="registerModal"
      :columns="actionOptions.props?.columns"
      :api="actionOptions.api"
      :optionField="actionOptions.optionField"
      :detailApi="actionOptions.detailApi"
      :title="actionOptions.props?.title"
      :selectedRows="state.dataSource"
      @change="getSelectRowKeys"
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
  import { addPriceRate, updatePriceRate, deletePriceRate } from '@/api/sys/distributor';
  // import FormModal from './formModal.vue';
  import SeriesModal from './seriesModal.vue';

  defineOptions({
    name: 'FormTable',
  });

  const props = defineProps({
    userId: Number,
    label: {
      type: String,
      default: null,
    },
    field: {
      type: String,
      default: null,
    },
    actionOptions: {
      type: Object as PropType<{
        text: string;
        api: PromiseFn;
        detailApi: PromiseFn;
        optionField: string[];
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
    rowKey: {
      type: String,
      default: null,
    },
    isItem: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['update:value', 'value-change']);

  const [registerModal, { openModal }] = useModal();

  const state = reactive({
    editableData: {},
    dataSource: [] as Record<string, any>[],
    listDataSource: [] as Record<string, any>[],
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  watch(
    () => props.value,
    (val) => {
      if (val && val.length) {
        state.dataSource = cloneDeep(val);
      }
    },
  );

  const edit = (key: number) => {
    state.editableData[key] = cloneDeep(
      props.value.filter((item) => key === item[props.rowKey])[0],
    );
  };

  const cancel = (key: number) => {
    delete state.editableData[key];
  };

  const save = (key: number) => {
    Object.assign(
      state.dataSource.filter((item) => key === item[props.rowKey])[0],
      state.editableData[key],
    );
    delete state.editableData[key];
    if (!props.isItem) {
      emit('update:value', state.dataSource);
    }
  };

  const deleteData = (key) => {
    emit(
      'update:value',
      state.dataSource.filter((item) => item[props.rowKey] !== key),
    );
  };

  const getSelectRowKeys = (rowKs) => {
    emit('update:value', rowKs);
  };
</script>
<style lang="less">
  .series-label {
    width: 120px;
  }
</style>
