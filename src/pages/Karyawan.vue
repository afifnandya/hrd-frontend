<template>
  <div class="w-full">
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h5 class="mb-0 text-xl font-bold">Karyawan</h5>
        <button class="button button-primary">Tambah Karyawan</button>
      </div>

      <DataTable
        v-model:filters="tableFilters"
        v-model:contextMenuSelection="selectedKaryawan"
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
              class="flex items-center text-blue-500 hover:underline hover:to-blue-400"
              :to="{ name: ROUTE_KARYAWAN_DETAIL, params: { id: data.id } }"
            >
              <span> {{ data.nama }} </span>
              <span
                v-if="data.jenisKelamin == 'Laki-laki'"
                class="flex items-center"
              >
                <GenderIcon tipe="male" class="text-indigo-900" />
              </span>
              <span v-else class="flex items-center">
                <GenderIcon tipe="female" class="text-pink-500" />
              </span>
            </router-link>
          </template>
        </Column>
        <Column
          field="nik"
          header="NIK"
          class="table-column-medium"
          :show-filter-menu="false"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class=""
              placeholder="Search by NIK"
              @keydown.enter="filterCallback()"
            />
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
          field="status"
          header="Status Karyawan"
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
          <template #body="{ data }">
            {{ data.status }}
          </template>
        </Column>
        <Column
          field="statusAktif"
          header="Status Aktif"
          class="capitalize table-column-medium"
          :show-filter-menu="false"
          :filter-header-class="'w-full'"
        >
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              class="w-full"
              :options="karyawanStatusAktif"
              placeholder="Status Aktif"
              @change="filterCallback()"
            >
            </Dropdown>
          </template>
          <template #body="{ data }">
            <span
              v-if="data.statusAktif === 'Aktif'"
              class="px-2 py-1 text-green-500 bg-green-100 rounded-lg"
              >Aktif</span
            >
            <span v-else class="px-2 py-1 text-red-500 bg-red-100 rounded-lg">{{
              data.statusAktif
            }}</span>
          </template>
        </Column>
        <Column
          field="perusahaan.name"
          header="Perusahaan"
          class="capitalize table-column-medium"
        ></Column>
        <Column
          field="departmenName"
          header="Departemen"
          class="capitalize w-[200px]"
        >
        </Column>

        <Column
          field="jabatan.nama"
          header="Jabatan"
          class="capitalize table-column-medium"
        ></Column>
        <Column
          field="divisi.nama"
          header="Divisi"
          class="capitalize table-column-medium"
        ></Column>
        <Column field="umur" header="Umur" class="table-column-small"></Column>
        <Column header="Action" class="table-column-medium">
          <template #body="{ data }">
            <div class="dropdown">
              <button class="button button-primary">Action</button>
              <div class="dropdown-content">
                <router-link
                  class="block button !text-sm whitespace-nowrap text-black"
                  :to="{ name: ROUTE_KARYAWAN_DETAIL, params: { id: data.id } }"
                  >Detail Karyawan</router-link
                >
                <router-link
                  class="block button !text-sm whitespace-nowrap text-black"
                  :to="{ name: ROUTE_KARYAWAN_DETAIL, params: { id: data.id } }"
                  >Edit Karyawan</router-link
                >
                <button
                  class="block button !text-sm whitespace-nowrap text-black"
                  @click="confirmToggleAktifKaraywan(data)"
                >
                  {{
                    data.statusAktif === KARYAWAN_NON_AKTIF
                      ? 'Aktfikan Karyawan'
                      : '                  Non Aktifkan Karyawan'
                  }}
                </button>
                <button
                  class="block button !text-sm whitespace-nowrap text-black"
                  @click="confirmDeleteKaryawan(data)"
                >
                  Delete Karyawan
                </button>
              </div>
            </div>
          </template>
        </Column>
      </DataTable>

      <ConfirmDialog></ConfirmDialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getKaryawan, deleteKaryawan, updateKaryawan } from '@/service/karyawan'
import type { Karyawan, KaryawanInstance } from '@/typing/karyawan'
import { onMounted, reactive, ref, Ref } from 'vue'
import { isAuthenticated } from '@/service/user'
import {
  KARYAWAN_AKTIF,
  KARYAWAN_NON_AKTIF,
  ROUTE_KARYAWAN_DETAIL
} from '@/constants'
import GenderIcon from '@/components/icons/GenderIcon.vue'
import useToast from '@/composable/useToast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { useAppStore } from '@/stores/app'

