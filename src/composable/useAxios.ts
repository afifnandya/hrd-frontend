import NProgress from 'nprogress'
import axios from 'axios'
import { getCookie } from '@/helper/cookie'
import { isNil, omitBy } from 'lodash-es'

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
<<<<<<<<< Temporary merge branch 1
  baseURL: API_BASE_URL
  // headers: omitBy(setDefaultHeaders(), isNil)
=========
  baseURL: 'https://projek.alwaysdata.net/api'
  // headers: omitBy(setDefaultHeaders(), isNil),
>>>>>>>>> Temporary merge branch 2
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
  function (error) {
    NProgress.done()
    return Promise.reject(error)
  }
)
export const isAxiosError = axios.isAxiosError

export default instance
