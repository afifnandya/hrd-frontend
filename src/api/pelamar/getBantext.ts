import useAxios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import isErrorWithMessage from '@/helper/isErrorWithMessage'
import { camelizeKeys } from 'humps'
import { isEmpty } from 'lodash-es'

export interface GetBantexResponse {
  status: number
  message: string
  data: {
    jobCategoryId: number | string
    jobCategoryCode: string
    jobCategoryName: string
    availableBantexCode: string
  }
}

async function getBantex(id: string | number) {
  try {
    if (!id) {
      throw new Error('Invalid job category id')
    }
    let success = false
    let data = null
    let message = null
    const response = await useAxios(
      `/applicants/available-bantex-code?job_category_id=${id}`
    )
    if (isEmpty(response.data)) {
      return {
        success,
        data,
        message
      }
    }
    const responseData = camelizeKeys(response.data) as GetBantexResponse
    if (responseData.status === 200) {
      success = true
      message = responseData.message
      data = responseData.data
      return {
        success,
        data,
        message
      }
    }
    message = responseData.message
    return {
      success,
      message,
      data
    }
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        success: false,
        message: err.message,
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

export { getBantex }
