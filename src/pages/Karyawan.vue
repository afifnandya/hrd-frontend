<template>
  <div class="flex">
    <div class="w-full">
      <div class="card">
        <h5 class="mb-6 text-xl font-bold">Karyawan</h5>

        <DataTable
          v-model:filters="tableFilters"
          :value="karyawans"
          :scrollable="true"
          :paginator="true"
          paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rows-per-page-options="[10, 20, 50]"
          responsive-layout="scroll"
          current-page-report-template="Showing {first} to {last} of {totalRecords}"
          :global-filter-fields="['nama']"
          :rows="10"
          :lazy="true"
          filter-display="row"
          :total-records="totalData"
          scroll-height="400px"
          :loading="isLoading"
          scroll-direction="both"
          show-gridlines
          class="mt-3"
          data-key="id"
          @page="onPageChange"
          @filter="onFilter"
          @sort="onSort"
        >
          <Column header="No" :style="{ width: '50px' }" frozen>
            <template #body="{ index }">
              <div>{{ index + 1 }}</div>
            </template>
          </Column>
          <Column
            field="nama"
            header="Nama"
            :style="{ width: '250px' }"
            frozen
            :sortable="true"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class=""
                placeholder="Search by name"
                @keydown.enter="filterCallback()"
              />
            </template>
            <template #body="{ data }">
              <router-link
                class="text-blue-500 hover:underline hover:to-blue-400"
                :to="{ name: ROUTE_KARYAWAN_DETAIL, params: { id: data.id } }"
                >{{ data.nama }}</router-link
              >
            </template>
          </Column>
          <Column field="nik" header="NIK" class="table-column-medium"></Column>
          <Column
            field="status"
            header="Status"
            class="capitalize table-column-small"
          >
            <template #body="{ data }">
              <span
                v-if="data.status === 'Aktif'"
                class="p-1 text-green-500 bg-green-100 rounded-lg"
                >Aktif</span
              >
              <span v-else class="p-1 text-red-500 bg-red-100 rounded-lg">{{
                data.status
              }}</span>
            </template>
          </Column>
          <Column
            field="jenisKelamin"
            header="Jenis Kelamin"
            class="capitalize table-column-medium"
          >
            <template #body="{ data }">
              <div
                v-if="data.jenisKelamin == 'Laki-laki'"
                class="flex items-center"
              >
                <GenderIcon tipe="male" class="text-blue-500" />
                <span>Laki-Laki</span>
              </div>
              <div v-else class="flex items-center">
                <GenderIcon tipe="female" class="text-pink-500" />
                <span>Perempuan</span>
              </div>
            </template>
          </Column>
          <Column
            field="perusahaan.nama"
            header="Perusahaan"
            class="capitalize table-column-medium"
          ></Column>
          <Column
            field="departement"
            header="Departemen"
            class="capitalize w-[200px]"
          ></Column>

          <Column
            field="jabatan.name"
            header="Jabatan"
            class="capitalize table-column-medium"
          ></Column>
          <Column
            field="divisi.name"
            header="Divisi"
            class="capitalize table-column-medium"
          ></Column>
          <Column
            field="umur"
            header="Umur"
            class="table-column-small"
          ></Column>
          <Column
            field="agama"
            header="Agama"
            class="table-column-small"
          ></Column>
          <Column
            field="asalPOH"
            header="Asal POH"
            class="table-column-medium"
          ></Column>
          <Column
            field="kerjaPOH"
            header="Kerja POH"
            class="table-column-medium"
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
import GenderIcon from '@/components/icons/GenderIcon.vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api'

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
const tableFilters = ref({
  nama: { value: '', matchMode: 'contains' }
})

const toast = useToast()

async function getKaryawanList() {
  try {
    isLoading.value = true
    const { success, data, links, message, meta } = await getKaryawan({
      pageNumber: page.number,
      pageSize: page.size,
      name: tableFilters.value.nama.value
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

function onFilter(evnet: any) {
  console.log('onFilter', event)
  getKaryawanList()
}

function onSort(ev: any) {
  console.log('sort', ev)
  getKaryawanList()
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
