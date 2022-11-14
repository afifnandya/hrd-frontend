<template>
  <BlockUI :blocked="isLoading">
    <div class="card">
      <h5 class="mb-4 text-xl font-bold">Detail Pelamar</h5>
      <div class="flex flex-col">
        <div class="flex flex-col items-center justify-center">
          <div
            class="flex items-center justify-center text-6xl text-white bg-blue-500 rounded-lg"
            style="width: 150px; height: 150px"
          >
            {{ nickName }}
          </div>

          <div class="flex items-center justify-center my-4">
            <div class="mr-2 text-2xl font-bold">{{ pelamar.nama }}</div>
            <div class="mr-2">
              <button
                v-if="!enableEdit"
                class="button button-primary"
                @click="enableEdit = !enableEdit"
              >
                Edit
              </button>
              <button
                v-else-if="enableEdit"
                class="button"
                @click="enableEdit = !enableEdit"
              >
                Cancel
              </button>
            </div>

            <button
              v-if="enableEdit"
              class="button button-success"
              @click="submitUpdate"
            >
              Save
            </button>
          </div>
        </div>

        <div class="flex mx-10 mt-10">
          <div class="w-1/2 mr-[100px]">
            <div class="pb-2 mb-4 font-bold text-black border-b">Biodata</div>

            <div class="flex items-center justify-center mb-8">
              <label for="nama" class="input-label">Nama</label>
              <div class="w-full">
                <InputText
                  id="nama"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.nama"
                  class="w-full"
                  @input="(event: any) => editPelamar.nama = event.target.value"
                />
              </div>
            </div>
            <div class="flex items-center justify-center mb-8">
              <label for="tempatLahir" class="input-label">Tempat Lahir</label>
              <div class="w-full">
                <InputText
                  id="nama"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.tempatLahir"
                  class="w-full"
                  @input="(event: any) => editPelamar.tempatLahir = event.target.value"
                />
              </div>
            </div>
            <div class="flex items-center justify-center mb-8">
              <label for="tanggalLahir" class="input-label">Tangal Lahir</label>
              <div class="w-full">
                <InputText
                  v-if="!enableEdit"
                  id="tanggalLahir"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.tanggalLahir"
                  class="w-full"
                />
                <Calendar
                  v-else
                  v-model="editPelamar.tanggalLahir"
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
                :value="pelamar.umur"
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
                :value="pelamar.kategori"
                class="w-full"
              />
            </div>
          </div> -->
            <!-- <div class="flex items-center justify-center mb-8">
            <label for="telpDarurat" class="input-label">Area</label>
            <div class="w-full">
              <InputText
                id="telpDarurat"
                type="text"
                :disabled="!enableEdit"
                :value="pelamar."
                class="w-full"
                @input="(event: any) => editPelamar.teleponDarurat = event.target.value"
              />
            </div>
          </div> -->
            <div class="flex items-center justify-center mb-8">
              <label for="agama" class="input-label">Agama</label>
              <div class="w-full">
                <Dropdown
                  v-if="enableEdit"
                  v-model="editPelamar.agama"
                  :options="RELIGION"
                  class="w-full"
                />
                <InputText
                  v-else
                  id="agama"
                  type="text"
                  :disabled="true"
                  :value="pelamar.agama"
                  class="w-full"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="agama" class="input-label">KTP</label>
              <div class="w-full">
                <InputText
                  id="agama"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.ktp"
                  class="w-full"
                  @input="(event: any) => editPelamar.ktp = event.target.value"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="agama" class="input-label">NIK</label>
              <div class="w-full">
                <InputText
                  id="agama"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.nik"
                  class="w-full"
                  @input="(event: any) => editPelamar.nik = event.target.value"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="agama" class="input-label">Umur</label>
              <div class="w-full">
                <InputText
                  id="agama"
                  type="text"
                  :disabled="true"
                  :value="pelamar.umur"
                  class="w-full"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="agama" class="input-label">Jenis Kelamin</label>
              <div class="w-full">
                <InputText
                  v-if="!enableEdit"
                  id="agama"
                  type="text"
                  :disabled="true"
                  :value="pelamar.jenisKelamin"
                  class="w-full"
                />
                <Dropdown
                  v-else
                  v-model="editPelamar.jenisKelamin"
                  :options="GENDER"
                  class="w-full"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="provinsi" class="input-label"
                >Status Pernikahan</label
              >
              <div v-if="!enableEdit" class="w-full">
                <InputText
                  id="provinsi"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.statusPernikahan"
                  class="w-full"
                  placeholder="Status Pernikahan"
                />
              </div>
              <Dropdown
                v-else
                v-model="editPelamar.statusPernikahan"
                placeholder="Pilih Status Pernikahan"
                class="w-full"
                :options="MARTIAL_STATUS"
              />
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="provinsi" class="input-label">Nomor Telpon</label>
              <div class="w-full">
                <InputText
                  id="provinsi"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.nomorTelpon.telpon1"
                  class="w-full"
                  @input="(event: any) => editPelamar.nomorTelpon.telpon1 = event.target.value"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="provinsi" class="input-label"
                >Nomor Telpon Darurat</label
              >
              <div class="w-full">
                <InputText
                  id="provinsi"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.nomorTelpon.telpon2"
                  class="w-full"
                  @input="(event: any) => editPelamar.nomorTelpon.telpon2 = event.target.value"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="provinsi" class="input-label">Pendidikan</label>
              <div class="flex items-center w-full">
                <div class="mr-4">
                  <InputText
                    v-if="!enableEdit"
                    id="provinsi"
                    type="text"
                    :disabled="!enableEdit"
                    :value="pelamar.pendidikan"
                    class="w-full"
                  />

                  <Dropdown
                    v-else
                    v-model="editPelamar.pendidikan"
                    class="w-full"
                    :options="PENDIDIKAN"
                  />
                </div>
                <div class="w-full">
                  <InputText
                    id="provinsi"
                    type="text"
                    :disabled="!enableEdit"
                    :value="pelamar.jurusan"
                    class="w-full"
                    @input="(event: any) => editPelamar.jurusan = event.target.value"
                  />
                </div>
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="provinsi" class="input-label">Sertifikat</label>
              <div class="mr-4">
                <InputText
                  id="provinsi"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.sertifikat.jenis"
                  class="w-full"
                  @input="(event: any) => editPelamar.sertifikat.jenis = event.target.value"
                />
              </div>
              <div class="w-full">
                <InputText
                  id="provinsi"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.sertifikat.nama"
                  class="w-full"
                  @input="(event: any) => editPelamar.sertifikat.nama = event.target.value"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="provinsi" class="input-label">SIM</label>
              <div class="w-full">
                <InputText
                  id="provinsi"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.sim"
                  class="w-full"
                  @input="(event: any) => editPelamar.sim = event.target.value"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="provinsi" class="input-label">Pengalaman Kerja</label>
              <div class="w-full">
                <InputText
                  id="provinsi"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.pengalamanKerja"
                  class="w-full"
                  @input="(event: any) => editPelamar.pengalamanKerja = event.target.value"
                />
              </div>
            </div>
          </div>

          <div class="w-1/2">
            <div class="pb-2 font-bold text-black border-b">
              Informasi Lamaran
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="agama" class="input-label">No Bantex</label>
              <div class="w-full">
                <InputText
                  id="agama"
                  type="text"
                  :disabled="true"
                  :value="!enableEdit ? pelamar.noBantex : editPelamar.noBantex"
                  class="w-full"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="agama" class="input-label">Area</label>
              <div v-if="!enableEdit" class="w-full">
                <InputText
                  id="agama"
                  type="text"
                  :disabled="true"
                  :value="pelamar.zonaIndustri.area"
                  class="w-full"
                />
              </div>
              <div v-else class="w-full">
                <Dropdown
                  v-model="editPelamar.zonaIndustri"
                  option-label="area"
                  class="w-full"
                  :options="area"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="agama" class="input-label">Status</label>
              <div class="w-full">
                <InputText
                  id="agama"
                  type="text"
                  :disabled="true"
                  :value="pelamar.status"
                  class="w-full"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="agama" class="input-label">Status Aktif</label>
              <div class="w-full">
                <InputText
                  id="agama"
                  type="text"
                  :disabled="true"
                  :value="pelamar.statusAktif"
                  class="w-full"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="agama" class="input-label">Kategori</label>
              <div v-if="!enableEdit" class="w-full">
                <InputText
                  id="agama"
                  type="text"
                  :disabled="true"
                  :value="pelamar.kategori.name"
                  class="w-full"
                />
              </div>
              <div v-else class="w-full">
                <Dropdown
                  v-model="editPelamar.kategori"
                  class="w-full"
                  option-label="name"
                  :options="kategoriPekerjaan"
                />
              </div>
            </div>
            <div class="flex items-center justify-center mb-8">
              <label for="agama" class="input-label">Tanggal Berkas</label>
              <div class="w-full">
                <InputText
                  id="agama"
                  type="text"
                  :disabled="true"
                  :value="pelamar.tanggalBerkasMasuk"
                  class="w-full"
                />
              </div>
            </div>
            <div class="pb-2 font-bold text-black border-b">Alamat</div>
            <div class="flex items-center justify-center mb-8">
              <label for="alamat" class="input-label">Alamat</label>
              <div class="w-full">
                <InputText
                  id="alamat"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.alamat.desa"
                  class="w-full"
                  @input="(event: any) => editPelamar.alamat.desa = event.target.value"
                />
              </div>
            </div>
            <div class="flex items-center justify-center mb-8">
              <label for="kecamatan" class="input-label">Kecamatan</label>
              <div class="w-full">
                <InputText
                  id="kecamatan"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.alamat.kecamatan"
                  class="w-full"
                  @input="(event: any) => editPelamar.alamat.kecamatan = event.target.value"
                />
              </div>
            </div>
            <div class="flex items-center justify-center mb-8">
              <label for="kabupatenKota" class="input-label"
                >Kabupaten/Kota</label
              >
              <div class="w-full">
                <InputText
                  id="kabupatenKota"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.alamat.kabupaten"
                  class="w-full"
                  @input="(event: any) => editPelamar.alamat.kabupaten = event.target.value"
                />
              </div>
            </div>
            <div class="flex items-center justify-center mb-8">
              <label for="provinsi" class="input-label">Provinsi</label>
              <div class="w-full">
                <InputText
                  id="provinsi"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.alamat.provinsi"
                  class="w-full"
                  @input="(event: any) => editPelamar.alamat.provinsi = event.target.value"
                />
              </div>
            </div>

            <div class="pb-2 font-bold text-black border-b">Lain-lain</div>

            <div class="flex items-center justify-center mb-8">
              <label for="provinsi" class="input-label">Keterangan</label>
              <div class="w-full">
                <InputText
                  id="provinsi"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.keterangan"
                  class="w-full"
                  @input="(event: any) => editPelamar.keterangan = event.target.value"
                />
              </div>
            </div>

            <div class="flex items-center justify-center mb-8">
              <label for="provinsi" class="input-label">Rekomendasi</label>
              <div class="w-full">
                <InputText
                  id="provinsi"
                  type="text"
                  :disabled="!enableEdit"
                  :value="pelamar.rekomendasi"
                  class="w-full"
                  @input="(event: any) => editPelamar.rekomendasi = event.target.value"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BlockUI>
