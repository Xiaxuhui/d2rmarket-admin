<template>
  <div>
    <BasicTable @register="register">
      <template #toolbar>
        <a-button type="primary" @click="addSalesman">添加分销商</a-button>
        <a-button type="primary">导出数据</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '编辑',
                icon: 'fe:edit',
                onClick() {
                  editSalesman(record.id);
                },
              },
              {
                label: '删除',
                icon: 'ic:outline-delete-outline',
                popConfirm: {
                  title: '确认删除？',
                  confirm: () => {
                    deleteSalesman(record.id);
                  },
                },
              },
              {
                label: '下级',
                icon: 'carbon:sales-ops',
                ifShow: !!record.num,
                onClick() {
                  viewSalesman(record.id);
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
  import { getBasicColumns, getTreeTableData, getFormConfig } from './tableData';
  import { useModal } from '@/components/Modal';
  import { useGo } from '@/hooks/web/usePage';
  import SalesModal from './components/salesModal.vue';
  import { PageEnum } from '@/enums/pageEnum';

  const [register] = useTable({
    title: '分销商管理',
    api: getTreeTableData,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getFormConfig(),
    rowKey: 'id',
  });

  const [registerModal, { openModal }] = useModal();

  const go = useGo();

  const addSalesman = () => {
    go({
      path: PageEnum.DISTRIBUTOR_EDIT,
      query: {
        id: 1,
      },
    });
  };

  const editSalesman = (id) => {
    go({
      path: PageEnum.DISTRIBUTOR_EDIT,
      query: {
        id,
      },
    });
  };

  const deleteSalesman = (id) => {
    console.log(id);
  };

  const viewSalesman = (id) => {
    openModal(true, { id });
  };
</script>
