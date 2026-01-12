<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const menus = [
  { label: 'Jadwal Pelajaran', to: '/siswa/jadwal' },
  { label: 'Nilai Rapor', to: '/siswa/nilai' }
]

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <h3 class="title">SIAKAD</h3>
      <p class="role">Siswa</p>

      <ul class="menu">
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
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: #0f172a;
  color: #ffffff;
  padding: 16px;
}

.title {
  margin-bottom: 4px;
}

.role {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 16px;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  margin-bottom: 8px;
}

.menu a {
  color: #ffffff;
  text-decoration: none;
}

.menu a.router-link-active {
  font-weight: bold;
  color: #38bdf8;
}

.logout {
  margin-top: 24px;
  width: 100%;
  padding: 8px;
  border: none;
  background: #ef4444;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.content {
  flex: 1;
  padding: 24px;
  background: #f8fafc;
}
</style>
