import useAxios from '@/composable/useAxios'

export interface GetJabatan {
  status: number
  message: string
  data: {
    id: number
    name: string
  }[]
}

export interface GetJabatanPayload {
  id?: number
}

export async function getJabatan(payload?: GetJabatanPayload) {
  const id = payload?.id
  let success = false
  let message = null
  let jabatans = null
  const url = id ? `/positions/${id}` : `/positions`
  const response = await useAxios(url)
  const data = response.data as GetJabatan
  // const response = data.value as GetJabatan
  if (data.status === 200) {
    success = true
  }
  if (Array.isArray(data.data)) {
    jabatans = data.data
  }
  message = data.message

  return {
    success,
    message,
    data: jabatans
  }
}
