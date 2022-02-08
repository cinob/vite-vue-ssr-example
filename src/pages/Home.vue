<script lang="ts">
export default {
  asyncData ({ store, route }: { store: any, route: RouteLocationNormalized }) {
    const testStore = useTestStore(store)
    return testStore.featchItem(route.fullPath)
  }
}
</script>
<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { RouteLocationNormalized, useRoute } from 'vue-router'
import { useTestStore } from '@/stores/test'
import { ref } from 'vue'

const route = useRoute()
const testStore = useTestStore()

const list = ref(testStore.items[route.fullPath])
</script>

<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite + SSR" />
  <h3>Async Data List</h3>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      {{ item.name }} - {{ item.age }}
    </li>
  </ul>
</template>