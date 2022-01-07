import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router'
// import { useHead } from '@vueuse/head'

const routes = [{
  path: '/',
  component: () => import('@/pages/Home.vue'),
  meta: {
    title: '这是首页'
  }
}, {
  path: '/about',
  component: () => import('@/pages/About.vue'),
  meta: {
    title: '这是about页'
  }
}]

export function createRouter () {
  const router = _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })

  // router.afterEach((to) => {
  //   useHead({
  //     title: (to.meta.title) as string ?? 'vite-vue-ssr'
  //   })
  // })

  return router
}
