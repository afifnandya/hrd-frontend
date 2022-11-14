import useAxios from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import axios from 'axios'

export interface EditJabatanResponse {
  status: number
  message: string
  data: {
    id: string
    name: string
  }
}

export interface EditJabatanPayload {
  id: number
  name: string
}

export async function editJabatan(payload: EditJabatanPayload) {
  const id = payload?.id
  let success = false
  let message = null
  let jabatans = null
  const url = `/positions/${id}`
  try {
    const response = await useAxios({
      url: url,
      method: 'put',
      data: {
        name: payload.name
      }
    })
    const data = response.data as EditJabatanResponse
    // const response = data.value as GetJabatan
    if (data.status === 200) {
      success = true
      jabatans = data.data
    }
    message = data.message

    return {
      success,
      message,
      data: jabatans
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          success,
          message: error.response.data.message as string,
          data: jabatans
        }
      }
      if (error.request) {
        return {
          success,
          message: DEFAULT_ERROR_MESSAGE,
          data: jabatans
        }
      }
      return {
        success,
        message: error.message,
        data: jabatans
      }
    }
    return {
      success,
      message: DEFAULT_ERROR_MESSAGE,
      data: jabatans
    }
  }
}
