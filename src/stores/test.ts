import { defineStore } from 'pinia'
import { getList } from '@/apis/test'

export const useTestStore = defineStore('test', {
  state: () => {
    return {
      items: {} as any,
    }
  },
  actions: {
    async featchItem(id: string) {
      const { data } = await getList()
      this.items[id] = data
    },
  },
})
