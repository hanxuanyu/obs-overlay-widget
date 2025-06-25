import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/config',
      name: 'ConfigView',
      component: () => import('../views/ConfigView.vue')
    },
    {
      path: '/preview',
      name: 'PreviewView',
      component: () => import('../views/PreviewView.vue')
    }
  ]
});

export default router;
