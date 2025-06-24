<script setup lang="ts">
import { ref } from 'vue'
import loginLayout from './components/layout/loginLayout.vue'
import loginSuccessfulLayout from './components/layout/loginSuccessfulLayout.vue'
//import HelloWorld from './components/HelloWorld.vue'

const ifLogin = ref(false)
</script>

<template>
  <login-layout v-if="!ifLogin" @update:ifLogin="ifLogin = $event" />
  <login-successful-layout v-else />
</template>

<style scoped>
.ant-layout {
  height: 100%;
}
</style>
