import useAxios, { isAxiosError } from '@/composable/useAxios'
import { camelizeKeys, decamelizeKeys } from 'humps'
import qs from 'qs'
import { isEmpty } from 'lodash-es'
import isErrorWithMessage from '@/helper/isErrorWithMessage'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'

export type Links = {
  path: string | null
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export type Meta = {
  from: number | null
  to: number | null
  perPage: number | null
  currentPage: number | null
  lastPage: number | null
  total: number | null
}

export interface KaryawanAttribute {
  id: number
  nik: string
  name: string
  activeStatus: string
  status: string
  departmentId: number
  grade: string
  positionLevel: string
  level: string
  taxDependentStatus: string
  maritalStatus: null | string
  kk: string
  kkUpdatedAt: string
  gender: string
  birthPlace: string
  birthDate: string
  religion: string
  city: string
  province: string
  district: string
  address: string
  pohOrigin: string
  pohOriginKtp: string
  pohWorking: string
  pohCategory: string
  phone: string
  phoneEmergency: string
  ktp: string
  sim: string
  npwp: string
  bpjsKesehatan: string
  bpjsKetenagakerjaan: string
  jobCategory: {
    id: string | number
    code: string
    name: string
  }
  company: {
    id: number
    code: string
    name: string
  }
  area: {
    code: string
    area: string
  }
  division: {
    id: number
    name: string
  }
  position: {
    id: number
    name: string
  }
  photoUrl: string | null
  families: {
    id: number
    name: string
    relationship: string
    gender: string | null
    birthPlace: null | string
    birthDate: null | string
    ktp: null | string
    job: null
  }[]
  bankAccount?: {
    id: number
    bankName: string
    accountNumber: string
    accountName: string
  }
  education: {
    id: number
    stage: string
    major: string
  }
  employmentContracts: {
    id: number
    companyId: number
    areaCode: string
    divisionId: number
    positionId: number
    contractType: string
    grade: string
    positionLevel: string
    level: string
    duration: number | null
    startDate: null
    endDate: null
  }[]
  meta: Meta
  links: Links
}

export interface GetKaryawan {
  status: number
  message: string
  data: KaryawanAttribute[]
  meta: Meta
  links: Links
}

export type GetKaryawanPayload = Partial<KaryawanAttribute> & {
  limit?: number
  page?: number
}

export async function getKaryawan(payload: GetKaryawanPayload) {
  try {
    const filter = qs.stringify(decamelizeKeys(payload), { skipNulls: true })
    let success = false
    let message = null
    let links = null
    let meta = null
    let data = null
    const url = payload.id
      ? `/employees/${payload.id}?${filter}`
      : `/employees?${filter}`
    const { data: responseData } = await useAxios(url)
    console.log('responseData', responseData)

    const response = camelizeKeys(responseData) as GetKaryawan
    if (isEmpty(response)) {
      success = false
    } else {
      if (response.status === 200) {
        success = true
        data = success ? response.data : null
      }
      console.log('aaa', response)
      links = response.links
      message = response.message
      meta = response.meta
    }

    return {
      success,
      message,
      meta,
      data,
      links
    }
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        success: false,
        message: err.response?.data || err.message,
        meta: null,
        data: null,
        links: null
      }
    }
    if (isErrorWithMessage(err)) {
      return {
        success: false,
        message: err.message,
        meta: null,
        data: null,
        links: null
      }
    }
    return {
      success: false,
      message: DEFAULT_ERROR_MESSAGE,
      meta: null,
      data: null,
      links: null
    }
  }
}
