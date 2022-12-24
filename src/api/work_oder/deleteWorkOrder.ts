import useAxios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'

export interface DeleteWorkOrderResponse {
  status: number
  message: string
}

export async function deleteWorkOrder(id: string | number) {
  let success = false
  let message = null
  const url = `/work-orders/${id}`
  try {
    const response = await useAxios({
      url: url,
      method: 'delete'
    })
    const data = response.data as DeleteWorkOrderResponse
    success = true
    message = data.message

    return {
      success,
      message
    }
  } catch (error: any) {
    if (isAxiosError(error)) {
      if (error.response) {
        return {
          success,
          message: error.response.data.message as string
        }
      }
      if (error.request) {
        return {
          success,
          message: DEFAULT_ERROR_MESSAGE
        }
      }
      return {
        success,
        message: error.message
      }
    }
    return {
      success,
      message: DEFAULT_ERROR_MESSAGE
    }
  }
}
