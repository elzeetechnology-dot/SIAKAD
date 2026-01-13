<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'siswa',
  middleware: ['auth']
})

type Jadwal = {
  id: number
  hari: string
  jam: string
  mapel: string
  guru: string
  ruang: string
}

const jadwalList = ref<Jadwal[]>([
  {
    id: 1,
    hari: 'Senin',
    jam: '07:00 - 08:30',
    mapel: 'Matematika',
    guru: 'Drs. Hendra Wijaya',
    ruang: 'Ruang 101'
  },
  {
    id: 2,
    hari: 'Senin',
    jam: '08:30 - 10:00',
    mapel: 'Bahasa Indonesia',
    guru: 'Siti Rahmawati, S.Pd',
    ruang: 'Ruang 102'
  },
  {
    id: 3,
    hari: 'Selasa',
    jam: '07:00 - 08:30',
    mapel: 'Sejarah',
    guru: 'Ahmad Zainal, S.Pd',
    ruang: 'Ruang 201'
  },
  {
    id: 4,
    hari: 'Rabu',
    jam: '10:00 - 11:30',
    mapel: 'IPA',
    guru: 'Dewi Lestari, S.Pd',
    ruang: 'Lab IPA'
  }
])

const hariAktif = ref('Semua')

const hariList = ['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']

const filteredJadwal = computed(() => {
  if (hariAktif.value === 'Semua') return jadwalList.value
  return jadwalList.value.filter(j => j.hari === hariAktif.value)
})
</script>

<template>
  <section class="page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>Jadwal Pelajaran</h1>
        <p class="subtitle">Kelas X IPA 1</p>
      </div>

      <!-- FILTER -->
      <select v-model="hariAktif" class="filter">
        <option v-for="h in hariList" :key="h" :value="h">
          {{ h }}
        </option>
      </select>
    </div>

    <!-- TABLE -->
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Hari</th>
            <th>Jam</th>
            <th>Mata Pelajaran</th>
            <th>Guru</th>
            <th>Ruang</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(jadwal, index) in filteredJadwal" :key="jadwal.id">
            <td>{{ index + 1 }}</td>
            <td>
              <span class="badge">{{ jadwal.hari }}</span>
            </td>
            <td>{{ jadwal.jam }}</td>
            <td class="name">{{ jadwal.mapel }}</td>
            <td>{{ jadwal.guru }}</td>
            <td>{{ jadwal.ruang }}</td>
          </tr>

          <tr v-if="filteredJadwal.length === 0">
            <td colspan="6" class="empty">
              Jadwal tidak tersedia
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.page {
  padding: 24px;
}

/* ===== HEADER ===== */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.page-header h1 {
  font-size: 22px;
  font-weight: 700;
}

.subtitle {
  font-size: 13px;
  color: #64748b;
}

/* FILTER */
.filter {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: white;
  font-size: 13px;
}

/* ===== TABLE ===== */
.table-wrapper {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.table th {
  background: #f8fafc;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #475569;
}

/* COLUMN ALIGNMENT */
.table th:nth-child(1),
.table td:nth-child(1) {
  width: 60px;
  text-align: center;
}

.table th:nth-child(2),
.table td:nth-child(2) {
  width: 120px;
}

.table th:nth-child(3),
.table td:nth-child(3) {
  width: 160px;
}

.table th:nth-child(4),
.table td:nth-child(4) {
  min-width: 220px;
}

.table th:nth-child(5),
.table td:nth-child(5) {
  min-width: 240px;
}

.table th:nth-child(6),
.table td:nth-child(6) {
  width: 140px;
}

.table tbody tr:hover {
  background: #f9fafb;
}

/* BADGE */
.badge {
  background: #e0f2fe;
  color: #0369a1;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

/* TEXT */
.name {
  font-weight: 600;
}

/* EMPTY */
.empty {
  text-align: center;
  padding: 20px;
  color: #94a3b8;
}
</style>

