<template>
  <div class="px-4 py-6">
    <Breadcrumb :home="path.home" :model="path.items">
      <template #item="{ item }">
        <router-link :to="{ path: item.url || '/' }">
          <span :class="item.icon"></span>
          {{ item.label }}
        </router-link>
      </template>
    </Breadcrumb>
    <FormTambahPelamar class="py-6" />
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from 'primevue/breadcrumb'
import FormTambahPelamar from '@/page_components/pelamar/FormTambahPelamar.vue'
const path = {
  home: { icon: 'pi pi-home', url: '/' },
  items: [
    { label: 'Pelamar', url: '/pelamar' },
    { label: 'Tambah Pelamar', url: '/pelamar/add' }
  ]
}
</script>
<script lang="ts">
export default {
  name: 'AddPelamar'
}
</script>
