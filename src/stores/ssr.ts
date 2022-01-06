import { defineStore } from 'pinia'
import { getList } from '@/apis/test'

export const useSsrStore = defineStore('ssr', {
  state: () => {
    return {
      items: []
    }
  },
  actions: {
    async featchItem () {
      const { data } = await getList()
      this.items = data
    }
  }
})
