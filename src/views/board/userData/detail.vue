<template>
  <BasicModal v-bind="$attrs" @register="register" title="用户详情">
    <template v-for="(_, index) in Object.keys(detailTest)" :key="index">
      <Row v-if="index % 4 === 0">
        <template v-for="(detailKey, i) in Object.keys(detailTest)" :key="`detail${i}`">
          <Col span="6" v-if="i >= index && i < index + 4">
            {{ detailTest[detailKey] }}：
            <span class="font-bold">{{
              formatText((state.detail[detailKey] = 0), detailKey)
            }}</span>
          </Col>
        </template>
      </Row>
    </template>
    <Table
      class="mt-4"
      :columns="columns"
      :dataSource="state.modalData"
      :pagination="state.pagination"
      :showIndexColumn="false"
      :sticky="true"
    />
    <template #footer></template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Table, Row, Col } from 'ant-design-vue';
  import { ColumnType } from 'ant-design-vue/lib/table/interface';
  import { allList, order } from '@/api/board';
  import { formatToDateTime, formatToMin } from '@/utils/dateUtil';
  import { detailColumns } from './tableData';

  enum DETAIL_ENUM {
    v1 = 'v1',
    v2 = 'v2',
    v3 = 'v3',
    v4 = 'v4',
    v5 = 'v5',
    v6 = 'v6',
    v7 = 'v7',
    v8 = 'v8',
    v9 = 'v9',
    v10 = 'v10',
    v11 = 'v11',
    v12 = 'v12',
  }

  const state = reactive({
    loading: false,
    userId: undefined,
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0,
      async onChange(page, pageSize) {
        state.pagination.pageSize = pageSize;
        state.pagination.current = page;
        const res = await order({ pageNum: page, pageSize, userId: state.userId });
        state.modalData = res.list;
        state.pagination.total = res.totalRecords;
      },
    },
    modalData: [],
    detail: {} as Record<DETAIL_ENUM, any>,
  });

  const detailTest: Record<DETAIL_ENUM, string> = {
    [DETAIL_ENUM.v1]: '消费金额',
    [DETAIL_ENUM.v2]: '订单数量',
    [DETAIL_ENUM.v3]: '金豆余额',
    [DETAIL_ENUM.v4]: '充值记录',
    [DETAIL_ENUM.v5]: '退款记录',
    [DETAIL_ENUM.v6]: '登录次数',
    [DETAIL_ENUM.v7]: '付费视频数',
    [DETAIL_ENUM.v8]: '追剧数',
    [DETAIL_ENUM.v9]: '总观看时长',
    [DETAIL_ENUM.v10]: '总观看剧数',
    [DETAIL_ENUM.v11]: '总观看集数',
    [DETAIL_ENUM.v12]: '最近登录',
  };

  const columns = detailColumns() as ColumnType[];

  const formatText = (val: number, key: string) => {
    if (!val) {
      return 0;
    }
    switch (key as DETAIL_ENUM) {
      case DETAIL_ENUM.v9:
        return formatToMin(val);
      case DETAIL_ENUM.v12:
        return formatToDateTime(val);
      default:
        return val;
    }
  };

  const [register, { setModalProps }] = useModalInner(({ id }) => {
    state.userId = id;
    setModalProps({ width: 1200 });
    Promise.all([
      allList({ type: 4, value: id }),
      order({ pageNum: state.pagination.current, pageSize: state.pagination.pageSize, userId: id }),
    ]).then(([detail, data]) => {
      state.detail = detail[0] || {};
      state.modalData = data.list;
      state.pagination.total = data.totalRecords;
    });
  });
</script>
<style scoped>
  .row {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }

  .item + .item {
    margin-left: 20px;
  }

  .item span {
    color: #000;
    font-weight: bold;
  }
</style>
