import axios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE, NETWORK_ERROR_MESSAGE } from '@/constants'
import isErrorWithMessage from '@/helper/isErrorWithMessage'
import { firstObjectPropValue } from '@/helper/objetHelper'
import { WorkOrder } from '@/typing/workOrder'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { isEmpty } from 'lodash-es'

type Response = {
  status: number
  message: string
  data: null
}

export type Payload = {
  code: string
  departmentId: number
  divisionId: number
  positionId: number
  requesterName: string
  requestDate: string
  expireDate: string
  estimateWorkingDate: string
  existingPositionCount: number
  neededPositionCount: number
  hiringType: string
  requestedSalary: number
  requestedAge: number
  requestedGender: string
  requestedMaritalStatus: string
  requestedTall: string
  requestedPyhsical: string
  requestedVision: string
  requestedEducationStage: string
  requestedEducationMajor: string
  requestedCertification: string
  requestedExperiences: string
  requestedComputerSkill: string
  requestedMultiLanguage: string
  requestedMultiLevel: string
  requestedNationality: string
  requestedResidence: string
  reason: string
  jobDescription: string
  otherRequest: string
  receiverName: string
  receiveDate: string
}

export async function createWorkOrder(
  payload: Payload
): Promise<{ success: boolean; message: string; data: null }> {
  const errorMessage = `${DEFAULT_ERROR_MESSAGE}, failed create work orders`
  try {
    const { data } = await axios({
      url: '/work-orders',
      method: 'POST',
      data: decamelizeKeys(payload)
    })
    if (isEmpty(data)) {
      return {
        success: false,
        message: NETWORK_ERROR_MESSAGE,
        data: null
      }
    }
    const responseData = data as Response
    if (responseData.status !== 201) {
      return {
        success: false,
        message: responseData.message || errorMessage,
        data: null
      }
    }
    return {
      success: true,
      message: '',
      data: null
    }
  } catch (err) {
    console.log('eee', err)
    if (isAxiosError(err)) {
      const validationError = err.response?.data.errors
        ? `Validation Error: ${firstObjectPropValue(err.response?.data.errors)}`
        : ''
      return {
        success: false,
        message: validationError || err.message,
        data: null
      }
    }
    return {
      success: false,
      message: errorMessage,
      data: null
    }
  }
}
