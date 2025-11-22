import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/loginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', 
      name: 'login',
      component: LoginView 
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('../views/productsView.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/profileView.vue')
    },
    {
        path: '/profile/purchases',
        name: 'mypurchases',
        component: () => import('../views/purchaseView.vue')
    },
    {
      path: '/profile/createPurchase',
      name: 'createMyPurchase',
      component: () => import('../views/createPurchaseView.vue')
    }
  ]
})

export default router