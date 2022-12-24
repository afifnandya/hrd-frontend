<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="logo" />
      <span>Aplikasi HRD</span>
    </router-link>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true
      }"
      class="p-link layout-topbar-menu-button layout-topbar-button"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="hidden origin-top layout-topbar-menu lg:flex">
      <!-- <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </button>
      </li> -->
      <li>
        <Dropdown v-model="selectedLang" :options="availableLang"></Dropdown>
      </li>
      <li>
        <button
          class="p-link layout-topbar-button"
          aria-haspopup="true"
          aria-controls="overlay_menu"
          @click="toggle"
        >
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </button>
        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import logo from '@/assets/images/logo.jpeg'
import { logOut } from './service/user'
import { useAppStore } from '@/stores/app'
import { defineComponent, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown'

export default defineComponent({
  setup() {
    const app = useAppStore()
    const { availableLang, lang } = storeToRefs(app)
    const selectedLang = ref(lang.value)

    watch(selectedLang, (newVal) => {
      app.changLang(newVal as 'en' | 'id' | 'ch')
    })
    return {
      selectedLang,
      availableLang,
      lang
    }
  },
  data() {
    return {
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-refresh',
          command: () => {}
        },
        {
          label: 'Logut',
          icon: 'pi pi-times',
          command: () => {
            logOut()
            this.$router.push('/login')
          }
        }
      ],
      logo
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event)
    },
    onMenuToggle(event) {
      this.$emit('menu-toggle', event)
    },
    onTopbarMenuToggle(event) {
      this.$emit('topbar-menu-toggle', event)
    }
  }
})
</script>
