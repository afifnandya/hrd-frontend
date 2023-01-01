<template>
  <div class="p-10 bg-white">
    <div class="flex items-center justify-between mb-6">
      <h5 class="text-xl font-bold">{{ $t('masterJabatan') }}</h5>

      <div>
        <button class="button button-primary" @click="showAddModal">{{ $t('tambahJabatan') }}</button>
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

    <Dialog
      v-model:visible="showModal.add"
      :style="{ width: '450px' }"
      :header="$t('tambahJabatan')"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="JabatanNama">{{ $t('namaJabatan') }}</label>

        <InputText
          id="JabatanNama"
          v-model="createJabatan.name"
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
          :disabled="!createJabatan.name"
          @click="tambahJabatan"
        />
      </template>
    </Dialog>

      <Column
        field="no"
        :header="$t('idJabatan')"
        :sortable="true"
        header-style="width:14%; min-width:10rem;"
      >
        <template #body="{ data }">
          {{ data.id }}
        </template>
      </Column>
     
      <Column field="Nama" :header="$t('namaJabatan')" :sortable="true">
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
      :header="$t('ubahJabatan')"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="jabatanNama">{{ $t('namaJabatan') }}</label>

        <InputText
          id="jabatanNama"
          v-model="selectedJabatan.nama"
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
          :disabled="!selectedJabatan.id || !selectedJabatan.nama"
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
          >{{ $t('apakahandayakiningimenghapus') }} <b>{{ selectedJabatan.nama }}</b
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
import { CreateJabatan } from '@/api/master/createJabatan'
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

const createJabatan = reactive({
  name: ''
})



const showModal = reactive({
  delete: false,
  edit: false,
  add: false

})

function showAddModal() {
  showModal.add = true
}

async function tambahJabatan() {
  const { success, message } = await CreateJabatan({
    name: createJabatan.name
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
}


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
  getData()

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
  getData()
}
</script>
<script lang="ts">
const newLocal = "Confirm"
export default {
  name: 'MasterJabatanPage'
}
</script>
