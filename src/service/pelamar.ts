import { PelamarInstance } from '@/typing/pelamar'
import {
  PelamarAttributes,
  getPelamar as fetchPelamar,
  GetPelamarPayload
} from '@/api/pelamar/getPelamar'
import doCreatePelamar from '@/api/pelamar/createPelamar'
import { createPelamarInstance, mapper } from '@/model/pelamar'

export async function getPelamar(payload: GetPelamarPayload) {
  let dataKaryawan: PelamarInstance[] | null = null
  const { success, data, message, meta, links } = await fetchPelamar(payload)

  if (success && data) {
    if (Array.isArray(data)) {
      dataKaryawan = data.map((karyawan) => {
        const karyawanObj = createPelamarInstance(karyawan)
        return karyawanObj
      })
    }
  }

  return {
    success,
    message,
    meta,
    data: dataKaryawan,
    links
  }
}

export async function createPelamar(data: PelamarInstance) {
  const response = await doCreatePelamar(data)
  return response
}
