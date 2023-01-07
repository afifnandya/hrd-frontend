<template>
  <div class="w-full">
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h5 class="mb-0 text-xl font-bold">{{ $t('karyawan') }}</h5>
        <div>
          <a
            href="https://projek.alwaysdata.net/api/employees/export"
            class="mr-2 text-white bg-orange-400 button"
            >{{ $t('ekspor') }}</a
          >
          <router-link
            :to="{ name: ROUTE_KARYAWAN_TAMBAH }"
            class="button button-primary"
          >
            {{ $t('tambahKaryawan') }}
          </router-link>
        </div>
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
          :header="$t('nama')"
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
              :placeholder="$t('searchByName')"
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
          :header="$t('noBantex')"
          class="table-column-medium"
          :show-filter-menu="false"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class=""
              :placeholder="$t('searchByNIK')"
              @keydown.enter="filterCallback()"
            />
          </template>
        </Column>
        <Column
          field="ktp"
          :header="$t('noKtp')"
          class="table-column-medium"
          :show-filter-menu="false"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class=""
              :placeholder="$t('searchByKtp')"
              @keydown.enter="filterCallback()"
            />
          </template>
        </Column>
        <Column
          field="status"
          :header="$t('statusKaryawan')"
          class="capitalize table-column-medium"
          :show-filter-menu="false"
          :filter-header-class="'w-full'"
        >
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              class="w-full"
              :options="karyawanStatus"
              :placeholder="$t('pilihStatus')"
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
          :header="$t('statusAktif')"
          class="capitalize table-column-medium"
          :show-filter-menu="false"
          :filter-header-class="'w-full'"
        >
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              class="w-full"
              :options="statusKaryawan"
              option-label="label"
              :placeholder="$t('pilihStatus')"
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
          :header="$t('perusahaan')"
          class="capitalize table-column-medium"
        ></Column>
        <Column
          field="departmenName"
          :header="$t('departemen')"
          class="capitalize w-[200px]"
        >
        </Column>

        <Column
          field="jabatan.nama"
          :header="$t('jabatan')"
          class="capitalize table-column-medium"
        ></Column>
        <Column
          field="divisi.nama"
          :header="$t('divisi')"
          class="capitalize table-column-medium"
        ></Column>
        <Column
          field="umur"
          :header="$t('umur')"
          class="table-column-small"
        ></Column>
        <Column :header="$t('aksi')" class="table-column-medium">
          <template #body="{ data }">
            <ActionButton>
              <template #trigger>
                <button class="button button-primary">{{ $t('aksi') }}</button>
              </template>
              <template #content>
                <div class="">
                  <router-link
                    class="block button !text-sm whitespace-nowrap text-black"
                    :to="{
                      name: ROUTE_KARYAWAN_DETAIL,
                      params: { id: data.id }
                    }"
                    >{{ $t('detailKaryawan') }}</router-link
                  >
                  <router-link
                    class="block button !text-sm whitespace-nowrap text-black"
                    :to="{
                      name: ROUTE_KARYAWAN_DETAIL,
                      params: { id: data.id }
                    }"
                    >{{ $t('editDataKaryawan') }}</router-link
                  >
                  <button
                    class="block button !text-sm whitespace-nowrap text-black"
                    @click="confirmToggleAktifKaraywan(data)"
                  >
                    {{
                      data.statusAktif === KARYAWAN_NON_AKTIF
                        ? 'Aktfikan Karyawan'
                        : $t('nonAktifkanKaryawan')
                    }}
                  </button>
                  <button
                    class="block button !text-sm whitespace-nowrap text-black"
                    @click="confirmDeleteKaryawan(data)"
                  >
                    {{ $t('hapusKaryawan') }}
                  </button>
                </div>
              </template>
            </ActionButton>
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
  ROUTE_KARYAWAN_DETAIL,
  ROUTE_KARYAWAN_TAMBAH
} from '@/constants'
import GenderIcon from '@/components/icons/GenderIcon.vue'
import useToast from '@/composable/useToast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { useAppStore } from '@/stores/app'
import ActionButton from '@/components/ActionButton.vue'
import { useI18n } from 'vue-i18n'

type PageChangeEvent = {
  page: number
  pageCount: number
  rows: number
}
const { t } = useI18n({
  useScope: 'global'
})
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

// const karyawanStatus = ['HL','PKWT','PKWTT']
const karyawanStatus = ['Karyawan', 'Karyawan Harian Lepas']
const statusKaryawan = [
  { label: t('aktif'), value: KARYAWAN_AKTIF },
  { label: t('tidakAktif'), value: KARYAWAN_NON_AKTIF }
]
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
    message: `${t('apakahAndaYakinInginMenghapus', {
      nama: selectedKaryawan.value?.nama
    })}?`,
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
  name: 'Karyawan',
  components: { ActionButton }
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
