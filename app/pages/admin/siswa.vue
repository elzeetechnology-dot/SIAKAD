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

// ✅ AUTH CHECK PALING AMAN
onMounted(() => {
  if (!auth.isLogin) {
    router.push('/login')
  }
})

type Siswa = {
  id: number
  nis: string
  nama: string
  kelas: string
  status: 'Aktif' | 'Nonaktif'
}

const siswaList = ref<Siswa[]>([
  { id: 1, nis: '2024001', nama: 'Ahmad Fauzi', kelas: 'X IPA 1', status: 'Aktif' },
  { id: 2, nis: '2024002', nama: 'Siti Aisyah', kelas: 'X IPA 2', status: 'Aktif' },
  { id: 3, nis: '2024003', nama: 'Budi Santoso', kelas: 'XI IPS 1', status: 'Nonaktif' }
])

const keyword = ref('')

const filteredSiswa = computed(() =>
  siswaList.value.filter(s =>
    s.nama.toLowerCase().includes(keyword.value.toLowerCase()) ||
    s.nis.includes(keyword.value)
  )
)

const totalSiswa = computed(() => siswaList.value.length)
const siswaAktif = computed(() =>
  siswaList.value.filter(s => s.status === 'Aktif').length
)
</script>

<template>
  <section class="page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>Data Siswa</h1>
        <p class="subtitle">Manajemen data siswa sekolah</p>
      </div>

      <button class="btn-primary">+ Tambah Siswa</button>
    </div>

    <!-- SUMMARY CARDS -->
    <div class="stats">
      <div class="card">
        <h3>Total Siswa</h3>
        <p>{{ totalSiswa }}</p>
      </div>

      <div class="card green">
        <h3>Siswa Aktif</h3>
        <p>{{ siswaAktif }}</p>
      </div>

      <div class="card red">
        <h3>Nonaktif</h3>
        <p>{{ totalSiswa - siswaAktif }}</p>
      </div>
    </div>

    <!-- SEARCH -->
    <div class="toolbar">
      <input
        v-model="keyword"
        type="text"
        placeholder="Cari nama / NIS siswa..."
      />
    </div>

    <!-- TABLE -->
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>NIS</th>
            <th>Nama</th>
            <th>Kelas</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(siswa, index) in filteredSiswa"
            :key="siswa.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ siswa.nis }}</td>
            <td class="name">{{ siswa.nama }}</td>
            <td>{{ siswa.kelas }}</td>
            <td>
              <span
                :class="[
                  'badge',
                  siswa.status === 'Aktif'
                    ? 'badge-green'
                    : 'badge-red'
                ]"
              >
                {{ siswa.status }}
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

          <tr v-if="filteredSiswa.length === 0">
            <td colspan="6" class="empty">
              Data siswa tidak ditemukan
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
  outline: none;
}

.toolbar input:focus {
  border-color: #2563eb;
}

/* ===== TABLE WRAPPER ===== */
.table-wrapper {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
}

/* ===== TABLE ===== */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

/* HEADER STYLE */
.table th {
  background: #f8fafc;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #475569;
}

/* ===== COLUMN ALIGNMENT (FIX UTAMA) ===== */

/* NO */
.table th:nth-child(1),
.table td:nth-child(1) {
  text-align: center;
  width: 60px;
}

/* NIS */
.table th:nth-child(2),
.table td:nth-child(2) {
  text-align: left;
  width: 160px;
  font-variant-numeric: tabular-nums;
}

/* NAMA */
.table th:nth-child(3),
.table td:nth-child(3) {
  text-align: left;
  min-width: 260px;
}

/* KELAS */
.table th:nth-child(4),
.table td:nth-child(4) {
  text-align: center;
  width: 140px;
}

/* STATUS */
.table th:nth-child(5),
.table td:nth-child(5) {
  text-align: center;
  width: 120px;
}

/* AKSI */
.table th:last-child,
.table td:last-child {
  text-align: center;
  width: 200px;
}

/* Hover row */
.table tbody tr:hover {
  background: #f9fafb;
}

/* ===== TEXT ===== */
.name {
  font-weight: 600;
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
  cursor: pointer;
}

.btn-primary:hover {
  background: #1d4ed8;
}

/* ===== AKSI ===== */
.aksi {
  white-space: nowrap;
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

.btn-sm.warning {
  background: #facc15;
}

.btn-sm.danger {
  background: #ef4444;
  color: white;
}

/* ===== EMPTY ===== */
.empty {
  text-align: center;
  padding: 20px;
  color: #94a3b8;
}
</style>
