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
          >Create(创建)</a-button
        >
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: 'Edit(编辑)',
                icon: 'fe:edit',
                onClick() {
                  editBasic(record.id);
                },
              },
              {
                label: 'View(查看)',
                icon: 'hugeicons:view',
                onClick() {
                  viewBasic(record.id);
                },
              },
              {
                label: 'Delete(删除)',
                icon: 'material-symbols:delete-outline',
                color: 'error',
                popConfirm: {
                  title: 'confirm delete?',
                  confirm: () => {
                    deleteBasic(record.id);
                  },
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
  import { baseList, deletePropBase } from '@/api/goods';

  defineOptions({
    name: 'Basic',
  });

  const [register, { reload }] = useTable({
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

  const deleteBasic = (id) => {
    return deletePropBase({ deleteId: id }).then(() => {
      reload();
    });
  };

  const viewBasic = (id) => {
    go({
      path: PageEnum.BASIC_SETTING,
      query: {
        id,
      },
    });
  };
</script>
