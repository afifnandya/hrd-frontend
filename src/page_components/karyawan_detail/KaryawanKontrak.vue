<template>
  <div class="p-10 bg-white">
    <DataTable
      ref="dt"
      :value="kontrak"
      :loading="loading"
      data-key="id"
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
      <Column field="contractType" header="Tipe"> </Column>
      <Column field="grade" header="Grade"> </Column>
      <Column field="durasi" header="Duration"> </Column>
      <Column field="startDate" header="Tanggal Mulai"> </Column>
      <Column field="endDate" header="Tanggal Selesai"></Column>
      <Column field="level" header="Level"></Column>
      <Column field="positionLevel" header="Position Level"></Column>
      <Column header="Action" header-style="min-width:10rem;">
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
      header="Edit Divisi"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="divisiNama">Nama</label>

        <InputText
          id="divisiNama"
          type="text"
          :value="selectedKontrak?.grade"
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
          @click="editData(selectedKontrak)"
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
          >Are you sure you want to delete
          <b>{{ selectedKontrak?.contractType }}</b
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
          @click="deleteData(selectedKontrak)"
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

import { computed, onMounted, reactive, ref } from 'vue'

import { Kontrak } from '@/typing/karyawan'

import { useKaryawanStore } from '@/stores/karyawan'
import { storeToRefs } from 'pinia'
const karyawanStore = useKaryawanStore()
const { karyawan } = storeToRefs(karyawanStore)
const kontrak = computed(() => {
  return karyawan.value.getOrangTua() || []
})

const loading = ref(false)

const selectedKontrak = ref<Kontrak>()

const showModal = reactive({
  delete: false,
  edit: false
})

function editData(data?: Kontrak) {
  selectedKontrak.value = data
  showModal.edit = true
}

function deleteData(data?: Kontrak) {
  selectedKontrak.value = data
  showModal.delete = true
}
</script>
<script lang="ts">
export default {
  name: 'KaryawanKontrak'
}
</script>
