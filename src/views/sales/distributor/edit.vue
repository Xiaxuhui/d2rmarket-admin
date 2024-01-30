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
  import {
    updateDistributor,
    distributorDetail,
    addChild,
    addPriceRate,
  } from '@/api/sys/distributor';
  import { getSeriesList } from '@/api/sys/series';
  import { onMounted, ref } from 'vue';
  import { chargeList } from '@/api/playlet/charge';

  const { back } = useRouter();
  const route = useRoute();
  const id = route.query.id;
  const type = route.query.type;
  let charge = ref([]);
  let blog = [];

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
      field: 'vip',
      component: 'Input',
      show: type === 'edit',
      label: '推广道具：',
      colProps: {
        span: 16,
      },
      renderColContent() {
        return (
          <>
            <FormTable
              label="推广道具："
              field="vip"
              v-model:value={charge.value}
              columns={seriesColumns('name')}
              editProps={['price']}
              onUpdate:value={(val) => {
                charge.value = val;
              }}
              actionOptions={{
                text: '添加道具',
                api: async () => {
                  const res = await chargeList({ pageNum: 1, pageSize: 20, channelId: id });
                  if (res) {
                    res.list.forEach((x, index) => {
                      x.key = index.toString();
                    });
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
    {
      field: 'blog',
      component: 'Input',
      show: type === 'edit',
      label: '推广剧集：',
      colProps: {
        span: 16,
      },
      renderColContent({ model, field, values }) {
        console.log(values);
        return (
          <>
            <FormTable
              field="blog"
              label="推广剧集："
              showTable={true}
              v-model:value={model[field]}
              columns={seriesColumns('title')}
              onUpdate:value={(val) => {
                blog = val;
              }}
              editProps={['price']}
              actionOptions={{
                text: '添加剧集',
                api: async () => {
                  const res = await getSeriesList({ pageNum: 1, pageSize: 20 });
                  if (res) {
                    return res.list;
                  }
                },
                props: {
                  title: '选择剧集',
                  columns: [
                    {
                      title: 'title',
                      dataIndex: 'title',
                    },
                    {
                      title: 'price',
                      dataIndex: 'price',
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

  const seriesColumns = (key = 'title') => {
    return [
      {
        title: 'title',
        dataIndex: key,
        key: 'title',
      },
      {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
        editRow: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
      },
    ];
  };

  const getData = async (id) => {
    const res = await distributorDetail({ channelId: id });
    const ret = await chargeList({ channelId: id, pageNum: 1, pageSize: 20 });
    if (ret) {
      ret.list.forEach((x, index) => {
        x.key = index.toString();
      });
      charge.value = ret.list;
    }
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
      let list = [];
      console.log(values.blog);
      if (blog && blog.length) {
        blog.forEach((x) => {
          list.push({
            googsId: x.id,
            type: 3,
            price: x.price,
          });
        });
      }
      if (charge.value && charge.value.length) {
        charge.value.forEach((x) => {
          list.push({
            googsId: x.id,
            price: x.price,
            type: x.type,
          });
        });
      }
      console.log(list);
      updateDistributor(Object.assign(values, { channelId: id }));
      addPriceRate({ channelId: id, list });
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
