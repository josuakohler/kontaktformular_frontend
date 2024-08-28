// src/router.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AdminDashboard from './components/AdminDashboard.vue'
import { useLoginStore } from './stores/login.store'
import Home from './components/Home.vue'
import RespondMessage from './vues/RespondMessage.vue'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    name: 'Login',
    component: Home,
    meta: { requiresAuth: false }
  },

  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },

  {
    path: '/respond',
    name: 'Respond',
    component: RespondMessage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore()
  
  if (to.meta.requiresAuth && !loginStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router