</template>

<script lang="ts" setup>
import BlockUI from 'primevue/blockui'
import { getPelamar, updatePelamar } from '@/service/pelamar'
import { computed, ref, watch, defineProps, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown'
import {
  RELIGION,
  PENDIDIKAN,
  GENDER,
  MARTIAL_STATUS,
  ROUTE_PELAMAR
} from '@/constants'
import { updateKaryawan } from '@/service/karyawan'
import Calendar from 'primevue/calendar'
import useToast from '@/composable/useToast'
import { PelamarInstance } from '@/typing/pelamar'
import { createDummyPelamarInstance } from '@/model/pelamar'
import { getBantex } from '@/api/pelamar/getBantext'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    type: [String],
    required: true
  }
})

const router = useRouter()
const store = useAppStore()
const pelamar = ref<PelamarInstance>(createDummyPelamarInstance())
const isLoading = ref(false)
const editPelamar = ref<PelamarInstance>(createDummyPelamarInstance())
const toast = useToast()
const { perusahaan, jabatan, divisi, area, kategoriPekerjaan } =
  storeToRefs(store)
const enableEdit = ref(false)

const nickName = computed(() => {
  const split = pelamar.value.nama.split(' ')
  if (split.length) {
    const indexOne = split[0].charAt(0)
    const indexTwo = split[1]?.charAt(0) || ''
    return indexOne + indexTwo
  }
  return ''
})

