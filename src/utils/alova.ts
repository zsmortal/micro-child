import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'
import { stringify } from 'qs'

// POST、GET
export const alovaInstance = createAlova({
  baseURL: '/api',
  statesHook: VueHook,
  timeout: 10000,
  requestAdapter: GlobalFetch(),
  beforeRequest: (method) => {
    if (method.config.headers.isFormData) {
      method.config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      method.data = stringify(method.data)
    } else {
      method.config.headers['Content-Type'] = 'application/json;charset=utf-8'
    }
    method.config.headers.token = window.sessionStorage.getItem('token')
  },
  responded: {
    onSuccess: async (response) => {
      const json = await response.json()
      if (json.code !== 1) {
        console.log(json.msg)
        throw new Error(json.message)
      }
      return json.result
    },
    onError: (err) => {
      throw new Error(err)
    }
  }
})
