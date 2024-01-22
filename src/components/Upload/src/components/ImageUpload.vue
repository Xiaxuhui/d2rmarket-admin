<template>
  <div>
    <Upload
      v-bind="$attrs"
      v-model:file-list="fileList"
      :list-type="listType"
      :accept="getStringAccept"
      :multiple="multiple"
      :maxCount="maxNumber"
      :before-upload="beforeUpload"
      :custom-request="customRequest"
      @preview="handlePreview"
      @remove="handleRemove"
    >
      <div v-if="fileList && fileList.length < maxNumber">
        <plus-outlined />
        <div style="margin-top: 8px">{{ t('component.upload.upload') }}</div>
      </div>
    </Upload>
    <Modal :open="previewOpen" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="" style="width: 100%" :src="previewImage" />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, toRefs, watch } from 'vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import type { UploadFile, UploadProps } from 'ant-design-vue';
  import { Modal, Upload } from 'ant-design-vue';
  import { UploadRequestOption } from 'ant-design-vue/lib/vc-upload/interface';
  import { useMessage } from '@/hooks/web/useMessage';
  import { isArray, isObject, isString } from '@/utils/is';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useUploadType } from '../hooks/useUpload';
  import { uploadContainerProps } from '../props';
  import { isImgTypeByName } from '../helper';
  import { UploadResultStatus } from '@/components/Upload/src/types/typing';
  import { getFileUploadAPI } from '@/api/sys/upload';
  import { fileToSha256 } from '../../../../utils/index';
  import { RcFile } from 'ant-design-vue/es/vc-upload/interface';
  import mime from 'mime-types';
  import axios from 'axios';

  defineOptions({ name: 'ImageUpload' });

  const emit = defineEmits(['change', 'update:value', 'delete']);
  const props = defineProps({
    ...uploadContainerProps,
  });
  const { t } = useI18n();
  const { createMessage } = useMessage();
  const { accept, helpText, maxNumber, maxSize } = toRefs(props);
  const isInnerOperate = ref<boolean>(false);
  const { getStringAccept } = useUploadType({
    acceptRef: accept,
    helpTextRef: helpText,
    maxNumberRef: maxNumber,
    maxSizeRef: maxSize,
  });
  const previewOpen = ref<boolean>(false);
  const previewImage = ref<string>('');
  const previewTitle = ref<string>('');

  const fileList = ref<UploadProps['fileList']>([]);
  const isLtMsg = ref<boolean>(true);
  const isActMsg = ref<boolean>(true);

  watch(
    () => props.value,
    (v) => {
      if (isInnerOperate.value) {
        isInnerOperate.value = false;
        return;
      }
      if (v) {
        let value: string[] = [];
        if (isArray(v)) {
          value = v;
        } else {
          value.push(v);
        }
        fileList.value = value.map((item, i) => {
          if (item && isString(item)) {
            return {
              uid: -i + '',
              name: item.substring(item.lastIndexOf('/') + 1),
              status: 'done',
              url: item,
            };
          } else if (item && isObject(item)) {
            return item;
          } else {
            return;
          }
        }) as UploadProps['fileList'];
      }
    },
  );

  function getBase64<T extends string | ArrayBuffer | null>(file: File) {
    return new Promise<T>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as T);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64<string>(file.originFileObj!);
    }
    previewImage.value = file.url || file.preview || '';
    previewOpen.value = true;
    previewTitle.value =
      file.name || previewImage.value.substring(previewImage.value.lastIndexOf('/') + 1);
  };

  const handleRemove = async (file: UploadFile) => {
    if (fileList.value) {
      const index = fileList.value.findIndex((item) => item.uid === file.uid);
      index !== -1 && fileList.value.splice(index, 1);
      const value = getValue();
      isInnerOperate.value = true;
      emit('change', value);
      emit('delete', file);
    }
  };

  const handleCancel = () => {
    previewOpen.value = false;
    previewTitle.value = '';
  };

  const beforeUpload = (file: File) => {
    console.log(file);
    const { maxSize, accept } = props;
    const { name } = file;
    const isAct = isImgTypeByName(name);
    if (!isAct) {
      createMessage.error(t('component.upload.acceptUpload', [accept]));
      isActMsg.value = false;
      // 防止弹出多个错误提示
      setTimeout(() => (isActMsg.value = true), 1000);
    }
    const isLt = file.size / 1024 / 1024 > maxSize;
    if (isLt) {
      createMessage.error(t('component.upload.maxSizeMultiple', [maxSize]));
      isLtMsg.value = false;
      // 防止弹出多个错误提示
      setTimeout(() => (isLtMsg.value = true), 1000);
    }
    return (isAct && !isLt) || Upload.LIST_IGNORE;
  };

  const getFileTypeValue = (file: RcFile): number => {
    const mimeType = file.type || mime.lookup(file.name);

    switch (mimeType) {
      case 'image/png':
        return 1;
      case 'video/mp4':
        return 2;
      case 'video/quicktime': // MOV 文件的 MIME 类型
        return 3;
      case 'image/jpeg':
        return 4;
      default:
        return -1;
    }
  };

  async function customRequest(info: UploadRequestOption<any>) {
    const { file } = info;
    const f = file as RcFile;
    try {
      const sha256 = await fileToSha256(f);
      const type = getFileTypeValue(f);
      if (type === -1) {
        const e = new TypeError('未知的文件类型');
        info.onError!(e);
        return;
      }
      const { data } = await getFileUploadAPI({ sha256, size: f.size, type });
      const res = await axios({
        url: data.data as unknown as string,
        method: 'PUT',
        data: await f.arrayBuffer(),
      });
      info.onSuccess!(res.data);
      const value = getValue();
      isInnerOperate.value = true;
      emit('change', value);
    } catch (e: any) {
      console.log(e);
      info.onError!(e);
    }
  }

  function getValue() {
    const list = (fileList.value || [])
      .filter((item) => item?.status === UploadResultStatus.DONE)
      .map((item: any) => {
        return item?.url || item?.response?.url;
      });
    return props.multiple ? list : list.length > 0 ? list[0] : '';
  }
</script>

<style lang="less">
  .ant-upload-select-picture-card i {
    color: #999;
    font-size: 32px;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
