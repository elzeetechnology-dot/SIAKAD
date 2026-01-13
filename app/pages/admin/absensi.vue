<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

definePageMeta({
  layout: 'admin'
})

const auth = useAuthStore()
const router = useRouter()

// ✅ AUTH CHECK PALING AMAN
onMounted(() => {
  if (!auth.isLogin) {
    router.push('/login')
  }
})

/* =====================
   TYPE
===================== */
type Absensi = {
  id: number
  nis: string
  nama: string
  kelas: string
  status: 'Hadir' | 'Izin' | 'Alpha'
}

/* =====================
   DATA DEMO
===================== */
const absensiList = ref<Absensi[]>([
  {
    id: 1,
    nis: '2024001',
    nama: 'Ahmad Fauzi',
    kelas: 'X IPA 1',
    status: 'Hadir'
  },
  {
    id: 2,
    nis: '2024002',
    nama: 'Siti Aisyah',
    kelas: 'X IPA 1',
    status: 'Izin'
  },
  {
    id: 3,
    nis: '2024003',
    nama: 'Budi Santoso',
    kelas: 'XI IPS 1',
    status: 'Alpha'
  }
])

/* =====================
   COMPUTED
===================== */
const total = computed(() => absensiList.value.length)
const hadir = computed(() =>
  absensiList.value.filter(a => a.status === 'Hadir').length
)
const izin = computed(() =>
  absensiList.value.filter(a => a.status === 'Izin').length
)
const alpha = computed(() =>
  absensiList.value.filter(a => a.status === 'Alpha').length
)
</script>

<template>
  <section class="page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>Absensi Siswa</h1>
        <p class="subtitle">Rekap kehadiran harian siswa</p>
      </div>
      <button class="btn-primary">+ Input Absensi</button>
    </div>

    <!-- SUMMARY -->
    <div class="stats">
      <div class="card">
        <h3>Total Siswa</h3>
        <p>{{ total }}</p>
      </div>
      <div class="card green">
        <h3>Hadir</h3>
        <p>{{ hadir }}</p>
      </div>
      <div class="card yellow">
        <h3>Izin</h3>
        <p>{{ izin }}</p>
      </div>
      <div class="card red">
        <h3>Alpha</h3>
        <p>{{ alpha }}</p>
      </div>
    </div>

    <!-- FILTER -->
    <div class="toolbar">
      <select>
        <option>Semua Kelas</option>
        <option>X IPA 1</option>
        <option>X IPA 2</option>
        <option>XI IPS 1</option>
      </select>

      <input type="date" />
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
          <tr v-for="(item, index) in absensiList" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.nis }}</td>
            <td class="name">{{ item.nama }}</td>
            <td>{{ item.kelas }}</td>
            <td>
              <span
                :class="[
                  'badge',
                  item.status === 'Hadir'
                    ? 'badge-green'
                    : item.status === 'Izin'
                    ? 'badge-yellow'
                    : 'badge-red'
                ]"
              >
                {{ item.status }}
              </span>
            </td>
            <td class="aksi">
              <div class="aksi-wrap">
                <button class="btn-sm">Detail</button>
                <button class="btn-sm warning">Edit</button>
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
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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

.card.yellow p {
  color: #ca8a04;
}

.card.red p {
  color: #dc2626;
}

/* TOOLBAR */
.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}

.toolbar select,
.toolbar input {
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
  width: 180px;
}

/* BADGE */
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

.badge-yellow {
  background: #fef9c3;
  color: #854d0e;
}

.badge-red {
  background: #fee2e2;
  color: #991b1b;
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

.btn-sm.warning {
  background: #facc15;
}
</style>
