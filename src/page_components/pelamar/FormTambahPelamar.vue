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
          <InputText
            v-model="state.tanggalBerkasMasuk"
            type="text"
            class="w-full"
            disabled
          />
        </div>
      </div>
      <div class="flex items-center">
        <div class="mr-6 input-group">
          <div class="font-bold input-label">Kategori</div>
          <Dropdown
            v-model="state.kategori"
            :options="kategoriPekerjaan"
            option-label="name"
            class="w-full"
          />
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
        <InputNumber
          v-model="state.ktp"
          class="w-full"
          mode="decimal"
          :use-grouping="false"
        />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Nama</div>
        <InputText v-model="state.nama" type="text" class="w-full" />
      </div>
      <div class="input-group">
        <div class="font-bold input-label">Tempat, Tanggal Lahir</div>
        <div class="flex w-full">
          <div class="w-full mr-4">
            <InputText v-model="state.tempatLahir" type="text" class="w-full" />
          </div>
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
        <Dropdown
          v-model="state.zonaIndustri"
          placeholder="Pilih Wilayah"
          class="w-full"
          option-label="area"
          option-value="code"
          :options="areaList"
        />
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
          <div class="w-full mr-4">
            <InputText
              v-model="state.nomorTelpon.telpon1"
              type="text"
              class="w-full"
              placeholder="Nomor Handphone"
            />
          </div>
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
          <div class="w-full mr-4">
            <InputText
              v-model="state.sertifikat.nama"
              type="text"
              class="w-full"
              placeholder="Sertifikat"
            />
          </div>
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
        <Dropdown
          v-model="state.posisiYangDilamar"
          placeholder="Pilih Posisi Yang Dilamar"
          class="w-full"
          option-label="nama"
          :options="jabatanList"
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
import { reactive, ref, onMounted, watch } from 'vue'
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
import { getJabatan } from '@/api/master/getJabatan'
import { Jabatan } from '@/typing/dataMaster'
import { getArea } from '@/api/master/getArea'
import { Area } from '@/typing/dataMaster'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { getBantex } from '@/api/pelamar/getBantext'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const store = useAppStore()
const { kategoriPekerjaan } = storeToRefs(store)

const statusList = ['Pelamar', 'Training']
const jabatanList = ref<Jabatan[]>([])
const areaList = ref<Area[]>([])

const isLoading = ref(false)
const state: Pelamar = reactive({
  noBantex: '',
  id: '',
  nama: '',
  ktp: '',
  nik: '',
  nomerPencariKerja: '',
  tanggalBerkasMasuk: dayjs().format('YYYY-MM-DD'),
  kategori: {
    id: '',
    code: '',
    name: ''
  },
  status: '1',
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
  posisiYangDilamar: {
    id: 0,
    nama: ''
  },
  statusKepesertaan: '',
  statusAktif: '',
  keteranganBpjs: '',
  keterangan: '',
  zonaIndustri: {
    code: '',
    area: ''
  }
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
      router.push({ name: ROUTE_PELAMAR })
    }
  } catch (err) {
    console.log(err)
    toast.error('Terjadi Kesalahan')
  }
  isLoading.value = false
}

async function getJabatanList() {
  const { success, data, message } = await getJabatan()
  if (!success || !data) {
    if (message) {
      toast.error(message)
    }
    return
  }
  jabatanList.value = data.map((jabatan) => {
    return { id: jabatan.id, nama: jabatan.name }
  })
}

async function getAreaList() {
  const { success, data, message } = await getArea()
  if (!success || !data) {
    if (message) {
      toast.error(message)
    }
    return
  }
  areaList.value = data.map((area) => {
    return {
      code: area.code.toString(),
      area: area.area
    }
  })
}

async function fetchBantex() {
  const jobCategoryId = state.kategori.id
  const { success, data, message } = await getBantex(jobCategoryId)
  console.log('sc', success, data, message)
  if (!success && message) {
    toast.error(message)
    return
  }
  if (data) {
    state.noBantex = data.availableBantexCode
  }
}

watch(
  () => state.kategori.id,
  () => {
    fetchBantex()
  }
)

onMounted(() => {
  getJabatanList()
  getAreaList()
  store.getJobCategory()
})
</script>
<script lang="ts">
export default {
  name: 'FormTambahPelamar'
}
</script>
