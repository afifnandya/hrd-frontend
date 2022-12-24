<template>
  <div class="flex flex-col">
    <div class="flex flex-col items-center justify-center">
      <div
        class="relative object-contain text-6xl text-white"
        style="width: 150px; height: 150px"
      >
        <img
          v-if="previewFoto || karyawan.foto"
          class="object-cover"
          :src="previewFoto || karyawan.foto || ''"
          style="width: 150px; height: 150px"
          alt=""
        />
        <div
          v-else
          class="flex items-center justify-center w-full h-full bg-blue-500 rounded-lg"
        >
          {{ nickName }}
        </div>
        <button
          v-if="enableEdit"
          class="absolute bottom-0 right-0 bg-white rounded-full"
          @click="onInputFileClick"
        >
          <IcBaselineCameraAlt class="w-[30px] h-[30px] text-gray-500 m-2" />
          <input
            id="fotoKaryawan"
            class="hidden w-full h-full"
            type="file"
            @change="uploadFoto"
          />
        </button>
      </div>

      <div class="flex items-center justify-center my-4">
        <div class="mr-2 text-2xl font-bold">{{ karyawan.nama }}</div>
        <div v-if="!karyawanStore.isTambahKaryawan" class="mr-2">
          <button
            v-if="!enableEdit"
            class="button button-primary"
            @click="onClickEdit"
          >
            {{ $t('edit') }}
          </button>
          <button
            v-else-if="enableEdit"
            class="button"
            @click="enableEdit = !enableEdit"
          >
            {{ $t('cancel') }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex mx-10 mt-10">
      <div class="w-1/2 mr-[100px]">
        <div class="flex items-center justify-center mb-8">
          <label for="nama" class="input-label">{{ $t('nama') }}</label>
          <div class="w-full">
            <InputText
              id="nama"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.nama"
              class="w-full"
              @input="(event: any) => editKaryawan.nama = event.target.value"
            />
          </div>
        </div>
        <div class="flex items-center justify-center mb-8">
          <label for="tempatLahir" class="input-label">{{
            $t('tempatLahir')
          }}</label>
          <div class="w-full">
            <InputText
              id="nama"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.tempatLahir"
              class="w-full"
              @input="(event: any) => editKaryawan.tempatLahir = event.target.value"
            />
          </div>
        </div>
        <div class="flex items-center justify-center mb-8">
          <label for="tanggalLahir" class="input-label">{{
            $t('tanggalLahir')
          }}</label>
          <div class="w-full">
            <InputText
              v-if="!enableEdit"
              id="tanggalLahir"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.tanggalLahir"
              class="w-full"
            />
            <Calendar
              v-else
              v-model="editKaryawan.tanggalLahir"
              class="w-full"
              date-format="yy-mm-dd"
            />
          </div>
        </div>
        <!-- <div class="flex items-center justify-center mb-8">
          <label for="umur" class="input-label">Umur</label>
          <div class="w-full">
            <InputText
              id="umur"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.umur"
              class="w-full"
            />
          </div>
        </div> -->
        <!-- <div class="flex items-center justify-center mb-8">
          <label for="kategori" class="input-label">Kategori</label>
          <div class="w-full">
            <InputText
              id="kategori"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.kategori"
              class="w-full"
            />
          </div>
        </div> -->
        <div class="flex items-center justify-center mb-8">
          <label for="telp" class="input-label">{{ $t('noTelpon') }}</label>
          <div class="w-full">
            <InputText
              id="telp"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.telepon"
              class="w-full"
              @input="(event: any) => editKaryawan.telepon = event.target.value"
            />
          </div>
        </div>
        <div class="flex items-center justify-center mb-8">
          <label for="telpDarurat" class="input-label">{{
            $t('noTelponDarurat')
          }}</label>
          <div class="w-full">
            <InputText
              id="telpDarurat"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.teleponDarurat"
              class="w-full"
              @input="(event: any) => editKaryawan.teleponDarurat = event.target.value"
            />
          </div>
        </div>
        <div class="flex items-center justify-center mb-8">
          <label for="agama" class="input-label">{{ $t('agama') }}</label>
          <div class="w-full">
            <Dropdown
              v-if="enableEdit"
              v-model="editKaryawan.agama"
              :options="RELIGION"
              class="w-full"
            />
            <InputText
              v-else
              id="agama"
              type="text"
              :disabled="true"
              :value="karyawan.agama"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex items-center justify-center mb-8">
          <label class="input-label">{{ $t('jenisKelamin') }}</label>
          <div class="w-full">
            <Dropdown
              v-if="enableEdit"
              v-model="editKaryawan.jenisKelamin"
              :options="GENDER"
              class="w-full"
            />
            <InputText
              v-else
              type="text"
              :disabled="true"
              :value="karyawan.jenisKelamin"
              class="w-full"
              @input="(event: any) => editKaryawan.jenisKelamin = event.target.value"
            />
          </div>
        </div>

        <div class="pb-2 my-4 font-bold text-black border-b">
          {{ $t('alamat') }}
        </div>
        <div class="flex items-center justify-center mb-8">
          <label for="alamat" class="input-label">{{ $t('alamat') }}</label>
          <div class="w-full">
            <InputText
              id="alamat"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.jalan"
              class="w-full"
              @input="(event: any) => editKaryawan.jalan = event.target.value"
            />
          </div>
        </div>
        <div class="flex items-center justify-center mb-8">
          <label for="kecamatan" class="input-label">{{
            $t('kecamatan')
          }}</label>
          <div class="w-full">
            <InputText
              id="kecamatan"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.kecamatan"
              class="w-full"
              @input="(event: any) => editKaryawan.kecamatan = event.target.value"
            />
          </div>
        </div>
        <div class="flex items-center justify-center mb-8">
          <label for="kabupatenKota" class="input-label">{{
            $t('kabupatenKota')
          }}</label>
          <div class="w-full">
            <InputText
              id="kabupatenKota"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.kabupatenKota"
              class="w-full"
              @input="(event: any) => editKaryawan.kabupatenKota = event.target.value"
            />
          </div>
        </div>
        <div class="flex items-center justify-center mb-8">
          <label for="provinsi" class="input-label">{{ $t('provinsi') }}</label>
          <div class="w-full">
            <InputText
              id="provinsi"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.provinsi"
              class="w-full"
              @input="(event: any) => editKaryawan.provinsi = event.target.value"
            />
          </div>
        </div>
      </div>

      <div class="w-1/2">
        <div class="flex mb-8">
          <label class="input-label">{{ $t('nik') }}</label>
          <div class="w-full">
            <InputText
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.nik"
              class="w-full"
              @input="(event: any) => editKaryawan.nik = event.target.value"
            />
          </div>
        </div>
        <div class="flex mb-8">
          <label for="ktp" class="input-label">{{ $t('noKtp') }}</label>
          <div class="w-full">
            <InputText
              id="ktp"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.ktp"
              class="w-full"
              @input="(event: any) => editKaryawan.ktp = event.target.value"
            />
          </div>
        </div>
        <div class="flex mb-8">
          <label for="divisi" class="input-label">{{ $t('divisi') }}</label>
          <div class="w-full">
            <Dropdown
              v-if="enableEdit"
              v-model="editKaryawan.divisi"
              :options="divisi"
              option-label="nama"
              class="w-full"
            />
            <InputText
              v-else
              id="divisi"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.divisi.nama"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex mb-8">
          <label for="jabatan" class="input-label">{{ $t('jabatan') }}</label>
          <div class="w-full">
            <Dropdown
              v-if="enableEdit"
              v-model="editKaryawan.jabatan"
              :options="jabatan"
              option-label="nama"
              class="w-full"
            />
            <InputText
              v-else
              id="jabatan"
              type="text"
              :disabled="true"
              :value="karyawan.jabatan.nama"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex mb-8">
          <label for="perusahaan" class="input-label">{{
            $t('perusahaan')
          }}</label>
          <div class="w-full">
            <Dropdown
              v-if="enableEdit"
              v-model="editKaryawan.perusahaan"
              :options="perusahaan"
              option-label="name"
              class="w-full"
            />
            <InputText
              v-else
              id="perusahaan"
              type="text"
              :disabled="true"
              :value="karyawan.perusahaan.name"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex mb-8">
          <label class="input-label">{{ $t('area') }}</label>
          <div class="w-full">
            <Dropdown
              v-if="enableEdit"
              v-model="editKaryawan.wilayah"
              :options="area"
              option-label="area"
              class="w-full"
            />
            <InputText
              v-else
              type="text"
              :disabled="true"
              :value="karyawan.wilayah.area"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex mb-8">
          <label for="tanggungan" class="input-label">{{
            $t('tanggungan')
          }}</label>
          <div class="w-full">
            <InputText
              id="tanggungan"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.tanggungan"
              class="w-full"
              @input="(event: any) => editKaryawan.tanggungan = event.target.value"
            />
          </div>
        </div>

        <div class="flex mb-8">
          <label for="sim" class="input-label">{{ $t('sim') }}</label>
          <div class="w-full">
            <InputText
              id="sim"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.sim"
              class="w-full"
              @input="(event: any) => editKaryawan.sim = event.target.value"
            />
          </div>
        </div>

        <div class="flex mb-8">
          <label class="input-label">{{ $t('statusKaryawan') }}</label>
          <div class="w-full">
            <Dropdown
              v-if="enableEdit"
              v-model="editKaryawan.status"
              :options="TIPE_KARYAWAN"
              class="w-full"
            />
            <InputText
              v-else
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.status"
              class="w-full"
              @input="(event: any) => editKaryawan.status = event.target.value"
            />
          </div>
        </div>

        <div class="flex mb-8">
          <label class="input-label">{{ $t('statusAktif') }}</label>
          <div class="w-full">
            <Dropdown
              v-if="enableEdit"
              v-model="editKaryawan.statusAktif"
              :options="STATUS_AKTIF_KARYAWAN"
              class="w-full"
            />
            <InputText
              v-else
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.statusAktif"
              class="w-full"
              @input="(event: any) => editKaryawan.statusAktif = event.target.value"
            />
          </div>
        </div>

        <div class="flex mb-8">
          <label class="input-label">{{ $t('kategori') }}</label>
          <div class="w-full">
            <Dropdown
              v-if="enableEdit"
              v-model="editKaryawan.kategoriPekerjaan"
              :options="kategoriPekerjaan"
              option-label="name"
              class="w-full"
            />
            <InputText
              v-else
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.kategoriPekerjaan.name"
              class="w-full"
              @input="(event: any) => editKaryawan.kategoriPekerjaan = event.target.value"
            />
          </div>
        </div>

        <div class="flex mb-8">
          <label class="input-label">{{ $t('npwp') }}</label>
          <div class="w-full">
            <InputText
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.npwp"
              class="w-full"
              @input="(event: any) => editKaryawan.npwp = event.target.value"
            />
          </div>
        </div>

        <div class="pb-2 my-4 font-bold text-black border-b">
          {{ $t('pendidikan') }}
        </div>

        <div class="flex mb-8">
          <label for="pendidikan" class="input-label">{{
            $t('pendidikan')
          }}</label>
          <div class="flex">
            <div class="w-full md:w-3/12">
              <Dropdown
                v-if="enableEdit"
                v-model="editKaryawan.pendidikan.stage"
                :options="PENDIDIKAN"
                class="w-full"
              />
              <InputText
                v-else
                id="pendidikan"
                type="text"
                :disabled="!enableEdit"
                :value="karyawan.pendidikan.stage"
                class="w-full"
              />
            </div>
            <div class="w-full ml-4">
              <InputText
                type="text"
                :disabled="!enableEdit"
                :value="karyawan.pendidikan.major"
                class="w-full"
                @input="(event: any) => editKaryawan.pendidikan.major = event.target.value"
              />
            </div>
          </div>
        </div>

        <div class="pb-2 my-4 font-bold text-black border-b">
          {{ $t('rekening') }}
        </div>

        <div class="flex mb-8">
          <label for="pendidikan" class="input-label">{{
            $t('namaRekening')
          }}</label>
          <div class="w-full">
            <InputText
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.rekening.name"
              class="w-full"
              @input="(event: any) => editKaryawan.rekening.name = event.target.value"
            />
          </div>
        </div>

        <div class="flex mb-8">
          <label for="rekeningBank" class="input-label">{{
            $t('namaBank')
          }}</label>
          <div class="w-full">
            <InputText
              id="rekeningBank"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.rekening.bank"
              class="w-full"
              @input="(event: any) => editKaryawan.rekening.bank = event.target.value"
            />
          </div>
        </div>

        <div class="flex mb-8">
          <label for="rekeningNomer" class="input-label">{{
            $t('nomerRekening')
          }}</label>
          <div class="w-full">
            <InputText
              id="rekeningNomer"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.rekening.rekening"
              class="w-full"
              @input="(event: any) => editKaryawan.rekening.rekening = event.target.value"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, PropType, ref, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown'
import {
  RELIGION,
  PENDIDIKAN,
  GENDER,
  TIPE_KARYAWAN,
  STATUS_AKTIF_KARYAWAN
} from '@/constants'
import Calendar from 'primevue/calendar'
import IcBaselineCameraAlt from '~icons/ic/baseline-camera-alt'
import { useKaryawanStore } from '@/stores/karyawan'
import { cloneDeep } from 'lodash'

const store = useAppStore()
const karyawanStore = useKaryawanStore()
const { karyawan, editKaryawan, fotoKaryawan } = storeToRefs(karyawanStore)
const { perusahaan, jabatan, divisi, area, kategoriPekerjaan } =
  storeToRefs(store)
const previewFoto = ref('')

const isTambahKaryawan = computed(() => {
  return karyawan.value.id === 0
})

const enableEdit = ref(false)

const nickName = computed(() => {
  if (karyawan.value) {
    const split = karyawan.value.nama.split(' ')
    if (split.length) {
      const indexOne = split[0].charAt(0)
      const indexTwo = split[1]?.charAt(0) || ''
      return indexOne + indexTwo
    }
  }
  return ''
})

function uploadFoto() {
  const inputFoto = document.getElementById('fotoKaryawan') as HTMLInputElement
  console.log(inputFoto?.files)
  if (inputFoto) {
    const file = inputFoto.files?.length ? inputFoto.files[0] : null
    if (file) {
      fotoKaryawan.value = file
      const reader = new FileReader()
      reader.onload = (e: any) => {
        previewFoto.value = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}

function onInputFileClick() {
  document.getElementById('fotoKaryawan')?.click()
}

function onClickEdit() {
  enableEdit.value = !enableEdit.value
  editKaryawan.value = cloneDeep(karyawan.value)
}

watch(
  () => isTambahKaryawan.value,
  (newVal) => {
    enableEdit.value = newVal
  },
  { immediate: true }
)
</script>
<script lang="ts">
export default {
  name: 'KaryawanProfile'
}
</script>
