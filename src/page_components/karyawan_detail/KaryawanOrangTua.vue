<template>
  <div class="p-10 bg-white">
    <DataTable
      ref="dt"
      :value="orangTua"
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
      <Column field="Nama" header="Nama" :sortable="true">
        <template #body="{ data }">
          {{ data.name }}
        </template>
      </Column>
      <Column field="ktp" header="KTP"> </Column>
      <Column field="relationship" header="Hubungan"> </Column>
      <Column field="job" header="Pekerjaan"> </Column>
      <Column field="birthDate" header="Tanggal Lahir">
        <template #body="{ data }">
          {{ data.birthDate }}
        </template>
      </Column>
      <Column field="birthPlace" header="Tempat Lahir">
        <template #body="{ data }">
          {{ data.birthPlace }}
        </template>
      </Column>
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
          :value="selectedAnggotaKeluarga?.name"
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
          @click="editData(selectedAnggotaKeluarga)"
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
          <b>{{ selectedAnggotaKeluarga?.name }}</b
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
          @click="deleteData(selectedAnggotaKeluarga)"
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

import { AnggotaKeluarga } from '@/typing/karyawan'
import { useKaryawanStore } from '@/stores/karyawan'
import { storeToRefs } from 'pinia'
const karyawanStore = useKaryawanStore()
const { karyawan } = storeToRefs(karyawanStore)
const orangTua = computed(() => {
  return karyawan.value.getOrangTua() || []
})

const loading = ref(false)

const selectedAnggotaKeluarga = ref<AnggotaKeluarga>()

const showModal = reactive({
  delete: false,
  edit: false
})

function editData(data?: AnggotaKeluarga) {
  selectedAnggotaKeluarga.value = data
  showModal.edit = true
}

function deleteData(data?: AnggotaKeluarga) {
  selectedAnggotaKeluarga.value = data
  showModal.delete = true
}
</script>
<script lang="ts">
export default {
  name: 'KaryawanOrangTua'
}
</script>
