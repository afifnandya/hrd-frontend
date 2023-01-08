<template>
  <div class="p-10 bg-white">
    <div class="flex items-center justify-between mb-6">
      <h5 class="text-xl font-bold">{{ $t('masterDivisi') }}</h5>

      <div>
        <button class="button button-primary" @click="showAddModal">{{ $t('tambahDivisi') }}</button>
      </div>
    </div>
    <DataTable
      ref="dt"
      :value="divisis"
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

        <Dialog
        v-model:visible="showModal.add"
        :style="{ width: '450px' }"
        :header="$t('tambahDivisi')"
        :modal="true"
        class="p-fluid"
      >
        <div class="field">
          <label for="DivisiNama">{{ $t('namaDivisi') }}</label>

          <InputText
            id="DivisiNama"
            v-model="createDivisi.name"
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
            :disabled="!createDivisi.name"
            @click="tambahDivisi"
          />
        </template>
      </Dialog>

      <Column
        field="no"
        :header="$t('idDivisi')"
        :sortable="true"
        header-style="width:14%; min-width:10rem;"
      >
        <template #body="{ data }">
          {{ data.id }}
        </template>
      </Column>
      <Column field="Nama" :header="$t('namaDivisi')" :sortable="true">
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
      :header="$t('ubahDivisi')"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="divisiNama">{{ $t('namaDivisi') }}</label>

        <InputText id="divisiNama" v-model="selectedDivisi.nama" type="text" />
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
          @click="editData"
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
          >{{ $t('apakahandayakiningimenghapus') }} <b>{{ selectedDivisi.nama }}</b
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

import { getDivisi } from '@/api/master/getDivisi'
import { editDivisi } from '@/api/master/editDivisi'
import { CreateDivisi } from '@/api/master/createDivisi'
import { deleteDivisi } from '@/api/master/deleteDivisi'
import { Divisi } from '@/typing/dataMaster'

const loading = ref(false)
const divisis = ref<any[]>([])
const toast = useToast()

const selectedDivisi: Divisi = reactive({
  id: 0,
  nama: ''
})

const createDivisi = reactive({
  name: ''
})

const showModal = reactive({
  delete: false,
  edit: false,
  add: false
})

onMounted(() => {
  getData()
})

function showAddModal() {
  showModal.add = true
}

async function tambahDivisi() {
  const { success, message } = await CreateDivisi({
    name: createDivisi.name
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
  const { success, data, message } = await getDivisi()
  if (success && data) {
    divisis.value = data.map((divisi) => {
      return {
        id: divisi.id,
        nama: divisi.name
      }
    })
    loading.value = false
    return
  }
}

function showEditModal(data: Divisi) {
  selectedDivisi.id = data.id
  selectedDivisi.nama = data.nama
  showModal.edit = true
}

function showDeleteModal(data: Divisi) {
  selectedDivisi.id = data.id
  selectedDivisi.nama = data.nama
  showModal.delete = true
}

async function editData() {
  const { success, message } = await editDivisi({
    id: selectedDivisi.id,
    name: selectedDivisi.nama
  })
  if (message) {
    if (!success) {
      toast.error(message)
    } else {
      toast.success(message)
    }
  }
  showModal.edit = false
  getData()
}

async function deleteData() {
  const { success, message } = await deleteDivisi({ id: selectedDivisi.id })
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
  name: 'MasterDivisiPage'
}
</script>
