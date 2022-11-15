<template>
  <div>
    <div class="input-group">
      <div class="font-bold input-label">Perusahaan</div>
      <Dropdown
        v-model="perusahaanId"
        placeholder="Pilih Perusahaan"
        :options="perusahaan"
        option-label="name"
        option-value="id"
        class="w-full"
      />
    </div>
    <div class="input-group">
      <div class="font-bold input-label">Departemen</div>
      <Dropdown
        v-model="departemenId"
        placeholder="Pilih Departmen"
        :options="departmen"
        option-label="nama"
        option-value="id"
        class="w-full"
      />
    </div>
    <div class="input-group">
      <div class="font-bold input-label">Divisi</div>
      <Dropdown
        v-model="divisiId"
        placeholder="Pilih Divisi"
        :options="divisi"
        option-label="nama"
        option-value="id"
        class="w-full"
      />
    </div>
    <div class="input-group">
      <div class="font-bold input-label">Jabatan</div>
      <Dropdown
        v-model="jabatanId"
        placeholder="Pilih Divisi"
        :options="jabatan"
        option-label="nama"
        option-value="id"
        class="w-full"
      />
    </div>
    <div class="input-group">
      <div class="font-bold input-label">Status</div>
      <Dropdown
        v-model="status"
        placeholder="Pilih Status"
        :options="TIPE_KARYAWAN"
        class="w-full"
      />
    </div>
    <div class="input-group">
      <div class="font-bold input-label">Tanggal Mutasi</div>
      <InputText
        v-model="tanggalMutasi"
        placeholder="Tangal Mutasi"
        disabled="true"
        type="text"
        class="w-full"
      />
      <!-- <Dropdown
        v-model="status"
        placeholder="Pilih Status"
        :options="TIPE_KARYAWAN"
        class="w-full"
      /> -->
    </div>
    <button
      class="block ml-auto button button-primary"
      :disabled="loading"
      @click="mutasi"
    >
      {{ !loading ? BUTTON_SAVE : BUTTON_LOADING }}
    </button>
  </div>
</template>
<script lang="ts" setup>
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import { ref, watch } from 'vue'
import {
  TIPE_KARYAWAN,
  KARYAWAN_AKTIF,
  BUTTON_SAVE,
  BUTTON_LOADING
} from '@/constants'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import useToast from '@/composable/useToast'
import dayjs from 'dayjs'
import { mutasiKaryawan } from '@/api/karyawan/mutasiJadiKaryawan'
import { getAvailableNIK } from '@/api/karyawan/getAvailableNIK'
const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  }
})
const store = useAppStore()
const toast = useToast()
const loading = ref(false)
const { departmen, divisi, jabatan, perusahaan } = storeToRefs(store)
const nik = ref('')
const perusahaanId = ref(0)
const departemenId = ref(0)
const divisiId = ref(0)
const jabatanId = ref(0)
const status = ref('')
const tanggalMutasi = ref(dayjs().format('YYYY-MM-DD'))
const statusAktif = ref(KARYAWAN_AKTIF)
const tanggalKontrak = dayjs().format('YYYY-MM-DD')

async function getNIK() {
  loading.value = true
  const today = dayjs().format('YYYY-MM-DD')
  const { success, message, data } = await getAvailableNIK(
    perusahaanId.value,
    today
  )
  loading.value = false

  console.log('su', success, data, message)
  if (message) {
    if (success && data) {
      nik.value = data.availableNik
      toast.success(message)
      return
    }
    toast.error(message)
  }
}

async function mutasi() {
  loading.value = true

  const { success, message, data } = await mutasiKaryawan({
    departmentId: departemenId.value,
    nik: nik.value,
    companyId: perusahaanId.value,
    applicantId: typeof props.id == 'string' ? parseInt(props.id) : props.id,
    divisionId: divisiId.value,
    positionId: jabatanId.value,
    status: status.value,
    activeStatus: statusAktif.value,
    doh: tanggalKontrak
  })
  loading.value = false

  if (message) {
    if (!success) {
      toast.error(message)
      return
    }
    toast.success(message)
  }
}

watch(
  () => perusahaanId.value,
  () => {
    getNIK()
  }
)
</script>

<script lang="ts">
export default {
  name: 'FormPelamarToPegawai'
}
</script>