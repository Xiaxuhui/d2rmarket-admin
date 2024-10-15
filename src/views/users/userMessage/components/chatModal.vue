<template>
  <BasicModal v-bind="$attrs" @register="register" :title="'Chat'">
    <template #footer> </template>
    <div class="relative flex-1 flex flex-col h-[600px] px-4 pt-4">
      <div
        class="scrollbar__wrap--hidden-default flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 p-4 overflow-auto"
        style="height: calc(100% - 60px)"
      >
        <div class="flex flex-col h-full mb-4">
          <div id="msg" class="flex flex-col h-full">
            <div class="grid grid-cols-12 gap-y-2">
              <div class="col-start-2 col-end-12 justify-between">
                <div class="flex items-center"
                  ><div class="w-[40%] border-t border-[#ddd]"></div>
                  <div class="mx-2 text-[#C0C0C0] text-sm">new message</div>
                  <div class="w-[40%] border-t border-[#ddd]"></div
                ></div>
              </div>
              <template v-for="(item, index) in messageList" :key="index">
                <div
                  v-if="item.uid === 1000"
                  :class="`col-start-6 col-end-13 p-3 rounded-lg ${
                    needAnimate && 'animate__animated animate__fadeInUp animate__delay-0.5s'
                  }`"
                >
                  <div class="flex items-start justify-start flex-row-reverse">
                    <div
                      class="flex items-center text-white justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      X
                    </div>
                    <RenderMessage
                      :message="{
                        data: item.data,
                        type: item.type,
                      }"
                      isMyself
                    />
                  </div>
                </div>
                <div
                  v-else
                  :class="`col-start-1 col-end-8 p-3 rounded-lg  ${
                    needAnimate && 'animate__animated animate__fadeInUp animate__delay-0.5s`'
                  }`"
                >
                  <div class="flex flex-row items-start">
                    <div
                      class="flex items-center text-white justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      U
                    </div>
                    <RenderMessage :message="{ data: item.data, type: item.type }" />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <SendInput @send="sendUserMessage" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { messageList as getMessageList, sendMessage } from '@/api/users/message';
  import SendInput from './sendInput.vue';
  import RenderMessage from './renderMessage.vue';
  import { IMessage } from '../definition';

  const state = reactive({
    loading: false,
  });

  const messageList = ref<IMessage[]>([]);

  const qid = ref();

  const [register, { setModalProps }] = useModalInner(async (id) => {
    setModalProps({ width: 800 });
    state.loading = true;
    qid.value = id;
    const list = await getMessageList({}).catch((err) => {
      console.log(err.message);
    });
    messageList.value = list;
  });

  const sendUserMessage = (message: string) => {
    sendMessage({ data: message, qid: qid.value });
  };

  const needAnimate = true;
</script>
