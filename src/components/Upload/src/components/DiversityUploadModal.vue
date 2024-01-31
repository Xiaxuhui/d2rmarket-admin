<template>
  <BasicModal
    width="800px"
    :title="t('component.upload.upload')"
    :okText="t('component.upload.save')"
    v-bind="$attrs"
    @register="register"
    @ok="handleOk"
    :closeFunc="handleCloseFunc"
    :maskClosable="false"
    :keyboard="false"
    class="upload-modal"
    :cancelButtonProps="{ disabled: isUploadingRef }"
    :show-ok-btn="false"
  >
    <template #centerFooter>
      <a-button
        @click="handleStartUpload"
        color="success"
        :disabled="!getIsSelectFile"
        :loading="isUploadingRef"
      >
        {{ getUploadBtnText }}
      </a-button>
    </template>

    <div class="upload-modal-toolbar">
      <Upload
        :accept="getStringAccept"
        :multiple="multiple"
        :before-upload="beforeUpload"
        :show-upload-list="false"
        class="upload-modal-toolbar__btn"
      >
        <a-button type="primary">
          {{ t('component.upload.choose') }}
        </a-button>
      </Upload>
    </div>
    <FileList
      v-model:dataSource="fileListRef"
      :columns="columns"
      :actionColumn="actionColumn"
      :openDrag="fileListOpenDrag"
      :dragOptions="fileListDragOptions"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, toRefs, unref, computed, PropType } from 'vue';
  import { Upload } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  // hooks
  import { useUploadType } from '../hooks/useUpload';
  import { useMessage } from '@/hooks/web/useMessage';
  //   types
  import type { ActionItem } from '@/components/Table';
  import { FileItem, UploadResultStatus } from '../types/typing';
  import { basicProps } from '../props';
  import { createDiversityTableColumns, createActionColumn } from './data';
  import { buildUUID } from '@/utils/uuid';
  import FileList from './FileList.vue';
  import { useI18n } from '@/hooks/web/useI18n';

  const props = defineProps({
    ...basicProps,
    previewFileList: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  });

  const emit = defineEmits(['change', 'register', 'delete']);

  const { t } = useI18n();

  const actionsFn = (record) => (props.actionsFn ? props.actionsFn(record) : []) as ActionItem[];

  const columns = createDiversityTableColumns();
  const actionColumn = createActionColumn(actionsFn);

  // 是否正在上传
  const isUploadingRef = ref(false);
  const fileListRef = ref<FileItem[]>([]);
  const { accept, helpText, maxNumber, maxSize } = toRefs(props);
  const [register, { closeModal }] = useModalInner();

  const { getStringAccept } = useUploadType({
    acceptRef: accept,
    helpTextRef: helpText,
    maxNumberRef: maxNumber,
    maxSizeRef: maxSize,
  });

  const { createMessage } = useMessage();

  const getIsSelectFile = computed(() => {
    return (
      fileListRef.value.length > 0 &&
      !fileListRef.value.every((item) => item.status === UploadResultStatus.SUCCESS)
    );
  });

  const getUploadBtnText = computed(() => {
    const someError = fileListRef.value.some((item) => item.status === UploadResultStatus.ERROR);
    return isUploadingRef.value
      ? t('component.upload.uploading')
      : someError
        ? t('component.upload.reUploadFailed')
        : t('component.upload.startUpload');
  });

  // 上传前校验
  function beforeUpload(file: File) {
    const { size, name } = file;
    const commonItem = {
      uuid: buildUUID(),
      file,
      size,
      name,
      percent: 0,
      type: name.split('.').pop(),
    };
    fileListRef.value = [...unref(fileListRef), commonItem];
    return false;
  }

  const getAccessToken = async () => {
    const { data } = await fetch('/getToken').then((res) => res.json());
    return data;
  };

  const applySplitUpload = async (access_token: string, filename: string) => {
    const data = {
      media_name: filename,
      media_type: 'MP4',
    };
    const { upload_id } = await fetch('/getUPloadID?access_token=' + access_token, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    }).then((res) => res.json());
    return upload_id;
  };

  async function uploadApiByItem(item: FileItem) {
    item.status = UploadResultStatus.UPLOADING;
    const access_token = await getAccessToken();
    item.percent = 10;
    const uploadId = await applySplitUpload(access_token, item.file.name);
    const data = new FormData();
    data.set('upload_id', uploadId);
    data.set('part_number', '1');
    data.set('resource_type', '1');
    data.set('data', item.file);

    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
    const chunkCount = Math.ceil(item.file.size / CHUNK_SIZE);

    const media_part_infos: any[] = [];
    for (let i = 0; i < chunkCount; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, item.file.size);
      const chunk = item.file.slice(start, end);
      const part_number = (i + 1).toString();
      const data = new FormData();
      data.set('upload_id', uploadId);
      data.set('part_number', part_number);
      data.set('resource_type', '1');
      data.set('data', chunk);

      const response = await fetch('/splitUpload?access_token=' + access_token, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data,
      });
      const { etag } = await response.json();

      media_part_infos.push({
        part_number,
        etag: JSON.parse(etag),
      });
    }

    item.percent = 30;
    const { media_id } = await fetch('/sureUpload?access_token=' + access_token, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        upload_id: uploadId,
        media_part_infos,
      }),
    }).then((res) => res.json());

    item.percent = 50;
    const { media_info } = await fetch('/getMediaList?access_token=' + access_token, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        media_id,
      }),
    }).then((res) => res.json());
    console.log(media_info.media_id);
    item.status = UploadResultStatus.SUCCESS;
    item.percent = 100;
    emit('change', media_info.media_id, item.file.name);
    return {
      success: true,
      error: null,
    };
  }

  // 点击开始上传
  async function handleStartUpload() {
    const { maxNumber } = props;
    if ((fileListRef.value.length + props.previewFileList?.length ?? 0) > maxNumber) {
      return createMessage.warning(t('component.upload.maxNumber', [maxNumber]));
    }
    try {
      isUploadingRef.value = true;
      // 只上传不是成功状态的
      const uploadFileList =
        fileListRef.value.filter((item) => item.status !== UploadResultStatus.SUCCESS) || [];
      const data = await Promise.all(
        uploadFileList.map((item) => {
          return uploadApiByItem(item);
        }),
      );
      isUploadingRef.value = false;
      // 生产环境:抛出错误
      const errorList = data.filter((item: any) => !item.success);
      if (errorList.length > 0) throw errorList;
    } catch (e) {
      isUploadingRef.value = false;
      throw e;
    }
  }

  //   点击保存
  function handleOk() {
    const { maxNumber } = props;

    if (fileListRef.value.length > maxNumber) {
      return createMessage.warning(t('component.upload.maxNumber', [maxNumber]));
    }
    if (isUploadingRef.value) {
      return createMessage.warning(t('component.upload.saveWarn'));
    }
    const fileList: string[] = [];

    for (const item of fileListRef.value) {
      const { status, response } = item;
      if (status === UploadResultStatus.SUCCESS && response) {
        fileList.push(response.location);
      }
    }
    // 存在一个上传成功的即可保存
    if (fileList.length <= 0) {
      return createMessage.warning(t('component.upload.saveError'));
    }
    fileListRef.value = [];
    closeModal();
    emit('change', fileList);
  }

  // 点击关闭：则所有操作不保存，包括上传的
  async function handleCloseFunc() {
    if (!isUploadingRef.value) {
      fileListRef.value = [];
      return true;
    } else {
      createMessage.warning(t('component.upload.uploadWait'));
      return false;
    }
  }
</script>
<style lang="less">
  .upload-modal {
    .ant-upload-list {
      display: none;
    }

    .ant-table-wrapper .ant-spin-nested-loading {
      padding: 0;
    }

    &-toolbar {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      &__btn {
        flex: 1;
        margin-left: 8px;
        text-align: right;
      }
    }
  }
</style>
