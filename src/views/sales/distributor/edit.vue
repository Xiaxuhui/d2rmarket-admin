<template>
  <div class="m-4 bg-white">
    <BasicForm class="local_form" @register="register" @submit="handleSubmit">
      <template #resetBefore>
        <a-button class="mr-2" @click="back">返回</a-button>
      </template>
    </BasicForm>
    <SeriesModal @register="registerModal" />
  </div>
</template>
<script lang="tsx" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { useRoute, useRouter } from 'vue-router';
  import { useModal } from '@/components/Modal';
  import SeriesModal from './components/seriesModal.vue';
  import FormTable from './components/formTable.vue';
  import { updateDistributor, distributorDetail, addChild } from '@/api/sys/distributor';
  import { onMounted } from 'vue';
  import { chargeList } from '@/api/playlet/charge';

  const { back } = useRouter();
  const route = useRoute();
  const id = route.query.id;
  const type = route.query.type;

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '添加分销商',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '分销商名称：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'parentName',
      component: 'Input',
      label: '上级分销商名称：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'notes',
      component: 'Input',
      label: '备注：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'account',
      component: 'Input',
      label: '账号：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'pwd',
      component: 'Input',
      label: '密码：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'state',
      component: 'Select',
      label: '状态：',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '正常',
            value: 1,
            key: 1,
          },
          {
            label: '禁用',
            value: 2,
            key: 2,
          },
        ],
      },
    },
    {
      field: 'canRemain',
      component: 'Select',
      label: '提现状态：',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '正常',
            value: 1,
            key: 1,
          },
          {
            label: '禁用',
            value: 2,
            key: 2,
          },
        ],
      },
    },
    {
      field: 'canAdd',
      component: 'Select',
      label: '添加下级：',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '能',
            value: 1,
            key: 1,
          },
          {
            label: '不能',
            value: 0,
            key: 0,
          },
        ],
      },
    },
    {
      field: 'sellVipRate',
      component: 'Input',
      label: '销售vip分成比例：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'channelRate',
      component: 'Input',
      label: '销售剧分成比例：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'blogOwnerRate',
      component: 'Input',
      label: '发剧方分成比例：',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field10',
      component: 'Input',
      show: type === 'edit',
      label: '推广剧集：',
      colProps: {
        span: 16,
      },
      renderColContent({ model, field }) {
        return (
          <>
            <FormTable
              field="field10"
              label="推广剧集："
              v-model:value={model[field]}
              columns={seriesColumns}
              editProps={['price']}
              actionOptions={{
                text: '添加剧集',
                api: () => {
                  return Promise.resolve([{ id: '321', price: 11 }]);
                },
                props: {
                  title: '选择剧集',
                  columns: [
                    {
                      title: 'id',
                      dataIndex: 'id',
                      width: 100,
                    },
                    {
                      title: 'price',
                      dataIndex: 'price',
                      width: 100,
                    },
                  ],
                },
              }}
            />
          </>
        );
      },
    },
    {
      field: 'field11',
      component: 'Input',
      show: type === 'edit',
      label: '推广道具：',
      colProps: {
        span: 16,
      },
      renderColContent({ model, field }) {
        return (
          <>
            <FormTable
              label="推广道具："
              field="field11"
              v-model:value={model[field]}
              columns={seriesColumns}
              editProps={['price']}
              actionOptions={{
                text: '添加道具',
                api: async () => {
                  const res = await chargeList({ pageNum: 1, pageSize: 20, channelId: id, a: 2 });
                  if (res) {
                    return res.list;
                  }
                },
                props: {
                  title: '选择道具',
                  columns: [
                    {
                      title: 'name',
                      dataIndex: 'name',
                      width: 100,
                    },
                    {
                      title: 'price',
                      dataIndex: 'price',
                      width: 100,
                    },
                  ],
                },
              }}
            />
          </>
        );
      },
    },
  ];
  const [registerModal] = useModal();

  const [register, { setFieldsValue }] = useForm({
    labelWidth: 120,
    isNotRow: true,
    schemas,
    actionColOptions: {
      span: 12,
    },
    submitButtonOptions: {
      text: '提交',
    },
    showResetButton: true,
    showSubmitButton: true,
  });

  const seriesColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'price',
      dataIndex: 'price',
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ];

  const getData = async (id) => {
    const res = await distributorDetail({ channelId: id });
    if (res) {
      if (res.sellVipRate) {
        res.sellVipRate = res.sellVipRate / 100;
      }
      if (res.channelRate) {
        res.channelRate = res.channelRate / 100;
      }
      if (res.blogOwnerRate) {
        res.blogOwnerRate = res.blogOwnerRate / 100;
      }
      setFieldsValue(res);
    }
  };

  onMounted(() => {
    if (id && type === 'edit') {
      getData(id);
    }
  });

  function handleSubmit(values: any) {
    if (values.sellVipRate) {
      values.sellVipRate = Number(values.sellVipRate) * 100;
    }
    if (values.channelRate) {
      values.channelRate = Number(values.channelRate) * 100;
    }
    if (values.blogOwnerRate) {
      values.blogOwnerRate = Number(values.blogOwnerRate) * 100;
    }
    if (type === 'edit') {
      updateDistributor(Object.assign(values, { channelId: id })).then(console.log);
    }
    if (type === 'add') {
      addChild(Object.assign(values, { parentId: id }));
    }
  }
</script>
<style lang="less" scoped>
  :deep(.local_form) .local_typeValue {
    width: calc(100% - 120px);
    margin-bottom: 0;
    margin-left: -1px;
    border-right: 0;

    .ant-input {
      border-radius: 0 6px 6px 0;
    }
  }
</style>
