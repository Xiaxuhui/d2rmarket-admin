<template>
  <div>
    <BasicTable @register="register">
      <template #toolbar>
        <a-button type="primary" @click="exportCsv">导出数据</a-button>
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
                label: '下级',
                icon: 'carbon:sales-ops',
                onClick() {
                  viewSalesman(record.id);
                },
              },
              {
                label: '添加下级',
                icon: 'fluent:people-add-16-regular',
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
  import { exportExcel } from '@/utils/exportCsv';
  import SalesModal from './components/salesModal.vue';
  import { PageEnum } from '@/enums/pageEnum';

  const [register, methods] = useTable({
    title: '分销商管理',
    api: distributorList,
    columns: getBasicColumns(),
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

  const exportCsv = () => {
    exportExcel(methods.getDataSource(), '分销商列表', getBasicColumns());
  };
</script>
