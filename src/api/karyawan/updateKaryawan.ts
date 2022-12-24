import useAxios from '@/composable/useAxios'
import { decamelizeKeys, camelizeKeys } from 'humps'
import { isEmpty } from 'lodash-es'

export interface UpdateKaryawanPayload {
  nik: string
  name: string
  status: string
  activeStatus: string
  grade: number | string
  positionLevel: string | number
  level: string
  taxDependentStatus: string
  maritalStatus: string
  kk: string
  kkUpdatedAt: string
  gender: string
  birthPlace: string
  birthDate: string
  religion: string
  province: string
  city: string
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
  companyId: string | number
  areaCode: string | number
  divisionId: string | number
  positionId: string | number
  jobCategoryId: string | number
}

interface updateKaryawanResponse {
  status: number
  message: string
  data: null
}

export async function updateKaryawan(
  id: string | number,
  payload: Partial<UpdateKaryawanPayload>
) {
  let success = false
  let message = null
  let data = null
  const url = `/employees/${id}`
  const { data: responseData } = await useAxios({
    url: url,
    method: 'put',
    data: decamelizeKeys(payload)
  })
  const response = camelizeKeys(responseData) as updateKaryawanResponse
  if (isEmpty(response)) {
    success = false
  } else {
    if (response.status === 200) {
      success = true
      data = success ? response.data : null
    }
    console.log('aaa', response)
    message = response.message
  }

  return {
    success,
    message,
    data
  }
}
