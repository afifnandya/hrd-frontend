<template>
  <div class="p-10 bg-white">
    <DataTable
      ref="dt"
      :value="posisi"
      :loading="loading"
      data-key="id"
      :paginator="true"
      :rows="10"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[5, 10, 25]"
      current-page-report-template="Showing {first} to {last} of {totalRecords} Divisi"
      responsive-layout="scroll"
      scroll-height="400px"
      scrollable
    >
      <template #header>
        <div
          class="flex flex-column md:flex-row md:justify-content-between md:items-center"
        >
          <h5 class="m-0">Master Posisi</h5>
        </div>
      </template>

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
            @click="editData(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="mt-2 p-button-rounded p-button-warning"
            @click="deleteData(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="showModal.edit"
      :style="{ width: '450px' }"
      header="Edit Area"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="divisiNama">Nama</label>

        <InputText id="divisiNama" type="text" :value="selectedPosisi.nama" />
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
          @click="editData(selectedPosisi)"
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
          >Are you sure you want to delete <b>{{ selectedPosisi.nama }}</b
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
          @click="deleteData(selectedPosisi)"
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

import { getPosisi } from '@/api/master/getPosisi'
import { Posisi } from '@/typing/dataMaster'

const loading = ref(false)
const posisi = ref<Posisi[]>([])

const selectedPosisi: Posisi = reactive({
  id: 0,
  nama: ''
})

const showModal = reactive({
  delete: false,
  edit: false
})

onMounted(async () => {
  loading.value = true
  const { success, data, message } = await getPosisi()
  if (success && data) {
    posisi.value = data.map((posisi) => {
      return { id: posisi.id, nama: posisi.name }
    })
    loading.value = false
    return
  }
})

function editData(data: Posisi) {
  selectedPosisi.id = data.id
  selectedPosisi.nama = data.nama
  showModal.edit = true
}

function deleteData(data: Posisi) {
  selectedPosisi.id = data.id
  selectedPosisi.nama = data.nama
  showModal.delete = true
}
</script>
<script lang="ts">
export default {
  name: 'MasterPosisiPage'
}
</script>
