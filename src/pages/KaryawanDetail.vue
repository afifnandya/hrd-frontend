<template>
  <div class="grid">
    <BlockUI :blocked="isLoading">
      <div class="col-12">
        <div class="card">
          <h5 class="mb-4 text-xl font-bold">{{ $t('detailKaryawan') }}</h5>
          <TabView>
            <TabPanel :header="$t('profile')">
              <KaryawanProfile :karyawan="karyawan" />
            </TabPanel>
            <TabPanel :header="$t('pasangan')">
              <KaryawanPasangan :pasangan="karyawanPasangan" />
            </TabPanel>
            <TabPanel :header="$t('anak')">
              <KaryawanAnak :anak="karyawanAnak" />
            </TabPanel>
            <TabPanel :header="$t('orangTua')">
              <KaryawanOrangTua :orang-tua="karyawanOrangTua" />
            </TabPanel>
            <TabPanel :header="$t('kontrak')">
              <KaryawanKontrak :kontrak="karyawanKontrak" />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </BlockUI>
  </div>
</template>

<script lang="ts" setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import BlockUI from 'primevue/blockui'
import { getKaryawan, createDummyKaryawan } from '@/service/karyawan'
import { onMounted, ref } from 'vue'
import type { AnggotaKeluarga, Karyawan, Kontrak } from '@/typing/karyawan'
import KaryawanProfile from '@/page_components/karyawan_detail/KaryawanProfile.vue'
import KaryawanPasangan from '@/page_components/karyawan_detail/KaryawanPasangan.vue'
import KaryawanAnak from '@/page_components/karyawan_detail/KaryawanAnak.vue'
import KaryawanOrangTua from '@/page_components/karyawan_detail/KaryawanOrangTua.vue'
import KaryawanKontrak from '@/page_components/karyawan_detail/KaryawanKontrak.vue'
const props = defineProps({
  id: {
    type: [String],
    required: true
  }
})

const karyawan = ref(createDummyKaryawan())
const karyawanPasangan = ref<AnggotaKeluarga[]>([])
const karyawanAnak = ref<AnggotaKeluarga[]>([])
const karyawanOrangTua = ref<AnggotaKeluarga[]>([])
const karyawanKontrak = ref<Kontrak[]>([])
const isLoading = ref(false)

async function fetchKaryawan() {
  isLoading.value = true
  const slug = props.id
  const { success, data } = await getKaryawan({ id: parseInt(slug) })
  if (success) {
    const result = data
    if (result.length) {
      karyawan.value = result[0]
      karyawanPasangan.value = karyawan.value.getPasangan() || []
      karyawanAnak.value = karyawan.value.getAnak() || []
      karyawanOrangTua.value = karyawan.value.getOrangTua() || []
      karyawanKontrak.value = karyawan.value.kontrak || []
    }
  }
  isLoading.value = false
  console.log('res', data)
}

onMounted(async () => {
  await fetchKaryawan()
})
</script>
<script lang="ts">
export default {
  name: 'KaryawanDetail'
}
</script>
