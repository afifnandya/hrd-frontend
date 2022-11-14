<template>
  <div class="p-10 bg-white">
    <DataTable
      ref="dt"
      :value="areas"
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
          <h5 class="m-0">Master Area</h5>
        </div>
      </template>

      <Column
        field="no"
        header="Id"
        :sortable="true"
        header-style="width:14%; min-width:10rem;"
      >
        <template #body="{ data }">
          {{ data.code }}
        </template>
      </Column>
      <Column field="Nama" header="Nama" :sortable="true">
        <template #body="{ data }">
          {{ data.area }}
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
      header="Edit Area"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="divisiNama">Nama</label>

        <InputText id="divisiNama" v-model="selectedArea.area" type="text" />
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
          >Are you sure you want to delete <b>{{ selectedArea.area }}</b
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
import { getArea } from '@/api/master/getArea'
import { editArea } from '@/api/master/editArea'
import { Area } from '@/typing/dataMaster'
import { deleteArea } from '@/api/master/deleteArea'

const loading = ref(false)
const areas = ref<any[]>([])
const toast = useToast()

const selectedArea: Area = reactive({
  code: '',
  area: ''
})

const showModal = reactive({
  delete: false,
  edit: false
})

async function getData() {
  loading.value = true
  const { success, data, message } = await getArea()
  if (success && data) {
    areas.value = data
    loading.value = false
    return
  }
}

onMounted(() => {
  getData()
})

function showEditModal(data: Area) {
  selectedArea.code = data.code
  selectedArea.area = data.area
  showModal.edit = true
}

async function editData() {
  const { success, message } = await editArea({
    code: selectedArea.code,
    area: selectedArea.area
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

function showDeleteModal(data: Area) {
  selectedArea.code = data.code
  selectedArea.area = data.area
  showModal.delete = true
}

async function deleteData() {
  const { success, message } = await deleteArea({ code: selectedArea.code })
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
  name: 'MasterAreaPage'
}
</script>
