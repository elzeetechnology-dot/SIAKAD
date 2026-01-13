<script setup lang="ts">
definePageMeta({
  layout: 'siswa',
  middleware: ['auth']
})

type Stat = {
  label: string
  value: string | number
  color: string
}

const stats: Stat[] = [
  { label: 'Kelas', value: 'X IPA 1', color: 'blue' },
  { label: 'Rata-rata Nilai', value: 85, color: 'green' },
  { label: 'Total Mapel', value: 12, color: 'purple' },
  { label: 'Semester', value: 'Ganjil', color: 'orange' }
]

type JadwalHariIni = {
  id: number
  jam: string
  mapel: string
  guru: string
}

const jadwalHariIni: JadwalHariIni[] = [
  {
    id: 1,
    jam: '07:00 - 08:30',
    mapel: 'Matematika',
    guru: 'Drs. Hendra Wijaya'
  },
  {
    id: 2,
    jam: '08:30 - 10:00',
    mapel: 'Bahasa Indonesia',
    guru: 'Siti Rahmawati, S.Pd'
  },
  {
    id: 3,
    jam: '10:15 - 11:45',
    mapel: 'Sejarah',
    guru: 'Ahmad Zainal, S.Pd'
  }
]

type NilaiRingkas = {
  id: number
  mapel: string
  nilai: number
}

const nilaiRingkas: NilaiRingkas[] = [
  { id: 1, mapel: 'Matematika', nilai: 88 },
  { id: 2, mapel: 'Bahasa Indonesia', nilai: 82 },
  { id: 3, mapel: 'Sejarah', nilai: 74 }
]
</script>

<template>
  <section class="dashboard">
    <!-- HEADER -->
    <header class="dashboard-header">
      <div>
        <h1>Dashboard Siswa</h1>
        <p class="subtitle">Ringkasan akademik hari ini</p>
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

    <!-- CONTENT GRID -->
    <div class="content-grid">
      <!-- JADWAL -->
      <div class="card">
        <h2>Jadwal Hari Ini</h2>

        <ul class="jadwal-list">
          <li v-for="item in jadwalHariIni" :key="item.id">
            <div class="jam">{{ item.jam }}</div>
            <div class="info">
              <div class="mapel">{{ item.mapel }}</div>
              <div class="guru">{{ item.guru }}</div>
            </div>
          </li>
        </ul>
      </div>

      <!-- NILAI -->
      <div class="card">
        <h2>Ringkasan Nilai</h2>

        <table class="table">
          <thead>
            <tr>
              <th>Mata Pelajaran</th>
              <th>Nilai</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in nilaiRingkas" :key="item.id">
              <td>{{ item.mapel }}</td>
              <td>
                <span
                  :class="[
                    'badge',
                    item.nilai >= 80 ? 'badge-green' : 'badge-yellow'
                  ]"
                >
                  {{ item.nilai }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
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
  font-size: 24px;
  font-weight: 700;
}

.subtitle {
  font-size: 14px;
  color: #64748b;
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
  font-size: 22px;
  font-weight: 700;
}

.stat-label {
  margin-top: 4px;
  font-size: 14px;
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

/* ===== CONTENT ===== */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.card h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

/* ===== JADWAL ===== */
.jadwal-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.jadwal-list li {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #e5e7eb;
}

.jadwal-list li:last-child {
  border-bottom: none;
}

.jam {
  font-weight: 600;
  color: #2563eb;
  min-width: 90px;
}

.mapel {
  font-weight: 500;
}

.guru {
  font-size: 13px;
  color: #64748b;
}

/* ===== TABLE ===== */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
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

.badge-yellow {
  background: #fef9c3;
  color: #854d0e;
}
</style>
