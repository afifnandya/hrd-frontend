import { createFetch } from '@vueuse/core'

const useHttp = createFetch({
  // baseUrl: 'http://localhost:3333',
  // baseUrl: 'https://33d9-158-140-163-12.ap.ngrok.io/api',
  baseUrl: 'https://projek.alwaysdata.net/api',
  options: {
    afterFetch(ctx) {
      ctx.data = JSON.parse(ctx.data)
      return ctx
    }
  }
  // fetchOptions: {
  //   mode: 'cors'
  // }
})
export default useHttp
