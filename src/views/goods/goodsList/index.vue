<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="batchUpdate(GOODS_STATE.Publish)">Batch Publish</a-button>
      <a-button @click="batchUpdate(GOODS_STATE.Unpublish)">Batch Unpublish</a-button>
      <a-button
        type="primary"
        @click="
          () => {
            go({
              path: PageEnum.GOODS_SETTING,
            });
          }
        "
        >Create</a-button
      >
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operation'">
        <TableAction
          stopButtonPropagation
          :actions="[
            {
              label: 'publish',
              icon: 'material-symbols:publish-sharp',
              ifShow: [GOODS_STATE.Unpublish, GOODS_STATE.Init].includes(record.state),
              onClick() {
                publish(record.id, GOODS_STATE.Publish);
              },
            },
            {
              label: 'unpublish',
              icon: 'fluent-mdl2:unpublish-content',
              ifShow: record.state === GOODS_STATE.Publish,
              onClick() {
                publish(record.id, GOODS_STATE.Unpublish);
              },
            },
            {
              label: 'View',
              icon: 'hugeicons:view',
              onClick() {
                view(record.id);
              },
            },
            {
              label: 'edit',
              icon: 'fe:edit',
              ifShow: [GOODS_STATE.Unpublish, GOODS_STATE.Init].includes(record.state),
              onClick() {
                edit(record.id);
              },
            },
            {
              label: 'delete',
              icon: 'ic:outline-delete-outline',
              color: 'error',
              popConfirm: {
                title: 'confirm delete?',
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

  const selectRowKeys = ref<Array<string | number>>([]);

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
      onChange(selectedRowKeys) {
        selectRowKeys.value = selectedRowKeys;
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
</script>
