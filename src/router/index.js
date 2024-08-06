import { createRouter, createWebHistory } from 'vue-router'


import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FoodView from '../views/FoodView.vue'
import authGuard from '../middlewares/auth.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/food',
      name: 'food',
      component: FoodView,
      beforeEnter: authGuard
    }
  ]
})

export default router
