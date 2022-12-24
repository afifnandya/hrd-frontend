import useAxios from '@/composable/useAxios'

export interface GetJobCategory {
  status: number
  message: string
  data: {
    id: number
    code: string
    name: string
  }[]
}

export async function getJobCategory() {
  let success = false
  let message = null
  let jobCategory = null
  const url = `/job-categories`
  const response = await useAxios(url)
  const data = response.data as GetJobCategory
  if (data.status === 200) {
    success = true
  }
  if (Array.isArray(data.data)) {
    jobCategory = data.data
  }
  message = data.message

  return {
    success,
    message,
    data: jobCategory
  }
}
