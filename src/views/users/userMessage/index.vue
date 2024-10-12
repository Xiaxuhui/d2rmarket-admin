<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <Authentication :auth="[PERMISSION_ENUM.ADD_CHARGE]">
        <a-button type="primary" @click="add"> 添加方案 </a-button>
      </Authentication>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operation'">
        <TableAction
          stopButtonPropagation
          :actions="[
            {
              label: '编辑',
              ifShow: canEditCharge,
              onClick() {
                update(record.id);
              },
            },
            {
              label: '删除',
              ifShow: canDeleteCharge,
              onClick() {
                del(record.id);
              },
            },
            {
              label: record.state === 1 ? '禁用' : '启用',
              ifShow: canEditCharge,
              onClick() {
                open(record);
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
  import { PageEnum } from '@/enums/pageEnum';
  import { chargeList, delCharge, updateCharge } from '@/api/users/charge';
  import { useGo } from '@/hooks/web/usePage';
  import { PERMISSION_ENUM } from '@/enums/permissionEnum';
  import { useAuthorization } from '@/components/Permission/permission';
  import Authentication from '@/components/Permission/index.vue';
  import { getBasicColumns, getWithDrawFormConfig } from './tableData';

  const [canEditCharge, canDeleteCharge] = useAuthorization([
    PERMISSION_ENUM.EDIT_CHARGE,
    PERMISSION_ENUM.DELETE_CHARGE,
  ]);

  const go = useGo();

  const [registerTable, methods] = useTable({
    title: '充值方案',
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
  const update = (id: string) => {
    go({
      path: PageEnum.ADD_CHARGE,
      query: {
        id,
      },
    });
  };
  const del = (id: string) => {
    delCharge({ priceRateId: id }).then(() => {
      methods.reload();
    });
  };
  const open = async (item) => {
    const state = item.state === 0 ? 1 : 0;
    await updateCharge(Object.assign(item, { state, priceRateId: item.id }));
  };
  const add = () => {
    go({
      path: PageEnum.ADD_CHARGE,
    });
  };
</script>
@/api/users/charge
