<template>
  <BasicModal v-bind="$attrs" @register="register" title="提现">
    <Table
      class="mt-2"
      :columns="columns"
      :dataSource="state.modalData"
      :pagination="state.pagination"
      row-key="id"
      :scroll="{ x: 1800 }"
    />
    <template #footer> </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Table } from 'ant-design-vue';
  import { ColumnType } from 'ant-design-vue/lib/table/interface';
  import { record } from '@/api/goods';
  import { formatToDateTime } from '@/utils/dateUtil';

  enum STATE_ENUM {
    delete,
    pending,
    done,
    turn,
    cancel,
  }

  const stateText = {
    [STATE_ENUM.delete]: '删除',
    [STATE_ENUM.pending]: '等待处理',
    [STATE_ENUM.done]: '完成',
    [STATE_ENUM.turn]: '驳回',
    [STATE_ENUM.cancel]: '用户取消',
  };

  const state = reactive({
    modalData: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      onChange(page, pageSize) {
        getDetail(page, pageSize);
      },
    },
  });

  const getDetail = (page, pageSize) => {
    record({ pageNum: page, pageSize }).then((res) => {
      state.modalData = res.list;
      state.pagination.current = page;
      state.pagination.total = res.totalRecords;
      state.pagination.pageSize = pageSize;
    });
  };

  const [register, { setModalProps }] = useModalInner(() => {
    setModalProps({ width: 1200 });
    getDetail(state.pagination.current, state.pagination.pageSize);
  });

  const columns: ColumnType[] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      fixed: true,
    },
    {
      title: '用户id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '提现金额',
      dataIndex: 'money',
      key: 'money',
      customRender({ value }) {
        return value / 10000;
      },
    },
    {
      title: '账户姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '银行',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: '卡号',
      dataIndex: 'bankCard',
      key: 'bankCard',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
      width: 300,
    },
    {
      title: '提现时间',
      dataIndex: 'initiateTime',
      key: 'initiateTime',
      customRender({ value }) {
        return formatToDateTime(value);
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      customRender({ value }) {
        return stateText[value] || '-';
      },
    },
    {
      title: '处理人id',
      dataIndex: 'dealUid',
      key: 'dealUid',
    },
    {
      title: '处理人备注',
      dataIndex: 'dealNotes',
      key: 'dealNotes',
      width: 300,
    },
    {
      title: '处理人时间',
      dataIndex: 'dealTime',
      key: 'dealTime',
      customRender({ value }) {
        return formatToDateTime(value);
      },
    },
  ];
</script>
