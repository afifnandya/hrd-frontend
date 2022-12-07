import { createDummyKaryawan } from '@/model/karyawan'
import { KaryawanInstance } from '@/typing/karyawan'
import { defineStore } from 'pinia'
import {
  updateKaryawan,
  uploadFotoKaryawan,
  tambahKaryawan
} from '@/service/karyawan'
import useToast from '@/composable/useToast'

const toast = useToast()

export const useKaryawanStore = defineStore('karyawan', {
  state() {
    return {
      fotoKaryawan: undefined as unknown as File,
      karyawan: createDummyKaryawan() as KaryawanInstance,
      editKaryawan: createDummyKaryawan() as KaryawanInstance
    }
  },
  getters: {
    isTambahKaryawan(): boolean {
      return this.karyawan.id === 0
    }
  },
  actions: {
    async updateKaryawan() {
      if (this.fotoKaryawan) {
        uploadFotoKaryawan(this.editKaryawan.id, this.fotoKaryawan)
      }
      const { success, message } = await updateKaryawan(
        this.editKaryawan.id,
        this.editKaryawan
      )
      if (message) {
        if (success) {
          toast.success(message)
          return {
            success,
            message
          }
        }
        toast.error(message)
        return {
          success,
          message
        }
      }
      return {
        success,
        message
      }
    },
    async tambahKaryawan() {
      const { success, message } = await tambahKaryawan(this.editKaryawan)
      if (message) {
        if (success) {
          toast.success(message)
          return {
            success,
            message
          }
        }
        toast.error(message)
        return {
          success,
          message
        }
      }
      return {
        success,
        message
      }
    }
  }
})
