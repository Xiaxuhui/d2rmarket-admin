<template>
  <div class="flex bg-white rounded-lg shadow-lg overflow-hidden h-full m-[20px]">
    <UserList @chat-change="chatChange" />
    <ChatModal :qid="qid" :replyId="userId" />
    <OrderInfo :uid="userId" />
  </div>
</template>
<script lang="ts" setup>
  import { onUnmounted, ref, onMounted } from 'vue';
  import ChatModal from './components/chatModal.vue';
  import UserList from './components/userList.vue';
  import OrderInfo from './components/orderInfo.vue';
  import { IUserMessage } from '@/definations';
  import { useTagsStore } from '@/store/modules/tags';

  defineOptions({
    name: 'UserMessage',
  });

  const tags = useTagsStore();

  const qid = ref(0);
  const userId = ref(0);

  const chatChange = (item: IUserMessage) => {
    userId.value = item.uid;
    qid.value = item.qid;
  };

  onMounted(() => {
    tags.getTags();
  });

  onUnmounted(() => {
    qid.value = 0;
    userId.value = 0;
  });
</script>
