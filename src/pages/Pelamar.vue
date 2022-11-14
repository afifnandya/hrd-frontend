<template>
  <div class="w-full">
    <div class="card">
      <div class="flex items-center justify-between">
        <h5 class="mb-6 text-xl font-bold">Pelamar</h5>
        <div>
          <button
            class="button button-primary"
            @click="$router.push({ name: ROUTE_ADD_PELAMAR })"
          >
            Tambah Calon Pelamar
          </button>
        </div>
      </div>

      <DataTable
        v-model:filters="tableFilters"
        v-model:contextMenuSelection="selectedPelamar"
        :value="pelamars"
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
        :loading="isLoading"
        scroll-direction="both"
        show-gridlines
        class="mt-3"
        data-key="id"
        context-menu
        @rowContextmenu="onRowContextMenu"
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
          :show-filter-menu="false"
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
              :to="{ name: ROUTE_PELAMAR_DETAIL, params: { id: data.id } }"
              >{{ data.nama }}</router-link
            >
          </template>
        </Column>
        <Column
          field="ktp"
          header="KTP"
          class="table-column-medium"
          :show-filter-menu="false"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class=""
              placeholder="Search by KTP"
              @keydown.enter="filterCallback()"
            />
          </template>
        </Column>
        <Column
          field="noBantex"
          header="Nomor Bantex"
          class="table-column-medium"
          :show-filter-menu="false"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class=""
              placeholder="Search by Bantex"
              @keydown.enter="filterCallback()"
            />
          </template>
        </Column>
        <Column
          field="tanggalBerkasMasuk"
          header="Tanggal Berkas Masuk"
          class="table-column-small"
        ></Column>
        <Column
          field="kategori"
          header="Kategori"
          class="table-column-medium"
          :show-filter-menu="false"
        >
          <template #body="{ data }">
            {{ data.kategori?.name }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class=""
              placeholder="Search by Kategori"
              @keydown.enter="filterCallback()"
            />
          </template>
        </Column>
        <Column
          field="status"
          header="Status"
          class="capitalize table-column-medium"
          :show-filter-menu="false"
          :filter-header-class="'w-full'"
        >
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              class="w-full"
              :options="karyawanStatus"
              placeholder="Status"
              @change="filterCallback()"
            >
            </Dropdown>
          </template>
        </Column>
        <Column
          field="statusAktif"
          header="Status Aktif"
          class="table-column-small"
        ></Column>
        <Column
          field="jenisKelamin"
          header="Jenis Kelamin"
          class="capitalize table-column-medium"
          :show-filter-menu="false"
        >
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              :options="karyawanJenisKelamin"
              placeholder="Jenis Kelamin"
              @change="filterCallback()"
            >
            </Dropdown>
          </template>
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
          field="pendidikan"
          header="Pendidikan"
          class="capitalize table-column-medium"
        ></Column>
        <Column field="umur" header="Umur" class="table-column-small"></Column>
        <Column
          field="posisiYangDilamar.nama"
          header="Posisi Yang Dilamar"
          class="table-column-small"
        ></Column>

        <Column
          field="zonaIndustri.area"
          header="Zona Industri"
          class="table-column-medium"
        ></Column>
        <Column header="Action" class="table-column-medium">
          <template #body="{ data }">
            <div class="dropdown">
              <button class="button button-primary">Action</button>
              <div class="dropdown-content">
                <router-link
                  class="block button !text-sm whitespace-nowrap text-black"
                  :to="{ name: ROUTE_PELAMAR_DETAIL, params: { id: data.id } }"
                  >Detail Pelamar</router-link
                >
                <router-link
                  class="block button !text-sm whitespace-nowrap text-black"
                  :to="{ name: ROUTE_PELAMAR_DETAIL, params: { id: data.id } }"
                  >Edit Pelamar</router-link
                >
                <button
                  class="block button !text-sm whitespace-nowrap text-black"
                  @click="mutasiPelamar(data)"
                >
                  Mutasi Jadi Karyawan
                </button>
              </div>
            </div>
          </template>
        </Column>
      </DataTable>

      <ContextMenu ref="contextMenuRef" :model="contextMenuItem" />

      <Dialog
        v-model:visible="showMutasiModal"
        header="Mutasi Pelamar Jadi Karyawan"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }"
        :modal="true"
      >
        <FormPelamarToPegawai :id="selectedPelamar?.id || 0" />
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getPelamar } from '@/service/pelamar'
import type { PelamarInstance } from '@/typing/pelamar'
import { onMounted, reactive, ref, Ref } from 'vue'
import { isAuthenticated } from '@/service/user'
import { useToast } from 'primevue/usetoast'
import { GENDER, ROUTE_PELAMAR_DETAIL } from '@/constants'
import GenderIcon from '@/components/icons/GenderIcon.vue'
import ContextMenu from 'primevue/contextmenu'
import { TOAST_TIMEOUT, ROUTE_ADD_PELAMAR } from '@/constants'
import FormEditPelamar from '@/page_components/pelamar/FormEditPelamar.vue'
import { pickBy } from 'lodash'
import FormPelamarToPegawai from '@/page_components/pelamar/FormPelamarToPegawai.vue'

