<template>
  <div class="relative flex-1 flex flex-col h-full px-4 pt-4 overflow-hidden">
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
                v-if="item.isCustomer !== 1"
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
                      time: item.time,
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
                  <RenderMessage :message="{ data: item.data, type: item.type, time: item.time }" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <SendInput
      @send="sendUserMessage"
      @file-change="fileChange"
      :disabled="loading"
      :file-loading="fileLoading"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch, nextTick, onMounted } from 'vue';
  import { messageList as getMessageList, sendMessage } from '@/api/users/message';
  import SendInput from './sendInput.vue';
  import RenderMessage from './renderMessage.vue';
  import { IMessage, IMessageState, IMessageType } from '../definition';

  const messageList = ref<IMessage[]>([]);

  const props = defineProps({
    qid: [Number, String],
    replyId: [Number, String],
  });

  const loading = ref(true);
  const fileLoading = ref(false);
  const pos = ref<number | undefined>(undefined);
  const stop = ref(false);

  watch(
    () => props.qid,
    async (val) => {
      if (!val) {
        messageList.value = [];
        return;
      }
      loading.value = true;
      messageList.value = [];

      const list = await getMessageList({ qid: props.qid }).catch((err) => {
        console.log(err.message);
      });
      loading.value = false;
      messageList.value = list;
      const length = messageList.value.length;
      pos.value = length > 0 ? messageList.value[length - 1].id : undefined;
      messageView();
      getRealMessageList(val);
    },
  );

  const sendUserMessage = (message: string) => {
    if (!props.qid || !message) {
      return;
    }
    sendMessage({ data: message, qid: props.qid, replyId: props.replyId, type: IMessageType.TEXT });
  };

  const fileChange = (fileObj: any) => {
    const { file } = fileObj;
    fileLoading.value = true;
    if (file.response) {
      const { data } = file.response;
      fileLoading.value = false;
      sendMessage({
        data: data.id,
        qid: props.qid,
        replyId: props.replyId,
        type: IMessageType.IMG,
      });
    }
  };

  const getRealMessageList = async (qid) => {
    if (qid === props.qid && !stop.value) {
      const id = setTimeout(async () => {
        if (qid === props.qid && !stop.value) {
          const list = await getMessageList({ qid, pos: pos.value }).catch((err) => {
            console.log(err.message);
            return [];
          });
          if (qid === props.qid && !stop.value) {
            if (list.length > 0) {
              messageList.value = messageList.value.concat(
                list.map((item) => {
                  return {
                    ...item,
                    state: IMessageState.READ,
                  };
                }),
              );
              pos.value = list[list.length - 1].id;
              messageView();
            }
            clearTimeout(id);
            return getRealMessageList(qid);
          } else {
            clearTimeout(id);
          }
        }
      }, 200);
    }
  };

  const messageView = () => {
    nextTick(() => {
      const length = messageList.value.length;
      const msgItem = document.getElementById(`${props.qid}${length - 1}`);
      msgItem?.scrollIntoView();
    });
  };

  onMounted(() => {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stop.value = true;
      } else {
        console.log('stop.value', stop.value);
        stop.value = false;
      }
    });
  });

  watch(stop, (val) => {
    if (!val && props.qid && !loading.value) {
      getRealMessageList(props.qid);
    }
  });
</script>
