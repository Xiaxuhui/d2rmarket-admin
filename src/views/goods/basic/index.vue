<template>
  <div>
    <BasicTable @register="register">
      <template #toolbar>
        <a-button
          type="primary"
          @click="
            () => {
              go({
                path: PageEnum.BASIC_SETTING,
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
                label: 'Edit',
                icon: 'fe:edit',
                onClick() {
                  editBasic(record.id);
                },
              },
              {
                label: 'View',
                icon: 'hugeicons:view',
                onClick() {
                  viewBasic();
                },
              },
              {
                label: 'Delete',
                icon: 'material-symbols:delete-outline',
                color: 'error',
                onClick() {
                  deleteBasic();
                },
                popConfirm: {
                  title: 'confirm delete?',
                  confirm: () => {},
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getBasicColumns, getFormConfig } from './tableData';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';
  import { baseList } from '@/api/goods';

  const [register] = useTable({
    title: 'Basic Goods',
    api: baseList,
    columns: getBasicColumns(),
    showIndexColumn: false,
    fetchSetting: {
      listField: 'list',
      totalField: 'totalRecords',
    },
    useSearchForm: true,
    formConfig: getFormConfig(),
    rowKey: 'id',
  });

  const go = useGo();

  const editBasic = (id) => {
    go({
      path: PageEnum.BASIC_SETTING,
      query: {
        id,
        type: 'edit',
      },
    });
  };

  const deleteBasic = () => {};

  const viewBasic = () => {};
</script>
