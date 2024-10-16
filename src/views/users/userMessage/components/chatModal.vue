<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="'Chat'"
    destroyOnClose
    :maskClosable="false"
    @cancel="closeDialog"
  >
    <template #footer> </template>
    <div class="relative flex-1 flex flex-col h-[600px] px-4 pt-4">
      <div
        class="scrollbar__wrap--hidden-default flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 p-4 overflow-auto"
        style="height: calc(100% - 60px)"
        id="msg"
      >
        <div class="flex flex-col h-full mb-4">
          <div class="flex flex-col h-full">
            <div class="grid grid-cols-12 gap-y-2">
              <template v-for="(item, index) in messageList" :key="index">
                <div
                  v-if="
                    item.state === IMessageState.UNREAD &&
                    (index === 0 || messageList[index - 1].state === IMessageState.READ)
                  "
                  class="col-start-2 col-end-12 justify-between"
                >
                  <div class="flex items-center"
                    ><div class="w-[40%] border-t border-[#ddd]"></div>
                    <div class="mx-2 text-[#C0C0C0] text-sm">new message</div>
                    <div class="w-[40%] border-t border-[#ddd]"></div
                  ></div>
                </div>
                <div
                  v-if="item.uid === 100"
                  class="col-start-6 col-end-13 p-3 rounded-lg"
                  :id="`${qid}${index}`"
                >
                  <div class="flex items-start justify-start flex-row-reverse">
                    <div
                      class="flex items-center text-white justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      {{ (item.name || 'A').slice(0, 1).toUpperCase() }}
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
                <div v-else class="col-start-1 col-end-8 p-3 rounded-lg" :id="`${qid}${index}`">
                  <div class="flex flex-row items-start">
                    <div
                      class="flex items-center text-white justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      {{ (item.name || 'U').slice(0, 1).toUpperCase() }}
                    </div>
                    <RenderMessage :message="{ data: item.data, type: item.type }" />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <SendInput @send="sendUserMessage" :disabled="loading" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, watch, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { messageList as getMessageList, sendMessage } from '@/api/users/message';
  import SendInput from './sendInput.vue';
  import RenderMessage from './renderMessage.vue';
  import { IMessage, IMessageState } from '../definition';

  const messageList = ref<IMessage[]>([]);

  const qid = ref();
  const replyId = ref();
  const loading = ref(true);
  const stop = ref(false);

  const [register, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ width: 800 });
    stop.value = false;
    loading.value = true;
    qid.value = data.qid;
    replyId.value = data.replyId;
    messageList.value = [];
    const list = await getMessageList({ qid: qid.value }).catch((err) => {
      console.log(err.message);
    });
    loading.value = false;
    messageList.value = list;
    messageView();
  });

  const sendUserMessage = (message: string) => {
    sendMessage({ data: message, qid: qid.value, replyId: replyId.value });
  };

  const getRealMessageList = async (qid) => {
    if (!stop.value) {
      const list = await getMessageList({ qid }).catch((err) => {
        console.log(err.message);
      });
      if (list.length !== messageList.value.length) {
        messageList.value = list;
        messageView();
      }
      return getRealMessageList(qid);
    }
  };

  const messageView = () => {
    nextTick(() => {
      const length = messageList.value.length;
      const msgItem = document.getElementById(`${qid.value}${length - 1}`);
      msgItem?.scrollIntoView();
    });
  };

  watch([qid, loading], ([q, l]) => {
    if (q && !l) {
      getRealMessageList(q);
    }
  });

  const closeDialog = () => {
    stop.value = true;
  };
</script>
