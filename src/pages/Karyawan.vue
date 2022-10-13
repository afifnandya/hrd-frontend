<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Frozen Columns</h5>

        <DataTable
          :value="karyawans"
          :scrollable="true"
          :paginator="true"
          :rows="10"
          :lazy="true"
          :total-records="totalData"
          scroll-height="400px"
          :loading="isLoading"
          scroll-direction="both"
          class="mt-3"
          @page="onPageChange"
        >
          <Column
            field="nama"
            header="Nama"
            :style="{ width: '250px' }"
            frozen
          ></Column>
          <Column field="nik" header="Id" :style="{ width: '100px' }"></Column>
          <Column
            field="status"
            header="Status"
            class="capitalize"
            :style="{ width: '100px' }"
          >
          </Column>
          <Column
            field="departement"
            header="Departemen"
            class="capitalize"
            :style="{ width: '200px' }"
          ></Column>

          <Column
            field="jabatan"
            header="Jabatan"
            class="capitalize"
            :style="{ width: '200px' }"
          ></Column>
          <Column
            field="umur"
            header="Umur"
            :style="{ width: '200px' }"
          ></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getKaryawan } from '@/service/karyawan'
import type { Karyawan } from '@/typing/karyawan'
import { onMounted, reactive, ref, Ref } from 'vue'

type PageChangeEvent = {
  page: number
  pageCount: number
}

const karyawans: Ref<Karyawan[]> = ref([])
const isLoading = ref(false)
const totalData = ref(50)
const page = reactive({
  number: 1,
  size: 10
})

async function getKaryawanList() {
  try {
    isLoading.value = true
    const result = await getKaryawan({
      pageNumber: page.number,
      pageSize: page.size
    })
    console.log('aa', result.data.value)
    karyawans.value = result.data.value as Karyawan[]
    isLoading.value = false
  } catch (err) {
    console.log('err', err)
  }
}

function onPageChange(event: PageChangeEvent) {
  page.number = event.page + 1
  getKaryawanList()
  console.log('aa', event)
}

onMounted(() => {
  getKaryawanList()
})
</script>
<script lang="ts">
export default {
  name: 'Karyawan'
}
</script>

<style scoped lang="scss">
@import '../assets/demo/badges.scss';

::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
