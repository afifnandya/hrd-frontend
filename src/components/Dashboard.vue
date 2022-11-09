<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-6/12 xl:w-3/12">
      <div class="mb-0 card">
        <div class="flex justify-between mb-3">
          <div>
            <span class="block mb-3 font-medium text-gray-500"
              >Total Karyawan</span
            >
            <div class="text-xl font-medium text-gray-900">152</div>
          </div>
        </div>
        <div class="flex items-center">
          <span class="font-medium text-green-500">100 Aktif </span>
          <span class="mx-2">|</span>
          <span class="text-gray-600">52 Non Aktif </span>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-3/12">
      <div class="mb-0 card">
        <div class="flex mb-3 justify-content-between">
          <div>
            <span class="block mb-3 font-medium text-gray-500">Revenue</span>
            <div class="text-xl font-medium text-gray-900">$2.100</div>
          </div>
          <div
            class="flex items-center justify-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="text-xl text-orange-500 pi pi-map-marker"></i>
          </div>
        </div>
        <span class="font-medium text-green-500">%52+ </span>
        <span class="text-gray-500">since last week</span>
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-3/12">
      <div class="mb-0 card">
        <div class="flex mb-3 justify-content-between">
          <div>
            <span class="block mb-3 font-medium text-gray-500">Customers</span>
            <div class="text-xl font-medium text-gray-900">28441</div>
          </div>
          <div
            class="flex items-center justify-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="text-xl pi pi-inbox text-cyan-500"></i>
          </div>
        </div>
        <span class="font-medium text-green-500">520 </span>
        <span class="text-gray-500">newly registered</span>
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-3/12">
      <div class="mb-0 card">
        <div class="flex mb-3 justify-content-between">
          <div>
            <span class="block mb-3 font-medium text-gray-500">Comments</span>
            <div class="text-xl font-medium text-gray-900">152 Unread</div>
          </div>
          <div
            class="flex items-center justify-center bg-purple-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="text-xl text-purple-500 pi pi-comment"></i>
          </div>
        </div>
        <span class="font-medium text-green-500">85 </span>
        <span class="text-gray-500">responded</span>
      </div>
    </div>
  </div>

  <div class="flex flex-wrap mt-4">
    <div class="w-full lg:w-6/12 xl:w-2/12">
      <div class="mb-0 card">
        <StatusKontrakPieChart />
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-2/12">
      <div class="mb-0 card">
        <GenderPieChart />
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-2/12">
      <div class="mb-0 card">
        <AgamaChart />
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-2/12">
      <div class="mb-0 card">
        <StatusNikahPieChart />
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-2/12">
      <div class="mb-0 card">
        <PendidikanPieChart />
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-2/12">
      <div class="mb-0 card">
        <UmurPieChart />
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
</script>

<style scoped>
.card {
  @apply mr-4 mb-4;
}
</style>
