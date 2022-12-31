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
            <template #body="{ index }">
              <button class="button button-primary">Detail</button>
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
