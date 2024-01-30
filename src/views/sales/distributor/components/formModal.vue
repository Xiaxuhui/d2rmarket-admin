<template>
  <BasicModal v-bind="$attrs" @register="register" :title="title">
    <Table
      :columns="columns"
      :dataSource="state.modalData"
      :pagination="state.pagination"
      :showIndexColumn="false"
      :sticky="true"
      rowKey="id"
      :row-selection="{
        selectedRowKeys: state.selectedRowKeys,
        onChange: selectRows,
      }"
    />
    <template #footer>
      <a-button type="primary" @click="confirmSelectRowKeys">确认</a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Table } from 'ant-design-vue';
  import { ColumnType } from 'ant-design-vue/lib/table/interface';
  import { getDetail } from '@/api/sys/series';
  import type { PropType } from 'vue';

  const props = defineProps({
    api: {
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
    showTable: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['change']);

  const lines = ref(10);

  const state = reactive({
    loading: false,
    pagination: {
      pageSize: 10,
    },
    modalData: [] as any,
    selectedRowKeys: [],
  });

  const [register, { setModalProps, redoModalHeight, closeModal }] = useModalInner(() => {
    setModalProps({ width: 800 });
    props.api().then((res) => {
      state.modalData = res;
    });
  });

  watch(
    () => lines.value,
    () => {
      redoModalHeight();
    },
  );

  const selectRows = (rowKeys) => {
    state.selectedRowKeys = rowKeys;
  };
  const confirmSelectRowKeys = async () => {
    const values = Object.values(state.selectedRowKeys);
    let item = [];
    for (let i = 0; i < state.modalData.length; i++) {
      const element = state.modalData[i];
      if (values.includes(element.id)) {
        if (props.showTable && !element.innerData) {
          const res = await getDetail(element.id as string);
          if (res) {
            element.innerData = res.subBlogs ?? [];
            item.push(element);
          }
        } else {
          item.push(element);
        }
      }
    }
    emit('change', item);
    closeModal();
  };
</script>
