<template>
  <BasicTable @register="register">
    <template #toolbar>
      <a-button
        type="primary"
        @click="
          () => {
            go({
              path: PageEnum.COUPON_SETTING,
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
                editCoupon(record.id);
              },
            },
            {
              label: 'View',
              icon: 'hugeicons:view',
              onClick() {
                viewCoupon(record.id);
              },
            },
            {
              label: 'Delete',
              icon: 'material-symbols:delete-outline',
              color: 'error',
              popConfirm: {
                title: 'confirm delete?',
                confirm: () => {
                  delCoupon(record.id);
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
  import { couponList, deleteCoupon } from '@/api/marketing';

  const [register, { reload }] = useTable({
    title: 'Coupon List',
    api: couponList,
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

  const editCoupon = (id) => {
    go({
      path: PageEnum.COUPON_SETTING,
      query: {
        id,
        type: 'edit',
      },
    });
  };

  const delCoupon = (id) => {
    return deleteCoupon(id).then(() => {
      reload();
    });
  };

  const viewCoupon = (id) => {
    go({
      path: PageEnum.COUPON_SETTING,
      query: {
        id,
      },
    });
  };
</script>
