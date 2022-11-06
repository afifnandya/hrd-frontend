import useHttp from '@/composable/useHttp'

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
  const id = payload?.id
  let success = false
  let message = null
  let divisi = null
  const url = id ? `/divisions/${id}` : `/divisions`
  const { data } = await useHttp(url)
  const response = data.value as GetDivisi
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
}
