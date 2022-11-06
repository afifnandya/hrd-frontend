import useHttp from '@/composable/useHttp'

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
  const { data } = await useHttp(url)
  const response = data.value as GetJabatan
  if (response.status === 200) {
    success = true
  }
  if (Array.isArray(response.data)) {
    jabatans = response.data
  }
  message = response.message

  return {
    success,
    message,
    data: jabatans
  }
}
