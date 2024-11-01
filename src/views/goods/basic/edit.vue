<template>
  <div class="m-4 bg-white">
    <BasicForm class="local_form" @register="register" @submit="handleSubmit">
      <template #resetBefore>
        <a-button class="mr-2" @click="back">back</a-button>
      </template>
    </BasicForm>
  </div>
</template>
<script lang="tsx" setup>
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { useRoute, useRouter } from 'vue-router';

  import { onMounted, computed } from 'vue';
  import { TYPE_ENUM, TYPE_SELECTION } from '@/contants';
  import UploadField from './components/UploadField.vue';
  import AffixField from './components/AffixField.vue';
  import { useGlobSetting } from '@/hooks/setting';
  import { addPropBase, propBase } from '@/api/goods';

  const { back } = useRouter();

  const route = useRoute();
  const baseId = route.query.id;
  // const isEdit = route.query.type === 'edit';
  // const route = useRoute();
  const { appDomain } = useGlobSetting();
  // const id = route.query.id;
  // const type = route.query.type;

  interface IParams {
    name: string;
    type: TYPE_ENUM;
    imgs: {
      uid: number;
      name: string;
      url: string;
      response: {
        code?: number;
        data: {
          id: number;
          name: string;
          url: string;
        };
      };

      [key: string]: any;
    }[];
    affix: { id: number; name: string }[];
  }

  const schemas = computed(() => {
    return [
      {
        field: 'divider-basic',
        component: 'Divider',
        label: 'ADD BASE GOODS',
        colProps: {
          span: 24,
        },
      },
      {
        field: 'name',
        component: 'Input',
        label: 'Name:',
        colProps: {
          span: 8,
        },
      },
      {
        field: 'type',
        component: 'Select',
        label: 'Type:',
        colProps: {
          span: 8,
        },
        componentProps: {
          options: TYPE_SELECTION,
        },
      },
      {
        field: 'imgs',
        component: 'Input',
        label: 'Image:',
        colProps: {
          span: 20,
        },
        renderColContent({ model, field }) {
          return <UploadField vModel={model[field]} />;
        },
      },
      {
        field: 'affix',
        component: 'Input',
        label: 'Affix:',
        colProps: {
          span: 20,
        },
        renderColContent({ model, field }) {
          return <AffixField vModel={model[field]} />;
        },
      },
    ] as FormSchema[];
  });

  const [register, { setFieldsValue }] = useForm({
    labelWidth: 160,
    isNotRow: true,
    schemas,
    actionColOptions: {
      span: 12,
    },
    submitButtonOptions: {
      text: 'Submit',
    },
    showSubmitButton: true,
    showResetButton: false,
  });

  const getData = async (id) => {
    propBase(id).then((res) => {
      const { affixList, imgList, type, name } = res;
      setFieldsValue({
        name,
        type,
        imgs: imgList.map((item) => {
          const { id, name, url } = item;
          return {
            uid: id,
            name,
            url: `${appDomain}${url}`,
            response: {
              data: item,
            },
          };
        }),
        affix: affixList.map((item) => {
          const { id, name } = item;
          return {
            id,
            name,
          };
        }),
      });
    });
  };

  onMounted(async () => {
    getData(baseId);
  });

  const handleParams = (
    params: IParams,
  ): { id?: number; imgs: string; affixs: string } & Pick<IParams, 'type' | 'name'> => {
    const { imgs, type, name, affix } = params;
    return {
      type,
      name,
      affixs: affix
        .reduce((prev, nxt) => {
          return prev + nxt.id + ',';
        }, '')
        .slice(0, -1),
      imgs: imgs
        .reduce((prev, nxt) => {
          return prev + nxt.response.data.id + ',';
        }, '')
        .slice(0, -1),
    };
  };

  function handleSubmit(values: any) {
    console.log('values', values);
    const params = handleParams(values);
    console.log('params', params);
    if (baseId) {
      params.id = +baseId;
    }
    addPropBase(params).then((res) => {
      console.log('res', res);
      back();
    });
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
@/api/users/charge
