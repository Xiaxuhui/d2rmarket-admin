<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: 'view',
                icon: 'hugeicons:view',
                onClick() {
                  openModal(record.id);
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ChatModal @register="registerModal" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { chargeList } from '@/api/users/charge';
  import { getBasicColumns, getWithDrawFormConfig } from './tableData';
  import ChatModal from './components/chatModal.vue';
  import { useModal } from '@/components/Modal';

  const [registerModal, { openModal }] = useModal();

  const [registerTable] = useTable({
    title: 'User Message',
    api: chargeList,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getWithDrawFormConfig(),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    fetchSetting: {
      listField: 'list',
      totalField: 'totalRecords',
    },
    pagination: { pageSize: 20 },
  });
</script>