type PageChangeEvent = {
  page: number
  pageCount: number
  rows: number
}

const pelamars: Ref<PelamarInstance[]> = ref([])
const isLoading = ref(false)
const totalData = ref(0)
const page = reactive({
  number: 1,
  size: 10
})
const tableFilters = ref({
  ktp: { value: '', matchMode: 'contains' },
  nama: { value: '', matchMode: 'contains' },
  status: { value: '', matchMode: 'contains' },
  jenisKelamin: { value: '', matchMode: 'contains' },
  noBantex: { value: '', matchMode: 'contains' },
  kategori: { value: '', matchMode: 'contains' }
})
const karyawanStatus = ['Akitif', 'Tidak aktif']
const karyawanJenisKelamin = GENDER
const selectedPelamar = ref<PelamarInstance>()

const toast = useToast()
const showMutasiModal = ref(false)
const contextMenuRef = ref()
const contextMenuItem = [
  {
    label: 'Mutasi Jadi Karyawan',
    // icon: 'pi pi-fw pi-search',
    command: () => {
      showMutasiModal.value = true
    }
  }
]

async function getPelamarList() {
  try {
    isLoading.value = true
    const payload = pickBy(
      {
        page: page.number,
        limit: page.size,
        name: tableFilters.value.nama.value,
        ktp: tableFilters.value.ktp.value,
        status: tableFilters.value.status.value,
        gender: tableFilters.value.jenisKelamin.value
      },
      (val) => (typeof val == 'string' ? val.length > 0 : val > 0)
    )
    const { success, data, links, message, meta } = await getPelamar(payload)
    console.log(success, data)
    if (!success) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Gagal menampilkan data karyawan',
        life: TOAST_TIMEOUT
      })
      return
    }
    if (data) {
      pelamars.value = data
      isLoading.value = false
    }
    if (meta) {
      totalData.value = meta.total || 0
    }
  } catch (err) {
    console.log('err', err)
  }
}

function onRowContextMenu(event: any) {
  contextMenuRef.value.show(event.originalEvent)
}

function onPageChange(event: PageChangeEvent) {
  const newPage = event.page + 1
  if (page.number !== newPage) {
    page.number = newPage
  }
  page.size = event.rows
  getPelamarList()
}

function onFilter(event: any) {
  console.log('onFilter', event)
  getPelamarList()
}

function onSort(event: any) {
  console.log('sort', event)
  getPelamarList()
}

function test(karyawan: PelamarInstance | undefined) {
  console.log('kar', karyawan)
}

function mutasiPelamar(pelamar: PelamarInstance) {
  showMutasiModal.value = true
  selectedPelamar.value = pelamar
}

onMounted(() => {
  getPelamarList()
  isAuthenticated()
})
</script>
<script lang="ts">
export default {
  name: 'Pelamar'
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
