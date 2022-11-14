import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { isAuthenticated } from './service/user'
import {
  ROUTE_ADD_PELAMAR,
  ROUTE_DASHBOARD,
  ROUTE_HARIAN_LEPAS,
  ROUTE_KARYAWAN,
  ROUTE_KARYAWAN_DETAIL,
  ROUTE_MASTER_AREA,
  ROUTE_MASTER_DEPARTMEN,
  ROUTE_MASTER_DIVISI,
  ROUTE_MASTER_JABATAN,
  ROUTE_PELAMAR,
  ROUTE_PELAMAR_DETAIL
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
        path: '/harian-lepas',
        name: ROUTE_HARIAN_LEPAS,
        component: () => import('@/pages/HarianLepas.vue')
      },
      {
        path: '/pelamar',
        name: ROUTE_PELAMAR,
        component: () => import('@/pages/Pelamar.vue')
      },
      {
        path: '/pelamar/add',
        name: ROUTE_ADD_PELAMAR,
        component: () => import('@/pages/AddPelamar.vue')
      },
      {
        path: '/karyawan/detail/:id',
        name: ROUTE_KARYAWAN_DETAIL,
        props: true,
        component: () => import('@/pages/KaryawanDetail.vue')
      },
      {
        path: '/pelamar/detail/:id',
        name: ROUTE_PELAMAR_DETAIL,
        props: true,
        component: () => import('@/pages/PelamarDetail.vue')
      },
      {
        path: '/master/jabatan',
        name: ROUTE_MASTER_JABATAN,
        props: true,
        component: () => import('@/pages/master/Jabatan.vue')
      },
      {
        path: '/master/divisi',
        name: ROUTE_MASTER_DIVISI,
        props: true,
        component: () => import('@/pages/master/Divisi.vue')
      },
      {
        path: '/master/departmen',
        name: ROUTE_MASTER_DEPARTMEN,
        props: true,
        component: () => import('@/pages/master/Departemen.vue')
      },
      {
        path: '/master/perusahaan',
        name: ROUTE_MASTER_DEPARTMEN,
        props: true,
        component: () => import('@/pages/master/Perusahaan.vue')
      },
      {
        path: '/master/area',
        name: ROUTE_MASTER_AREA,
        props: true,
        component: () => import('@/pages/master/Area.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !isAuthenticated()) next({ name: 'login' })
  else next()
})

export default router
