import { createApp } from './main'
const { app, router, store } = createApp()

// @ts-expect-error type
if (window.__SSR_STATE__) {
  // @ts-expect-error type
  store.state.value = JSON.parse(window.__SSR_STATE__)
}
router.isReady().then(() => {
  router.beforeResolve(async (to, from) => {
    let diffed = false
    const activated = to.matched.filter((c, i) => {
      return diffed || (diffed = (from.matched[i] !== c))
    })

    if (!activated.length)
      return false

    await Promise.all(activated.map((c) => {
      // @ts-expect-error type
      if (c.components.default.asyncData) {
        // @ts-expect-error type
        return c.components.default.asyncData({ store, route: to })
      }
      return true
    }))
  })

  app.mount('#app')
})
