import useAxios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import isErrorWithMessage from '@/helper/isErrorWithMessage'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { isEmpty } from 'lodash-es'
import qs from 'qs'

type GetKontrakById = {
  employeeId?: string | number
  contractId?: string | number
}

export interface GetKontrakByIdResponse {
  status: number
  message: string
  data: {
    id: string
    pohWorking: string
    contractType: string
    duration: number
    startDate: string
    endDate: string
    baseSalary: number
    performanceAllowance: number
    attendanceAllowance: number
    skillAllowance: number
    fixedAllowance: number
    totalSalary: number
    employee: {
      id: number
      name: string
      birthPlace: string
      birthDate: string
      gender: string
      address: string
      religion: string
      taxDependentStatus: string
      ktp: string
      poh: string
    }
    superiorEmployee: {
      id: number
      name: string
      position: {
        id: number
        name: string
      }
    }
    company: {
      id: number
      fullName: string
      address: string
    }
    area: {
      id: number
      name: string
    }
    department: {
      id: number
      name: string
    }
    division: {
      id: number
      name: string
    }
    position: {
      id: number
      name: string
    }
  }[]
}

export async function getKontrak(payload: GetKontrakById) {
  try {
    if (!payload.contractId || !payload.employeeId) {
      throw new Error('Missing contractId or employeeId')
    }
    let success = false
    let message = null
    let data = null
    const url = `/employees/${payload.employeeId}/contracts/${payload.employeeId}`
    const { data: responseData } = await useAxios(url)
    console.log('responseData', responseData)

    const response = camelizeKeys(responseData) as GetKontrakByIdResponse
    if (isEmpty(response)) {
      success = false
    } else {
      if (response.status === 200) {
        success = true
        data = success ? response.data : null
      }
      message = response.message
    }

    return {
      success,
      message,
      data
    }
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        success: false,
        message: err.response?.data || err.message,
        meta: null,
        data: null,
        links: null
      }
    }
    if (isErrorWithMessage(err)) {
      return {
        success: false,
        message: err.message,
        meta: null,
        data: null,
        links: null
      }
    }
    return {
      success: false,
      message: DEFAULT_ERROR_MESSAGE,
      meta: null,
      data: null,
      links: null
    }
  }
}
