import useAxios, { isAxiosError } from '@/composable/useAxios'
import { decamelizeKeys, camelizeKeys } from 'humps'
import isErrorWithMessage from '@/helper/isErrorWithMessage'
import { isEmpty } from 'lodash-es'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'

interface DeleteKaryawanResponse {
  status: number
  message: string
  data: null
}

export async function deleteKaryawan(id: string | number) {
  let success = false
  let message = null
  let data = null
  try {
    const url = `/employees/${id}`
    const { data: responseData } = await useAxios({
      url: url,
      method: 'delete'
    })
    const response = camelizeKeys(responseData) as DeleteKaryawanResponse
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
