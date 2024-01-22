<template>
  <PageWrapper title="素材上传">
    <BasicUpload
      :maxSize="100"
      :maxNumber="10"
      @change="handleChange"
      :api="uploadApi"
      :actionsFn="actionsFn"
      class="my-5"
      :accept="['video/*']"
    />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import COS from 'cos-js-sdk-v5';
  import { BasicUpload } from '@/components/Upload';
  import { useMessage } from '@/hooks/web/useMessage';
  import { PageWrapper } from '@/components/Page';
  import type { ActionItem } from '@/components/Table';
  import { useI18n } from '@/hooks/web/useI18n';
  import { reactive } from 'vue';
  // import { uploadApi } from '@/api/sys/upload';
  const taskIdMap = reactive(new Map<String, Record<string, string>>());

  const { t } = useI18n();

  const Bucket = 'video-1302631994';
  const Region = 'ap-nanjing';
  const filePrefix = 'short/';
  const cos = new COS({
    SecretId: 'AKID3BIUoz08gLvWxPis6DFNTewR0xkYWLvN',
    SecretKey: 'd9ZXXRCpKgtyugLtHtVzTnzCLROJByiP',
  });

  cos.getBucket(
    {
      Bucket /* 填写自己的 bucket，必须字段 */,
      Region /* 存储桶所在地域，必须字段 */,
      Prefix: filePrefix /* 列出目录 a 下所有文件，非必须 */,
    },
    function (err, data) {
      console.log(err || data.Contents);
    },
  );

  const uploadApi = (params, onUploadProgress) => {
    console.log('params', params);
    const { file } = params;
    return cos
      .sliceUploadFile({
        Bucket /* 填写自己的 bucket，必须字段 */,
        Region /* 存储桶所在地域，必须字段 */,
        Key: `${filePrefix}${file.name}` /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
        Body: file, // 上传文件对象
        onProgress: onUploadProgress,
        onTaskReady(taskId) {
          console.log('taskId: ' + taskId);
          taskIdMap.set(file.uid, {
            taskId,
            status: 'pending',
          });
        },
      })
      .then((res) => {
        console.log('res', res);
        taskIdMap.delete(file.uid);
        return {
          data: {
            res,
            location: decodeURIComponent(res.Location),
          },
        };
      });
  };
  const { createMessage } = useMessage();

  function handleChange(list: string[]) {
    createMessage.info(`已上传文件${JSON.stringify(list)}`);
  }

  const actionsFn = (record) => {
    const { taskId, status } = taskIdMap.get(record.file.uid) || {};
    return [
      !!taskId &&
        status === 'pending' && {
          label: t('routes.content.pauseUpload'),
          color: 'warning',
          onClick: () => {
            taskIdMap.set(record.file.uid, {
              taskId,
              status: 'pause',
            });
            cos.pauseTask(taskId);
          },
        },
      !!taskId &&
        status === 'pause' && {
          label: t('routes.content.continueUpload'),
          color: 'success',
          onClick: () => {
            taskIdMap.set(record.file.uid, {
              taskId,
              status: 'pending',
            });
            cos.restartTask(taskId);
          },
        },
    ].filter((item) => !!item) as ActionItem[];
  };
</script>
