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
  </div>
</template>

<script>
import AppTopBar from './AppTopbar.vue'
import AppMenu from './AppMenu.vue'
import AppFooter from './AppFooter.vue'

export default {
  components: {
    AppTopBar: AppTopBar,
    AppMenu: AppMenu,
    AppFooter: AppFooter
  },
  emits: ['change-theme'],
  data() {
    return {
      layoutMode: 'static',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: [
        {
          label: 'Home',
          items: [
            {
              label: 'Dashboard',
              icon: 'pi pi-fw pi-home',
              to: '/'
            }
          ]
        },
        {
          label: 'Master Data',
          items: [
            {
              label: 'Jabatan',
              icon: 'pi pi-fw pi-box',
              to: '/master/jabatan'
            },
            {
              label: 'Divisi',
              icon: 'pi pi-fw pi-box',
              to: '/'
            },
            {
              label: 'Departemen',
              icon: 'pi pi-fw pi-box',
              to: '/'
            },
            {
              label: 'Kategori',
              icon: 'pi pi-fw pi-box',
              to: '/'
            }
          ]
        },
        {
          label: 'Data Peserta',
          icon: 'pi pi-fw pi-sitemap',
          items: [
            {
              label: 'Karyawan',
              icon: 'pi pi-fw pi-id-card',
              to: '/karyawan'
            },
            {
              label: 'Harian Lepas',
              icon: 'pi pi-fw pi-check-square',
              to: '/karyawan'
            },
            {
              label: 'Data Pelamar',
              icon: 'pi pi-fw pi-bookmark',
              to: '/kayawan'
            }
          ]
        }
      ]
    }
  },
  computed: {
    containerClass() {
      return [
        'layout-wrapper',
        {
          'layout-overlay': this.layoutMode === 'overlay',
          'layout-static': this.layoutMode === 'static',
          'layout-static-sidebar-inactive':
            this.staticMenuInactive && this.layoutMode === 'static',
          'layout-overlay-sidebar-active':
            this.overlayMenuActive && this.layoutMode === 'overlay',
          'layout-mobile-sidebar-active': this.mobileMenuActive,
          'p-input-filled': this.$primevue.config.inputStyle === 'filled',
          'p-ripple-disabled': this.$primevue.config.ripple === false
        }
      ]
    }
  },
  watch: {
    $route() {
      this.menuActive = false
      this.$toast.removeAllGroups()
    }
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, 'body-overflow-hidden')
    else this.removeClass(document.body, 'body-overflow-hidden')
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false
        this.mobileMenuActive = false
      }

      this.menuClick = false
    },
    onMenuToggle() {
      this.menuClick = true

      if (this.isDesktop()) {
        if (this.layoutMode === 'overlay') {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true
          }

          this.overlayMenuActive = !this.overlayMenuActive
          this.mobileMenuActive = false
        } else if (this.layoutMode === 'static') {
          this.staticMenuInactive = !this.staticMenuInactive
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive
      }

      event.preventDefault()
    },
    onSidebarClick() {
      this.menuClick = true
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false
        this.mobileMenuActive = false
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className)
      else element.className += ' ' + className
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className)
      else
        element.className = element.className.replace(
          new RegExp(
            '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
            'gi'
          ),
          ' '
        )
    },
    isDesktop() {
      return window.innerWidth >= 992
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === 'static') return !this.staticMenuInactive
        else if (this.layoutMode === 'overlay') return this.overlayMenuActive
      }

      return true
    }
  }
}
</script>

<style lang="scss">
@import './App.scss';
</style>
