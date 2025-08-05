import MainView from '@/views/MainView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/auth',
      name: 'post',
      component: () => import('../views/AuthView.vue'),
    },
    {
      path: '/avtor/:id',
      name: 'avtor',
      component: () => import('../views/AvtorView.vue'),
      props: true 
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('../views/PostView.vue'),
      props: true 
    },
  ],
})

export default router
