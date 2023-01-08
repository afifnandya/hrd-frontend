<template>
  <div class="p-10 bg-white">
    <div class="flex items-center justify-between mb-6">
      <h5 class="text-xl font-bold">{{ $t('masterPerusahaan') }}</h5>
      <div>
        <button class="button button-primary" @click="showAddModal">
          Tambah Perusahaan
        </button>
      </div>
    </div>
    <DataTable
      ref="dt"
      :value="perusahaans"
      :loading="loading"
      data-key="id"
      :paginator="true"
      :rows="10"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[5, 10, 25]"
      current-page-report-template="Showing {first} to {last} of {totalRecords} Perusahaan"
      responsive-layout="scroll"
      scroll-height="400px"
      scrollable
    >
      <Column
        field="no"
        header="Id"
        :sortable="true"
        header-style="width:14%; min-width:10rem;"
      >
        <template #body="{ data }">
          {{ data.id }}
        </template>
      </Column>
      <Column field="code" :header="$t('kodePerusahaan')" :sortable="true">
        <template #body="{ data }">
          {{ data.code }}
        </template>
      </Column>
      <Column field="nama" :header="$t('namaPerusahaan')" :sortable="true">
        <template #body="{ data }">
          {{ data.name }}
        </template>
      </Column>
      <Column header-style="min-width:10rem;">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="mr-2 p-button-rounded p-button-success"
            @click="showEditModal(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="mt-2 p-button-rounded p-button-warning"
            @click="showDeleteModal(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="showModal.edit"
      :style="{ width: '450px' }"
      :header="$t('ubahPerusahaan')"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="perusahaanNama">{{ $t('namaPerusahaan') }}</label>

        <InputText
          id="perusahaanNama"
          v-model="selectedPerusahaan.name"
          type="text"
        />
      </div>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="showModal.edit = false"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          :disabled="!selectedPerusahaan.id || !selectedPerusahaan.name"
          @click="editData"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="showModal.add"
      :style="{ width: '450px' }"
      :header="$t('tambahPerusahaan')"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="perusahaanNama">{{ $t('namaPerusahaan') }}</label>

        <InputText
          id="perusahaanNama"
          v-model="createPerusahaan.name"
          type="text"
        />
      </div>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="showModal.add = false"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          :disabled="!createPerusahaan.name"
          @click="tambahPerusahaan"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="showModal.delete"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="flex items-center justify-center">
        <i class="mr-3 pi pi-exclamation-triangle" style="font-size: 2rem" />
        <span
          >Are you sure you want to delete <b>{{ selectedPerusahaan.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="showModal.delete = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteData"
        />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

import { onMounted, reactive, ref } from 'vue'
import useToast from '@/composable/useToast'
import { getCompany } from '@/api/master/getCompany'
import { editCompany } from '@/api/master/editCompany'
import { createCompany } from '@/api/master/createCompany'
import { deleteCompany } from '@/api/master/deleteCompany'
import { Peruahaan } from '@/typing/dataMaster'

const loading = ref(false)
const perusahaans = ref<Peruahaan[]>([])
const toast = useToast()

const selectedPerusahaan: Peruahaan = reactive({
  id: 0,
  name: '',
  code: ''
})

const createPerusahaan = reactive({
  name: '',
  code: ''
})

const showModal = reactive({
  delete: false,
  edit: false,
  add: false
})

onMounted(async () => {
  getData()
})

async function getData() {
  loading.value = true
  const { success, data, message } = await getCompany()
  if (success && data) {
    perusahaans.value = data.map((perusahaan) => {
      return {
        id: perusahaan.id,
        code: perusahaan.code,
        name: perusahaan.name
      }
    })
    loading.value = false
    return
  }
}

function showEditModal(data: Peruahaan) {
  selectedPerusahaan.id = data.id
  selectedPerusahaan.name = data.name
  showModal.edit = true
}

function showAddModal() {
  showModal.add = true
}

async function tambahPerusahaan() {
  const { success, message } = await createCompany({
    code: createPerusahaan.code,
    name: createPerusahaan.name
  })
  if (message) {
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  showModal.add = false
  getCompany()
}

async function editData() {
  const { success, message } = await editCompany({
    id: selectedPerusahaan.id,
    name: selectedPerusahaan.name
  })
  if (message) {
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  showModal.edit = false
  getData()
}

function showDeleteModal(data: Peruahaan) {
  selectedPerusahaan.id = data.id
  selectedPerusahaan.name = data.name
  showModal.delete = true
}

async function deleteData() {
  const { success, message } = await deleteCompany({
    id: selectedPerusahaan.id
  })
  if (message) {
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  showModal.delete = false
  getData()
}
</script>
<script lang="ts">
export default {
  name: 'MasterPerusahaanPage'
}
</script>
