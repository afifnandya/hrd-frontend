<template>
  <div class="p-10 bg-white">
    <DataTable
      ref="dt"
      :value="pasangan"
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
      <Column field="Nama" :header="$t('nama')" :sortable="true">
        <template #body="{ data }">
          {{ data.name }}
        </template>
      </Column>
      <Column field="ktp" :header="$t('noKtp')"> </Column>
      <Column field="relationship" :header="$t('hubungan')"> </Column>
      <Column field="job" :header="$t('pekerjaan')"> </Column>
      <Column field="birthDate" :header="$t('tanggalLahir')">
        <template #body="{ data }">
          {{ data.birthDate }}
        </template>
      </Column>
      <Column field="birthPlace" :header="$t('tempatLahir')">
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
      :header="$t('edit')"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label>{{ $t('nama') }}</label>

        <InputText type="text" :value="selectedAnggotaKeluarga?.name" />
      </div>

      <div class="field">
        <label>{{ $t('noKtp') }}</label>

        <InputText type="text" :value="selectedAnggotaKeluarga?.ktp" />
      </div>

      <div class="field">
        <label>{{ $t('relationship') }}</label>

        <InputText type="text" :value="selectedAnggotaKeluarga?.relationship" />
      </div>

      <div class="field">
        <label>{{ $t('tanggalLahir') }}</label>

        <InputText type="text" :value="selectedAnggotaKeluarga?.birthDate" />
      </div>

      <div class="field">
        <label>{{ $t('tempatLahir') }}</label>

        <InputText type="text" :value="selectedAnggotaKeluarga?.birthPlace" />
      </div>

      <div class="field">
        <label>{{ $t('pekerjaan') }}</label>

        <InputText type="text" :value="selectedAnggotaKeluarga?.job" />
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

import { onMounted, reactive, ref } from 'vue'

import { AnggotaKeluarga } from '@/typing/karyawan'

defineProps<{ pasangan: AnggotaKeluarga[] }>()

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
  name: 'KaryawanPasangan'
}
</script>
