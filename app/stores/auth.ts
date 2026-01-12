import { defineStore } from 'pinia'

export type UserRole = 'admin' | 'guru' | 'siswa'

interface User {
  name: string
  role: UserRole
}

interface AuthState {
  isLogin: boolean
  user: User | null
}

const STORAGE_KEY = 'auth'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isLogin: false,
    user: null
  }),

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    isGuru: (state) => state.user?.role === 'guru',
    isSiswa: (state) => state.user?.role === 'siswa'
  },

  actions: {
    login(role: UserRole) {
      this.isLogin = true
      this.user = {
        name: 'Demo User',
        role
      }

      this.persist()
    },

    logout() {
      this.isLogin = false
      this.user = null
      localStorage.removeItem(STORAGE_KEY)
    },

    restore() {
      if (import.meta.server) return

      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return

      try {
        const data: AuthState = JSON.parse(saved)
        this.isLogin = data.isLogin
        this.user = data.user
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    },

    persist() {
      if (import.meta.server) return

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          isLogin: this.isLogin,
          user: this.user
        })
      )
    }
  }
})
