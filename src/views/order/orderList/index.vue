<template>
  <div>
    <div class="px-[16px] mt-16px"
      ><Alert v-show="addNum > 0" :message="`${addNum} new orders have been placed`" type="success"
    /></div>
    <BasicTable @register="registerTable">
      <template #title>
        <TableTitle :total="total" />
      </template>
      <template #bodyCell="{ column, record }">
        <a
          v-if="column.dataIndex === 'detail'"
          @click="
            () => {
              openModal(true, record.details);
            }
          "
        >
          detail
        </a>
        <template v-if="column.dataIndex === 'operation'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: 'send',
                icon: 'material-symbols:send-outline',
                ifShow: record.status === ORDER_STATUS.PAID,
                onClick() {
                  updateOrder({ state: ORDER_STATUS.DONE, ids: record.id }).then(() => reload());
                },
              },
              {
                label: 'upload',
                icon: currentIds[record.id] ? 'eos-icons:loading' : 'carbon:task-complete',
                ifShow: [ORDER_STATUS.BE_SENDING, ORDER_STATUS.DONE].includes(record.status),
                color: currentIds[record.id] ? 'success' : undefined,
                onClick() {
                  return uploadAttachment(record.id);
                },
              },
              {
                label: 'delete',
                icon: 'material-symbols:delete-outline',
                color: 'error',
                ifShow: [ORDER_STATUS.DONE, ORDER_STATUS.OVERTIME, ORDER_STATUS.CANCEL].includes(
                  record.status,
                ),
                popConfirm: {
                  title: 'confirm delete?',
                  confirm: () => {
                    updateOrder({ state: ORDER_STATUS.DELETE, ids: record.id }).then(() =>
                      reload(),
                    );
                  },
                },
              },
            ]"
          />
          <Upload
            class="hidden"
            name="file"
            @change="(fileObj) => handleChange(fileObj, record.id)"
            :action="uploadUrl"
            :showUploadList="false"
            accept=".jpg,.jpeg,.gif,.png,.webp"
          >
            <div
              :ref="
                (el) => {
                  if (el) {
                    uploadRef[record.id] = el;
                  }
                }
              "
              class="hidden"
              >click</div
            >
          </Upload>
        </template>
      </template>
    </BasicTable>
    <DetailDialog @register="registerModal" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { orderList, updateOrder } from '@/api/order';
  import { useRoute } from 'vue-router';
  import { Upload, Alert } from 'ant-design-vue';
  import { getBasicColumns, getWithDrawFormConfig } from './tableData';
  import DetailDialog from './components/detailDialog.vue';
  import { useModal } from '@/components/Modal';
  import { ORDER_STATUS, ORDER_STATUS_GROUP } from '@/contants';
  import { useGlobSetting } from '@/hooks/setting';
  import TableTitle from './components/tableTitle.vue';
  import { onMounted, ref } from 'vue';

  defineOptions({
    name: 'OrderList',
  });

  const route = useRoute();

  const [registerModal, { openModal }] = useModal();

  const { uploadUrl } = useGlobSetting();

  const total = ref(0);

  const addNum = ref(0);

  const [registerTable, { reload }] = useTable({
    title: 'Order List',
    api: (params) => orderList({ status: ORDER_STATUS_GROUP.join(','), ...params }),
    afterFetch(res) {
      total.value = (res || []).length;
      return res;
    },
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getWithDrawFormConfig(route.query),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    fetchSetting: {
      listField: 'list',
      totalField: 'totalRecords',
    },
    pagination: { pageSize: 20, pageSizeOptions: ['20'] },
  });

  const uploadRef = ref<any>({});

  const currentIds = ref({});

  const handleChange = ({ file }, id) => {
    currentIds.value[id] = true;
    if (file.response) {
      const { data } = file.response;
      updateOrder({ state: ORDER_STATUS.DONE, ids: id, imgs: data.id }).then(() => {
        currentIds.value[id] = false;
        reload();
      });
    }
  };

  const uploadAttachment = (id) => {
    if (currentIds.value[id]) {
      return;
    }
    uploadRef.value[id]?.click();
  };

  const getOrderNum = () => {
    setTimeout(async () => {
      const res = await orderList({ status: ORDER_STATUS_GROUP.join(',') });
      addNum.value = res.length - (total.value || res.length);
      return getOrderNum();
    }, 10000);
  };

  onMounted(() => {
    getOrderNum();
  });
</script>
