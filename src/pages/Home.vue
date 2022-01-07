<script lang="ts">
export default {
  asyncData ({ store, route }: { store: any, route: RouteLocationNormalized }) {
    const ssrStore = useTestStore(store)
    return ssrStore.featchItem(route.fullPath)
  }
}
</script>
<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { RouteLocationNormalized, useRoute } from 'vue-router'
import { useTestStore } from '@/stores/test'
import { computed } from 'vue'

const route = useRoute()
const ssrStore = useTestStore()

const list = computed(() => {
  return ssrStore.items[route.fullPath]
})
</script>

<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <ul>
    <li v-for="(item, index) in list" :key="index">
      {{ item.name }} - {{ item.age }}
    </li>
  </ul>
</template>