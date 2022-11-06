<template>
  <div class="bg-white">
    <div class="mx-2 mb-[50px] mt-[15px] text-xl font-bold text-center">
      Form Tambah Pelamar
    </div>
    <div class="mx-12">
      <div class="flex items-center">
        <div class="mr-6 input-group">
          <div class="font-bold input-label">Nomer bantex</div>
          <InputText
            v-model="state.noBantex"
            type="text"
            class="w-full"
            disabled
          />
        </div>
        <div class="input-group">
          <div class="font-bold input-label">Tanggal Input</div>
          <Calendar
            v-model="state.tanggalBerkasMasuk"
            date-format="yy-mm-dd"
            class="w-full"
          />
        </div>
      </div>
      <div class="flex items-center">
        <div class="mr-6 input-group">
          <div class="font-bold input-label">Kategori</div>
          <InputText v-model="state.kategori" type="text" class="w-full" />
        </div>
        <div class="input-group">
          <Dropdown
            v-model="state.status"
            placeholder="Pilih status"
            class="w-full"
            :options="statusList"
          />
        </div>
      </div>
      <div class="input-group">
        <div class="font-bold input-label">
          No. KTP
          <FormRequired />
        </div>
        <InputText v-model="state.ktp" type="text" class="w-full" />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Nama</div>
        <InputText v-model="state.nama" type="text" class="w-full" />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Tempat, Tanggal Lahir</div>
        <div class="flex w-full">
          <InputText
            v-model="state.tempatLahir"
            type="text"
            class="w-full mr-4"
          />
          <Calendar
            v-model="state.tanggalLahir"
            date-format="yy-mm-dd"
            class="w-full"
          />
        </div>
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Jenis Kelamin</div>
        <Dropdown
          v-model="state.jenisKelamin"
          placeholder="Pilih Jenis Kelamin"
          class="w-full"
          :options="GENDER"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Kategori Wilayah</div>
        <InputText v-model="state.zonaIndustri" type="text" class="w-full" />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Alamat/Desa</div>
        <InputText v-model="state.alamat.desa" type="text" class="w-full" />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Kecamatan</div>
        <InputText
          v-model="state.alamat.kecamatan"
          type="text"
          class="w-full"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Kabupaten/Kota</div>
        <InputText
          v-model="state.alamat.kabupaten"
          type="text"
          class="w-full"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Provinsi</div>
        <InputText v-model="state.alamat.provinsi" type="text" class="w-full" />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Agama</div>
        <Dropdown
          v-model="state.agama"
          placeholder="Pilih Agama"
          class="w-full"
          :options="RELIGION"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Status Perkawinan</div>
        <Dropdown
          v-model="state.statusPernikahan"
          placeholder="Pilih Status Perkawinan"
          class="w-full"
          :options="MARTIAL_STATUS"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">No Hp/Telpon</div>
        <div class="flex w-full">
          <InputText
            v-model="state.nomorTelpon.telpon1"
            type="text"
            class="w-full mr-4"
            placeholder="Nomor Handphone"
          />
          <InputText
            v-model="state.nomorTelpon.telpon2"
            type="text"
            class="w-full"
            placeholder="Nomor Handphone Darurat"
          />
        </div>
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Pendidikan</div>
        <div class="flex w-full">
          <Dropdown
            v-model="state.pendidikan"
            placeholder="Pilih Pendidikan"
            class="w-full mr-4"
            :options="PENDIDIKAN_LIST"
          />

          <InputText
            v-model="state.jurusan"
            type="text"
            class="w-full"
            placeholder="Jurusan/Program Studi"
          />
        </div>
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Sertifikat</div>
        <div class="flex w-full">
          <InputText
            v-model="state.sertifikat.nama"
            type="text"
            class="w-full mr-4"
            placeholder="Sertifikat"
          />
          <InputText
            v-model="state.sertifikat.jenis"
            type="text"
            class="w-full"
            placeholder="Jenis Sertifikat"
          />
        </div>
      </div>

      <div class="input-group">
        <div class="font-bold input-label">Rekomendasi</div>
        <InputText
          v-model="state.rekomendasi"
          type="text"
          placeholder="Rekomendasi"
          class="w-full"
        />
      </div>

      <div class="input-group">
        <div class="font-bold input-label">SIM</div>
        <InputText
          v-model="state.sim"
          type="text"
          placeholder="Pilih SIM"
          class="w-full"
        />
      </div>

      <div class="input-group">
        <div class="font-bold input-label">Pengalaman Kerja</div>
        <InputText
          v-model="state.pengalamanKerja"
          type="text"
          placeholder="Pengalaman Kerja"
          class="w-full"
        />
      </div>

      <div class="input-group">
        <div class="font-bold input-label">Posisi Yang Dilamar</div>
        <InputText
          v-model="state.posisiYangDilamar"
          type="text"
          placeholder="Pilih Posisi Yang Dilamar"
          class="w-full"
        />
      </div>
    </div>

    <div class="flex items-center justify-end mx-12">
      <button
        class="mr-4 button button-large"
        @click="$router.push({ name: ROUTE_PELAMAR })"
      >
        Cancel
      </button>
      <button
        class="button button-primary button-large"
        :disabled="isLoading"
        @click="create"
      >
        <i
          v-if="isLoading"
          class="pi pi-spin pi-spinner"
          style="font-size: 2rem"
        ></i>
        <span v-else> Simpan </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Calendar from 'primevue/calendar'
import FormRequired from '@/components/FormRequired.vue'
import { Pelamar } from '@/typing/pelamar'
import { createPelamar } from '@/service/pelamar'
import Dropdown from 'primevue/dropdown'
import {
  RELIGION,
  MARTIAL_STATUS,
  GENDER,
  PENDIDIKAN as PENDIDIKAN_LIST,
  ROUTE_PELAMAR
} from '@/constants'
import useToast from '@/composable/useToast'

const toast = useToast()

const activeStatusList = ['Aktif', 'Tidak Aktif']
const statusList = ['Pelamar', 'Training']

const isLoading = ref(false)
const state: Pelamar = reactive({
  id: '',
  nama: '',
  ktp: '',
  nik: '',
  nomerPencariKerja: '',
  tanggalBerkasMasuk: undefined,
  kategori: '',
  status: '1',
  noBantex: '',
  umur: 0,
  tempatLahir: '',
  tanggalLahir: undefined,
  jenisKelamin: '',
  ketegoriWilayah: '',
  alamat: {
    desa: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: ''
  },
  agama: '',
  statusPernikahan: '',
  nomorTelpon: {
    telpon1: '',
    telpon2: ''
  },
  pendidikan: '',
  jurusan: '',
  sertifikat: {
    nama: '',
    jenis: ''
  },
  rekomendasi: '',
  sim: '',
  pengalamanKerja: '',
  posisiYangDilamar: '',
  statusKepesertaan: '',
  statusAktif: '',
  keteranganBpjs: '',
  keterangan: '',
  zonaIndustri: ''
})

const rules = {
  nama: { required },
  nomerKtp: { required, email },
  kategori: { required },
  status: { required }
}

// const vuelidate = useVuelidate(rules, state)

async function create() {
  isLoading.value = true
  try {
    const { isSuccess, data, message } = await createPelamar(state)
    if (!isSuccess || !data) {
      toast.error(message || '')
    } else {
      toast.success(message)
    }
  } catch (err) {
    toast.error('Terjadi Kesalahan')
  }
  isLoading.value = false
}
</script>
<script lang="ts">
export default {
  name: 'FormTambahPelamar'
}
</script>
