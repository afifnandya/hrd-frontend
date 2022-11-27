<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view />
      </div>
      <AppFooter />
    </div>

    <transition name="layout-mask">
      <div
        v-if="mobileMenuActive"
        class="layout-mask p-component-overlay"
      ></div>
    </transition>
    <Toast />
  </div>
</template>

<script lang="ts" setup>
import AppTopBar from './AppTopbar.vue'
import AppMenu from './AppMenu.vue'
import AppFooter from './AppFooter.vue'
import { useI18n } from 'vue-i18n'
import { reactive, ref, computed, onBeforeUpdate, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
defineEmits(['change-theme'])

const { t } = useI18n({
  useScope: 'global'
})

const layoutMode = ref('static')
const staticMenuInactive = ref(false)
const overlayMenuActive = ref(false)
const mobileMenuActive = ref(false)
const menuClick = ref(false)
const menu = reactive([
  {
    label: 'Home',
    items: [
      {
        label: 'dashboard',
        icon: 'pi pi-fw pi-home',
        to: '/'
      }
    ]
  },
  {
    label: 'Master Data',
    items: [
      {
        label: 'jabatan',
        icon: 'pi pi-fw pi-box',
        to: '/master/jabatan'
      },
      {
        label: 'divisi',
        icon: 'pi pi-fw pi-box',
        to: '/master/divisi'
      },
      {
        label: 'departemen',
        icon: 'pi pi-fw pi-box',
        to: '/master/departmen'
      },
      {
        label: 'area',
        icon: 'pi pi-fw pi-box',
        to: '/master/area'
      },
      {
        label: 'perusahaan',
        icon: 'pi pi-fw pi-box',
        to: '/master/perusahaan'
      }
      // {
      //   label: 'kategori',
      //   icon: 'pi pi-fw pi-box',
      //   to: '/'
      // }
    ]
  },
  {
    label: 'Data Peserta',
    icon: 'pi pi-fw pi-sitemap',
    items: [
      {
        label: t('karyawan'),
        icon: 'pi pi-fw pi-id-card',
        to: '/karyawan'
      },
      // {
      //   label: 'Harian Lepas',
      //   icon: 'pi pi-fw pi-check-square',
      //   to: '/karyawan'
      // },
      {
        label: 'HR Recruitment',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: 'Data Pelamar',
            icon: 'pi pi-fw pi-bookmark',
            to: '/pelamar'
          },
          {
            label: 'Work Order',
            icon: 'pi pi-fw pi-bookmark',
            to: '/work-order'
          }
        ]
      }
    ]
  }
])

const containerClass = computed(() => {
  return [
    'layout-wrapper',
    {
      'layout-overlay': layoutMode.value === 'overlay',
      'layout-static': layoutMode.value === 'static',
      'layout-static-sidebar-inactive':
        staticMenuInactive.value && layoutMode.value === 'static',
      'layout-overlay-sidebar-active':
        overlayMenuActive.value && layoutMode.value === 'overlay',
      'layout-mobile-sidebar-active': mobileMenuActive.value
    }
  ]
})

function onWrapperClick() {
  if (!menuClick.value) {
    overlayMenuActive.value = false
    mobileMenuActive.value = false
  }

  menuClick.value = false
}

function addClass(element: HTMLElement, className: string) {
  if (element.classList) element.classList.add(className)
  else element.className += ' ' + className
}

function removeClass(element: HTMLElement, className: string) {
  if (element.classList) element.classList.remove(className)
  else
    element.className = element.className.replace(
      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
      ' '
    )
}

function onSidebarClick() {
  menuClick.value = true
}

function isDesktop() {
  return window.innerWidth >= 992
}

function onMenuItemClick(event: any) {
  if (event.item && !event.item.items) {
    overlayMenuActive.value = false
    mobileMenuActive.value = false
  }
}

function isSidebarVisible() {
  if (isDesktop()) {
    if (layoutMode.value === 'static') return !staticMenuInactive.value
    else if (layoutMode.value === 'overlay') return overlayMenuActive.value
  }

  return true
}

function onMenuToggle() {
  menuClick.value = true

  if (isDesktop()) {
    if (layoutMode.value === 'overlay') {
      if (mobileMenuActive.value === true) {
        overlayMenuActive.value = true
      }

      overlayMenuActive.value = !overlayMenuActive.value
      mobileMenuActive.value = false
    } else if (layoutMode.value === 'static') {
      staticMenuInactive.value = !staticMenuInactive.value
    }
  } else {
    mobileMenuActive.value = !mobileMenuActive.value
  }

  // event.preventDefault()
}

onMounted(() => {
  appStore.getArea()
  appStore.getDepartment()
  appStore.getDivisi()
  appStore.getJabatan()
  appStore.getPerusahaan()
})

onBeforeUpdate(() => {
  if (mobileMenuActive.value) {
    if (mobileMenuActive.value) {
      addClass(document.body, 'body-overflow-hidden')
    } else {
      removeClass(document.body, 'body-overflow-hidden')
    }
  }
})
</script>

<style lang="scss">
@import './App.scss';
</style>
