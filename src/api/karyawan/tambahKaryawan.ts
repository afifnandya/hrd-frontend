import useAxios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import isErrorWithMessage from '@/helper/isErrorWithMessage'
import { firstObjectPropValue } from '@/helper/objetHelper'
import { decamelizeKeys, camelizeKeys } from 'humps'
import { isEmpty } from 'lodash-es'

export interface CreateKaryawanPayload {
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

interface createKaryawanResponse {
  status: number
  message: string
  data: null
}

export async function tambahKaryawan(payload: Partial<CreateKaryawanPayload>) {
  let success = false
  let message = null
  let data = null
  try {
    const url = `/employees`
    const { data: responseData } = await useAxios({
      url: url,
      method: 'post',
      data: decamelizeKeys(payload)
    })
    const response = camelizeKeys(responseData) as createKaryawanResponse
    if (isEmpty(response)) {
      success = false
    } else {
      if (response.status === 201) {
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
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        success: false,
        message: err.response?.data.errors
          ? firstObjectPropValue(err.response?.data.errors)
          : '',
        data: null
      }
    }
    if (isErrorWithMessage(err)) {
      return {
        success: false,
        message: err.message,
        data: null
      }
    }
    return {
      success: false,
      message: DEFAULT_ERROR_MESSAGE,
      data: null
    }
  }
}
