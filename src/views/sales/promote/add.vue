<template>
  <div class="m-4 bg-white">
    <BasicForm class="invest_form" @register="register" @submit="handleSubmit">
      <template #resetBefore>
        <a-button class="mr-2" @click="back">返回</a-button>
      </template>
    </BasicForm>
  </div>
</template>
<script lang="tsx" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { onMounted, reactive } from 'vue';
  import { detailPromote, addPromote, updatePromote } from '@/api/promote';
  import { useRouter, useRoute } from 'vue-router';
  import { distributorDetail } from '@/api/sys/distributor';
  import { useUserStore } from '@/store/modules/user';
  import { getSeriesList } from '@/api/sys/series';
  import { debounce, omit, pick } from 'lodash-es';
  import { InputGroup, Input, Tooltip, Button, FormItem } from 'ant-design-vue';
  import { CopyOutlined } from '@ant-design/icons-vue';
  import { copyText } from '@/utils/copyTextToClipboard';
  import message from '@/views/form-design/utils/message';

  const user = useUserStore();
  const route = useRoute();
  const investId = route.query.id;

  const params = reactive({
    title: '',
  });

  const schemas: FormSchema[] = reactive([
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '添加任务',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'channelId',
      component: 'Input',
      defaultValue: '',
      label: '投手Id：',
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'channelName',
      component: 'Input',
      defaultValue: '',
      label: '投手名：',
      componentProps: {
        disabled: true,
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'platform',
      component: 'Select',
      label: '平台：',
      componentProps: {
        disabled: !!investId,
        options: [
          {
            label: '抖音',
            value: 1,
            key: 1,
          },
        ],
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'state',
      component: 'Switch',
      label: '启用：',
      defaultValue: 1,
      componentProps: {
        checkedValue: 1,
        unCheckedValue: 0,
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'collectionId',
      component: 'ApiSelect',
      label: '剧集：',
      componentProps: {
        disabled: !!investId,
        showSearch: true,
        onSearch: debounce((val) => {
          params.title = val;
        }, 500),
        api: (params) => getSeriesList({ ...params, pageSize: 10, pageNum: 1 }),
        params,
        labelField: 'title',
        valueField: 'id',
        resultField: 'list',
        filterOption: false,
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'link',
      component: 'Input',
      label: '推广链接：',
      show: !!investId,
      render({ model, field }) {
        return (
          <InputGroup compact>
            <Input disabled v-model:value={model[field]} style="width: calc(100% - 46px)" />
            <Tooltip title="copy url">
              <Button onClick={() => copyText(model[field])}>
                <CopyOutlined />
              </Button>
            </Tooltip>
          </InputGroup>
        );
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'rate',
      component: 'Input',
      label: '回传比率：',
      colProps: {
        span: 6,
      },
      suffix: '%',
    },
    {
      field: 'min',
      component: 'Input',
      fields: ['max'],
      label: '回传范围：',
      render({ model, field }) {
        return (
          <InputGroup compact>
            <Input v-model:value={model[field]} class="invest_typeValue" /> &nbsp; ~ &nbsp;
            <FormItem name="max" class="invest-from-item">
              <Input v-model:value={model['max']} class="local_typeValue" />
            </FormItem>
            &nbsp; ¥
          </InputGroup>
        );
      },
      colProps: {
        span: 8,
      },
    },
    {
      field: 'notes',
      component: 'Input',
      label: '投流备注：',
      colProps: {
        span: 8,
      },
    },
  ]);

  const { back } = useRouter();

  const [register, methods] = useForm({
    labelWidth: 120,
    isNotRow: true,
    schemas,
    actionColOptions: {
      span: 10,
    },
    submitButtonOptions: {
      text: '提交',
    },
    showResetButton: false,
    showSubmitButton: true,
  });

  const initDistributor = async (id: number | string) => {
    const res = await distributorDetail({ channelId: id });
    const { name } = res;
    return { name, id };
  };

  onMounted(async () => {
    if (investId) {
      const res = await detailPromote({ investId });
      const { collectionName } = res;
      params.title = collectionName;
      if (res) {
        methods.setFieldsValue({ ...res });
      }
    } else {
      const userInfo = user.getUserInfo;
      const { id } = userInfo;
      const { name } = await initDistributor(id as string);

      methods.setFieldsValue({ channelId: id, channelName: name, min: 0, max: 999 });
    }
  });

  async function handleSubmit(values: any) {
    const { min, max } = values;
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
      return message.error('回传范围必须是整数');
    }
    if (investId) {
      await updatePromote({ ...pick(values, 'notes', 'rate', 'state', 'min', 'max'), investId });
    } else {
      await addPromote(omit(values, 'divider-basic', 'link', 'channelName'));
    }

    back();
  }
</script>
<style lang="less" scoped>
  :deep(.invest_form) .local_typeValue {
    width: 100px;
  }

  :deep(.invest_form) .invest_typeValue {
    width: 100px;
    border-radius: 6px;
  }

  :deep(.invest_form) .invest-from-item {
    border: 0;
  }
</style>
