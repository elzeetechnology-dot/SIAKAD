import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()

  if (!auth.isLogin || !auth.user) {
    return navigateTo('/login')
  }

  if (auth.user.role !== 'siswa') {
    return navigateTo('/')
  }
})
