import useAxios from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'

export interface CreateAreaResponse {
  status: number
  message: string
  data: {
    code: number | string
    area: string
  }
}

export interface CreateAreaPayload {
  code: number | string
  area: string
}

export async function CreateArea(payload: CreateAreaPayload) {
  let success = false
  let message = null
  let data = null
  const url = `/areas`
  try {
    const response = await useAxios({
      url: url,
      method: 'post',
      data: {
        code: payload.code,
        area: payload.area
      }
    })
    const responseData = response.data as CreateAreaResponse
    // const response = data.value as GetArea
    if (responseData.status === 200) {
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
    if (axios.isAxiosError(error)) {
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
