<template>
  <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full">
    <div class="flex items-center justify-center text-gray-400 hover:text-gray-600">
      <UploadFile :disabled="disabled" />
    </div>
    <div class="flex-grow ml-2">
      <div class="relative w-full">
        <div class="flex w-full border border-slate-300 rounded-xl px-4 min-h-[40px]">
          <input
            type="text"
            class="w-full focus:outline-none focus:border-indigo-300"
            v-model="message"
            :disabled="disabled"
            @keydown="
              (e) => {
                if (e.keyCode === 13) {
                  sendMsg();
                }
              }
            "
          />
        </div>
      </div>
    </div>
    <div class="ml-4">
      <Button type="primary" size="large" @click="sendMsg" :disabled="disabled">
        Send
        <template #icon>
          <svg
            class="w-4 h-4 transform rotate-45 -mt-px"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </template>
      </Button>
      <!-- <Popover content={setCrazySendCount} title="Crazy Send Count" trigger={'click'} placement="topRight" arrow={false}>
          <SettingOutlined class='ml-2' />
        </Popover> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue';
  import { ref } from 'vue';
  import UploadFile from './uploadFile.vue';

  const emit = defineEmits(['send']);

  defineProps({
    disabled: Boolean,
  });

  const message = ref('');

  const sendMsg = () => {
    emit('send', message.value);
    message.value = '';
  };
</script>
