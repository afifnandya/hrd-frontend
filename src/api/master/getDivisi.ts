import useAxios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import isErrorWithMessage from '@/helper/isErrorWithMessage'

export interface GetDivisi {
  status: number
  message: string
  data: {
    id: number
    name: string
  }[]
}

export interface GetDivisiPayload {
  id?: number
}

export async function getDivisi(payload?: GetDivisiPayload) {
  try {
    const id = payload?.id
    let success = false
    let message = null
    let divisi = null
    const url = id ? `/divisions/${id}` : `/divisions`
    const { data } = await useAxios({
      url: url
    })
    const response = data as GetDivisi
    if (response.status === 200) {
      success = true
    }
    if (Array.isArray(response.data)) {
      divisi = response.data
    }
    message = response.message

    return {
      success,
      message,
      data: divisi
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