async function fetchBantex() {
  const jobCategoryId = editPelamar.value.kategori?.id
  if (!jobCategoryId) {
    return
  }
  const { success, data, message } = await getBantex(jobCategoryId)
  console.log('sc', success, data, message)
  if (!success && message) {
    toast.error(message)
    return
  }
  if (data && editPelamar.value) {
    editPelamar.value.noBantex = data.availableBantexCode
  }
}

async function fetchPelamar() {
  isLoading.value = true
  const slug = props.id
  const { success, data } = await getPelamar({ id: parseInt(slug) })
  if (success) {
    const result = data
    if (result && result.length) {
      pelamar.value = result[0]
    }
  }
  isLoading.value = false
  console.log('res', data)
}

watch(
  () => pelamar.value,
  (newVal) => {
    editPelamar.value = { ...newVal }
  }
)
watch(
  () => editPelamar.value?.kategori,
  () => {
    fetchBantex()
  }
)
onMounted(async () => {
  await fetchPelamar()
  store.getJobCategory()
})

async function submitUpdate() {
  const { isSuccess, message } = await updatePelamar(
    editPelamar.value.id,
    editPelamar.value
  )
  if (message) {
    if (isSuccess) {
      toast.success(message)
      router.push({ name: ROUTE_PELAMAR })
      return
    }
    toast.error(message)
  }
  console.log('s', isSuccess, message)
}
</script>
<script lang="ts">
export default {
  name: 'PelamarDetail'
}
</script>
