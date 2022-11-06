import { defineStore } from 'pinia'
import i18n from '@/i18n'

export const useAppStore = defineStore('app', {
  state() {
    return {
      lang: 'ID',
      availableLang: ['ID', 'EN', 'CH']
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    changLang(paramLang: 'ID' | 'EN' | 'CH') {
      this.lang = paramLang
      i18n.global.locale.value = paramLang
      console.log('parma', paramLang, i18n.global.locale.value)
    }
  }
})
