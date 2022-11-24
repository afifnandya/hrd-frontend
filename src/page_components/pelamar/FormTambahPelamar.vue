<template>
  <div class="bg-white">
    <div class="mx-auto border lg:w-8/12 py-[20px] my-[20px]">
      <div class="mx-2 text-xl font-bold text-center mb-[30px]">
        Form Tambah Pelamar
      </div>
      <div class="mx-12">
        <div class="flex items-center">
          <FormLabel label="Nomer bantex" :required="true" />
          <FormInputText
            v-model="state.noBantex"
            placeholder="Masukkan Nomer bantext"
            :errors="vuelidate.state.noBantex.$errors"
            :disabled="true"
            class="w-full mr-6"
          />
          <FormInputText
            v-model="state.tanggalBerkasMasuk"
            placeholder="Masukkan Tanggal Input"
            :errors="vuelidate.state.tanggalBerkasMasuk.$errors"
            :disabled="true"
          />
        </div>
        <div class="flex items-center">
          <FormLabel label="Kategori" :required="true" />
          <FormDropdown
            v-model="state.kategori"
            :options="kategoriPekerjaan"
            placeholder="Pilih Kategori"
            option-label="name"
            class="mr-6"
            :errors="vuelidate.state.kategori.name.$errors"
          />
          <FormDropdown
            v-model="state.status"
            placeholder="Pilih status"
            :options="statusList"
            :errors="vuelidate.state.status.$errors"
          />
        </div>
        <FormInputText
          v-model="state.ktp"
          placeholder="Masukkan Nomor KTP"
          :errors="vuelidate.state.ktp.$errors"
          label="KTP"
          :required="true"
        />
        <FormInputText
          v-model="state.nama"
          placeholder="Masukkan Nama"
          :errors="vuelidate.state.nama.$errors"
          label="Nama"
          :required="true"
        />
        <div class="flex items-center">
          <FormLabel label="Tempat, Tanggal Lahir" :required="true" />
          <div class="flex w-full">
            <FormInputText
              v-model="state.tempatLahir"
              placeholder="Tempat Lahir"
              type="text"
              class="mr-4"
              :errors="vuelidate.state.tempatLahir.$errors"
            />
            <FormDatePicker
              v-model="state.tanggalLahir"
              placeholder="Tanggal Lahir"
              :errors="vuelidate.state.tanggalLahir.$errors"
            />
          </div>
        </div>
        <FormDropdown
          v-model="state.jenisKelamin"
          :required="true"
          placeholder="Pilih Jenis Kelamin"
          :options="GENDER"
          label="Jenis Kelamin"
          :errors="vuelidate.state.jenisKelamin.$errors"
        />

        <FormDropdown
          v-model="state.zonaIndustri"
          label="Kategori Wilayah"
          placeholder="Pilih Wilayah"
          option-label="area"
          option-value="code"
          :options="areaList"
          :required="true"
          :errors="vuelidate.state.zonaIndustri.area.$errors"
        />

        <FormInputText
          v-model="state.alamat.desa"
          :required="true"
          label="Alamat/Desa"
          placeholder="Masukkan Alamat/Desa"
          :errors="vuelidate.state.alamat.desa.$errors"
        />
        <FormInputText
          v-model="state.alamat.kecamatan"
          :required="true"
          label="Kecamatan"
          placeholder="Masukkan Kecamatan"
          :errors="vuelidate.state.alamat.kecamatan.$errors"
        />

        <FormInputText
          v-model="state.alamat.kabupaten"
          :required="true"
          label="Kabupaten/Kota"
          placeholder="Masukkan Kabupaten"
          :errors="vuelidate.state.alamat.kabupaten.$errors"
        />

        <FormInputText
          v-model="state.alamat.provinsi"
          :required="true"
          label="Provinsi"
          placeholder="Masukkan Provinsi"
          :errors="vuelidate.state.alamat.provinsi.$errors"
        />
        <FormInputText
          v-model="state.agama"
          placeholder="Masukkan Agama"
          :required="true"
          label="Agama"
          :errors="vuelidate.state.agama.$errors"
        />

        <FormDropdown
          v-model="state.statusPernikahan"
          label="Status Perkawinan"
          placeholder="Pilih Status Perkawinan"
          :options="MARTIAL_STATUS"
          :required="true"
          :errors="vuelidate.state.statusPernikahan.$errors"
        />

        <div class="flex items-center">
          <FormLabel label="No Hp/Telpon" />
          <div class="flex w-full">
            <FormInputText
              v-model="state.nomorTelpon.telpon1"
              class="mr-4"
              placeholder="Nomor Handphone"
            />

            <FormInputText
              v-model="state.nomorTelpon.telpon2"
              placeholder="Nomor Handphone Darurat"
            />
          </div>
        </div>
        <div class="flex items-center">
          <FormLabel label="Pendidikan" :required="true" />
          <div class="flex w-full">
            <FormDropdown
              v-model="state.pendidikan"
              placeholder="Pilih Pendidikan"
              class="mr-4"
              :options="PENDIDIKAN_LIST"
              :required="true"
              :errors="vuelidate.state.pendidikan.$errors"
            />

            <FormDropdown
              v-model="state.jurusan"
              type="text"
              placeholder="Jurusan/Program Studi"
            />
          </div>
        </div>
        <div class="flex items-center">
          <FormLabel label="Sertifikat" />
          <div class="flex w-full">
            <FormInputText
              v-model="state.sertifikat.nama"
              class="mr-4"
              placeholder="Sertifikat"
            />

            <FormInputText
              v-model="state.sertifikat.jenis"
              placeholder="Jenis Sertifikat"
            />
          </div>
        </div>

        <FormInputText
          v-model="state.rekomendasi"
          placeholder="Masukkan Rekomendasi"
          label="Rekomendasi"
        />

        <FormInputText
          v-model="state.sim"
          placeholder="Masukkan SIM"
          label="SIM"
        />

        <FormInputText
          v-model="state.pengalamanKerja"
          placeholder="Masukkan Pengalaman Kerja"
          label="Pengalaman Kerja"
        />

        <FormDropdown
          v-model="state.posisiYangDilamar"
          label="Posisi Yang Dilamar"
          placeholder="Pilih Posisi Yang Dilamar"
          option-label="nama"
          :options="jabatanList"
          :required="true"
          :errors="vuelidate.state.posisiYangDilamar.nama.$errors"
        />
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
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Calendar from 'primevue/calendar'
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
import { requiredMessage } from '@/helper/formValidation'
import FormInputText from '@/components/form/FormInputText.vue'
import FormDropdown from '@/components/form/FormDropdown.vue'
import FormLabel from '@/components/form/FormLabel.vue'
import FormDatePicker from '@/components/form/FormDatePicker.vue'

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
  status: '',
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
  state: {
    nama: { required: requiredMessage },
    noBantex: { required: requiredMessage },
    ktp: { required: requiredMessage },
    kategori: {
      name: { required: requiredMessage }
    },
    tanggalBerkasMasuk: {
      required: requiredMessage
    },
    zonaIndustri: {
      area: {
        required: requiredMessage
      }
    },
    status: { required: requiredMessage },
    posisiYangDilamar: {
      nama: { required: requiredMessage }
    },
    pendidikan: { required: requiredMessage },
    agama: { required: requiredMessage },
    alamat: {
      desa: { required: requiredMessage },
      kecamatan: { required: requiredMessage },
      kabupaten: { required: requiredMessage },
      provinsi: { required: requiredMessage }
    },
    tempatLahir: { required: requiredMessage },
    tanggalLahir: { required: requiredMessage },
    jenisKelamin: { required: requiredMessage },
    statusPernikahan: { required: requiredMessage }
  }
}

const vuelidate = useVuelidate(rules, { state }, { $autoDirty: true })
console.log('vue', vuelidate.value.$errors)

async function create() {
  const isFormCorrect = await vuelidate.value.$validate()
  // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
  if (!isFormCorrect) return
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
  name: 'FormTambahPelamar',
  components: { FormDropdown, FormLabel, FormDatePicker }
}
</script>
