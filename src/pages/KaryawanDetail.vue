<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5 class="text-xl font-bold">Detail Karyawan</h5>
        <TabView>
          <TabPanel header="Profile">
            <KaryawanProfile :karyawan="karyawan" />
          </TabPanel>
          <TabPanel header="Pasangan"> </TabPanel>
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
import type { Karyawan } from '@/typing/karyawan'
import KaryawanProfile from '@/page_components/karyawan_detail/KaryawanProfile.vue'
const props = defineProps({
  id: {
    type: [String],
    required: true
  }
})

const karyawan: Ref<Karyawan> = ref(createDummyKaryawan())

async function fetchKaryawan() {
  const { data, error } = await getKaryawan({ nik: props.id })
  if (!error.value) {
    const result = data.value as Karyawan[]
    if (result.length) {
      karyawan.value = result[0]
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
