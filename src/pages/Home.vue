<script lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { useTestStore } from '@/stores/test'
export default {
  asyncData({ store, route }: { store: any; route: RouteLocationNormalized }) {
    const testStore = useTestStore(store)
    return testStore.featchItem(route.fullPath)
  },
}
</script>

<script setup lang="ts">
const route = useRoute()
const testStore = useTestStore()

const list = ref(testStore.items[route.fullPath])
</script>

<template>
  <img alt="Vue logo" src="../assets/logo.png">
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite + SSR" />
  <h3>Async Data List</h3>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      {{ item.name }} - {{ item.age }}
    </li>
  </ul>
</template>
