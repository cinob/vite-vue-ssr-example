import { createApp } from './main'
const { app, router, store } = createApp()

// @ts-ignore
if (window.__SSR_STATE__) {
  // @ts-ignore
  store.state.value = JSON.parse(window.__SSR_STATE__)
}
router.isReady().then(() => {
  router.beforeResolve(async (to, from) => {
    let diffed = false
    const activated = to.matched.filter((c, i) => {
      return diffed || (diffed = (from.matched[i] !== c))
    })

    if (!activated.length) return false

    await Promise.all(activated.map(c => {
      // @ts-ignore
      if (c.components.default.asyncData) {
        // @ts-ignore
        return c.components.default.asyncData({ store, route: to })
      }
      return true
    }))
  })

  app.mount('#app')
})
