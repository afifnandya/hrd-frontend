import { getCookie, removeCookie, setCookie } from '@/helper/cookie'
import { login as httpLogin, logOut as httpLogout } from '@/api/common/login'
import useToast from '@/composable/useToast'

const toast = useToast()

export function isAuthenticated() {
  const loginCookie = getCookie('login-token')
  return typeof loginCookie === 'string'
    ? loginCookie.length > 0
      ? true
      : false
    : false
}

export async function logIn(email: string, password: string) {
  const { success, data, message } = await httpLogin({
    userName: email,
    password: password
  })
  if (success && data) {
    setCookie('login-token', data)
    return true
  }
  toast.error(message)
  return false
}

export async function logOut() {
  const { success, message } = await httpLogout()
  if (success) {
    removeCookie('login-token')
    return true
  }
  toast.error(message)
  return false
}
