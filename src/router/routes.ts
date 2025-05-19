import Test from '@/views/Tanstack.vue'

export const routes = [
  { path: '/', redirect: '/test' },
  { path: '/test', component: Test },
]