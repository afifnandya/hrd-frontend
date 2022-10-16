<template>
  <div class="flex flex-col">
    <div class="flex flex-col items-center justify-center">
      <div
        class="bg-blue-500 rounded-lg flex items-center justify-center text-white text-6xl"
        style="width: 150px; height: 150px"
      >
        {{ nickName }}
      </div>

      <div class="flex items-center justify-center my-4">
        <div class="text-2xl font-bold mr-2">{{ karyawan.nama }}</div>
        <button
          class="border rounded-lg px-3 py-1 hover:opacity-80"
          :class="
            enableEdit ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
          "
          @click="enableEdit = !enableEdit"
        >
          {{ enableEdit ? 'Edit' : 'Cancel' }}
        </button>
      </div>
    </div>

    <div class="flex">
      <div class="w-1/2">
        <div class="flex mb-4 items-center justify-center">
          <label for="nama" class="input-label">Nama</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="nama"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.nama"
            />
          </div>
        </div>
        <div class="flex mb-4 items-center justify-center">
          <label for="tempatLahir" class="input-label">Tempat Lahir</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="nama"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.tempatLahir"
            />
          </div>
        </div>
        <div class="flex mb-4 items-center justify-center">
          <label for="tanggalLahir" class="input-label">Tangal Lahir</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="tanggalLahir"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.tanggalLahir"
            />
          </div>
        </div>
        <div class="flex mb-4 items-center justify-center">
          <label for="umur" class="input-label">Umur</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="umur"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.umur"
            />
          </div>
        </div>
        <div class="flex mb-4 items-center justify-center">
          <label for="alamat" class="input-label">Alamat</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="alamat"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.alamat"
            />
          </div>
        </div>
        <div class="flex mb-4 items-center justify-center">
          <label for="kategori" class="input-label">Kategori</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="kategori"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.kategori"
            />
          </div>
        </div>
        <div class="flex mb-4 items-center justify-center">
          <label for="telp" class="input-label">No Telp</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="telp"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.telepon"
            />
          </div>
        </div>
        <div class="flex mb-4 items-center justify-center">
          <label for="telpDarurat" class="input-label">No Telp Darurat</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="telpDarurat"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.teleponDarurat"
            />
          </div>
        </div>
        <div class="flex mb-4 items-center justify-center">
          <label for="agama" class="input-label">Agama</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="agama"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.agama"
            />
          </div>
        </div>
      </div>

      <div class="w-1/2">
        <div class="flex mb-4">
          <label for="ktp" class="input-label">No KTP</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="ktp"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.ktp"
            />
          </div>
        </div>
        <div class="flex mb-4">
          <label for="divisi" class="input-label">Divisi</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="divisi"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.divisi"
            />
          </div>
        </div>
        <div class="flex mb-4">
          <label for="jabatan" class="input-label">Jabatan</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="jabatan"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.jabatan"
            />
          </div>
        </div>
        <div class="flex mb-4">
          <label for="perusahaan" class="input-label">Perusahaan</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="perusahaan"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.perusahaan"
            />
          </div>
        </div>

        <div class="flex mb-4">
          <label for="tanggungan" class="input-label">Tanggungan</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="tanggungan"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.tanggungan"
            />
          </div>
        </div>

        <div class="my-4 pb-2 border-b text-black font-bold">Pendidikan</div>

        <div class="flex mb-4">
          <label for="pendidikan" class="input-label">Pendidikan</label>
          <div class="flex">
            <div class="w-full md:w-2/12">
              <InputText
                id="pendidikan"
                type="text"
                :disabled="!enableEdit"
                :value="karyawan.pendidikan"
              />
            </div>
            <div class="w-full md:w-10/12">
              <InputText
                type="text"
                :disabled="!enableEdit"
                :value="karyawan.jurusan"
              />
            </div>
          </div>
        </div>

        <div class="my-4 pb-2 border-b text-black font-bold">Rekening</div>

        <div class="flex mb-4">
          <label for="pendidikan" class="input-label">Nama</label>
          <div class="w-full md:w-5/12">
            <InputText
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.rekening.name"
            />
          </div>
        </div>

        <div class="flex mb-4">
          <label for="rekeningBank" class="input-label">Bank</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="rekeningBank"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.rekening.bank"
            />
          </div>
        </div>

        <div class="flex mb-4">
          <label for="rekeningNomer" class="input-label">Nomer</label>
          <div class="w-full md:w-10/12">
            <InputText
              id="rekeningNomer"
              type="text"
              :disabled="!enableEdit"
              :value="karyawan.rekening.rekening"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Karyawan } from '@/typing/karyawan'
import { computed, PropType, ref } from 'vue'

const enableEdit = ref(false)
const props = defineProps({
  karyawan: {
    type: Object as PropType<Karyawan>,
    required: true
  }
})

const nickName = computed(() => {
  const split = props.karyawan.nama.split(' ')
  if (split.length) {
    const indexOne = split[0].charAt(0)
    const indexTwo = split[1]?.charAt(0) || ''
    return indexOne + indexTwo
  }
  return ''
})
</script>
<script lang="ts">
export default {
  name: 'KaryawanProfile'
}
</script>
