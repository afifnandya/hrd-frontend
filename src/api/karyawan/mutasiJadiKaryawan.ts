import useAxios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import isErrorWithMessage from '@/helper/isErrorWithMessage'
import { firstObjectPropValue } from '@/helper/objetHelper'
import { decamelizeKeys } from 'humps'
import { isEmpty, omitBy } from 'lodash-es'

type MutasiKaryawanResponse = {
  status: number
  message: string
  data: null
  errors: Record<string, any>
}

export interface MutasiKaryawanPayload {
  applicantId: number
  nik: number | string
  companyId: number
  departmentId: number
  divisionId: number
  positionId: number
  status: string
  activeStatus: string
  doh: string
  areaCode: string | number
  workOrderId?: string | number
}

export async function mutasiKaryawan(params: MutasiKaryawanPayload) {
  try {
    const parsedPayload = omitBy(
      decamelizeKeys(params),
      (value, key) => value === undefined || value === null
    )
    const axiosResponse = await useAxios({
      url: '/employees/hire',
      method: 'POST',
      data: parsedPayload
    })
    const responseData = axiosResponse.data as MutasiKaryawanResponse
    if (isEmpty(responseData)) {
      return {
        success: false,
        message: DEFAULT_ERROR_MESSAGE,
        data: null
      }
    }
    if (responseData.errors) {
      return {
        success: false,
        message: firstObjectPropValue(responseData.errors),
        data: null
      }
    }
    return {
      success: true,
      data: null,
      message: responseData.message
    }
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        success: false,
        message: err.response?.data.message || err.message,
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
