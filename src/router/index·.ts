import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../components/HelloWorld.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () => import('@/views/login/forgotPassword.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
