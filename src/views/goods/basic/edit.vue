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
  import { useRouter } from 'vue-router';

  import { onMounted, computed } from 'vue';
  import { TYPE_ENUM, TYPE_SELECTION } from '@/contants';
  import UploadField from './components/UploadField.vue';
  import AffixField from './components/AffixField.vue';
  import { useGlobSetting } from '@/hooks/setting';
  import { addPropBase } from '@/api/goods';

  const { back } = useRouter();
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

  // const getData = async (id) => {
  //   propBase(id).then(() => {
  //     setFieldsValue({
  //       name: 'ceshi',
  //       type: 1,
  //       img: [],
  //       affix: [],
  //     });
  //   });
  // };

  onMounted(async () => {
    setFieldsValue({
      name: 'ceshi',
      type: 1,
      imgs: [
        {
          uid: 144422,
          name: '1704770278679.png',
          url: `${appDomain}/assets/144422.png`,
          response: {
            data: {
              id: 144422,
              name: '1704770278679.png',
              url: '/assets/144422.png',
            },
          },
        },
      ],
      affix: [{ name: '123', id: 123 }],
    });
  });

  const handleParams = (params: IParams) => {
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
    addPropBase(params).then((res) => {
      console.log('res', res);
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
