import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/pespeak',
    name: 'pespeak',
    component: () => import('@/views/pespeak/pespeak.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
