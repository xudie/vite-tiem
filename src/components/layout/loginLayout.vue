<template>
  <a-layout id="login-layout">
    <!-- <a-layout-header class="login-layout-header">Header</a-layout-header> -->
    <a-layout-content class="login-layout-content">
      <a-tabs activeKey="1" centered>
        <a-tab-pane key="1" tab="账号密码登录">
          <a-form
            :model="formState"
            name="normal_login"
            class="login-form"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-form-item
              name="username"
              :rules="[{ required: true, message: '请输入用户名!' }]"
            >
              <a-input
                v-model:value="formState.username"
                placeholder="Username"
              >
                <template #prefix>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              name="password"
              :rules="[{ required: true, message: '请输入密码!' }]"
            >
              <a-input-password
                v-model:value="formState.password"
                placeholder="Password"
              >
                <template #prefix>
                  <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item class="login-layout-remember-forget">
              <a-form-item name="remember" no-style>
                <a-checkbox v-model:checked="formState.remember"
                  >记住我</a-checkbox
                >
              </a-form-item>
              <a href="">忘记密码</a>
            </a-form-item>

            <a-form-item
              name="captcha"
              :rules="[{ required: true, message: '请输入验证码!' }]"
            >
              <a-input
                v-model:value="formState.captcha"
                placeholder="验证码"
                style="width: 150px; margin-right: 10px"
              />
              <img
                :src="captchaUrl"
                @click="refreshCaptcha"
                style="height: 32px; vertical-align: middle; cursor: pointer"
                alt="验证码"
              />
            </a-form-item>

            <a-form-item>
              <a-button
                :disabled="disabled"
                type="primary"
                html-type="submit"
                class="login-form-button"
              >
                登录
              </a-button>
            </a-form-item>
            <a-form-item class="login-layout-register">
              <a href="">立即注册</a>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>
    <a-layout-footer class="login-layout-footer">Footer</a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import http from '@/utils/request'
import { reactive, computed } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
interface FormState {
  username: string
  password: string
  captcha: string
  remember: boolean
}
const formState = reactive<FormState>({
  username: '',
  password: '',
  captcha: '',
  remember: true
})
const emit = defineEmits(['update:ifLogin'])

// 提供一个验证码图片接口（如 /api/captcha），返回验证码图片和验证码标识（如 session 或 token）
const captchaUrl = ref('/api/captcha?ts=' + Date.now())
const refreshCaptcha = () => {
  captchaUrl.value = '/api/captcha?ts=' + Date.now()
}
// 提交表单且数据验证成功后回调事件
const onFinish = (values: FormState) => {
  // 登录接口
  http
    .post('/api/login', values)
    .then((res: any) => {
      console.log('登录成功', res)
      message.success('登录成功')
    })
    .catch((err: any) => {
      console.error('登录失败', err)
    })

  // 登录成功后
  emit('update:ifLogin', true)
}
// 提交表单且数据验证失败后回调事件
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
</script>

<style lang="less">
#login-layout {
  // main layout
  .login-layout-content {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;

    // 表单
    .login-form {
      width: 300px;
      // 记住我 / 忘记密码
      .login-layout-remember-forget
        .ant-row
        .ant-col
        .ant-form-item-control-input
        .ant-form-item-control-input-content {
        display: flex;
        justify-content: space-between;
      }
      // 立即注册
      .login-layout-register {
        text-align: right;
      }

      // 登录 button
      .login-form-button {
        width: 100%;
      }
    }
  }

  // footer
  .login-layout-footer {
    text-align: center;
  }
}
</style>
