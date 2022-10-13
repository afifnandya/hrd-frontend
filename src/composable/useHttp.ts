import { createFetch } from '@vueuse/core'

const useHttp = createFetch({
  baseUrl: 'http://localhost:3333',
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
