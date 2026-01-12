<script setup lang="ts">
import guest from '@/middleware/guest'
import { useRouter } from 'vue-router'
import { useAuthStore, type UserRole } from '../stores/auth'

definePageMeta({
  middleware: guest
})

const auth = useAuthStore()
const router = useRouter()

function loginAs(role: UserRole) {
  auth.login(role)

  if (role === 'admin') router.push('/admin')
  if (role === 'guru') router.push('/guru')
  if (role === 'siswa') router.push('/siswa')
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h1>Sistem Akademik Sekolah</h1>
      <p class="subtitle">Demo Login Berbasis Role</p>

      <div class="role-buttons">
        <button class="btn admin" @click="loginAs('admin')">
          <span class="icon">🛠️</span>
          <span>
            <strong>Admin</strong>
            <small>Kelola data sekolah</small>
          </span>
        </button>

        <button class="btn guru" @click="loginAs('guru')">
          <span class="icon">📘</span>
          <span>
            <strong>Guru</strong>
            <small>Input nilai & jadwal</small>
          </span>
        </button>

        <button class="btn siswa" @click="loginAs('siswa')">
          <span class="icon">🎓</span>
          <span>
            <strong>Siswa</strong>
            <small>Lihat nilai & jadwal</small>
          </span>
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
}

.login-card {
  width: 360px;
  background: #ffffff;
  padding: 32px 28px;
  border-radius: 18px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.18);
  text-align: center;
}

.login-card h1 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 24px;
}

.role-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.icon {
  font-size: 22px;
  width: 32px;
  text-align: center;
}

.btn strong {
  display: block;
  font-size: 14px;
}

.btn small {
  font-size: 12px;
  color: #e5e7eb;
}

.btn.admin {
  background: #1e293b;
  color: white;
}

.btn.guru {
  background: #2563eb;
  color: white;
}

.btn.siswa {
  background: #16a34a;
  color: white;
}

.hint {
  margin-top: 18px;
  font-size: 12px;
  color: #94a3b8;
}

</style>
