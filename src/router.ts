import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { isAuthenticated } from './service/user'
import {
  ROUTE_ADD_PELAMAR,
  ROUTE_ADD_WORK_ORDER,
  ROUTE_DASHBOARD,
  ROUTE_DASHBOARD_KARYAWAN,
  ROUTE_DASHBOARD_REKRUITMEN,
  ROUTE_HARIAN_LEPAS,
  ROUTE_KARYAWAN,
  ROUTE_KARYAWAN_DETAIL,
  ROUTE_KARYAWAN_TAMBAH,
  ROUTE_KARYAWAN_CUTI,
  ROUTE_MASTER_AREA,
  ROUTE_MASTER_DEPARTMEN,
  ROUTE_MASTER_PERUSAHAAN,
  ROUTE_MASTER_DIVISI,
  ROUTE_MASTER_JABATAN,
  ROUTE_PELAMAR,
  ROUTE_PELAMAR_DETAIL,
  ROUTE_WORK_ORDER,
  ROUTE_WORK_ORDER_DETAIL,
  ROUTE_WORK_ORDER_EDIT,
  ROUTE_KARYAWAN_REMINDER_KONTRAK
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
        component: () => import('./pages/dashboard/DashboardKaryawan.vue')
      },
      {
        path: '/dashboard/karyawan',
        name: ROUTE_DASHBOARD_KARYAWAN,
        component: () => import('./pages/dashboard/DashboardKaryawan.vue')
      },
      {
        path: '/dashboard/rekruitmen',
        name: ROUTE_DASHBOARD_REKRUITMEN,
        component: () => import('./pages/dashboard/DashboardRektruitmen.vue')
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
        path: '/work-order',
        name: ROUTE_WORK_ORDER,
        component: () => import('@/pages/WorkOrder.vue')
      },
      {
        path: '/work-order/detail/:id',
        name: ROUTE_WORK_ORDER_DETAIL,
        props: true,
        component: () => import('@/pages/DetailWorkOrder.vue')
      },
      {
        path: '/work-order/edit/:id',
        name: ROUTE_WORK_ORDER_EDIT,
        props: true,
        component: () => import('@/pages/EditWorkOrder.vue')
      },
      {
        path: '/work-order/add',
        name: ROUTE_ADD_WORK_ORDER,
        component: () => import('@/pages/TambahWorkOrder.vue')
      },
      {
        path: '/karyawan/detail/:id',
        name: ROUTE_KARYAWAN_DETAIL,
        props: true,
        component: () => import('@/pages/KaryawanDetail.vue')
      },
      {
        path: '/karyawan/tambah',
        name: ROUTE_KARYAWAN_TAMBAH,
        component: () => import('@/pages/KaryawanDetail.vue')
      },
      {
        path: '/karyawan/cuti',
        name: ROUTE_KARYAWAN_CUTI,
        component: () => import('@/pages/karyawan/KaryawanCuti.vue')
      },
      {
        path: '/karyawan/reminder-kontrak',
        name: ROUTE_KARYAWAN_REMINDER_KONTRAK,
        component: () => import('@/pages/karyawan/KaryawanCuti.vue')
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
        name: ROUTE_MASTER_PERUSAHAAN,
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
