import useHttp from '@/composable/useHttp'
import { camelizeKeys, decamelizeKeys } from 'humps'
import qs from 'qs'
import { Pelamar } from '@/typing/pelamar'
import { isEmpty } from 'lodash-es'
import { KategoriPekerjaan } from '@/typing/dataMaster'

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

export type PelamarAttributes = {
  ktp: string
  id: number
  bantexCode: string
  nik: string | number
  name: string
  birthPlace: string
  birthDate: string | undefined
  religion: string
  status: string
  activeStatus: string
  jobCategory: KategoriPekerjaan
  maritalStatus: null | string
  phone: string
  phoneEmergency: null | string
  sim: null | string
  province: string
  city: string
  district: string
  address: string
  gender: string
  experiences: null | string
  certificationType: null | string
  certification: null | string
  educationStage: null | string
  educationMajor: null | string
  recommendation: null | string
  note: null | string
  createdAt: string | undefined
  updatedAt: string
  position: {
    id: number
    name: string
  }
  area: {
    code: string
    area: string
  }
}

export interface GetPelamarResponse {
  status: number
  message: string
  data: PelamarAttributes[]
  meta: Meta
  links: Links
}

export type GetPelamarPayload = Partial<PelamarAttributes> & {
  limit?: number
  page?: number
}

export async function getPelamar(payload: GetPelamarPayload) {
  const filter = qs.stringify(decamelizeKeys(payload), { skipNulls: true })
  let success = false
  let message = null
  let links = null
  let meta = null
  let data = null
  const url = payload.id
    ? `/applicants/${payload.id}?${filter}`
    : `/applicants?${filter}`
  const { data: responseData } = await useHttp(url)
  const response = camelizeKeys(responseData.value) as GetPelamarResponse
  if (!isEmpty(response)) {
    success = true
    // if (response.status === 200) {
    //   success = true
    // }
    data = success ? response.data : null
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
}
