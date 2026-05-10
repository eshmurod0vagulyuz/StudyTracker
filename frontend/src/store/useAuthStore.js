import { create } from 'zustand'
import { authAPI } from '../api/endpoints'

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null })
    try {
      const { data } = await authAPI.login(credentials)
      localStorage.setItem('access_token', data.data.access)
      localStorage.setItem('refresh_token', data.data.refresh)
      set({ user: data.data.user, isAuthenticated: true, loading: false })
      return true
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.detail || 'Login failed'
      set({ error: msg, loading: false })
      return false
    }
  },

  register: async (credentials) => {
    set({ loading: true, error: null })
    try {
      const { data } = await authAPI.register(credentials)
      localStorage.setItem('access_token', data.data.access)
      localStorage.setItem('refresh_token', data.data.refresh)
      set({ user: data.data.user, isAuthenticated: true, loading: false })
      return true
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.detail || 'Register failed'
      set({ error: msg, loading: false })
      return false
    }
  },

  logout: async () => {
    try {
      const refresh = localStorage.getItem('refresh_token')
      if (refresh) await authAPI.logout(refresh)
    } catch {}
    localStorage.clear()
    set({ user: null, isAuthenticated: false })
  },

  fetchMe: async () => {
    try {
      const { data } = await authAPI.me()
      set({ user: data })
    } catch (err) {
      // Token muddati tugagan bo'lsa logout qil
      if (err.response?.status === 401) {
        localStorage.clear()
        set({ user: null, isAuthenticated: false })
      }
    }
  },

  clearError: () => set({ error: null }),
}))

export default useAuthStore
