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

export function format(): {
  thousands: (num: string | number) => string;
  addSymbol: (num: string | number) => string;
} {
  let symbol: boolean | null = null;

  function thousands(num: string | number) {
    if (!symbol) symbol = Number(num) > 0;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function addSymbol(num: string | number) {
    if (!symbol) symbol = Number(num) > 0;
    const res = (symbol ? "+" : "-") + num;
    symbol = null;
    return res;
  }

  return { thousands, addSymbol };
}
