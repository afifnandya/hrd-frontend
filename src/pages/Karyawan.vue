<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5 class="text-xl font-bold">Karyawan</h5>

        <DataTable
          :value="karyawans"
          :scrollable="true"
          :paginator="true"
          paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rows-per-page-options="[10, 20, 50]"
          responsive-layout="scroll"
          current-page-report-template="Showing {first} to {last} of {totalRecords}"
          :rows="10"
          :lazy="true"
          :total-records="totalData"
          scroll-height="400px"
          :loading="isLoading"
          scroll-direction="both"
          class="mt-3"
          @page="onPageChange"
        >
          <Column header="No" :style="{ width: '50px' }" frozen>
            <template #body="{ index }">
              <div>{{ index + 1 }}</div>
            </template>
          </Column>
          <Column field="nama" header="Nama" :style="{ width: '250px' }" frozen>
            <template #body="{ data }">
              <router-link
                class="text-blue-500 hover:underline hover:to-blue-400"
                :to="{ name: ROUTE_KARYAWAN_DETAIL, params: { id: '1' } }"
                >{{ data.nama }}</router-link
              >
            </template>
          </Column>
          <Column field="nik" header="Id" :style="{ width: '100px' }"></Column>
          <Column
            field="status"
            header="Status"
            class="capitalize"
            :style="{ width: '100px' }"
          >
          </Column>
          <Column
            field="departement"
            header="Departemen"
            class="capitalize"
            :style="{ width: '200px' }"
          ></Column>

          <Column
            field="jabatan.name"
            header="Jabatan"
            class="capitalize"
            :style="{ width: '200px' }"
          ></Column>
          <Column
            field="umur"
            header="Umur"
            :style="{ width: '200px' }"
          ></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getKaryawan } from '@/service/karyawan'
import type { Karyawan } from '@/typing/karyawan'
import { onMounted, reactive, ref, Ref } from 'vue'
import { isAuthenticated } from '@/service/user'
import { useToast } from 'primevue/usetoast'
import { ROUTE_KARYAWAN_DETAIL } from '@/constants'

type PageChangeEvent = {
  page: number
  pageCount: number
  rows: number
}

const karyawans: Ref<Karyawan[]> = ref([])
const isLoading = ref(false)
const totalData = ref(50)
const page = reactive({
  number: 1,
  size: 10
})

const toast = useToast()

async function getKaryawanList() {
  try {
    isLoading.value = true
    const { success, data, links, message, meta } = await getKaryawan({
      pageNumber: page.number,
      pageSize: page.size
    })
    if (!success) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Gagal menampilkan data karyawan'
      })
      return
    }
    karyawans.value = data
    isLoading.value = false
  } catch (err) {
    console.log('err', err)
  }
}

function onPageChange(event: PageChangeEvent) {
  const newPage = event.page + 1
  if (page.number !== newPage) {
    page.number = newPage
  }
  page.size = event.rows
  getKaryawanList()
  console.log('aa', event)
}

onMounted(() => {
  getKaryawanList()
  isAuthenticated()
})
</script>
<script lang="ts">
export default {
  name: 'Karyawan'
}
</script>

<style scoped lang="scss">
@import '../assets/demo/badges.scss';

::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
