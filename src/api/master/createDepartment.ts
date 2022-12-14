import useAxios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'

export interface createDepartmentResponse {
  status: number
  message: string
  data: {
    id: string | number
    name: string
  }
}

export interface createDepartmentPayload {
  name: string
}

export async function createDepartment(payload: createDepartmentPayload) {
  let success = false
  let message = null
  let data = null
  const url = `/departments`
  try {
    const response = await useAxios({
      url: url,
      method: 'post',
      data: {
        name: payload.name
      }
    })
    const responseData = response.data as createDepartmentResponse
    if (responseData.status === 201 || responseData.status === 200) {
      success = true
      data = responseData.data
    }
    message = responseData.message

    return {
      success,
      message,
      data: data
    }
  } catch (error: any) {
    if (isAxiosError(error)) {
      if (error.response) {
        return {
          success,
          message: error.response.data.message as string,
          data
        }
      }
      if (error.request) {
        return {
          success,
          message: DEFAULT_ERROR_MESSAGE,
          data
        }
      }
      return {
        success,
        message: error.message,
        data
      }
    }
    return {
      success,
      message: DEFAULT_ERROR_MESSAGE,
      data
    }
  }
}
