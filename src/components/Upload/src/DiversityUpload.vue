<template>
  <div>
    <Space>
      <a-button type="primary" @click="openUploadModal" preIcon="carbon:cloud-upload">
        {{ t('component.upload.upload') }}
      </a-button>
    </Space>
    <UploadModal
      v-bind="bindValue"
      :previewFileList="fileList"
      :fileListOpenDrag="fileListOpenDrag"
      :fileListDragOptions="fileListDragOptions"
      @register="registerUploadModal"
      @change="handleChange"
      @delete="handleDelete"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch, unref, computed, useAttrs } from 'vue';
  import { Recordable } from '@vben/types';
  import { Space } from 'ant-design-vue';
  import { useModal } from '@/components/Modal';
  import { uploadContainerProps } from './props';
  import { omit } from 'lodash-es';
  import { useI18n } from '@/hooks/web/useI18n';
  import { isArray } from '@/utils/is';
  import UploadModal from './components/DiversityUploadModal.vue';

  defineOptions({ name: 'BasicUpload' });

  const props = defineProps(uploadContainerProps);

  const emit = defineEmits(['change', 'delete', 'preview-delete', 'update:value']);

  const attrs = useAttrs();
  const { t } = useI18n();
  // 上传modal
  const [registerUploadModal, { openModal: openUploadModal }] = useModal();

  const fileList = ref<string[]>([]);

  const bindValue = computed(() => {
    const value = { ...attrs, ...props };
    return omit(value, 'onChange');
  });

  watch(
    () => props.value,
    (value = []) => {
      fileList.value = isArray(value) ? value : [];
    },
    { immediate: true },
  );

  // 上传modal保存操作
  function handleChange(urls: string[]) {
    fileList.value = [...unref(fileList), ...(urls || [])];
    emit('update:value', fileList.value);
    emit('change', fileList.value);
  }

  function handleDelete(record: Recordable<any>) {
    emit('delete', record);
  }
</script>
