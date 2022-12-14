<template>
  <div class="p-10 bg-white">
    <div class="flex items-center justify-between mb-6">
      <h5 class="text-xl font-bold">{{ $t('masterDepartemen') }}</h5>

      <div>
        <button class="button button-primary" @click="showAddModal">
          {{ $t('tambahdepartment') }}
        </button>
      </div>
    </div>

    <DataTable
      ref="dt"
      :value="departments"
      :loading="loading"
      data-key="id"
      :paginator="true"
      :rows="10"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[5, 10, 25]"
      current-page-report-template="Showing {first} to {last} of {totalRecords} Departemen"
      responsive-layout="scroll"
      scroll-height="400px"
      scrollable
    >
      <Column
        field="no"
        :header="$t('idDepartement')"
        :sortable="true"
        header-style="width:14%; min-width:10rem;"
      >
        <template #body="{ data }">
          {{ data.id }}
        </template>
      </Column>
      <Column field="Nama" :header="$t('namaDepartement')" :sortable="true">
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
      v-model:visible="showModal.add"
      :style="{ width: '450px' }"
      :header="$t('tambahDepartement')"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="DepartmentName">{{ $t('namaDepartement') }}</label>

        <InputText
          id="DepartmentName"
          v-model="createDepartment.name"
          type="text"
        />
      </div>

      <template #footer>
        <Button
          :label="$t('cancel')"
          icon="pi pi-times"
          class="p-button-text"
          @click="showModal.add = false"
        />

        <Button
          :label="$t('save')"
          icon="pi pi-check"
          class="p-button-text"
          :disabled="!createDepartment.name"
          @click="tambahDepartment"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="showModal.edit"
      :style="{ width: '450px' }"
      :header="$t('ubahDepartement')"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="DepartmentNama">{{ $t('namaDepartement') }}</label>

        <InputText
          id="DepartmentNama"
          v-model="selectedDepartmen.nama"
          type="text"
        />
      </div>

      <template #footer>
        <Button
          :label="$t('cancel')"
          icon="pi pi-times"
          class="p-button-text"
          @click="showModal.edit = false"
        />

        <Button
          :label="$t('save')"
          icon="pi pi-check"
          class="p-button-text"
          @click="editData()"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="showModal.delete"
      :style="{ width: '450px' }"
      :header="$t('konfirmasi')"
      :modal="true"
    >
      <div class="flex items-center justify-center">
        <i class="mr-3 pi pi-exclamation-triangle" style="font-size: 2rem" />
        <span
          >{{ $t('apakahandayakiningimenghapus') }}
          <b>{{ selectedDepartmen.nama }}</b
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
import { getDepartment } from '@/api/master/getDepartmen'
import { createDepartment as htppCreateDepartment } from '@/api/master/createDepartment'
import { editDepartment } from '@/api/master/editDepartment'
import { deleteDepartment } from '@/api/master/deleteDepartment'
import { Divisi as Department } from '@/typing/dataMaster'

const loading = ref(false)
const departments = ref<any[]>([])
const toast = useToast()
const selectedDepartmen: Department = reactive({
  id: 0,
  nama: ''
})
const createDepartment = reactive({
  name: ''
})

const showModal = reactive({
  delete: false,
  edit: false,
  add: false
})

onMounted(async () => {
  getData()
})

function showAddModal() {
  showModal.add = true
}

async function tambahDepartment() {
  const { success, message } = await htppCreateDepartment({
    name: createDepartment.name
  })
  if (message) {
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  showModal.add = false
  getData()
}

async function getData() {
  loading.value = true
  const { success, data, message } = await getDepartment()
  if (success && data) {
    departments.value = data.map((divisi) => {
      return {
        id: divisi.id,
        nama: divisi.name
      }
    })
    loading.value = false
    return
  }
}

function showEditModal(data: Department) {
  selectedDepartmen.id = data.id
  selectedDepartmen.nama = data.nama
  showModal.edit = true
}

async function editData() {
  const { success, message } = await editDepartment({
    id: selectedDepartmen.id,
    name: selectedDepartmen.nama
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

function showDeleteModal(data: Department) {
  selectedDepartmen.id = data.id
  selectedDepartmen.nama = data.nama
  showModal.delete = true
}

async function deleteData() {
  const { success, message } = await deleteDepartment({
    id: selectedDepartmen.id
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
  name: 'MasterDepartmentPage'
}
</script>
