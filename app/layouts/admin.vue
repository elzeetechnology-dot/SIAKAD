<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const menus = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Data Siswa', to: '/admin/siswa' },
  { label: 'Data Guru', to: '/admin/guru' },
  { label: 'Mata Pelajaran', to: '/admin/mapel' },
  { label: 'Kelas', to: '/admin/kelas' },
  { label: 'Absensi', to: '/admin/absensi' },
  { label: 'Rapor', to: '/admin/rapor' },
  { label: 'Jadwal', to: '/admin/jadwal' },
  { label: 'Wali Kelas', to: '/admin/wali-kelas' },
  { label: 'Pengumuman', to: '/admin/pengumuman' },

]

const logout = async () => {
  auth.logout()
  await navigateTo('/login')
}
</script>

<template>
  <div class="admin-layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="brand">
        <h2>SIAKAD</h2>
        <span>Admin Panel</span>
      </div>

      <nav class="menu">
        <NuxtLink
          v-for="menu in menus"
          :key="menu.to"
          :to="menu.to"
          class="menu-item"
          active-class="active"
        >
          {{ menu.label }}
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <button class="logout" @click="logout">
          Logout
        </button>
      </div>
    </aside>

    <!-- MAIN -->
    <div class="main">
      <!-- TOPBAR -->
      <header class="topbar">
        <div>
          <h1>Admin Dashboard</h1>
          <p class="subtitle">Sistem Akademik Sekolah</p>
        </div>

        <div class="user">
          <div class="avatar">
            {{ auth.user?.name?.charAt(0) || 'A' }}
          </div>
          <div class="info">
            <div class="name">{{ auth.user?.name }}</div>
            <div class="role">Administrator</div>
          </div>
        </div>
      </header>

      <!-- PAGE CONTENT -->
      <main class="content">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* ===== LAYOUT ===== */
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f1f5f9;
}

/* ===== SIDEBAR ===== */
.sidebar {
  width: 240px;
  background: linear-gradient(180deg, #0f172a, #1e293b);
  color: white;
  display: flex;
  flex-direction: column;
}

.brand {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.brand h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.brand span {
  font-size: 12px;
  color: #94a3b8;
}

.menu {
  padding: 16px;
  flex: 1;
}

.menu-item {
  display: block;
  padding: 10px 14px;
  margin-bottom: 6px;
  border-radius: 8px;
  color: #e2e8f0;
  text-decoration: none;
  transition: all 0.2s;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.menu-item.active {
  background: #2563eb;
  color: white;
  font-weight: 600;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout {
  width: 100%;
  padding: 10px;
  background: #ef4444;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

.logout:hover {
  background: #dc2626;
}

/* ===== MAIN ===== */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* ===== TOPBAR ===== */
.topbar {
  background: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}

.topbar h1 {
  font-size: 20px;
  margin: 0;
  font-weight: 700;
}

.subtitle {
  font-size: 13px;
  color: #64748b;
}

/* ===== USER ===== */
.user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.info .name {
  font-size: 14px;
  font-weight: 600;
}

.info .role {
  font-size: 12px;
  color: #64748b;
}

/* ===== CONTENT ===== */
.content {
  padding: 24px;
}
</style>
