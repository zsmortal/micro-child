import { defineStore, User } from 'pinia'

export const useUserStore = defineStore('user', {
  persist: true,
  state: (): User => ({})
})
