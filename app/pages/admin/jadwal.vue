<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

definePageMeta({
  layout: 'admin'
})

const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (!auth.isLogin) {
    router.push('/login')
  }
})

/* =====================
   TYPE
===================== */
type Jadwal = {
  id: number
  hari: string
  jam: string
  mapel: string
  guru: string
  kelas: string
  ruang: string
}

/* =====================
   DATA DEMO
===================== */
const jadwalList = ref<Jadwal[]>([
  {
    id: 1,
    hari: 'Senin',
    jam: '07:00 - 08:30',
    mapel: 'Matematika',
    guru: 'Drs. Hendra Wijaya',
    kelas: 'X IPA 1',
    ruang: 'Ruang 101'
  },
  {
    id: 2,
    hari: 'Senin',
    jam: '08:30 - 10:00',
    mapel: 'Bahasa Indonesia',
    guru: 'Siti Rahmawati, S.Pd',
    kelas: 'X IPA 1',
    ruang: 'Ruang 102'
  },
  {
    id: 3,
    hari: 'Selasa',
    jam: '07:00 - 08:30',
    mapel: 'Sejarah',
    guru: 'Ahmad Zainal, S.Pd',
    kelas: 'XI IPS 1',
    ruang: 'Ruang 201'
  }
])

/* =====================
   COMPUTED
===================== */
const totalJadwal = computed(() => jadwalList.value.length)

const totalKelas = computed(() => {
  return new Set(jadwalList.value.map(j => j.kelas)).size
})

const totalGuru = computed(() => {
  return new Set(jadwalList.value.map(j => j.guru)).size
})
</script>

<template>
  <section class="page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>Master Jadwal</h1>
        <p class="subtitle">Pengaturan jadwal pelajaran sekolah</p>
      </div>
      <button class="btn-primary">+ Tambah Jadwal</button>
    </div>

    <!-- SUMMARY -->
    <div class="stats">
      <div class="card">
        <h3>Total Jadwal</h3>
        <p>{{ totalJadwal }}</p>
      </div>

      <div class="card blue">
        <h3>Kelas Aktif</h3>
        <p>{{ totalKelas }}</p>
      </div>

      <div class="card green">
        <h3>Guru Terlibat</h3>
        <p>{{ totalGuru }}</p>
      </div>
    </div>

    <!-- FILTER -->
    <div class="toolbar">
      <select>
        <option>Semua Kelas</option>
        <option>X IPA 1</option>
        <option>XI IPS 1</option>
      </select>

      <select>
        <option>Semua Hari</option>
        <option>Senin</option>
        <option>Selasa</option>
        <option>Rabu</option>
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
            <th>Kelas</th>
            <th>Ruang</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(j, index) in jadwalList" :key="j.id">
            <td>{{ index + 1 }}</td>
            <td>{{ j.hari }}</td>
            <td>{{ j.jam }}</td>
            <td class="name">{{ j.mapel }}</td>
            <td>{{ j.guru }}</td>
            <td>{{ j.kelas }}</td>
            <td>{{ j.ruang }}</td>
            <td class="aksi">
              <div class="aksi-wrap">
                <button class="btn-sm">Edit</button>
                <button class="btn-sm danger">Hapus</button>
              </div>
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

/* HEADER */
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

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.card {
  background: white;
  padding: 16px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
}

.card h3 {
  font-size: 13px;
  color: #64748b;
}

.card p {
  font-size: 24px;
  font-weight: 700;
}

.card.blue p { color: #2563eb; }
.card.green p { color: #16a34a; }

/* TOOLBAR */
.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}

.toolbar select {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

/* TABLE */
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
  color: #475569;
}

/* ALIGN */
.table th:first-child,
.table td:first-child {
  text-align: center;
  width: 60px;
}

.table th:last-child,
.table td:last-child {
  text-align: center;
  width: 160px;
}

/* TEXT */
.name {
  font-weight: 600;
}

/* BUTTON */
.btn-primary {
  background: #2563eb;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}

.aksi-wrap {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.btn-sm {
  min-width: 60px;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 12px;
}

.btn-sm.danger {
  background: #ef4444;
  color: white;
}
</style>
