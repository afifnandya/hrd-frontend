import useAxios from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import { isEmpty } from 'lodash-es'
import humps from 'humps'
import qs from 'qs'
import { WorkOrder } from '@/typing/workOrder'

export interface GetWorkOrderResponse {
  status: number
  message: string
  data: WorkOrder[] | WorkOrder
  meta: {
    from: number
    to: number
    perPage: number
    currentPage: number
    lastPage: number
    total: number
  }
  links: {
    path: string
    first: string
    last: string
    prev: string
    next: string
  }
}

export async function getWorkOrder(payload: {
  id?: string | number
  pageNumber?: number
  pageSize?: number
}): Promise<{
  success: boolean
  message: string
  data: null | GetWorkOrderResponse['data']
  meta: null | GetWorkOrderResponse['meta']
  links: null | GetWorkOrderResponse['links']
}> {
  const defaultErrorMessage = `${DEFAULT_ERROR_MESSAGE}, failed get work orders`
  const filter = qs.stringify(
    humps.decamelizeKeys({
      limit: payload?.pageSize || null,
      page: payload?.pageNumber || null
    }),
    { skipNulls: true }
  )

  const url = payload?.id ? `/work-orders/${payload.id}` : '/work-orders'
  const { data } = await useAxios({
    url: `${url}?${filter}`,
    method: 'GET'
  })
  if (isEmpty(data)) {
    return {
      success: false,
      message: defaultErrorMessage,
      meta: null,
      links: null,
      data: null
    }
  }
  const responseData = humps.camelizeKeys(data) as GetWorkOrderResponse
  return {
    success: true,
    message: responseData.message || '',
    data: responseData.data,
    meta: responseData.meta,
    links: responseData.links
  }
}
