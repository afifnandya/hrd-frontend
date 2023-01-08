<template>
  <div class="p-10 bg-white">
    <div class="flex items-center justify-between mb-6">
      <h5 class="text-xl font-bold">{{ $t('masterArea') }}</h5>
      <div>
        <button class="button button-primary" @click="showAddModal">{{ $t('tambaharea') }}</button>
      </div>
    </div>
    <DataTable
      ref="dt"
      :value="areas"
      :loading="loading"
      data-key="id"
      :paginator="true"
      :rows="10"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rows-per-page-options="[5, 10, 25]"
      current-page-report-template="Showing {first} to {last} of {totalRecords}"
      responsive-layout="scroll"
      scroll-height="400px"
      scrollable
    >
      <Column
        field="no"
        :header="$t('codeArea')"
        :sortable="true"
        header-style="width:14%; min-width:10rem;"
      >
        <template #body="{ data }">
          {{ data.code }}
        </template>
      </Column>
      <Column field="Nama" :header="$t('area')" :sortable="true">
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
      v-model:visible="showModal.add"
      :style="{ width: '450px' }"
      :header="$t('tambahArea')"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="AreaCode">{{ $t('codeArea') }}</label>

        <InputText
          id="codeArea"
          v-model="createArea.code"
          type="text"
        />
      </div>
      <div class="field">
        <label for="AreaNama">{{ $t('area') }}</label>

        <InputText
          id="AreaNama"
          v-model="createArea.area"
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
          :disabled="!createArea.area"
          @click="tambahArea"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="showModal.edit"
      :style="{ width: '450px' }"
      :header="$t('ubahArea')"
      :modal="true"
      class="p-fluid"
    >
     <div class="field">
        <InputText id="codeArea" :v-model="selectedArea.code" type="hidden" />
      </div>
      <div class="field">
        <label for="area">Nama</label>

        <InputText id="area" v-model="selectedArea.area" type="text" />
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
          >{{ $t('apakahandayakiningimenghapus') }} <b>{{ selectedArea.area }}</b
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
import { CreateArea } from '@/api/master/createArea'
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

const createArea = reactive({
  code: '',
  area: ''
})

const showModal = reactive({
  delete: false,
  edit: false,
  add: false
})

function showAddModal() {
  showModal.add = true
}

async function tambahArea() {
  const { success, message } = await CreateArea({
    code: createArea.code,
    area: createArea.area
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
