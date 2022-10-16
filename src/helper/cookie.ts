import Cookies, { CookieAttributes } from 'js-cookie'

export function setCookie(name: string, val: any) {
  Cookies.set(name, val, {
    expires: 3
  })
}

export function removeCookie(name: string) {
  Cookies.remove(name)
}

export function getCookie(name: string) {
  return Cookies.get(name)
}
