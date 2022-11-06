import axios from '@/composable/useAxios'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { PelamarInstance } from '@/typing/pelamar'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash-es'

export interface CreatePelamarAPIResponse {
  status: number
  message: string
  data: {
    bantexCode: string
    ktp: string
    nik: null
    name: string
    status: string
    birthPlace: string
    birthDate: string
    religion: string
    maritalStatus: string
    phone: string
    phoneEmergency: string
    sim: null
    province: string
    city: string
    district: string
    address: string
    gender: string
    experiences: null
    certificationType: null
    certification: null
    educationStage: string
    educationMajor: string
    recommendation: null
    updatedAt: string
    createdAt: string
    id: number
  }
}

export function buildPayload(data: PelamarInstance) {
  const payload = {
    status: data.status,
    ktp: data.ktp,
    id: 0,
    bantexCode: `${new Date().toDateString()}`,
    nik: data.nik,
    name: data.nama,
    birthPlace: data.tempatLahir,
    birthDate: dayjs(data.tanggalLahir).format('YYYY-MM-DD'),
    religion: data.agama,
    maritalStatus: data.statusPernikahan,
    phone: data.nomorTelpon.telpon1,
    phoneEmergency: data.nomorTelpon.telpon2,
    sim: data.sim,
    province: data.alamat.provinsi,
    city: data.alamat.kabupaten,
    district: data.alamat.kecamatan,
    address: data.alamat.desa,
    gender: data.jenisKelamin,
    experiences: data.pengalamanKerja,
    certificationType: data.sertifikat.jenis,
    certification: data.sertifikat.nama,
    educationStage: data.pendidikan,
    educationMajor: data.jurusan,
    recommendation: data.rekomendasi,
    note: data.keterangan,
    createdAt: dayjs(data.tanggalBerkasMasuk).format('YYYY-MM-DD'),
    updatedAt: '',
    positionId: data.posisiYangDilamar,
    areaCode: data.zonaIndustri
  }
  const parsedPayload = decamelizeKeys(payload)
  console.log('b', parsedPayload)
  return parsedPayload
}

async function createPelamar(param: PelamarInstance) {
  let isSuccess = false
  let data = null
  let message = null
  const payload = buildPayload(param)
  const response = await axios({
    method: 'POST',
    url: '/applicants',
    data: payload
  })
  if (isEmpty(response.data)) {
    return {
      data,
      isSuccess,
      message
    }
  }
  const parsedData = response.data as CreatePelamarAPIResponse
  if (parsedData.status === 201) {
    data = parsedData
    isSuccess = true
    message = parsedData.message
    return {
      data,
      isSuccess,
      message
    }
  }
  message = parsedData.message
  return {
    data,
    isSuccess,
    message
  }
}

export default createPelamar
