<script setup lang="ts">
import auth from '@/middleware/auth'
import allowRole from '@/middleware/role'

definePageMeta({
  middleware: [
    auth,
    allowRole(['admin'])
  ],
  layout: 'admin'
})
</script>

<template>
  <section class="dashboard">
    <header class="dashboard-header">
      <div>
        <h1>Dashboard Admin</h1>
        <p>Ringkasan data akademik sekolah</p>
      </div>
    </header>

    <!-- STAT CARDS -->
    <div class="stats">
      <div class="card">
        <h3>Total Siswa</h3>
        <strong>432</strong>
        <span>Aktif</span>
      </div>

      <div class="card">
        <h3>Total Guru</h3>
        <strong>38</strong>
        <span>Pengajar</span>
      </div>

      <div class="card">
        <h3>Mata Pelajaran</h3>
        <strong>24</strong>
        <span>Terdaftar</span>
      </div>

      <div class="card highlight">
        <h3>Tahun Ajaran</h3>
        <strong>2024 / 2025</strong>
        <span>Berjalan</span>
      </div>
    </div>

    <!-- QUICK ACTION -->
    <div class="actions">
      <h2>Aksi Cepat</h2>

      <div class="action-grid">
        <NuxtLink to="/admin/siswa" class="action">
          📚
          <span>Kelola Siswa</span>
        </NuxtLink>

        <NuxtLink to="/admin/guru" class="action">
          👨‍🏫
          <span>Kelola Guru</span>
        </NuxtLink>

        <NuxtLink to="/admin/mapel" class="action">
          🧠
          <span>Mata Pelajaran</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  padding: 24px;
}

.dashboard-header {
  margin-bottom: 24px;
}

.dashboard-header h1 {
  font-size: 26px;
  font-weight: 700;
}

.dashboard-header p {
  color: #64748b;
  margin-top: 4px;
}

/* STAT CARDS */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.card {
  background: #ffffff;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.card h3 {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;
}

.card strong {
  font-size: 28px;
  font-weight: 700;
  display: block;
}

.card span {
  font-size: 12px;
  color: #94a3b8;
}

.card.highlight {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: white;
}

.card.highlight h3,
.card.highlight span {
  color: #e0e7ff;
}

/* QUICK ACTION */
.actions h2 {
  font-size: 18px;
  margin-bottom: 12px;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
}

.action {
  background: #f8fafc;
  border-radius: 12px;
  padding: 18px;
  text-align: center;
  font-size: 14px;
  text-decoration: none;
  color: #0f172a;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.2s ease;
}

.action:hover {
  background: #e0e7ff;
  transform: translateY(-2px);
}

.action span {
  font-weight: 600;
}
</style>
