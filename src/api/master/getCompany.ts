import useAxios from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import axios from 'axios'

export interface GetCompanyResponse {
  status: number
  message: string
  data: {
    id: string | number
    code: string
    name: string
  }[]
}

export interface EditCompanyPayload {
  id: number | string
}

export async function getCompany(payload?: EditCompanyPayload) {
  const id = payload?.id
  let success = false
  let message = null
  let data = null
  const url = id ? `/companies/${id}` : `/companies`
  try {
    const response = await useAxios({
      url: url,
      method: 'get'
    })
    const responseData = response.data as GetCompanyResponse
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
