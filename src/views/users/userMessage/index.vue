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
                  openModal(true, record.qid);
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
  import { getBasicColumns } from './tableData';
  import ChatModal from './components/chatModal.vue';
  import { useModal } from '@/components/Modal';
  import { userMessageList } from '@/api/users/message';

  const [registerModal, { openModal }] = useModal();

  const [registerTable] = useTable({
    title: 'User Message',
    api: userMessageList,
    columns: getBasicColumns(),
    useSearchForm: false,
    // formConfig: getWithDrawFormConfig(),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'uid',
    pagination: { pageSize: 20 },
  });
</script>
