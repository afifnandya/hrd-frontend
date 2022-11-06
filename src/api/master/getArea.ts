import useAxios from '@/composable/useAxios'
import { isEmpty } from 'lodash-es'

export interface GetAreaResponse {
  status: number
  message: string
  data: {
    code: number
    area: string
  }[]
}

async function getArea() {
  let success = false
  let data = null
  let message = null
  const response = await useAxios('/areas')
  if (isEmpty(response.data)) {
    return {
      success,
      data,
      message
    }
  }
  const responseData = response.data as GetAreaResponse
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

export { getArea }
