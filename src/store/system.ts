import { defineStore, System } from 'pinia'

export const useSystemStore = defineStore('system', {
  persist: true,
  state: (): System => ({})
})
