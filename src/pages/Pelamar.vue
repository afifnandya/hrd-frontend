<template>
  <div class="w-full">
    <div class="card">
      <div class="flex items-center justify-between">
        <h5 class="mb-6 text-xl font-bold">{{ $t('dataPelamar') }}</h5>
        <div>
          <button
            class="button button-primary"
            @click="$router.push({ name: ROUTE_ADD_PELAMAR })"
          >
            {{ $t('tambahCalonPelamar') }}
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
          :header="$t('nama')"
          field="nama"
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
              class="text-blue-500 hover:underline hover:to-blue-400"
              :to="{ name: ROUTE_PELAMAR_DETAIL, params: { id: data.id } }"
              >{{ data.nama }}</router-link
            >
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
          field="noBantex"
          :header="$t('noBantex')"
          class="table-column-medium"
          :show-filter-menu="false"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              class=""
              :placeholder="$t('searchByBantex')"
              @keydown.enter="filterCallback()"
            />
          </template>
        </Column>
        <Column
          field="tanggalBerkasMasuk"
          :header="$t('tanggalBerkasMasuk')"
          class="table-column-small"
        ></Column>
        <Column
          field="kategori"
          :header="$t('kategori')"
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
              :placeholder="$t('searchByKategori')"
              @keydown.enter="filterCallback()"
            />
          </template>
        </Column>
        <Column
          field="status"
          :header="$t('status')"
          class="capitalize table-column-medium"
          :show-filter-menu="false"
          :filter-header-class="'w-full'"
        >
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              :options="statusPelamar"
              option-label="label"
              class="w-full"
              :placeholder="$t('statusPelamar')"
              @change="filterCallback()"
            >
            </Dropdown>
          </template>
        </Column>
        <Column
          field="statusAktif"
          :header="$t('statusAktif')"
          class="table-column-small"
        ></Column>
        <Column
          field="umur"
          :header="$t('umur')"
          class="table-column-small"
        ></Column>
        <Column
          field="posisiYangDilamar.nama"
          :header="$t('posisiYangDilamar')"
          class="table-column-small"
        ></Column>

        <Column
          field="zonaIndustri.area"
          :header="$t('zonaIndustri')"
          class="table-column-medium"
        ></Column>
        <Column :header="$t('aksi')" class="table-column-medium">
          <template #body="{ data }">
            <ActionButton>
              <template #trigger>
                <button class="button button-primary">{{ $t('aksi') }}</button>
              </template>
              <template #content>
                <div>
                  <router-link
                    class="block button !text-sm whitespace-nowrap text-black"
                    :to="{
                      name: ROUTE_PELAMAR_DETAIL,
                      params: { id: data.id }
                    }"
                    >{{ $t('detailPelamar') }}</router-link
                  >
                  <router-link
                    class="block button !text-sm whitespace-nowrap text-black"
                    :to="{
                      name: ROUTE_PELAMAR_DETAIL,
                      params: { id: data.id }
                    }"
                    >{{ $t('editPelamar') }}</router-link
                  >
                  <button
                    class="block button !text-sm whitespace-nowrap text-black"
                    @click="mutasiPelamar(data)"
                  >
                    {{ $t('mutasiJadiKaryawan') }}
                  </button>
                </div>
              </template>
            </ActionButton>
          </template>
        </Column>
      </DataTable>

      <Dialog
        v-model:visible="showMutasiModal"
        header="Mutasi Pelamar Jadi Karyawan"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }"
        :modal="true"
      >
        <FormPelamarToPegawai
          :id="selectedPelamar?.id || 0"
          @on-success="onMutasiSuccess"
        />
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
import {
  GENDER,
  KARYAWAN_AKTIF,
  KARYAWAN_NON_AKTIF,
  ROUTE_PELAMAR_DETAIL,
  PELAMAR,
  TRAINING
} from '@/constants'
import GenderIcon from '@/components/icons/GenderIcon.vue'
import { TOAST_TIMEOUT, ROUTE_ADD_PELAMAR } from '@/constants'
import { pickBy } from 'lodash'
import FormPelamarToPegawai from '@/page_components/pelamar/FormPelamarToPegawai.vue'
import ActionButton from '@/components/ActionButton.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


const statusPelamar = [
  { label: t('pelamar'), value: PELAMAR },
  { label: t('training'), value: TRAINING }
]



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
  noBantex: { value: '', matchMode: 'contains' },
  kategori: { value: '', matchMode: 'contains' }
})

const selectedPelamar = ref<PelamarInstance>()

const toast = useToast()
const showMutasiModal = ref(false)

async function getPelamarList() {
  try {
    isLoading.value = true
    const payload = pickBy(
      {
        page: page.number,
        limit: page.size,
        name: tableFilters.value.nama.value,
        ktp: tableFilters.value.ktp.value,
        status: tableFilters.value.status.value
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
  resetPagination()
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

function resetPagination() {
  page.number = 1
  page.size = 10
}

function onMutasiSuccess() {
  showMutasiModal.value = false
  getPelamarList()
}

onMounted(() => {
  getPelamarList()
  isAuthenticated()
})
</script>
<script lang="ts">
export default {
  name: 'Pelamar',
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
