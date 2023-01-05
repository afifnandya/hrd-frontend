<template>
  <div class="w-full">
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h5 class="mb-0 text-xl font-bold">{{ $t('kontrak') }}</h5>
      </div>

      <div>
        <DataTable
          :value="kontraks"
          :loading="isLoading"
          show-gridlines
          class="mt-3"
        >
          <Column header="No">
            <template #body="{ index }">
              <div>{{ index + 1 }}</div>
            </template>
          </Column>
          <Column field="contractType" header="Status Kontrak"></Column>
          <Column field="startDate" header="Tanggal Mulai"></Column>
          <Column field="endDate" header="Tanggal Selesai"></Column>
          <Column field="duration" header="Durasi"></Column>
          <Column field="positionName" header="Posisi"></Column>
          <Column header="Aksi">
            <template #body="{ data }">
              <a
                class="button button-primary"
                target="_blank"
                :href="documentContractUrl(data.id)"
              >
                Detail
              </a>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import { KontrakKaryawan } from '@/typing/karyawan'
import { getKontrak as fetchGetKontrak } from '@/api/karyawan/getKontrak'
import { onMounted, ref, watch } from 'vue'
import { useKaryawanStore } from '@/stores/karyawan'
import { storeToRefs } from 'pinia'
import { API_BASE_URL } from '@/constants'
import useAxios from '@/composable/useAxios'
import { getCookie } from '@/helper/cookie'

const kontraks = ref<KontrakKaryawan[]>([])
const isLoading = ref(false)
const karyawanStore = useKaryawanStore()
const { karyawan } = storeToRefs(karyawanStore)
async function getKontrak(idKaryawan: string | number) {
  const { success, data, message } = await fetchGetKontrak(idKaryawan)
  if (success && data) {
    kontraks.value = data
  }
  console.log('M', data)
}

function documentContractUrl(contractId: number) {
  const token = getCookie('login-token')
  if (token) {
    return `${API_BASE_URL}/employees/${karyawan.value.id}/contracts/${contractId}/document?auth_token=${token}`
  }
}

watch(
  () => karyawan.value.id,
  (newVal) => {
    if (newVal) {
      getKontrak(newVal)
    }
  }
)
</script>
<script lang="ts">
export default {
  name: 'KaryawanKontrak'
}
</script>
