import { defineStore } from 'pinia'
import i18n from '@/i18n'
import {
  Area,
  Departmen,
  Divisi,
  Jabatan,
  Peruahaan,
  KategoriPekerjaan
} from '@/typing/dataMaster'
import { getArea } from '@/api/master/getArea'
import { getCompany } from '@/api/master/getCompany'
import { getDepartment } from '@/api/master/getDepartmen'
import { getDivisi } from '@/api/master/getDivisi'
import { getJabatan } from '@/api/master/getJabatan'
import { getJobCategory } from '@/api/master/getJobCategory'
import useToast from '@/composable/useToast'

const toast = useToast()

export const useAppStore = defineStore('app', {
  state() {
    return {
      lang: 'ID',
      availableLang: ['ID', 'EN', 'CH'],
      area: [] as Area[],
      jabatan: [] as Jabatan[],
      divisi: [] as Divisi[],
      departmen: [] as Departmen[],
      perusahaan: [] as Peruahaan[],
      kategoriPekerjaan: [] as KategoriPekerjaan[]
    }
  },
  actions: {
    changLang(paramLang: 'ID' | 'EN' | 'CH') {
      this.lang = paramLang
      i18n.global.locale.value = paramLang
      console.log('parma', paramLang, i18n.global.locale.value)
    },
    async getArea() {
      const { success, message, data } = await getArea()
      if (message && !success) {
        toast.error(message)
        return
      }
      this.area = data ? data : []
    },
    async getPerusahaan() {
      const { success, message, data } = await getCompany()
      if (message && !success) {
        toast.error(message)
        return
      }
      this.perusahaan = data ? data : []
    },
    async getDepartment() {
      const { success, message, data } = await getDepartment()
      if (message && !success) {
        toast.error(message)
        return
      }
      this.departmen = data
        ? data.map((department) => {
            return { nama: department.name, id: department.id }
          })
        : []
    },
    async getDivisi() {
      const { success, message, data } = await getDivisi()
      if (message && !success) {
        toast.error(message)
        return
      }
      this.divisi = data
        ? data.map((divisi) => {
            return { nama: divisi.name, id: divisi.id }
          })
        : []
    },
    async getJabatan() {
      const { success, message, data } = await getJabatan()
      if (message && !success) {
        toast.error(message)
        return
      }
      this.jabatan = data
        ? data.map((jabatan) => {
            return { nama: jabatan.name, id: jabatan.id }
          })
        : []
    },
    async getJobCategory() {
      const { success, message, data } = await getJobCategory()
      if (message && !success) {
        toast.error(message)
        return
      }
      this.kategoriPekerjaan = data || []
    }
  }
})
