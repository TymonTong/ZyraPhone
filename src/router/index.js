import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/LoginPage.vue'

export const ROUTE_LOGIN = '/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: LandingPage },
    { path: ROUTE_LOGIN, name: 'login', component: LoginPage },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
