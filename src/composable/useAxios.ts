import NProgress from 'nprogress'
import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://projek.alwaysdata.net/api'
  // timeout: 1000,
})

instance.interceptors.request.use(
  function (config) {
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
