<template>
  <Upload
    name="file"
    @change="handleChange"
    :action="uploadUrl"
    :showUploadList="false"
    accept=".jpg,.jpeg,.gif,.png,.webp"
  >
    <Button :disabled="disabled && fileLoading">
      <template #icon>
        <svg
          v-show="!fileLoading"
          class="w-[25px] cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          />
        </svg>
        <svg
          v-show="fileLoading"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
            opacity="0.5"
          />
          <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
            <animateTransform
              attributeName="transform"
              dur="1s"
              from="0 12 12"
              repeatCount="indefinite"
              to="360 12 12"
              type="rotate"
            />
          </path>
        </svg>
      </template>
    </Button>
  </Upload>
</template>
<script lang="ts" setup>
  import { useGlobSetting } from '@/hooks/setting';
  import { Button, Upload } from 'ant-design-vue';

  const { uploadUrl } = useGlobSetting();

  defineProps({
    disabled: Boolean,
    fileLoading: Boolean,
  });

  const emits = defineEmits(['fileChange']);

  const handleChange = (fileObj) => {
    emits('fileChange', fileObj);
  };
</script>
