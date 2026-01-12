<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()

// ✅ MENU STATIS (SESUAI PERMINTAAN)
const menus = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Data Siswa', to: '/admin/siswa' },
  { label: 'Data Guru', to: '/admin/guru' },
  { label: 'Mata Pelajaran', to: '/admin/mapel' }
]

const logout = async () => {
  auth.logout()
  await navigateTo('/login')
}
</script>

<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <h3>SIAKAD</h3>

      <ul>
        <li v-for="menu in menus" :key="menu.to">
          <NuxtLink :to="menu.to">
            {{ menu.label }}
          </NuxtLink>
        </li>
      </ul>

      <button class="logout" @click="logout">
        Logout
      </button>
    </aside>

    <main class="content">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: #1e293b;
  color: white;
  padding: 16px;
}

.sidebar a {
  color: white;
  display: block;
  margin: 8px 0;
  text-decoration: none;
}

.sidebar a.router-link-active {
  font-weight: bold;
}

.logout {
  margin-top: 16px;
  width: 100%;
}

.content {
  flex: 1;
  padding: 24px;
  background: #f8fafc;
}
</style>
