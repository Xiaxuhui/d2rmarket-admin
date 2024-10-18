<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <Authentication :auth="[PERMISSION_ENUM.INVEST_ADD]">
        <a-button type="primary" @click="addPromote"> 添加 </a-button>
      </Authentication>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operation'">
        <TableAction
          stopButtonPropagation
          :actions="[
            {
              label: 'publish',
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
              onClick() {
                edit(record.id);
              },
            },
            {
              label: 'delete',
              icon: 'ic:outline-delete-outline',
              ifShow: canEditInvest,
              popConfirm: {
                title: '确认删除？',
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
  import { PERMISSION_ENUM } from '@/enums/permissionEnum';
  import { useAuthorization } from '@/components/Permission/permission';
  import Authentication from '@/components/Permission/index.vue';

  const [canEditInvest] = useAuthorization([PERMISSION_ENUM.INVEST_EDIT]);

  const [registerTable] = useTable({
    title: '投放管理',
    // api: () => [],
    columns: getBasicColumns(),
    useSearchForm: true,
    fetchSetting: {
      listField: 'list',
      totalField: 'totalRecords',
    },
    formConfig: getPromoteFormConfig(),
    showTableSetting: true,
    rowSelection: {
      type: 'checkbox',
      onChange: () => {},
    },
    showSelectionBar: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    pagination: { pageSize: 20 },
  });
  const go = useGo();
  const edit = (id) => {
    go({
      path: PageEnum.ADD_PROMOTE,
      query: {
        id,
      },
    });
  };
  const del = (id) => {
    console.log(id);
  };
  const addPromote = () => {
    go({
      path: PageEnum.ADD_PROMOTE,
    });
  };
</script>
