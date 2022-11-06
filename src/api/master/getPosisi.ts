import useAxios from '@/composable/useAxios'
import { isEmpty } from 'lodash-es'

export interface GetPosisiResponse {
  status: number
  message: string
  data: {
    id: number
    name: string
  }[]
}

async function getPosisi() {
  let success = false
  let data = null
  let message = null
  const response = await useAxios('/positions')
  if (isEmpty(response.data)) {
    return {
      success,
      data,
      message
    }
  }
  const responseData = response.data as GetPosisiResponse
  if (responseData.status === 200) {
    success = true
    message = responseData.message
    data = responseData.data
    return {
      success,
      data,
      message
    }
  }
  message = responseData.message
  return {
    success,
    message,
    data
  }
}

export { getPosisi }
