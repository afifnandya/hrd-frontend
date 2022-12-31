import useAxios, { isAxiosError } from '@/composable/useAxios'
import isErrorWithMessage from '@/helper/isErrorWithMessage'

type ResponseLogin = {
  status?: number
  errors?: null | Record<string, string>
  message: string
  data?: {
    token: string
  }
}

export async function login({
  userName,
  password
}: {
  userName: string
  password: string
}) {
  const defaultErrorMessage = 'Oops, something went wrong, login failed'
  try {
    const payload = {
      username: userName,
      password
    }
    const { status, statusText, data } = await useAxios({
      url: '/auth/login',
      method: 'POST',
      data: payload
    })
    const responseData = data as ResponseLogin

    if (status !== 200 || typeof responseData.data?.token !== 'string') {
      return {
        success: false,
        message: responseData.message || defaultErrorMessage,
        data: null
      }
    }

    return {
      success: true,
      message: '',
      data: responseData.data.token
    }
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        success: false,
        message: err.response?.data.message,
        data: null
      }
    }
    if (isErrorWithMessage(err)) {
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

export async function logOut() {
  const defaultErrorMessage = 'Oops, something went wrong, failed logout'
  try {
    const { status, statusText, data } = await useAxios({
      url: '/auth/logout',
      method: 'POST'
    })

    if (status !== 200) {
      return {
        success: false,
        message: defaultErrorMessage,
        data: null
      }
    }
    return {
      success: true,
      message: '',
      data: null
    }
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        success: false,
        message: err.response?.data?.message || defaultErrorMessage,
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
