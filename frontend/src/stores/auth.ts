import router from '@/router'
import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null as { id: number; login: string } | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(login: string, password: string) {
      const { data } = await api.post('/authenticate', { login, password })
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },

    async checkAuth() {
      const token = localStorage.getItem('token')

      if (!token) {
        router.push('/login')
        return
      }

      try {
        const { data } = await api.get('/users/me')
        this.user = data
        this.token = token
      } catch (error) {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        router.push('/login')
      }
    },
  },
})
