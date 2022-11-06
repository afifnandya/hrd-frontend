<template>
  <div>
    <div class="mx-8">
      <div class="input-group">
        <div class="font-bold input-label">No. KTP</div>
        <InputText v-model="nomorKtp" type="text" class="w-full" />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Nama Pelamar</div>
        <InputText v-model="nama" type="text" class="w-full" />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Status Pelamar</div>
        <Dropdown
          v-model="status"
          placeholder="Pilih Status"
          :options="statusList"
          option-label="label"
          class="w-full"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">No. ID Kontrak</div>
        <InputText v-model="idKontrak" type="text" class="w-full" />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Perusahaan</div>
        <Dropdown
          v-model="perusahaan"
          placeholder="Pilih Perusahaan"
          :options="departemenList"
          option-label="label"
          class="w-full"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Tanggal Kontrak</div>
        <Calendar
          v-model="tanggalKontrak"
          autocomplete="off"
          class="w-full"
          date-format="dd/mm/yy"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Departemen</div>
        <Dropdown
          v-model="departemen"
          placeholder="Pilih Departemen"
          :options="departemenList"
          option-label="label"
          class="w-full"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Jabatan Sekarang</div>
        <Dropdown
          v-model="jabatan"
          placeholder="Pilih Posisi Yang Dilamar"
          :options="jabatanList"
          option-label="label"
          class="w-full"
        />
      </div>

      <div class="flex justify-end">
        <Button label="Simpan" class="button-primary" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'

type Props = {
  pelamar: Partial<{
    nomorKtp: string
    nama: string
    status: string
    perusahaan: string
    tanggalKontrak: string
    departemen: string
    jabatan: string
  }>
}

const props = defineProps<Props>()

const nama = ref(props.pelamar.nama)
const nomorKtp = ref(props.pelamar.nomorKtp)
const status = ref(props.pelamar.status)
const idKontrak = ref('Masukkan ID Karyawan')
const perusahaan = ref('Pilih Perusahaan')
const tanggalKontrak = ref()
const departemen = ref('Pilih Departement')
const jabatan = ref('Pilih Posisi Yang Dilamar')
const jabatanList = ref([
  { label: 'Direktur', value: 'A' },
  { label: 'HRD', value: 'B' }
])
const departemenList = ref([
  { label: 'Keuangan', value: 'A' },
  { label: 'Keamanan', value: 'A' }
])
const statusList = ref([
  { label: 'Karyawan', value: '' },
  { label: 'Pekerja Harian Lepas', value: '' }
])
</script>
<script lang="ts">
export default {
  name: 'FormEditPelamar'
}
</script>
