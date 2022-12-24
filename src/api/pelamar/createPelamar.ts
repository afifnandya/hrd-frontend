import axios, { isAxiosError } from '@/composable/useAxios'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { PelamarInstance } from '@/typing/pelamar'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash-es'
import isErrorWithMessage from '@/helper/isErrorWithMessage'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import { firstObjectPropValue } from '@/helper/objetHelper'

export interface CreatePelamarAPIResponse {
  status: number
  message: string
  data?: {
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
  errors?: Record<string, any>
}

export function buildPayload(data: PelamarInstance) {
  const payload = {
    status: data.status,
    ktp: `${data.ktp}`,
    // id: 0,
    jobCategoryId: data.kategori.id,
    bantexCode: data.noBantex,
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
    positionId: data.posisiYangDilamar.id,
    areaCode: data.zonaIndustri.code
  }
  const parsedPayload = decamelizeKeys(payload)
  console.log('b', parsedPayload)
  return parsedPayload
}

async function createPelamar(param: PelamarInstance) {
  let isSuccess = false
  let message = null
  let data = null
  try {
    const payload = buildPayload(param)
    const response = await axios({
      method: 'POST',
      url: '/applicants',
      data: payload
    })

    const parsedData = response.data as CreatePelamarAPIResponse
    if (isEmpty(parsedData)) {
      return {
        data,
        isSuccess,
        message
      }
    }
    if (parsedData.errors) {
      return {
        data,
        isSuccess,
        message: firstObjectPropValue(parsedData.errors)
      }
    }
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
  } catch (err) {
    console.log('masuk err', err)
    if (isAxiosError(err)) {
      message = err.response?.data.message || err.message
      return {
        data,
        isSuccess,
        message
      }
    }
    if (isErrorWithMessage(err)) {
      message = err.message
      return {
        data,
        isSuccess,
        message
      }
    }
    return {
      isSuccess,
      data,
      message: DEFAULT_ERROR_MESSAGE
    }
  }
}

export default createPelamar
