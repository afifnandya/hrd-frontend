import useAxios from '@/composable/useAxios'
import { isEmpty } from 'lodash-es'

export interface GetDepartmentResponse {
  status: number
  message: string
  data: {
    id: number
    name: string
  }[]
}

async function getDepartment() {
  let success = false
  let data = null
  let message = null
  const response = await useAxios('/departments')
  if (isEmpty(response.data)) {
    return {
      success,
      data,
      message
    }
  }
  const responseData = response.data as GetDepartmentResponse
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

export { getDepartment }
