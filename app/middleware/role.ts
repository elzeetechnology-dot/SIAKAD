import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthStore } from '@/stores/auth'
import type { UserRole } from '@/stores/auth'

export default function allowRole(roles: UserRole[]) {
  return defineNuxtRouteMiddleware(() => {
    const auth = useAuthStore()

    if (!auth.isLogin) {
      return navigateTo('/login')
    }

    if (!auth.user || !roles.includes(auth.user.role)) {
      return navigateTo('/')
    }
  })
}
