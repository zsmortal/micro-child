import { qiankunWindow, renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'
import { createApp, App as AppInstance } from 'vue'
import App from './App.vue'
import { routerFun } from './router'
import { Router } from 'vue-router'
import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'
import 'uno.css'
import '@unocss/reset/tailwind-compat.css'

let app: AppInstance | null = null
let router: Router | null = null

if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  renderWithQiankun({
    bootstrap: () => {
      console.log('bootstrap')
    },
    mount: (props: ObjectType) => {
      app = createApp(App)
      router = routerFun(`${props.name}`)
      app
        .use(router)
        .use(createPinia().use(persistedstate))
        .mount(props.container.querySelector(`#${props.name}`))
      console.log('mount')
    },
    unmount: () => {
      app?.unmount()
      app = null
      router = null
      console.log('unmount')
    },
    update: () => {
      console.log('update')
    }
  })
  console.log(qiankunWindow.__INJECTED_PUBLIC_PATH_BY_QIANKUN__, '如果子应用被使用则在这里')
} else {
  app = createApp(App)
  router = routerFun(import.meta.env.VITE_APP_NAME)
  app
    .use(router)
    .use(createPinia().use(persistedstate))
    .mount(`#${import.meta.env.VITE_APP_NODEID}`)
}
