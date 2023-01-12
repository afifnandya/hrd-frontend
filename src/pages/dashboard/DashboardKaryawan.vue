<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-6/12 xl:w-3/12">
      <div class="mb-0 card">
        <div class="flex justify-between mb-3">
          <div>
            <span class="block mb-3 font-medium text-gray-500">{{ $t('totalKaryawan') }}</span>
            <div class="text-xl font-medium text-gray-900">
              {{ totalKaryawan.total }}
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <span class="font-medium text-green-500">{{ totalKaryawan.active }} {{ $t('aktif') }}
          </span>
          <span class="mx-2">|</span>
          <span class="text-gray-600">{{ totalKaryawan.inactive }} {{ $t('tidakAktif') }}
          </span>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-3/12">
      <div class="mb-0 card">
        <div class="flex justify-between mb-3">
          <div>
            <span class="block mb-3 font-medium text-gray-500">{{ $t('totalHarianLepas') }}</span>
            <div class="text-xl font-medium text-gray-900">
              {{ totalKaryawanHarian.total }}
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <span class="font-medium text-green-500">{{ totalKaryawanHarian.active }} {{ $t('aktif') }}
          </span>
          <span class="mx-2">|</span>
          <span class="text-gray-600">{{ totalKaryawanHarian.inactive }} {{ $t('tidakAktif') }}
          </span>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-3/12">
      <div class="!mb-0 card">
        <div class="flex justify-between mb-3">
          <div>
            <span class="block mb-3 font-medium text-gray-500">{{ $t('totalPelamar') }}</span>
            <div class="text-xl font-medium text-gray-900">
              {{ pelamar.total }}
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <span class="font-medium text-green-500">{{ pelamar.pelamar }} {{ $t('pelamar') }}
          </span>
          <span class="mx-2">|</span>
          <span class="text-gray-600">{{ pelamar.training }} {{ $t('training') }}</span>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-3/12">
      <div class="mb-0 card">
        <div class="flex justify-between mb-3">
          <div>
            <span class="block mb-3 font-medium text-gray-500">{{ $t('totalKaryawanTetap') }}</span>
            <div class="text-xl font-medium text-gray-900">
              {{ totalKaryawanTetap.total }}
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <span class="font-medium text-green-500">{{ totalKaryawanTetap.active }} {{ $t('aktif') }}
          </span>
          <span class="mx-2">|</span>
          <span class="text-gray-600">{{ totalKaryawanTetap.inactive }} {{ $t('tidakAktif') }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-wrap mt-4">
    <div class="w-full lg:w-6/12 xl:w-2/12">
      <div class="mb-0 card">
        <StatusKontrakPieChart :data="statusKontrak" />
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-2/12">
      <div class="mb-0 card">
        <GenderPieChart :data="genders" />
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-2/12">
      <div class="mb-0 card">
        <AgamaChart :data="agama" />
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-2/12">
      <div class="mb-0 card">
        <StatusNikahPieChart :data="statusNikah" />
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-2/12">
      <div class="mb-0 card">
        <PendidikanPieChart :data="pendidikan" />
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-2/12">
      <div class="mb-0 card">
        <UmurPieChart :data="umur" />
      </div>
    </div>
  </div>

  <div class="flex flex-wrap mt-4">
    <div class="w-full lg:w-6/12 xl:w-6/12">
      <div class="p-0 mb-0 card">
        <PertumbuhanKaryawanLineChart />
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-6/12">
      <div class="p-0 mb-0 card">
        <PertumbuhanKaryawanByWilayahLineChart />
      </div>
    </div>
  </div>

  <div class="flex flex-wrap mt-4">
    <div class="w-full lg:w-6/12 xl:w-6/12">
      <div class="p-0 mb-0 card">
        <WorkOrderChart />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import GenderPieChart from '@/page_components/dashboard/GenderPieChart.vue'
import StatusKontrakPieChart from '@/page_components/dashboard/StatusKontrakPieChart.vue'
import AgamaChart from '@/page_components/dashboard/AgamaChart.vue'
import StatusNikahPieChart from '@/page_components/dashboard/StatusNikahPieChart.vue'
import PendidikanPieChart from '@/page_components/dashboard/PendidikanPieChart.vue'
import UmurPieChart from '@/page_components/dashboard/UmurPieChart.vue'
import PertumbuhanKaryawanLineChart from '@/page_components/dashboard/PertumbuhanKaryawanLineChart.vue'
import PertumbuhanKaryawanByWilayahLineChart from '@/page_components/dashboard/PertumbuhanKaryawanByWilayahLineChart.vue'
import WorkOrderChart from '@/page_components/dashboard/WorkOrderChart.vue'
import useAxios from '@/composable/useAxios'
import { isEmpty, startCase, toUpper, trim, upperCase } from 'lodash'
import { camelizeKeys } from 'humps'
import { onMounted, reactive, ref } from 'vue'

// Generated by https://quicktype.io

export interface ReportsResponse {
  status: number
  message: string
  data: Data
}

export interface Data {
  allEmployee: Employee
  permanentEmployee: Employee
  dailyEmployee: Employee
  contract: {
    PKWTT: number
    'PKWT 1': number
    'PKWT 2': number
    'PKWT 3': number
  }
  applicants: {
    total: number
    totalApplicant: number
    totalTraining: number
  }
  gender: {
    'Laki-laki': number
    Perempuan: number
  }
  religion: {
    undefined: number
    Islam: number
    Kristen: number
  }
  maritalStatus: {
    undefined: number
    'Tidak Kawin': number
    'Kawin Belum Tercatat': number
    'Kawin Tercatat': number
    'Cerai Hidup tercatat': number
    'Cerai Hidup': number
    'Cerai Hidup Belum Tercatat': number
    Kawin: number
    'Cerai Tercatat': number
    'Cerai Mati': number
  }
  education: {
    undefined: number
    'SMA/SMK/Paket C/MA': number
    SD: number
    SMP: number
    SMA: number
    SMK: number
    D3: number
    S1: number
    S2: number
  }
  age: {
    undefined: string
    '1730': string
    '3140': string
    '41+': string
  }
}

export interface Employee {
  total: number
  totalActive: number
  totalInactive: number
}

const totalKaryawan = reactive({
  total: 0,
  active: 0,
  inactive: 0
})

const totalKaryawanTetap = reactive({
  total: 0,
  active: 0,
  inactive: 0
})

const totalKaryawanHarian = reactive({
  total: 0,
  active: 0,
  inactive: 0
})

const pelamar = reactive({
  total: 0,
  pelamar: 0,
  training: 0
})

const genders = ref<{ value: string | number; name: string }[]>([])
const agama = ref<{ value: string | number; name: string }[]>([])
const statusNikah = ref<{ value: string | number; name: string }[]>([])
const pendidikan = ref<{ value: string | number; name: string }[]>([])
const umur = ref<{ value: string | number; name: string }[]>([])
const statusKontrak = ref<{ value: string | number; name: string }[]>([])

async function getData() {
  const { data: response } = await useAxios({
    url: '/reports/employee'
  })

  if (!isEmpty(response)) {
    const { data } = camelizeKeys(response) as ReportsResponse
    const {
      age,
      maritalStatus,
      education,
      religion,
      gender,
      allEmployee,
      permanentEmployee,
      dailyEmployee,
      applicants,
      contract
    } = data
    totalKaryawan.active = allEmployee.totalActive
    totalKaryawan.total = allEmployee.total
    totalKaryawan.inactive = allEmployee.totalInactive

    totalKaryawanTetap.active = permanentEmployee.totalActive
    totalKaryawanTetap.inactive = permanentEmployee.totalInactive
    totalKaryawanTetap.total = permanentEmployee.total

    totalKaryawanHarian.active = dailyEmployee.totalActive
    totalKaryawanHarian.inactive = dailyEmployee.totalInactive
    totalKaryawanHarian.total = dailyEmployee.total

    pelamar.total = applicants.total
    pelamar.pelamar = applicants.totalApplicant
    pelamar.training = applicants.totalTraining

    umur.value.push(
      {
        name: '17-30',
        value: age['1730']
      },
      {
        name: '31-40',
        value: age['3140']
      },
      {
        name: 'undefined',
        value: age['undefined']
      },
      {
        name: '41+',
        value: age['41+']
      }
    )
    for (const key in maritalStatus) {
      statusNikah.value.push({
        name: startCase(key),
        value: maritalStatus[key]
      })
    }
    for (const key in contract) {
      statusKontrak.value.push({
        name: toUpper(trim(key)),
        value: contract[key]
      })
    }
    for (const key in education) {
      pendidikan.value.push({
        name: startCase(key),
        value: education[key]
      })
    }
    for (const key in religion) {
      agama.value.push({
        name: startCase(key),
        value: religion[key]
      })
    }
    for (const key in gender) {
      genders.value.push({
        name: startCase(key),
        value: gender[key]
      })
    }
  }
}

onMounted(() => {
  getData()
})
</script>

<script lang="ts">
export default {
  name: 'DashboardKaryawan'
}
</script>

<style scoped>
.card {
  @apply mr-4 mb-4;
}
</style>
