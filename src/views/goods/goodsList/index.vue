<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button danger :disabled="!canBatchDelete" @click="batchDelete(GOODS_STATE.Delete)"
        >Batch Delete(批量删除)</a-button
      >
      <a-button type="primary" @click="batchUpdate(GOODS_STATE.Publish)"
        >Batch Publish(批量发布)</a-button
      >
      <a-button @click="batchUpdate(GOODS_STATE.Unpublish)">Batch Unpublish(批量下架)</a-button>
      <a-button
        type="primary"
        @click="
          () => {
            go({
              path: PageEnum.GOODS_SETTING,
            });
          }
        "
        >Create(创建)</a-button
      >
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operation'">
        <TableAction
          stopButtonPropagation
          :actions="[
            {
              label: 'publish(上架)',
              icon: 'material-symbols:publish-sharp',
              ifShow: [GOODS_STATE.Unpublish, GOODS_STATE.Init].includes(record.state),
              onClick() {
                publish(record.id, GOODS_STATE.Publish);
              },
            },
            {
              label: 'unpublish(下架)',
              icon: 'fluent-mdl2:unpublish-content',
              ifShow: record.state === GOODS_STATE.Publish,
              onClick() {
                publish(record.id, GOODS_STATE.Unpublish);
              },
            },
            {
              label: 'View(查看)',
              icon: 'hugeicons:view',
              onClick() {
                view(record.id);
              },
            },
            {
              label: 'edit(编辑)',
              icon: 'fe:edit',
              ifShow: [GOODS_STATE.Unpublish, GOODS_STATE.Init].includes(record.state),
              onClick() {
                edit(record.id);
              },
            },
            {
              label: 'hot(热销)',
              icon: 'material-symbols:local-fire-department',
              ifShow: !record.hot,
              onClick() {},
            },
            {
              label: 'hot(取消热销)',
              ifShow: !!record.hot,
              icon: 'material-symbols:local-fire-department',
              onClick() {},
            },
            {
              label: 'delete(删除)',
              icon: 'ic:outline-delete-outline',
              color: 'error',
              popConfirm: {
                title: 'confirm delete(确认删除)?',
                cancelText: 'cancel(取消)',
                confirm: () => {
                  publish(record.id, GOODS_STATE.Delete);
                },
              },
            },
          ]"
        />
      </template>
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useGo } from '@/hooks/web/usePage';
  import { getBasicColumns, getPromoteFormConfig } from './tableData';
  import { PageEnum } from '@/enums/pageEnum';
  import { goodsList, updateProductState } from '@/api/goods';
  import { GOODS_STATE } from '@/contants';
  import { ref } from 'vue';

  defineOptions({
    name: 'GoodsList',
  });

  const selectRowKeys = ref<Array<string | number>>([]);
  const canBatchDelete = ref(true);

  const [registerTable, { reload }] = useTable({
    title: 'Goods List',
    api: goodsList,
    columns: getBasicColumns(),
    showIndexColumn: false,
    useSearchForm: true,
    formConfig: getPromoteFormConfig(),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    rowKey: 'id',
    pagination: { pageSize: 20 },
    rowSelection: {
      type: 'checkbox',
      onChange(selectedRowKeys, selectedRows) {
        selectRowKeys.value = selectedRowKeys;
        canBatchDelete.value = true;
        for (let item of selectedRows) {
          if (![GOODS_STATE.Unpublish, GOODS_STATE.Init].includes(item.state)) {
            canBatchDelete.value = false;
            break;
          }
        }
      },
    },
    showSelectionBar: true,
  });
  const go = useGo();
  const edit = (id) => {
    go({
      path: PageEnum.GOODS_SETTING,
      query: {
        id,
        type: 'edit',
      },
    });
  };

  const view = (id) => {
    go({
      path: PageEnum.GOODS_SETTING,
      query: {
        id,
      },
    });
  };
  const publish = (id, state) => {
    updateProductState({ ids: id, state }).then(() => {
      reload();
    });
  };

  const batchUpdate = (state) => {
    updateProductState({ ids: selectRowKeys.value.join(','), state }).then(() => {
      reload();
    });
  };

  const batchDelete = (state) => {
    updateProductState({ ids: selectRowKeys.value.join(','), state }).then(() => {
      reload();
    });
  };
</script>
