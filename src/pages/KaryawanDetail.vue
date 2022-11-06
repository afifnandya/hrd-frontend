<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5 class="text-xl font-bold">Detail Karyawan</h5>
        <TabView>
          <TabPanel header="Profile">
            <KaryawanProfile :karyawan="karyawan" />
          </TabPanel>
          <TabPanel header="Pasangan">
            <KaryawanPasangan :pasangan="karyawanPasangan" />
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import { getKaryawan, createDummyKaryawan } from '@/service/karyawan'
import { onMounted, ref, Ref } from 'vue'
import type { AnggotaKeluarga, Karyawan } from '@/typing/karyawan'
import KaryawanProfile from '@/page_components/karyawan_detail/KaryawanProfile.vue'
import KaryawanPasangan from '@/page_components/karyawan_detail/KaryawanPasangan.vue'
const props = defineProps({
  id: {
    type: [String],
    required: true
  }
})

const karyawan = ref(createDummyKaryawan())
const karyawanPasangan = ref<AnggotaKeluarga[]>([])

async function fetchKaryawan() {
  const slug = props.id
  const { success, data } = await getKaryawan({ id: parseInt(slug) })
  if (success) {
    const result = data
    if (result.length) {
      karyawan.value = result[0]
      const pasangan = karyawan.value.getPasangan()
      karyawanPasangan.value = Array.isArray(pasangan) ? pasangan : []
    }
  }
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
