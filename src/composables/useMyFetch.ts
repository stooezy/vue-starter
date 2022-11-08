import { createFetch } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import type { MBase } from '~/core/models'

export const useMyFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
  options: {
    async beforeFetch({ options }) {
      const myToken = localStorage.getItem(import.meta.env.VITE_APP_NAME) || ''
      const requestHeaders: HeadersInit = new Headers()

      if (myToken) {
        requestHeaders.set(import.meta.env.VITE_HEADER_TOKEN, `${myToken}`)
        options.headers = requestHeaders
      }

      return { options }
    },
    afterFetch(ctx) {
      return ctx
    },
    onFetchError(ctx) {
      const response: MBase.IBaseResponse<any> = ctx.data
      const toast = useToast()
      toast.error(response.message)
      return ctx
    },
  },
})
