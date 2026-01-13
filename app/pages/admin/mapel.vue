<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (!auth.isLogin) {
    router.push('/login')
  }
})

type Mapel = {
  id: number
  kode: string
  nama: string
  guru: string
  kelas: string
  status: 'Aktif' | 'Nonaktif'
}

const mapelList = ref<Mapel[]>([
  {
    id: 1,
    kode: 'MAT-10',
    nama: 'Matematika',
    guru: 'Drs. Hendra Wijaya',
    kelas: 'X IPA',
    status: 'Aktif'
  },
  {
    id: 2,
    kode: 'BIN-10',
    nama: 'Bahasa Indonesia',
    guru: 'Siti Rahmawati, S.Pd',
    kelas: 'X IPA',
    status: 'Aktif'
  },
  {
    id: 3,
    kode: 'SEJ-11',
    nama: 'Sejarah',
    guru: 'Ahmad Zainal, S.Pd',
    kelas: 'XI IPS',
    status: 'Nonaktif'
  }
])

const keyword = ref('')

const filteredMapel = computed(() =>
  mapelList.value.filter(m =>
    m.nama.toLowerCase().includes(keyword.value.toLowerCase()) ||
    m.kode.toLowerCase().includes(keyword.value.toLowerCase()) ||
    m.guru.toLowerCase().includes(keyword.value.toLowerCase())
  )
)

const totalMapel = computed(() => mapelList.value.length)
const mapelAktif = computed(
  () => mapelList.value.filter(m => m.status === 'Aktif').length
)
</script>

<template>
  <section class="page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>Mata Pelajaran</h1>
        <p class="subtitle">Manajemen mata pelajaran sekolah</p>
      </div>

      <button class="btn-primary">+ Tambah Mapel</button>
    </div>

    <!-- SUMMARY CARDS -->
    <div class="stats">
      <div class="card">
        <h3>Total Mapel</h3>
        <p>{{ totalMapel }}</p>
      </div>

      <div class="card green">
        <h3>Mapel Aktif</h3>
        <p>{{ mapelAktif }}</p>
      </div>

      <div class="card red">
        <h3>Nonaktif</h3>
        <p>{{ totalMapel - mapelAktif }}</p>
      </div>
    </div>

    <!-- SEARCH -->
    <div class="toolbar">
      <input
        v-model="keyword"
        type="text"
        placeholder="Cari kode / nama / guru..."
      />
    </div>

    <!-- TABLE -->
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Kode</th>
            <th>Nama Mapel</th>
            <th>Guru</th>
            <th>Kelas</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(mapel, index) in filteredMapel"
            :key="mapel.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ mapel.kode }}</td>
            <td class="name">{{ mapel.nama }}</td>
            <td>{{ mapel.guru }}</td>
            <td>{{ mapel.kelas }}</td>
            <td>
              <span
                :class="[
                  'badge',
                  mapel.status === 'Aktif'
                    ? 'badge-green'
                    : 'badge-red'
                ]"
              >
                {{ mapel.status }}
              </span>
            </td>
            <td class="aksi">
              <div class="aksi-wrap">
                <button class="btn-sm">Detail</button>
                <button class="btn-sm warning">Edit</button>
                <button class="btn-sm danger">Hapus</button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredMapel.length === 0">
            <td colspan="7" class="empty">
              Data mata pelajaran tidak ditemukan
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

/* ===== STATS ===== */
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
  margin-bottom: 6px;
}

.card p {
  font-size: 24px;
  font-weight: 700;
}

.card.green p {
  color: #16a34a;
}

.card.red p {
  color: #dc2626;
}

/* ===== TOOLBAR ===== */
.toolbar {
  margin-bottom: 14px;
}

.toolbar input {
  width: 280px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.toolbar input:focus {
  border-color: #2563eb;
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

/* ===== COLUMN ALIGNMENT ===== */
.table th:nth-child(1),
.table td:nth-child(1) {
  text-align: center;
  width: 60px;
}

.table th:nth-child(2),
.table td:nth-child(2) {
  width: 120px;
}

.table th:nth-child(3),
.table td:nth-child(3) {
  min-width: 240px;
}

.table th:nth-child(4),
.table td:nth-child(4) {
  min-width: 220px;
}

.table th:nth-child(5),
.table td:nth-child(5) {
  text-align: center;
  width: 120px;
}

.table th:nth-child(6),
.table td:nth-child(6) {
  text-align: center;
  width: 120px;
}

.table th:last-child,
.table td:last-child {
  text-align: center;
  width: 200px;
}

.table tbody tr:hover {
  background: #f9fafb;
}

/* ===== BADGE ===== */
.badge {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.badge-green {
  background: #dcfce7;
  color: #166534;
}

.badge-red {
  background: #fee2e2;
  color: #991b1b;
}

/* ===== BUTTON ===== */
.btn-primary {
  background: #2563eb;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
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
  font-size: 12px;
}

.btn-sm.warning {
  background: #facc15;
}

.btn-sm.danger {
  background: #ef4444;
  color: white;
}

.empty {
  text-align: center;
  padding: 20px;
  color: #94a3b8;
}
</style>

