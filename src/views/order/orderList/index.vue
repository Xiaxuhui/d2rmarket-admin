<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <a
          v-if="column.dataIndex === 'detail'"
          @click="
            () => {
              openModal(true, 1);
            }
          "
        >
          detail
        </a>
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: 'send',
                icon: 'material-symbols:send-outline',
                onClick() {
                  console.log(record);
                },
              },
              {
                label: 'complete',
                icon: 'carbon:task-complete',
                onClick() {
                  console.log(record);
                },
              },
              {
                label: 'delete',
                icon: 'material-symbols:delete-outline',
                color: 'error',
                onClick() {
                  console.log(record);
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DetailDialog @register="registerModal" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { orderList } from '@/api/order';
  import { useRoute } from 'vue-router';
  import { getBasicColumns, getWithDrawFormConfig } from './tableData';
  import DetailDialog from './components/detailDialog.vue';
  import { useModal } from '@/components/Modal';

  const route = useRoute();

  const [registerModal, { openModal }] = useModal();

  const [registerTable] = useTable({
    title: 'Order List',
    api: (params) => {
      const { startTime, endTime } = params;
      const param: Record<string, any> = {};
      if (startTime && endTime) {
        param.startTime = new Date(startTime).getTime();
        param.endTime = new Date(endTime).getTime();
      }
      return orderList({ ...params, ...param });
    },
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getWithDrawFormConfig(route.query),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    fetchSetting: {
      listField: 'list',
      totalField: 'totalRecords',
    },
    pagination: { pageSize: 20, pageSizeOptions: ['20'] },
  });
</script>
