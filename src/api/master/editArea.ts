import useAxios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'

export interface EditAreaResponse {
  status: number
  message: string
  data: {
    code: string | number
    area: string
  }
}

export interface EditAreaPayload {
  code: string | number
  area: string
}

export async function editArea(payload: EditAreaPayload) {
  const id = payload?.code
  let success = false
  let message = null
  let data = null
  const url = `/areas/${id}`
  try {
    const response = await useAxios({
      url: url,
      method: 'put',
      data: {
        code: payload.code,
        area: payload.area
      }
    })
    const responseData = response.data as EditAreaResponse
    // const response = data.value as GetJabatan
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
