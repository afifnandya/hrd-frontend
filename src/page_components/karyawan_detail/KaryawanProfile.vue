<template>
  <div class="flex flex-col">
    <div class="flex flex-col items-center justify-center">
      <div
        class="flex items-center justify-center text-6xl text-white bg-blue-500 rounded-lg"
        style="width: 150px; height: 150px"
      >
        {{ nickName }}
      </div>

      <div class="flex items-center justify-center my-4">
        <div class="mr-2 text-2xl font-bold">{{ karyawan.nama }}</div>
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
        <div class="flex items-center justify-center mb-8">
          <label for="nama" class="input-label">Nama</label>
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
          <label for="tempatLahir" class="input-label">Tempat Lahir</label>
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
          <label for="tanggalLahir" class="input-label">Tangal Lahir</label>
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
          <label for="telp" class="input-label">No Telp</label>
          <div class="w-full">
            <InputText
              id="telp"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.telepon"
              class="w-full"
              @input="(event: any) => editKaryawan.telpon = event.target.value"
            />
          </div>
        </div>
        <div class="flex items-center justify-center mb-8">
          <label for="telpDarurat" class="input-label">No Telp Darurat</label>
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
          <label for="agama" class="input-label">Agama</label>
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

        <div class="pb-2 my-4 font-bold text-black border-b">Alamat</div>
        <div class="flex items-center justify-center mb-8">
          <label for="alamat" class="input-label">Alamat</label>
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
          <label for="kecamatan" class="input-label">Kecamatan</label>
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
          <label for="kabupatenKota" class="input-label">Kabupaten/Kota</label>
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
          <label for="provinsi" class="input-label">Provinsi</label>
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
          <label for="ktp" class="input-label">No KTP</label>
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
          <label for="divisi" class="input-label">Divisi</label>
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
          <label for="jabatan" class="input-label">Jabatan</label>
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
          <label for="perusahaan" class="input-label">Perusahaan</label>
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
          <label for="tanggungan" class="input-label">Tanggungan</label>
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
          <label for="sim" class="input-label">SIM</label>
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

        <div class="pb-2 my-4 font-bold text-black border-b">Pendidikan</div>

        <div class="flex mb-8">
          <label for="pendidikan" class="input-label">Pendidikan</label>
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

        <div class="pb-2 my-4 font-bold text-black border-b">Rekening</div>

        <div class="flex mb-8">
          <label for="pendidikan" class="input-label">Nama</label>
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
          <label for="rekeningBank" class="input-label">Bank</label>
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
          <label for="rekeningNomer" class="input-label">Nomer</label>
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
import { Karyawan } from '@/typing/karyawan'
import { computed, PropType, ref, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown'
import { RELIGION, PENDIDIKAN } from '@/constants'
import { updateKaryawan } from '@/service/karyawan'
import Calendar from 'primevue/calendar'
import useToast from '@/composable/useToast'

const store = useAppStore()
const toast = useToast()
const { perusahaan, jabatan, divisi } = storeToRefs(store)
const enableEdit = ref(false)
const props = defineProps({
  karyawan: {
    type: Object as PropType<Karyawan>,
    required: true
  }
})

const editKaryawan = ref()

watch(
  () => props.karyawan,
  (newVal) => {
    editKaryawan.value = { ...newVal }
  }
)

const nickName = computed(() => {
  if (props.karyawan) {
    const split = props.karyawan.nama.split(' ')
    if (split.length) {
      const indexOne = split[0].charAt(0)
      const indexTwo = split[1]?.charAt(0) || ''
      return indexOne + indexTwo
    }
  }
  return ''
})

async function submitUpdate() {
  const { success, message } = await updateKaryawan(
    editKaryawan.value.id,
    editKaryawan.value
  )
  if (message) {
    if (success) {
      toast.success(message)
      return
    }
    toast.error(message)
  }
  console.log('s', success, message)
}
</script>
<script lang="ts">
export default {
  name: 'KaryawanProfile'
}
</script>
