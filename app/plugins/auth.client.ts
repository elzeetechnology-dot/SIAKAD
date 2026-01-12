import { useAuthStore } from '../stores/auth'

export default defineNuxtPlugin(() => {
  const auth = useAuthStore()
  const router = useRouter()

  // restore login saat refresh
  auth.restore()

  router.beforeEach((to) => {
    if (!auth.isLogin) return

    // cegah buka login kalau sudah login
    if (to.path === '/login') {
      if (auth.user?.role === 'admin') return '/admin'
      if (auth.user?.role === 'guru') return '/guru'
      if (auth.user?.role === 'siswa') return '/siswa'
    }
  })
})
