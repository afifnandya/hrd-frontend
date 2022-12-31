<template>
  <div class="grid">
    <BlockUI :blocked="isLoading">
      <div class="col-12">
        <div class="card">
          <div class="flex items-center justify-between">
            <h5 class="mb-4 text-xl font-bold">{{ title }}</h5>
          </div>
          <TabView>
            <TabPanel :header="$t('profile')">
              <KaryawanProfile />
            </TabPanel>
            <TabPanel :header="$t('pasangan')">
              <KaryawanPasangan />
            </TabPanel>
            <TabPanel :header="$t('anak')">
              <KaryawanAnak />
            </TabPanel>
            <TabPanel :header="$t('orangTua')">
              <KaryawanOrangTua />
            </TabPanel>
            <TabPanel :header="$t('kontrak')">
              <KaryawanKontrak />
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
import { getKaryawan } from '@/service/karyawan'
import { useKaryawanStore } from '@/stores/karyawan'
import { computed, onMounted, ref } from 'vue'
import KaryawanProfile from '@/page_components/karyawan_detail/KaryawanProfile.vue'
import KaryawanPasangan from '@/page_components/karyawan_detail/KaryawanPasangan.vue'
import KaryawanAnak from '@/page_components/karyawan_detail/KaryawanAnak.vue'
import KaryawanOrangTua from '@/page_components/karyawan_detail/KaryawanOrangTua.vue'
import KaryawanKontrak from '@/page_components/karyawan_detail/KaryawanKontrak.vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

const props = defineProps({
  id: {
    type: [String]
  }
})

const { t } = useI18n()
const karyawanStore = useKaryawanStore()
const { karyawan } = storeToRefs(karyawanStore)
const isLoading = ref(false)
const isTambahKaryawan = computed(() => {
  return !props.id
})
const title = computed(() => {
  return isTambahKaryawan.value ? t('tambahKaryawan') : t('detailKaryawan')
})

async function fetchKaryawan() {
  if (!props.id) {
    return
  }
  isLoading.value = true
  const slug = props.id
  const { success, data } = await getKaryawan({ id: parseInt(slug) })
  if (success) {
    const result = data
    if (result.length) {
      karyawan.value = result[0]
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
