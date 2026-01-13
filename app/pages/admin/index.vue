<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

type Stat = {
  label: string
  value: number
  color: string
}

const stats: Stat[] = [
  { label: 'Total Siswa', value: 342, color: 'blue' },
  { label: 'Total Guru', value: 28, color: 'green' },
  { label: 'Mata Pelajaran', value: 16, color: 'purple' },
  { label: 'Kelas Aktif', value: 12, color: 'orange' }
]

type Siswa = {
  id: number
  nama: string
  kelas: string
  status: 'Aktif' | 'Nonaktif'
}

const siswaTerbaru: Siswa[] = [
  { id: 1, nama: 'Ahmad Fauzi', kelas: 'X IPA 1', status: 'Aktif' },
  { id: 2, nama: 'Siti Aisyah', kelas: 'X IPA 2', status: 'Aktif' },
  { id: 3, nama: 'Budi Santoso', kelas: 'XI IPS 1', status: 'Nonaktif' }
]
</script>

<template>
  <section class="dashboard">
    <!-- HEADER -->
    <header class="dashboard-header">
      <div>
        <h1>Dashboard Admin</h1>
        <p class="subtitle">Ringkasan sistem akademik sekolah</p>
      </div>
    </header>

    <!-- STAT CARDS -->
    <div class="stats-grid">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="stat-card"
        :class="stat.color"
      >
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-card">
      <h2>Siswa Terbaru</h2>

      <table class="table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="siswa in siswaTerbaru" :key="siswa.id">
            <td>{{ siswa.nama }}</td>
            <td>{{ siswa.kelas }}</td>
            <td>
              <span
                :class="[
                  'badge',
                  siswa.status === 'Aktif' ? 'badge-green' : 'badge-red'
                ]"
              >
                {{ siswa.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
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
  font-size: 24px;
  font-weight: 700;
}

.subtitle {
  color: #64748b;
  font-size: 14px;
}

/* ===== STAT CARDS ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
}

.stat-label {
  font-size: 14px;
  margin-top: 4px;
  color: #475569;
}

.stat-card.blue {
  border-left: 4px solid #2563eb;
}

.stat-card.green {
  border-left: 4px solid #16a34a;
}

.stat-card.purple {
  border-left: 4px solid #7c3aed;
}

.stat-card.orange {
  border-left: 4px solid #ea580c;
}

/* ===== TABLE ===== */
.table-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.table-card h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}

.table th {
  background: #f9fafb;
  font-weight: 600;
}

/* ===== BADGE ===== */
.badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
}

.badge-green {
  background: #dcfce7;
  color: #166534;
}

.badge-red {
  background: #fee2e2;
  color: #991b1b;
}
</style>
