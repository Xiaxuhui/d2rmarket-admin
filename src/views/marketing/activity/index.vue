<template>
  <BasicTable @register="register">
    <template #toolbar>
      <a-button
        type="primary"
        @click="
          () => {
            go({
              path: PageEnum.ACTIVITY_SETTING,
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
                editActivity(record.id);
              },
            },
            {
              label: 'View',
              icon: 'hugeicons:view',
              onClick() {
                viewActivity(record.id);
              },
            },
            {
              label: 'Delete',
              icon: 'material-symbols:delete-outline',
              color: 'error',
              popConfirm: {
                title: 'confirm delete?',
                confirm: () => {
                  delActivity(record.id);
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
  import { getBasicColumns, getFormConfig } from './tableData';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';
  import { activityList, deleteActivity } from '@/api/marketing';

  const [register, { reload }] = useTable({
    title: 'Activity List',
    api: activityList,
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

  const editActivity = (id) => {
    go({
      path: PageEnum.ACTIVITY_SETTING,
      query: {
        id,
        type: 'edit',
      },
    });
  };

  const delActivity = (id) => {
    return deleteActivity(id).then(() => {
      reload();
    });
  };

  const viewActivity = (id) => {
    go({
      path: PageEnum.ACTIVITY_SETTING,
      query: {
        id,
      },
    });
  };
</script>
