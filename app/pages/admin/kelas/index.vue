<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

definePageMeta({
  layout: 'admin'
})

const auth = useAuthStore()
const router = useRouter()

// ✅ AUTH CHECK
onMounted(() => {
  if (!auth.isLogin) {
    router.push('/login')
  }
})

type Kelas = {
  id: number
  nama: string
  tingkat: 'X' | 'XI' | 'XII'
  jurusan: string
  wali: string
  jumlahSiswa: number
  status: 'Aktif' | 'Nonaktif'
}

const kelasList = ref<Kelas[]>([
  {
    id: 1,
    nama: 'X IPA 1',
    tingkat: 'X',
    jurusan: 'IPA',
    wali: 'Drs. Hendra Wijaya',
    jumlahSiswa: 32,
    status: 'Aktif'
  },
  {
    id: 2,
    nama: 'X IPA 2',
    tingkat: 'X',
    jurusan: 'IPA',
    wali: 'Siti Rahmawati, S.Pd',
    jumlahSiswa: 30,
    status: 'Aktif'
  },
  {
    id: 3,
    nama: 'XI IPS 1',
    tingkat: 'XI',
    jurusan: 'IPS',
    wali: 'Ahmad Zainal, S.Pd',
    jumlahSiswa: 28,
    status: 'Nonaktif'
  }
])

const keyword = ref('')

const filteredKelas = computed(() =>
  kelasList.value.filter(k =>
    k.nama.toLowerCase().includes(keyword.value.toLowerCase()) ||
    k.wali.toLowerCase().includes(keyword.value.toLowerCase())
  )
)

const totalKelas = computed(() => kelasList.value.length)
const kelasAktif = computed(() =>
  kelasList.value.filter(k => k.status === 'Aktif').length
)
</script>

<template>
  <section class="page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>Data Kelas</h1>
        <p class="subtitle">Manajemen kelas dan wali kelas</p>
      </div>

      <button class="btn-primary">+ Tambah Kelas</button>
    </div>

    <!-- SUMMARY CARDS -->
    <div class="stats">
      <div class="card">
        <h3>Total Kelas</h3>
        <p>{{ totalKelas }}</p>
      </div>

      <div class="card green">
        <h3>Kelas Aktif</h3>
        <p>{{ kelasAktif }}</p>
      </div>

      <div class="card red">
        <h3>Nonaktif</h3>
        <p>{{ totalKelas - kelasAktif }}</p>
      </div>
    </div>

    <!-- SEARCH -->
    <div class="toolbar">
      <input
        v-model="keyword"
        type="text"
        placeholder="Cari kelas / wali kelas..."
      />
    </div>

    <!-- TABLE -->
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Kelas</th>
            <th>Tingkat</th>
            <th>Jurusan</th>
            <th>Wali Kelas</th>
            <th>Siswa</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(kelas, index) in filteredKelas" :key="kelas.id">
            <td>{{ index + 1 }}</td>
            <td class="name">{{ kelas.nama }}</td>
            <td>{{ kelas.tingkat }}</td>
            <td>{{ kelas.jurusan }}</td>
            <td>{{ kelas.wali }}</td>
            <td>{{ kelas.jumlahSiswa }}</td>
            <td>
              <span
                :class="[
                  'badge',
                  kelas.status === 'Aktif'
                    ? 'badge-green'
                    : 'badge-red'
                ]"
              >
                {{ kelas.status }}
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

          <tr v-if="filteredKelas.length === 0">
            <td colspan="8" class="empty">
              Data kelas tidak ditemukan
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
  vertical-align: middle;
}

.table th {
  background: #f8fafc;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #475569;
}

/* Column alignment */
.table th:nth-child(1),
.table td:nth-child(1) {
  width: 60px;
  text-align: center;
}

.table th:last-child,
.table td:last-child {
  width: 200px;
  text-align: center;
}

/* Hover */
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
  cursor: pointer;
}

.btn-primary:hover {
  background: #1d4ed8;
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

.empty {
  text-align: center;
  padding: 20px;
  color: #94a3b8;
}
</style>
