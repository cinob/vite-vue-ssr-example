<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { ref } from 'vue'
const list = ref([] as any[])

function asyncData ({ store, route }) {

}
defineExpose({
  asyncData
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