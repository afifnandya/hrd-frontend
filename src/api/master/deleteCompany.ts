import useAxios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'

export interface DeleteCompanyResponse {
  status: number
  message: string
}

export interface DeleteCompanyPayload {
  id: number | string
}

export async function deleteCompany(payload: DeleteCompanyPayload) {
  const id = payload?.id
  let success = false
  let message = null
  const url = `/companies/${id}`
  try {
    const response = await useAxios({
      url: url,
      method: 'delete'
    })
    const data = response.data as DeleteCompanyResponse
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
