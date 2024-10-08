<template>
  <BasicModal v-bind="$attrs" @register="register" :title="title">
    <Row :gutter="{ xl: 16 }">
      <Col :span="10">
        <div class="flex items-center">
          选择剧集：
          <ApiSelect
            style="width: 200px"
            showSearch
            @search="onSearch"
            @options-change="onOptionsChange"
            :api="api"
            :params="state.params"
            :labelField="optionField[0]"
            :valueField="optionField[1]"
            :resultField="optionField[2]"
            :filterOption="false"
            v-model:value="state.value"
          />
        </div>
      </Col>
      <Col :span="10" />
      <Col :span="4"> <Checkbox v-model:checked="state.checked">选择全集</Checkbox></Col>
    </Row>
    <Table
      class="mt-4"
      :columns="columns"
      :dataSource="state.modalData"
      :pagination="state.pagination"
      :showIndexColumn="false"
      :sticky="true"
      rowKey="id"
      :row-selection="{
        hideSelectAll: true,
        selectedRowKeys,
        onSelect: selectRows,
      }"
    />
    <template #footer>
      <a-button type="primary" @click="confirmSelectRowKeys">确认</a-button></template
    >
  </BasicModal>
</template>
<script lang="ts" setup>
  import { watch, reactive, computed } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Table, Row, Col, Checkbox } from 'ant-design-vue';

  import { ColumnType } from 'ant-design-vue/lib/table/interface';
  import { ApiSelect } from '@/components/Form';
  import { debounce } from 'lodash-es';

  const props = defineProps({
    api: {
      type: Function as PropType<PromiseFn>,
      default: () => Promise.resolve(),
    },
    optionField: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    detailApi: {
      type: Function as PropType<PromiseFn>,
      default: () => Promise.resolve(),
    },
    columns: {
      type: Array as PropType<ColumnType[]>,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
    selectedRows: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
  });

  const emit = defineEmits(['change']);

  const state = reactive({
    value: undefined,
    checked: false,
    loading: false,
    params: {},
    dataCacheMap: new Map(), // 已选项目 record 缓存
    selectedRows: [] as any, // 选择项目 record
    pagination: {
      pageSize: 10,
      pageNum: 1,
      pageSizeOptions: [10],
    },
    modalData: [],
    selectedSet: new Set<number>(),
  });

  const [register, { setModalProps, closeModal }] = useModalInner(() => {
    setModalProps({ width: 800 });
  });

  const selectedRowKeys = computed(() => {
    return Array.from(state.selectedSet);
  });

  watch(
    () => state.value,
    (val) => {
      if (val) {
        state.checked = state.selectedSet.has(+val);
        props.detailApi(val).then((res) => {
          state.modalData = res.subBlogs;
        });
      }
    },
  );

  watch(
    () => state.checked,
    () => {
      if (state.value && !state.selectedSet.has(state.value)) {
        state.selectedSet.add(state.value);
      }
    },
  );

  watch(
    () => props.selectedRows,
    (list) => {
      for (let item of list) {
        state.selectedSet.add(+item.goodsId);
        state.dataCacheMap.set(+item.goodsId, item);
      }
    },
  );

  const onSearch = debounce((val) => {
    state.params = {
      title: val,
    };
  }, 500);

  // 获取总集系列的数据项
  const onOptionsChange = (option) => {
    for (let opt of option) {
      const { value, price, label } = opt;
      state.dataCacheMap.set(value, { goodsId: value, price, title: label });
    }
  };

  const selectRows = (record, selected) => {
    const { id, title, price } = record;
    if (selected) {
      state.selectedSet.add(+id);
      state.dataCacheMap.set(+id, { goodsId: +id, price, title });
    } else {
      if (state.selectedSet.has(+id)) {
        state.selectedSet.delete(+id);
      }
    }
  };

  const confirmSelectRowKeys = () => {
    const selectedRows: Record<'goodsId' | 'price', any>[] = [];
    const selectedRowsKeys = Array.from(state.selectedSet);
    for (const goodsId of selectedRowsKeys) {
      const item = state.dataCacheMap.get(goodsId);
      selectedRows.push(item);
    }
    emit('change', selectedRows);
    closeModal();
  };
</script>
