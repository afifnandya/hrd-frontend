import { PelamarInstance } from '@/typing/pelamar'
import {
  PelamarAttributes,
  getPelamar as fetchPelamar,
  GetPelamarPayload
} from '@/api/pelamar/getPelamar'
import { updatePelamar as doUpdatePelamar } from '@/api/pelamar/updatePelamar'
import doCreatePelamar from '@/api/pelamar/createPelamar'
import { createPelamarInstance, mapper } from '@/model/pelamar'

export async function getPelamar(payload: GetPelamarPayload) {
  let dataKaryawan: PelamarInstance[] = []
  const { success, data, message, meta, links } = await fetchPelamar(payload)

  if (success && data) {
    if (Array.isArray(data)) {
      dataKaryawan = data.map((karyawan) => {
        const pelamarObj = createPelamarInstance(karyawan)
        return pelamarObj
      })
    } else {
      const pelamarObj = createPelamarInstance(data)

      dataKaryawan.push(pelamarObj)
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

export async function updatePelamar(
  id: string | number,
  payload: PelamarInstance
) {
  const response = await doUpdatePelamar(id, payload)
  return response
}

export async function createPelamar(data: PelamarInstance) {
  const response = await doCreatePelamar(data)
  return response
}
