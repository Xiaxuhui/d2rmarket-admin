<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
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
              onClick() {
                edit(record.id);
              },
            },
            {
              label: 'View',
              icon: 'hugeicons:view',
              onClick() {
                edit(record.id);
              },
            },
            {
              label: 'edit',
              icon: 'fe:edit',
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
                  del(record.id);
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
  import { goodsList } from '@/api/goods';

  const [registerTable] = useTable({
    title: 'Goods List',
    api: goodsList,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getPromoteFormConfig(),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    rowKey: 'id',
    pagination: { pageSize: 20 },
  });
  const go = useGo();
  const edit = (id) => {
    go({
      path: PageEnum.GOODS_SETTING,
      query: {
        id,
      },
    });
  };
  const del = (id) => {
    console.log(id);
  };
</script>
