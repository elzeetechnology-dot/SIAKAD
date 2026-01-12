import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()

  if (!auth.isLogin || !auth.user) return

  if (auth.user.role === 'admin') return navigateTo('/admin')
  if (auth.user.role === 'guru') return navigateTo('/guru')
  if (auth.user.role === 'siswa') return navigateTo('/siswa')
})
