import useAxios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import isErrorWithMessage from '@/helper/isErrorWithMessage'
import { camelizeKeys } from 'humps'
import { isEmpty } from 'lodash-es'

type Response = {
  status: number
  message: string
  data: {
    companyId: number
    companyCode: string
    companyName: string
    availableNik: string
  }
}

export async function getAvailableNIK(
  companyId: string | number,
  date: string
): Promise<{
  success: boolean
  message: string
  data: null | Response['data']
}> {
  try {
    const { data } = await useAxios(
      `/employees/available-nik?company_id=${companyId}&date=${date}`
    )
    if (isEmpty(data)) {
      return {
        success: false,
        message: DEFAULT_ERROR_MESSAGE,
        data: null
      }
    }
    const responseData = data as Response
    if (!responseData.data) {
      return {
        success: false,
        message: responseData.message,
        data: null
      }
    }
    return {
      success: true,
      message: responseData.message,
      data: camelizeKeys(responseData.data) as Response['data']
    }
  } catch (err) {
    if (isAxiosError(err) || isErrorWithMessage(err)) {
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
