import useAxios from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import axios from 'axios'

export interface EditDivisiResponse {
  status: number
  message: string
  data: {
    id: string | number
    name: string
  }
}

export interface EditDivisiPayload {
  id: number
  name: string
}

export async function editDivisi(payload: EditDivisiPayload) {
  const id = payload?.id
  let success = false
  let message = null
  let data = null
  const url = `/divisions/${id}`
  try {
    const response = await useAxios({
      url: url,
      method: 'put',
      data: {
        name: payload.name
      }
    })
    const responseData = response.data as EditDivisiResponse
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
