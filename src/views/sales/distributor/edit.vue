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
    updatePriceRate,
    deletePriceRate,
  } from '@/api/sys/distributor';
  import { onMounted, reactive, computed } from 'vue';
  import { chargeList } from '@/api/playlet/charge';
  import { omit } from 'lodash-es';
  import { getSeriesList, getDetail } from '@/api/sys/series';

  const { back } = useRouter();
  const route = useRoute();
  const id = route.query.id;
  const type = route.query.type;

  const state = reactive({
    originItems: [],
    originSeries: [],
    isRoot: false,
  });

  const schemas = computed(() => {
    return [
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
        show: type === 'edit',
        label: '分销商名称：',
        colProps: {
          span: 8,
        },
      },
      {
        field: 'userId',
        component: 'Input',
        label: '用户id：',
        colProps: {
          span: 8,
        },
      },
      {
        field: 'parentName',
        component: 'Input',
        label: '上级名称：',
        colProps: {
          span: 8,
        },
        componentProps: {
          disabled: true,
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
        helpMessage: '登录管理后台的账号名',
        label: '账号名：',
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
        suffix: '%',
      },
      {
        field: 'channelRate',
        component: 'Input',
        label: '销售剧分成比例：',
        colProps: {
          span: 8,
        },
        suffix: '%',
      },
      {
        field: 'blogOwnerRate',
        component: 'Input',
        label: '发剧方分成比例：',
        colProps: {
          span: 8,
        },
        suffix: '%',
      },
      {
        field: 'vip',
        component: 'Input',
        show: type === 'edit' && !state.isRoot,
        label: '推广道具：',
        colProps: {
          span: 20,
        },
        renderColContent({ model, field }) {
          return (
            <>
              <FormTable
                label="推广道具："
                field="vip"
                userId={+id!}
                rowKey="goodsId"
                isItem={true}
                v-model:value={model[field]}
                onValueChange={refreshItemList}
                columns={[
                  {
                    title: '道具名称',
                    dataIndex: 'name',
                    key: 'title',
                  },
                  {
                    title: '价格',
                    dataIndex: 'price',
                    key: 'price',
                    width: 150,
                  },
                  {
                    title: '隶属',
                    dataIndex: 'channelName',
                    key: 'channelName',
                    width: 150,
                  },
                  {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 200,
                  },
                ]}
                editProps={['price']}
              />
            </>
          );
        },
      },
      {
        field: 'blog',
        component: 'Input',
        show: type === 'edit' && !state.isRoot,
        label: '推广剧集：',
        colProps: {
          span: 20,
        },
        renderColContent({ model, field }) {
          return (
            <>
              <FormTable
                userId={+id!}
                field="blog"
                label="推广剧集："
                showTable={true}
                v-model:value={model[field]}
                columns={[
                  {
                    title: 'title',
                    dataIndex: 'title',
                    key: 'title',
                  },
                  {
                    title: 'price',
                    dataIndex: 'price',
                    key: 'price',
                    width: 150,
                  },
                  {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 200,
                  },
                ]}
                editProps={['price']}
                rowKey="goodsId"
                actionOptions={{
                  text: '添加剧集',
                  api: (params) => getSeriesList({ ...params, pageSize: 10, pageNum: 1 }),
                  detailApi: getDetail,
                  optionField: ['title', 'id', 'list'],
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
    ] as FormSchema[];
  });

  const [registerModal] = useModal();

  const [register, { setFieldsValue }] = useForm({
    labelWidth: 160,
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

  const getChosenList = async (pageNum, topList, type) => {
    const data = await chargeList({ channelId: id, pageNum, pageSize: 20, type });
    const { nextPage, list } = data;
    if (nextPage) {
      return getChosenList(
        pageNum + 1,
        topList.concat(list.map((item) => ({ ...item, goodsId: +item.goodsId }))),
        type,
      );
    }
    return list;
  };

  const refreshItemList = async () => {
    const chosenItems = await getChosenList(1, [], 12);
    setFieldsValue({ vip: chosenItems });
  };

  const getData = async (id) => {
    const chosenItems = await getChosenList(1, [], 12);
    const chosenSeries = await getChosenList(1, [], 3);
    state.originSeries = chosenSeries;
    const res = await distributorDetail({ channelId: id });
    const { sellVipRate, channelRate, blogOwnerRate, id: userId, top_c } = res;
    state.isRoot = Boolean(+top_c);
    setFieldsValue({
      ...res,
      userId,
      sellVipRate: sellVipRate / 100,
      channelRate: channelRate / 100,
      blogOwnerRate: blogOwnerRate / 100,
      vip: chosenItems,
      blog: chosenSeries,
    });
  };

  onMounted(async () => {
    if (type === 'edit') {
      getData(id);
    } else {
      const res = await distributorDetail({ channelId: id });
      const { name } = res;
      setFieldsValue({ parentName: name });
    }
  });

  const getDiffParams = (originData, currentData) => {
    if (!currentData) {
      return {
        add: [],
        update: [],
        deleteData: [],
      };
    }
    const update: Record<'priceRateId' | 'price', string>[] = [];
    const add: Record<'price' | 'goodsId' | 'type', string | number>[] = [];
    const originMap = new Map();
    const deleteSet = new Set();
    for (let data of originData) {
      originMap[data.goodsId] = data;
      deleteSet.add(data.id);
    }
    for (let current of currentData) {
      if (deleteSet.has(current.id)) {
        deleteSet.delete(current.id);
      }
      if (originMap.has(current.goodsId)) {
        const origin = originMap.get(current.goodsId);
        if (origin.price !== current.price) {
          update.push({ priceRateId: current.priceRateId, price: current.price });
        }
      } else {
        add.push({ price: current.price, goodsId: current.goodsId, type: 3 });
      }
    }
    return {
      add,
      update,
      deleteData: Array.from(deleteSet),
    };
  };

  const getPlanParams = (values: Record<string, any>) => {
    const { blog } = values;
    const {
      add: blogAdd,
      update: blogUpdate,
      deleteData: blogDelete,
    } = getDiffParams(state.originSeries, blog);

    return {
      add: blogAdd,
      update: blogUpdate,
      deleteData: blogDelete,
    };
  };

  function handleSubmit(values: any) {
    const { sellVipRate, channelRate, blogOwnerRate } = values;

    if (type === 'edit') {
      const { add, update, deleteData } = getPlanParams(values);

      let updateRatePromise: (() => Promise<any>)[] = [];

      if (add.length > 0) {
        updateRatePromise.push(() => addPriceRate({ channelId: id, list: add }));
      }
      if (update.length > 0) {
        updateRatePromise.push(() => updatePriceRate({ channelId: id, list: update }));
      }
      if (deleteData.length > 0) {
        updateRatePromise.push(() => deletePriceRate(deleteData));
      }

      Promise.all([
        updateDistributor({
          ...omit(values, 'blog', 'vip'),
          sellVipRate: sellVipRate * 100,
          channelRate: channelRate * 100,
          blogOwnerRate: blogOwnerRate * 100,
          channelId: id,
        }),
        ...updateRatePromise.map((fn) => fn()),
      ]).then(() => {
        back();
      });
    } else {
      addChild({ ...omit(values, 'blog', 'vip'), parentId: id }).then(() => {
        back();
      });
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
