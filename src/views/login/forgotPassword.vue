<template>
  <div class="forgot-password">
    <h2>忘记密码</h2>
    <a-form>
      <a-form-item label="邮箱">
        <a-input placeholder="请输入注册邮箱" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary">发送重置邮件</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'forgotPassword' })
</script>
