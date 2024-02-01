<template>
  <div class="m-4 p-4 bg-white">
    <BasicForm class="local_form" @register="register" @submit="handleSubmit">
      <template #resetBefore>
        <a-button class="mr-2" @click="back">返回</a-button>
      </template>
    </BasicForm>
  </div>
</template>
<script lang="tsx" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { useRoute, useRouter } from 'vue-router';
  import { createSerie, getDetail, updateSeriesList, listCategory } from '@/api/sys/series';
  import { onMounted } from 'vue';
  import { getLabelList, searchChannel } from '@/api/sys/label';

  const { id } = useRoute().query;
  const isEditStatus = Boolean(id);

  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: isEditStatus ? '编辑剧集' : '添加新的剧集',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'title',
      component: 'Input',
      label: '标题',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'data',
      component: 'InputTextArea',
      label: '简介',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'state',
      component: 'Switch',
      label: '上架',
      defaultValue: 0,
      colProps: {
        span: 8,
      },
    },
    {
      field: 'updateState',
      component: 'Select',
      label: '已完结',
      componentProps: {
        options: [
          {
            label: '更新中',
            value: 0,
            key: '0',
          },
          {
            label: '已完结',
            value: 1,
            key: '1',
          },
        ],
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'ownerId',
      component: 'ApiSelect',
      label: '片方',
      colProps: {
        span: 8,
      },
      componentProps: {
        api: searchChannel,
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        // not request untill to select
        immediate: true,
      },
    },
    {
      field: 'p_v',
      component: 'Input',
      label: '片方分成',
      componentProps: {
        type: 'number',
      },
      colProps: {
        span: 8,
      },
    },
    // {
    //   field: 'field1',
    //   component: 'ImageUpload',
    //   label: '封面',
    //   colProps: {
    //     span: 8,
    //   },
    // },
    {
      field: 'field1',
      component: 'ApiSelect',
      label: '分类',
      colProps: {
        span: 8,
      },
      componentProps: {
        api: listCategory,
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        // not request untill to select
        immediate: true,
      },
    },
    {
      field: 'tags',
      component: 'ApiSelect',
      label: '标签',
      colProps: {
        span: 8,
      },
      componentProps: {
        mode: 'multiple',
        api: getLabelList,
        params: {
          id: 1,
        },
        resultField: 'list',
        // use name as label
        labelField: 'name',
        // use id as value
        valueField: 'id',
        // not request untill to select
        immediate: true,
      },
    },
    {
      field: 'weight',
      component: 'InputNumber',
      label: '权重',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'price',
      component: 'InputNumber',
      label: '价格',
      colProps: {
        span: 8,
      },
    },
    // {
    //   field: 'recommend',
    //   component: 'ApiSelect',
    //   label: '相关推荐剧',
    //   colProps: {
    //     span: 8,
    //   },
    //   componentProps: {
    //     mode: 'multiple',
    //     api: getSeriesList,
    //     params: {
    //       pageNum: 1,
    //       pageSize: 100,
    //     },
    //     resultField: 'list',
    //     // use name as label
    //     labelField: 'title',
    //     // use id as value
    //     valueField: 'id',
    //     // not request untill to select
    //     immediate: true,
    //   },
    // },
    {
      field: 'picId',
      component: 'Input',
      label: '剧目ID',
      colProps: {
        span: 8,
      },
    },
  ];
  const { back } = useRouter();

  const [register, methods] = useForm({
    labelWidth: 120,
    schemas,
    actionColOptions: {
      span: 24,
    },
    submitButtonOptions: {
      text: '提交',
    },
    showResetButton: true,
    showSubmitButton: true,
  });

  onMounted(async () => {
    if (id) {
      getDetail(id as string).then((res) => {
        res.p_v = res.p_v / 100;
        res.tags = res.tags.map((x) => x.id);
        res.ownerId = res.uid;
        if (res.category) {
          res.field1 = res.category.id;
        }
        if (res?.recommendItem?.data) {
          res.recommend = JSON.parse(res.recommendItem.data);
        }
        res.state = Boolean(res.state);
        methods.setFieldsValue(res);
      });
    }
  });

  function handleSubmit(values: any) {
    const tags = values.tags ? Object.values(values.tags) ?? [] : [];
    let price = -1;
    if (values.price) {
      price = Number(values.price);
    }
    if (values.p_v) {
      values.p_v = Number(values.p_v) * 100;
    }
    if (values.field1) {
      tags.push(values.field1);
    }
    if (values.recommend) {
      values.recommend = {
        type: 0,
        list: Object.values(values.recommend),
      };
    }
    const value = Object.assign(values, { tags, price, state: Number(values.state), type: 1 });
    delete value.field1;
    if (id) {
      updateSeriesList(Object.assign(value, { blogId: id }));
    } else {
      createSerie(value);
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
