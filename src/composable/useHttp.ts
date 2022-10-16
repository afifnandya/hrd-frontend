import { createFetch } from '@vueuse/core'

const useHttp = createFetch({
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
