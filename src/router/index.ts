import { RouteRecordRaw, createRouter, createWebHistory, RouterOptions } from 'vue-router'
import routers from '~pages'

const routes: Array<RouteRecordRaw> = [...routers]

export const routerFun = (name: string) => {
  const router = createRouter({
    history: createWebHistory(name),
    routes,
    scrollBehavior(to, from) {
      if (to.path !== from.path) {
        return { top: 0 }
      }
    }
  } as RouterOptions)

  const realBaseRoute = `/${name}`

  router.beforeEach((_to, _from, next) => {
    if (typeof window.history.state?.current === 'string') {
      window.history.state.current = window.history.state.current.replace(new RegExp(realBaseRoute, 'g'), '')
    }
    next()
  })

  router.afterEach(() => {
    if (typeof window.history.state === 'object') {
      window.history.state.current = realBaseRoute + (window.history.state.current || '')
    }
  })

  return router
}
