import useAxios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import isErrorWithMessage from '@/helper/isErrorWithMessage'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { isEmpty } from 'lodash-es'
import qs from 'qs'

type GetKontrakKaryawanPayload = {
  perusahaan?: string
  nama?: string
  departement?: string
  divisi?: string
  jabatan?: string
  statusKontrak?: string
}

type GetKontrakKaryawanResponse = {
  status: number
  message: string
  data: {
    contractType: string
    duration: number | null
    startDate: string
    endDate: string | null
    positionName: string
  }[]
}

export async function getKontrak(
  id: string | number,
  payload?: GetKontrakKaryawanPayload
) {
  try {
    const filter = qs.stringify(decamelizeKeys(payload), { skipNulls: true })
    let success = false
    let message = null
    let data = null
    const url = `/employees/${id}/contracts?${filter}`
    const { data: responseData } = await useAxios(url)
    console.log('responseData', responseData)

    const response = camelizeKeys(responseData) as GetKontrakKaryawanResponse
    if (isEmpty(response)) {
      success = false
    } else {
      if (response.status === 200) {
        success = true
        data = success ? response.data : null
      }
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
