<template>
  <FormItem label="Image" labelCenter>
    <Upload
      name="file"
      :file-list="modelValue"
      multiple
      @preview="onPreview"
      @change="handleChange"
      :action="uploadUrl"
      :showUploadList="true"
      list-type="picture-card"
      accept=".jpg,.jpeg,.gif,.png,.webp"
    >
      Upload
    </Upload>
  </FormItem>
</template>
<script lang="ts" setup>
  import { Upload, UploadFile } from 'ant-design-vue';
  import { useGlobSetting } from '@/hooks/setting';
  import { FormItem } from '@/components/FormItem';

  defineOptions({ name: 'TinymceImageUpload' });

  interface IUpload {
    code: number;
    data: {
      ctime: number;
      id: number;
      name: string;
      url: string;
    };
  }

  defineProps({
    fullscreen: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object as PropType<UploadFile<IUpload>[]>,
      default: () => [],
    },
  });

  const emit = defineEmits(['uploading', 'done', 'error', 'update:modelValue']);

  let uploading = false;

  const { uploadUrl, appDomain } = useGlobSetting();

  const onPreview = (file) => {
    const { response = {} } = file;
    const { data = {} } = response;
    window.open(`${appDomain}${data.url}`);
  };

  function handleChange(info: Record<string, any>) {
    const fileList = info.fileList;
    const file = info.file;
    const status = file?.status;
    const url = file?.response?.url;
    const name = file?.name;

    if (status === 'uploading') {
      if (!uploading) {
        emit('uploading', name);
        uploading = true;
      }
    } else if (status === 'done') {
      emit('done', name, url);
      uploading = false;
    } else if (status === 'error') {
      emit('error');
      uploading = false;
    }

    emit('update:modelValue', fileList);
  }
</script>
