import useAxios, { isAxiosError } from '@/composable/useAxios'
import { NETWORK_ERROR_MESSAGE } from '@/constants'
import isErrorWithMessage from '@/helper/isErrorWithMessage'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { isEmpty } from 'lodash-es'
import qs from 'qs'

export interface GetReminderKontrakResponse {
  data: ReminderKontrakAttributes[]
  links: {
    first: string | null
    last: string | null
    prev: null | string
    next: string | null
  }
  meta: Meta
}

export type ReminderKontrakAttributes = {
  employeeNik: string
  employeeName: string
  employeeGrade: string
  employeeActiveStatus: EmployeeActiveStatus
  companyName: CompanyName
  departmentName: string
  divisionName: string
  positionName: string
  startDate: string
  endDate: string
  dayToEnd: number
  type: Type
  duration: number
  status: EmployeeActiveStatus
}

export enum CompanyName {
  Baoshuo = 'BAOSHUO',
  Beishi = 'BEISHI'
}

export enum EmployeeActiveStatus {
  Aktif = 'Aktif',
  TidakAktif = 'Tidak Aktif'
}

export enum Type {
  Pkwt1 = 'PKWT 1',
  Pkwt2 = 'PKWT 2'
}

export interface Meta {
  currentPage: number
  from: number
  lastPage: number
  links: {
    url: null | string
    label: string
    active: boolean
  }[]
  path: string
  perPage: number
  to: number
  total: number
}

type Param = Partial<ReminderKontrakAttributes> & {
  limit?: number
  page?: number
}

export async function getReminderKontrak(param?: Param) {
  const defaultErrorMessage =
    'Oops, something went wrong, failed get reminder kontrak'
  try {
    const filter = qs.stringify(decamelizeKeys(param), { skipNulls: true })
    const { data: response } = await useAxios({
      url: `/employment-contracts/reminder?${filter}`
    })
    const responseData = camelizeKeys(response) as GetReminderKontrakResponse
    if (isEmpty(responseData)) {
      return {
        success: false,
        message: NETWORK_ERROR_MESSAGE,
        data: null
      }
    }
    if (isEmpty(responseData.data)) {
      return {
        success: false,
        message: defaultErrorMessage,
        data: null
      }
    }
    return {
      success: true,
      data: responseData,
      message: ''
    }
  } catch (err) {
    if (isAxiosError(err) || isErrorWithMessage(err)) {
      return {
        success: false,
        message: err.message,
        data: null
      }
    }
    return {
      success: false,
      message: defaultErrorMessage,
      data: null
    }
  }
}
