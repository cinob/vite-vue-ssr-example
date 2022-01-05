import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router'

const routes = [{
  path: '/',
  component: () => import('@/pages/Home.vue')
}, {
  path: '/about',
  component: () => import('@/pages/About.vue')
}]

export function createRouter () {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
