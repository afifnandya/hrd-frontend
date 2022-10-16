import { createFetch } from '@vueuse/core'

const useHttp = createFetch({
  baseUrl: 'https://my-json-server.typicode.com/afifnandya/dummy-json',
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
