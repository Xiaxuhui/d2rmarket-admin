<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <Row :gutter="24">
      <Col :span="14">
        <BasicForm @register="register" />
      </Col>
      <Col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
        </div>
      </Col>
    </Row>
    <a-button type="primary" @click="handleSubmit"> 更新基本信息 </a-button>
  </CollapseContainer>
</template>
<script lang="ts" setup>
  import { Row, Col } from 'ant-design-vue';
  import { onMounted } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { CollapseContainer } from '@/components/Container';

  import { useMessage } from '@/hooks/web/useMessage';

  import { accountInfoApi } from '@/api/demo/account';
  import { baseSetschemas } from './data';

  const { createMessage } = useMessage();

  const [register, { setFieldsValue }] = useForm({
    labelWidth: 120,
    schemas: baseSetschemas,
    showActionButtonGroup: false,
  });

  onMounted(async () => {
    const data = await accountInfoApi();
    setFieldsValue(data);
  });

  function handleSubmit() {
    createMessage.success('更新成功！');
  }
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
