<template>
  <BasicModal v-bind="$attrs" @register="register" title="下级分销商">
    <Table
      :columns="columns"
      :dataSource="state.modalData"
      :pagination="state.pagination"
      :showIndexColumn="false"
      :sticky="true"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '编辑',
                icon: 'fe:edit',
                ifShow: canEditSales,
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
                ifShow: canAddSales,
                onClick() {
                  addNext(record.id);
                },
              },
            ]"
          />
        </template>
      </template>
    </Table>
    <template #footer></template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, watch, reactive } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { TableAction } from '@/components/Table';
  import { Table } from 'ant-design-vue';
  import { distributorChildList } from '@/api/sys/distributor';
  import { ColumnType } from 'ant-design-vue/lib/table/interface';
  import { getBasicColumns } from '../tableData';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';
  import { PERMISSION_ENUM } from '@/enums/permissionEnum';
  import { useAuthorization } from '@/components/Permission/permission';

  const [canEditSales, canAddSales] = useAuthorization([
    PERMISSION_ENUM.SALES_EDIT,
    PERMISSION_ENUM.SALES_ADD,
  ]);

  const lines = ref(10);

  const state = reactive({
    loading: false,
    channelId: 0,
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0,
      onChange(pageNum, pageSize) {
        distributorChildList({ channelId: state.channelId, pageNum, pageSize }).then((res) => {
          state.pagination.current = pageNum;
          state.pagination.pageSize = pageSize;
          state.modalData = res.list;
          state.pagination.total = res.totalRecords;
        });
      },
    },
    modalData: [],
  });

  const columns = getBasicColumns() as ColumnType[];

  const [register, { setModalProps, redoModalHeight }] = useModalInner((data) => {
    setModalProps({ width: 1200 });
    state.channelId = data.id;
    distributorChildList({
      channelId: data.id,
      pageNum: state.pagination.current,
      pageSize: state.pagination.pageSize,
    }).then((res) => {
      state.modalData = res.list;
      state.pagination.total = res.totalRecords;
    });
  });
  const go = useGo();

  watch(
    () => lines.value,
    () => {
      redoModalHeight();
    },
  );

  const editSalesman = (id) => {
    go({
      path: PageEnum.DISTRIBUTOR_EDIT,
      query: {
        id,
        type: 'edit',
      },
    });
  };

  const viewSalesman = (id) => {
    distributorChildList({ channelId: id, pageNum: 1, pageSize: 10 }).then((res) => {
      state.channelId = id;
      state.pagination.current = 1;
      state.pagination.pageSize = 10;
      state.pagination.total = res.totalRecords;
      state.modalData = res.list;
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
</script>
