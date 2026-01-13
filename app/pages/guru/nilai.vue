<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

definePageMeta({
  layout: 'guru',
  middleware: ['auth']
})

const auth = useAuthStore()
const router = useRouter()

onMounted(() => { 
  if (!auth.isLogin) {
    router.push('/login')
  }
})

type Nilai = {
  id: number
  siswa: string
  nis: string
  mapel: string
  nilai: number
  semester: 'Ganjil' | 'Genap'
}

const nilaiList = ref<Nilai[]>([
  {
    id: 1,
    siswa: 'Ahmad Fauzi',
    nis: '2024001',
    mapel: 'Matematika',
    nilai: 85,
    semester: 'Ganjil'
  },
  {
    id: 2,
    siswa: 'Siti Aisyah',
    nis: '2024002',
    mapel: 'Matematika',
    nilai: 90,
    semester: 'Ganjil'
  },
  {
    id: 3,
    siswa: 'Budi Santoso',
    nis: '2024003',
    mapel: 'Matematika',
    nilai: 72,
    semester: 'Genap'
  }
])

const keyword = ref('')

const filteredNilai = computed(() =>
  nilaiList.value.filter(n =>
    n.siswa.toLowerCase().includes(keyword.value.toLowerCase()) ||
    n.nis.includes(keyword.value)
  )
)

const totalNilai = computed(() => nilaiList.value.length)
const lulus = computed(() => nilaiList.value.filter(n => n.nilai >= 75).length)
</script>


<template>
  <section class="page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>Nilai Siswa</h1>
        <p class="subtitle">Input & evaluasi nilai siswa</p>
      </div>

      <button class="btn-primary">+ Input Nilai</button>
    </div>

    <!-- SUMMARY -->
    <div class="stats">
      <div class="card">
        <h3>Total Data</h3>
        <p>{{ totalNilai }}</p>
      </div>

      <div class="card green">
        <h3>Lulus</h3>
        <p>{{ lulus }}</p>
      </div>

      <div class="card red">
        <h3>Tidak Lulus</h3>
        <p>{{ totalNilai - lulus }}</p>
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
            <th>Nama Siswa</th>
            <th>Mata Pelajaran</th>
            <th>Nilai</th>
            <th>Semester</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in filteredNilai"
            :key="item.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.nis }}</td>
            <td class="name">{{ item.siswa }}</td>
            <td>{{ item.mapel }}</td>
            <td>
              <span
                :class="[
                  'badge',
                  item.nilai >= 75 ? 'badge-green' : 'badge-red'
                ]"
              >
                {{ item.nilai }}
              </span>
            </td>
            <td>{{ item.semester }}</td>
            <td class="aksi">
              <div class="aksi-wrap">
                <button class="btn-sm warning">Edit</button>
                <button class="btn-sm danger">Hapus</button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredNilai.length === 0">
            <td colspan="7" class="empty">
              Data nilai tidak ditemukan
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
  width: 140px;
  font-variant-numeric: tabular-nums;
}

.table th:nth-child(3),
.table td:nth-child(3) {
  min-width: 260px;
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