type PageChangeEvent = {
  page: number
  pageCount: number
  rows: number
}

const appStore = useAppStore()
const karyawans: Ref<KaryawanInstance[]> = ref([])
const isLoading = ref(false)
const totalData = ref(0)
const page = reactive({
  number: 1,
  size: 10
})
const tableFilters = ref({
  nik: { value: '', matchMode: 'contains' },
  ktp: { value: '', matchMode: 'contains' },
  nama: { value: '', matchMode: 'contains' },
  status: { value: '', matchMode: 'contains' },
  statusAktif: { value: '', matchMode: 'contains' },
  jenisKelamin: { value: '', matchMode: 'contains' }
})
const karyawanStatus = ['Karyawan', 'Karyawan Harian Lepas']
const karyawanStatusAktif = ['Akitif', 'Tidak aktif']
const karyawanJenisKelamin = ['Laki-laki', 'Perempuan']
const selectedKaryawan = ref<Karyawan>()
const confirm = useConfirm()

const toast = useToast()

async function getKaryawanList() {
  try {
    isLoading.value = true
    const { success, data, links, message, meta } = await getKaryawan({
      page: page.number,
      limit: page.size,
      name: tableFilters.value.nama.value,
      nik: tableFilters.value.nik.value,
      activeStatus: tableFilters.value.status.value,
      gender: tableFilters.value.jenisKelamin.value
    })
    if (!success) {
      toast.error('Error', 'Gagal menampilkan data karyawan')
      return
    }
    if (meta?.total) {
      totalData.value = meta.total
    }
    if (appStore.departmen.length) {
      karyawans.value = data.map((karyawan) => {
        const departmentName = appStore.departmen.filter(
          (dep) => dep.id === karyawan.departement
        )
        return {
          ...karyawan,
          departmenName: departmentName.length ? departmentName[0].nama : ''
        }
      })
    } else {
      karyawans.value = data
    }
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

function onFilter(event: any) {
  console.log('onFilter', event)
  resetPagination()
  getKaryawanList()
}

function onSort(event: any) {
  console.log('sort', event)
  getKaryawanList()
}

function confirmDeleteKaryawan(karyawan: Karyawan) {
  selectedKaryawan.value = karyawan
  confirm.require({
    message: `Apakah anda yakin ingin mengahpus karyawan
          ${selectedKaryawan.value?.nama} ?`,
    header: 'Konfirmasi',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      //callback to execute when user confirms the action
      const id = selectedKaryawan.value?.id
      if (id) {
        const { success, message } = await deleteKaryawan(id)
        console.log('su', success, message)
        if (message) {
          if (!success) {
            toast.error('Error', message)
          } else {
            toast.success(message)
          }
        }
      }
    },
    reject: () => {
      //callback to execute when user rejects the action
    },
    onHide: () => {
      //Callback to execute when dialog is hidden
    }
  })
}

async function doToggleAktifKaryawan(status: string) {
  const id = selectedKaryawan.value?.id
  if (id) {
    const { success, message } = await updateKaryawan(id, {
      statusAktif: status
    })
    console.log('mess', success, message)
    if (message) {
      if (success) {
        toast.success(message)
        getKaryawanList()
      } else {
        toast.error(message)
      }
    }
  }
}

async function confirmToggleAktifKaraywan(karyawan: Karyawan) {
  selectedKaryawan.value = karyawan
  const isNonAktif = selectedKaryawan.value.statusAktif === KARYAWAN_NON_AKTIF
  const message = isNonAktif
    ? `Apakah anda yakin ingin aktfikan karyawan
          ${selectedKaryawan.value?.nama} ?`
    : `Apakah anda yakin ingin non aktfikan karyawan
          ${selectedKaryawan.value?.nama} ?`
  confirm.require({
    message: message,
    header: 'Konfirmasi',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      doToggleAktifKaryawan(isNonAktif ? KARYAWAN_AKTIF : KARYAWAN_NON_AKTIF)
    }
  })
}

function resetPagination() {
  page.number = 1
  page.size = 10
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
