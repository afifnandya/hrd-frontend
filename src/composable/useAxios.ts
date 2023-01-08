import NProgress from 'nprogress'
import axios, { AxiosError } from 'axios'
import { getCookie } from '@/helper/cookie'
import { isNil, omitBy } from 'lodash-es'
import { API_BASE_URL } from '@/constants'

function setDefaultHeaders() {
  const token = getCookie('login-token')
  const authHeader = token?.length
    ? {
        Authorization: 'Bearer ' + token
      }
    : null
  const langHeader = {
    'Accept-Language': getCookie('selected-lang')
  }
  return omitBy({ ...authHeader, ...langHeader }, isNil)
}

const instance = axios.create({
  // baseURL: 'http://192.168.1.13:8000/api'
  baseURL: API_BASE_URL
  // headers: omitBy(setDefaultHeaders(), isNil)
  // timeout: 1000,
})

instance.interceptors.request.use(
  function (config) {
    config.headers = setDefaultHeaders()
    NProgress.start()
    // Do something before request is sent
    return config
  },
  function (error) {
    NProgress.done()
    Promise.reject(error)
  }
)
instance.interceptors.response.use(
  function (response) {
    NProgress.done()
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response
  },
  function (error: AxiosError) {
    NProgress.done()
    if (error.response?.status == 401) {
      window.location.href = '/login'
      return
    }
    return Promise.reject(error)
  }
)
export const isAxiosError = axios.isAxiosError

export default instance
