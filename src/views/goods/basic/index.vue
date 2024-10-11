<template>
  <div>
    <BasicTable @register="register">
      <template #toolbar>
        <a-button type="primary" @click="() => {}">Create</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: 'Edit',
                icon: 'fe:edit',
                ifShow: canEditSales,
                onClick() {
                  editSalesman(record.id);
                },
              },
              {
                label: 'View',
                icon: 'carbon:sales-ops',
                onClick() {
                  viewSalesman(record.id);
                },
              },
              {
                label: 'Delete',
                icon: 'fluent:people-add-16-regular',
                ifShow: canAddSales,
                onClick() {
                  addNext(record.id);
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <SalesModal @register="registerModal" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getBasicColumns, getFormConfig } from './tableData';
  import { distributorList } from '@/api/sys/distributor';
  import { useModal } from '@/components/Modal';
  import { useGo } from '@/hooks/web/usePage';
  import SalesModal from './components/salesModal.vue';
  import { PageEnum } from '@/enums/pageEnum';
  import { PERMISSION_ENUM } from '@/enums/permissionEnum';
  import { useAuthorization } from '@/components/Permission/permission';

  const [canEditSales, canAddSales] = useAuthorization([
    PERMISSION_ENUM.SALES_EDIT,
    PERMISSION_ENUM.SALES_ADD,
  ]);

  const [register] = useTable({
    title: 'Basic Goods',
    api: distributorList,
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

  const [registerModal, { openModal }] = useModal();

  const go = useGo();

  const editSalesman = (id) => {
    go({
      path: PageEnum.DISTRIBUTOR_EDIT,
      query: {
        id,
        type: 'edit',
      },
    });
  };

  const addNext = (id) => {
    go({
      path: PageEnum.DISTRIBUTOR_EDIT,
      query: {
        id,
        type: 'add',
      },
    });
  };

  const viewSalesman = (id) => {
    openModal(true, { id });
  };
</script>
