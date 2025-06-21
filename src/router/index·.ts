import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../components/HelloWorld.vue')
  }
  // 你可以继续添加其他路由
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
