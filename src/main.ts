import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from '@/router'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'

export function createApp () {
  const app = createSSRApp(App)
  const router = createRouter()
  const head = createHead()
  const store = createPinia()
  app
    .use(router)
    .use(head)
    .use(store)
  return { app, router, store }
}
