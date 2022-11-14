import axios, { isAxiosError } from '@/composable/useAxios'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { PelamarInstance } from '@/typing/pelamar'
import dayjs from 'dayjs'
import { isEmpty, omitBy } from 'lodash-es'
import isErrorWithMessage from '@/helper/isErrorWithMessage'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'

export interface UpdatePelamarPayload {
  bantexCode: string
  ktp: string
  nik: number | string
  name: string
  status: string
  activeStatus: string
  birthPlace: string
  birthDate: string
  religion: string
  maritalStatus: string
  phone: string
  phoneEmergency: string
  sim: string
  province: string
  city: string
  district: string
  address: string
  gender: string
  experiences: string
  certificationType: string
  certification: string
  educationStage: string
  educationMajor: string
  recommendation: string
  areaCode: string | number
  positionId: number | string
  jobCategoryId: number | string
}

export interface UpdatePelamarResponse {
  data: any
  message: string
  status: number
  errors: Record<string, any>
}

export function buildPayload(
  data: PelamarInstance
): Partial<UpdatePelamarPayload> {
  const payload: UpdatePelamarPayload = {
    status: data.status,
    ktp: `${data.ktp}`,
    jobCategoryId: data.kategori.id,
    bantexCode: data.noBantex,
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
    positionId: data.posisiYangDilamar.id,
    areaCode: data.zonaIndustri.code,
    nik: data.nik,
    activeStatus: data.statusAktif
  }
  const parsedPayload = omitBy(
    decamelizeKeys(payload),
    (value, key) => value === undefined
  )
  console.log('b', parsedPayload)
  return parsedPayload
}

export async function updatePelamar(
  id: string | number,
  param: PelamarInstance
) {
  let isSuccess = false
  let message = null
  let data = null
  try {
    const payload = buildPayload(param)
    const response = await axios({
      method: 'PUT',
      url: `/applicants/${id}`,
      data: payload
    })

    const parsedData = response.data as UpdatePelamarResponse
    if (isEmpty(parsedData)) {
      return {
        data,
        isSuccess,
        message
      }
    }
    if (parsedData.errors) {
      for (const property in parsedData.errors) {
        message = `${message} ${parsedData.errors[property]}`
      }

      return {
        data,
        isSuccess,
        message: message
      }
    }
    if (parsedData.status === 200) {
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
    if (isAxiosError(err) || isErrorWithMessage(err)) {
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
