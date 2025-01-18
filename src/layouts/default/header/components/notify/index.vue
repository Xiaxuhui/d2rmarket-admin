<template>
  <div :class="prefixCls">
    <Popover title="" trigger="click" :overlayClassName="`${prefixCls}__overlay`">
      <Badge :count="order.orderCount" dot :numberStyle="numberStyle">
        <BellOutlined />
      </Badge>
      <template #content>
        <Tabs>
          <template v-for="item in listData" :key="item.key">
            <Tabs.TabPane>
              <template #tab>
                {{ item.name }}
                <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
              </template>
              <!-- 绑定title-click事件的通知列表中标题是“可点击”的-->
              <NoticeList :list="item.list" v-if="item.key === '1'" @title-click="onNoticeClick" />
              <NoticeList :list="item.list" v-else />
            </Tabs.TabPane>
          </template>
        </Tabs>
      </template>
    </Popover>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import { Popover, Tabs, Badge } from 'ant-design-vue';
  import { BellOutlined } from '@ant-design/icons-vue';
  import { tabListData, ListItem } from './data';
  import NoticeList from './NoticeList.vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';
  import { useOrderStore } from '@/store/modules/order';

  const go = useGo();
  const { prefixCls } = useDesign('header-notify');

  const listData = ref(tabListData);
  const numberStyle = {};

  const order = useOrderStore();

  const orderTip = ref(new Audio('/src/assets/audio/order.m4a'));

  watch(
    () => order.orderCount,
    (val) => {
      if (val) {
        orderTip.value?.play().catch((error) => {
          console.error('播放失败:', error);
        });
        listData.value[0].list.push({
          id: '1',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
          title: `${val} new order(s) have been placed`,
          description: '',
          datetime: '',
          type: '1',
        });
      } else {
        listData.value[0].list = [];
      }
    },
  );

  onMounted(async () => {
    order.getOrderCount();
  });

  function onNoticeClick(record: ListItem) {
    // 可以直接将其标记为已读（为标题添加删除线）,此处演示的代码会切换删除线状态
    record.titleDelete = !record.titleDelete;
    go({
      path: PageEnum.ORDER_LIST,
    });
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-notify';

  .@{prefix-cls} {
    padding-bottom: 1px;

    &__overlay {
      max-width: 360px;
    }

    .ant-tabs-content {
      width: 300px;
    }

    .ant-badge {
      display: flex;
      align-items: center;
      font-size: 18px;

      .ant-badge-multiple-words {
        padding: 0 4px;
      }

      svg {
        width: 0.9em;
      }
    }
  }
</style>
