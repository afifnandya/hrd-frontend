import {
  createWorkOrder as httpCreateWorkOrder,
  Payload
} from '@/api/work_oder/createWorkOrder'
import dayjs from 'dayjs'
export async function createWorkOrder(payload: Payload) {
  payload.expireDate = dayjs(payload.expireDate).format('YYYY-MM-DD')
  payload.receiveDate = dayjs(payload.expireDate).format('YYYY-MM-DD')
  payload.requestDate = dayjs(payload.requestDate).format('YYYY-MM-DD')
  payload.estimateWorkingDate = dayjs(payload.estimateWorkingDate).format(
    'YYYY-MM-DD'
  )
  return await httpCreateWorkOrder(payload)
}
