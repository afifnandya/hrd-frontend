<template>
  <div class="p-10 bg-white">
    <div class="flex items-center justify-between mb-6">
      <h5 class="text-xl font-bold">Master Jabatan</h5>
      <div>
        <button class="button button-primary" @click="">Tambah Jabatan</button>
      </div>
    </div>
    <DataTable
      ref="dt"
      :value="jabatans"
      :loading="loading"
      data-key="id"
      :paginator="true"
      :rows="10"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[5, 10, 25]"
      current-page-report-template="Showing {first} to {last} of {totalRecords} Jabatan"
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
      <Column field="Nama" header="Nama" :sortable="true">
        <template #body="{ data }">
          {{ data.nama }}
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
      header="Edit Jabatan"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="jabatanNama">Nama</label>

        <InputText
          id="jabatanNama"
          v-model="selectedJabatan.nama"
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
          :disabled="!selectedJabatan.id || !selectedJabatan.nama"
          @click="editData"
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
          >Are you sure you want to delete <b>{{ selectedJabatan.nama }}</b
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
import { getJabatan } from '@/api/master/getJabatan'
import { editJabatan } from '@/api/master/editJabatan'
import { deleteJabatan } from '@/api/master/deleteJabatan'
import { Jabatan } from '@/typing/dataMaster'

const loading = ref(false)
const jabatans = ref<Jabatan[]>([])
const toast = useToast()

const selectedJabatan: Jabatan = reactive({
  id: 0,
  nama: ''
})

const showModal = reactive({
  delete: false,
  edit: false
})

onMounted(async () => {
  loading.value = true
  const { success, data, message } = await getJabatan()
  if (success && data) {
    jabatans.value = data.map((jabatan) => {
      return {
        id: jabatan.id,
        nama: jabatan.name
      }
    })
    loading.value = false
    return
  }
})

function showEditModal(data: Jabatan) {
  selectedJabatan.id = data.id
  selectedJabatan.nama = data.nama
  showModal.edit = true
}

async function editData() {
  const { success, message } = await editJabatan({
    id: selectedJabatan.id,
    name: selectedJabatan.nama
  })
  if (!success) {
    toast.error(message)
  }
  showModal.edit = false
}

function showDeleteModal(data: Jabatan) {
  selectedJabatan.id = data.id
  selectedJabatan.nama = data.nama
  showModal.delete = true
}

async function deleteData() {
  const { success, message } = await deleteJabatan({ id: selectedJabatan.id })
  if (!success) {
    toast.error(message)
  }
  showModal.delete = false
}
</script>
<script lang="ts">
export default {
  name: 'MasterJabatanPage'
}
</script>
