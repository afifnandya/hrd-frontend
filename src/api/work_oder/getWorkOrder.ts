import useAxios from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import { isEmpty } from 'lodash-es'
import humps from 'humps'
import qs from 'qs'
import { WorkOrder } from '@/typing/workOrder'
import { formatDate } from '@/helper/date'

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

type Payload = {
  id?: string | number
  pageNumber?: number
  pageSize?: number
}

export async function getWorkOrder(payload?: Payload): Promise<{
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
  if (Array.isArray(responseData.data)) {
    responseData.data.forEach((workOrder) => {
      workOrder.expireDate = formatDate(workOrder.expireDate)
      workOrder.receiveDate = formatDate(workOrder.receiveDate)
      workOrder.requestDate = formatDate(workOrder.requestDate)
      workOrder.estimateWorkingDate = formatDate(workOrder.estimateWorkingDate)
    })
  } else if (responseData.data.code) {
    responseData.data.expireDate = formatDate(responseData.data.expireDate)
    responseData.data.receiveDate = formatDate(responseData.data.receiveDate)
    responseData.data.requestDate = formatDate(responseData.data.requestDate)
    responseData.data.estimateWorkingDate = formatDate(
      responseData.data.estimateWorkingDate
    )
  }

  return {
    success: true,
    message: responseData.message || '',
    data: responseData.data,
    meta: responseData.meta,
    links: responseData.links
  }
}
