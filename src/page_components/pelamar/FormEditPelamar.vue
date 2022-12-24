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
        <div class="font-bold input-label">{{ t('statusPelamar') }}</div>
        <Dropdown
          v-model="status"
          placeholder="Pilih Status"
          :options="statusList"
          option-label="label"
          class="w-full"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">{{ t('noIdKontrak') }}</div>
        <InputText v-model="idKontrak" type="text" class="w-full" />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">{{ t('perusahaan') }}</div>
        <Dropdown
          v-model="perusahaan"
          placeholder="Pilih Perusahaan"
          :options="departemenList"
          option-label="label"
          class="w-full"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">{{ t('tanggalKontrak') }}</div>
        <Calendar
          v-model="tanggalKontrak"
          autocomplete="off"
          class="w-full"
          date-format="dd/mm/yy"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">{{ t('departemen') }}</div>
        <Dropdown
          v-model="departemen"
          :placeholder="t('pilihDepartemen')"
          :options="departemenList"
          option-label="label"
          class="w-full"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">{{ t('jabatanSekarang') }}</div>
        <Dropdown
          v-model="jabatan"
          :placeholder="$t('pilihPosisiYangDilamar')"
          :options="jabatanList"
          option-label="label"
          class="w-full"
        />
      </div>

      <div class="flex justify-end">
        <Button :label="t('save')" class="button-primary" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import { useI18n } from 'vue-i18n'

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
const { t } = useI18n({
  useScope: 'global'
})
const nama = ref(props.pelamar.nama)
const nomorKtp = ref(props.pelamar.nomorKtp)
const status = ref(props.pelamar.status)
const idKontrak = ref(t('masukkanIdKaryawan'))
const perusahaan = ref(t('pilihPerusahaan'))
const tanggalKontrak = ref()
const departemen = ref(t('pilihDepartemen'))
const jabatan = ref(t('pilihPosisiYangDilamar'))
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
