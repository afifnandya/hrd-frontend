import { getCookie, removeCookie, setCookie } from '@/helper/cookie'
export function isAuthenticated() {
  const loginCookie = getCookie('login-token')
  return typeof loginCookie === 'string'
    ? loginCookie.length > 0
      ? true
      : false
    : false
}

export function logIn(email: string, password: string) {
  setCookie('login-token', email)
}

export function logOut() {
  removeCookie('login-token')
}
