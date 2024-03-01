<template>
  <div>
    <FormItem :name="field" :label="label" :labelCol="{ prefixCls: 'series-label' }">
      <Row>
        <Authentication :auth="[PERMISSION_ENUM.SALES_ITEM_ADD]">
          <a-button type="primary" v-if="actionOptions.api" @click="openModal(true, 1)">{{
            actionOptions.text
          }}</a-button>
        </Authentication>
        <Authentication v-if="!isItem" :auth="[PERMISSION_ENUM.SALES_ITEM_ADD]" class="ml-2">
          <a-button @click="state.open = true" :disabled="!state.selectedRowKeys.length"
            >批量设置</a-button
          >
        </Authentication>
      </Row>
      <Table
        class="mt-2"
        :columns="columns"
        :dataSource="value"
        :pagination="state.pagination"
        :row-key="rowKey"
        :row-selection="
          isItem
            ? undefined
            : {
                selectedRowKeys: state.selectedRowKeys,
                onChange: onSelectChange,
              }
        "
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
                  ifShow: Boolean(!state.editableData[record[rowKey]]) && canEditSalesItem,
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
                    const currentPrice = state.editableData[record[props.rowKey]].price;
                    if (props.isItem) {
                      const { price, channelId, goodsId, type, id } = record;
                      if (channelId === props.userId) {
                        if (price !== currentPrice) {
                          updatePriceRate({
                            channelId: props.userId,
                            list: [{ priceRateId: id, price: currentPrice * 10000 }],
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
                    save(record[props.rowKey]);
                  },
                },
                {
                  label: '恢复',
                  icon: 'ri:device-recover-line',
                  ifShow: isItem && record.channelId === userId && canEditSalesItem,
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
                  ifShow: !isItem && canDelSalesItem,
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
    <Modal v-model:open="state.open" title="批量设置" @ok="batchSet">
      &nbsp;&nbsp; 请设置价格：<Input v-model:value="state.batchNum" style="width: 200px" /> ¥
    </Modal>
  </div>
</template>

<script lang="ts" setup>
  import { Table, FormItem, Row, Input, Modal } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import { reactive, watch } from 'vue';
  import { ColumnType } from 'ant-design-vue/lib/table/interface';
  import { DataIndex } from 'ant-design-vue/lib/vc-table/interface';
  import { cloneDeep } from 'lodash-es';
  import { TableAction } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { addPriceRate, updatePriceRate, deletePriceRate } from '@/api/sys/distributor';
  import { PERMISSION_ENUM } from '@/enums/permissionEnum';
  import { useAuthorization } from '@/components/Permission/permission';
  import Authentication from '@/components/Permission/index.vue';

  import SeriesModal from './seriesModal.vue';
  import message from '@/views/form-design/utils/message';

  const [canEditSalesItem, canDelSalesItem] = useAuthorization([
    PERMISSION_ENUM.SALES_ITEM_EDIT,

    PERMISSION_ENUM.SALES_ITEM_DELETE,
  ]);

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
    open: false,
    batchNum: 0,
    editableData: {},
    dataSource: [] as Record<string, any>[],
    listDataSource: [] as Record<string, any>[],
    selectedRowKeys: [] as number[],
    pagination: {
      current: 1,
      pageSize: 5,
      onChange(page) {
        state.pagination.current = page;
      },
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

  const onSelectChange = (selectedRowKeys) => {
    state.selectedRowKeys = selectedRowKeys;
  };

  const batchSet = () => {
    if (Number.isNaN(state.batchNum)) {
      return message.error('请输入数字');
    }
    state.dataSource.map((item) => {
      if (state.selectedRowKeys.includes(item[props.rowKey])) {
        item.price = state.batchNum;
      }
      return item;
    });
    state.open = false;
    emit('update:value', state.dataSource);
  };

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
