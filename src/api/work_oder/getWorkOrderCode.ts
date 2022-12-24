import useAxios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE, NETWORK_ERROR_MESSAGE } from '@/constants'
import { isEmpty } from 'lodash-es'
import humps from 'humps'
import { firstObjectPropValue } from '@/helper/objetHelper'
import isErrorWithMessage from '@/helper/isErrorWithMessage'

export async function getWorkOrderCode(departmentId: string | number): Promise<{
  isSuccess: boolean
  data: null | {
    availableWorkOrderCode: string
    departmentId: number
    departmentName: string
  }
  messsage: string
}> {
  try {
    const { data } = await useAxios({
      url: '/work-orders/available-code',
      method: 'GET',
      params: humps.decamelizeKeys({
        departmentId
      })
    })
    if (isEmpty(data)) {
      return {
        isSuccess: false,
        messsage: NETWORK_ERROR_MESSAGE,
        data: null
      }
    }
    const responseData = humps.camelizeKeys(data) as {
      status: number
      message: string
      data: {
        availableWorkOrderCode: string
        departmentId: number
        departmentName: string
      } | null
    }
    if (responseData.status !== 200) {
      return {
        isSuccess: false,
        messsage: responseData.message,
        data: null
      }
    }
    if (!responseData.data) {
      return {
        isSuccess: false,
        messsage: responseData.message,
        data: null
      }
    }
    return {
      isSuccess: true,
      messsage: responseData.message,
      data: responseData.data
    }
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        isSuccess: false,
        messsage:
          firstObjectPropValue(err.response?.data.errors) || err.message,
        data: null
      }
    }
    if (isErrorWithMessage(err)) {
      return {
        isSuccess: false,
        messsage: err.message,
        data: null
      }
    }
    return {
      isSuccess: false,
      messsage: DEFAULT_ERROR_MESSAGE,
      data: null
    }
  }
}
