<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { getBasicColumns, getFormConfig } from './tableData';
  // import { useGo } from '@/hooks/web/usePage';
  import { useRoute } from 'vue-router';
  import * as api from '@/api/users/list';

  // const go = useGo();
  const { label } = useRoute().query;

  const [registerTable] = useTable({
    title: 'UserList',
    api: api.userList,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getFormConfig({ label: (label as string) || '' }),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    pagination: {
      pageSize: 20,
    },
  });
</script>
