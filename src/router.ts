import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import { isAuthenticated } from './service/user'
import {
  ROUTE_DASHBOARD,
  ROUTE_KARYAWAN,
  ROUTE_KARYAWAN_DETAIL
} from '@/constants'

const routes = [
  {
    path: '/',
    name: 'app',
    component: App,
    children: [
      {
        path: '',
        name: ROUTE_DASHBOARD,
        component: () => import('./components/Dashboard.vue')
      },
      {
        path: '/karyawan',
        name: ROUTE_KARYAWAN,
        component: () => import('@/pages/Karyawan.vue')
      },
      {
        path: '/karyawan/detail/:id',
        name: ROUTE_KARYAWAN_DETAIL,
        props: true,
        component: () => import('@/pages/KaryawanDetail.vue')
      },
      {
        path: '/master/jabatan',
        name: ROUTE_KARYAWAN_DETAIL,
        props: true,
        component: () => import('@/pages/master/Jabatan.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !isAuthenticated()) next({ name: 'login' })
  else next()
})

export default router
