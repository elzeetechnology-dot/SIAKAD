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
type Rapor = {
  id: number
  nis: string
  nama: string
  kelas: string
  rata: number
}

/* =====================
   DATA DEMO
===================== */
const raporList = ref<Rapor[]>([
  {
    id: 1,
    nis: '2024001',
    nama: 'Ahmad Fauzi',
    kelas: 'X IPA 1',
    rata: 88
  },
  {
    id: 2,
    nis: '2024002',
    nama: 'Siti Aisyah',
    kelas: 'X IPA 1',
    rata: 82
  },
  {
    id: 3,
    nis: '2024003',
    nama: 'Budi Santoso',
    kelas: 'XI IPS 1',
    rata: 72
  }
])

/* =====================
   COMPUTED
===================== */
const total = computed(() => raporList.value.length)
const lulus = computed(() => raporList.value.filter(r => r.rata >= 75).length)
const tidakLulus = computed(() => total.value - lulus.value)
const rataSekolah = computed(() =>
  Math.round(
    raporList.value.reduce((a, b) => a + b.rata, 0) / total.value
  )
)

const predikat = (nilai: number) => {
  if (nilai >= 85) return 'A'
  if (nilai >= 75) return 'B'
  if (nilai >= 65) return 'C'
  return 'D'
}
</script>

<template>
  <section class="page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>Rapor Siswa</h1>
        <p class="subtitle">Rekap nilai akhir siswa per semester</p>
      </div>
      <button class="btn-primary">Cetak Rapor</button>
    </div>

    <!-- SUMMARY -->
    <div class="stats">
      <div class="card">
        <h3>Total Siswa</h3>
        <p>{{ total }}</p>
      </div>

      <div class="card blue">
        <h3>Rata-rata Nilai</h3>
        <p>{{ rataSekolah }}</p>
      </div>

      <div class="card green">
        <h3>Lulus</h3>
        <p>{{ lulus }}</p>
      </div>

      <div class="card red">
        <h3>Tidak Lulus</h3>
        <p>{{ tidakLulus }}</p>
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

      <select>
        <option>Semester Ganjil</option>
        <option>Semester Genap</option>
      </select>
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
            <th>Rata-rata</th>
            <th>Predikat</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(r, index) in raporList" :key="r.id">
            <td>{{ index + 1 }}</td>
            <td>{{ r.nis }}</td>
            <td class="name">{{ r.nama }}</td>
            <td>{{ r.kelas }}</td>
            <td>{{ r.rata }}</td>
            <td>
              <span class="predikat">
                {{ predikat(r.rata) }}
              </span>
            </td>
            <td>
              <span
                :class="[
                  'badge',
                  r.rata >= 75 ? 'badge-green' : 'badge-red'
                ]"
              >
                {{ r.rata >= 75 ? 'Lulus' : 'Tidak Lulus' }}
              </span>
            </td>
            <td class="aksi">
              <div class="aksi-wrap">
                <button class="btn-sm">Detail</button>
                <button class="btn-sm warning">Cetak</button>
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

.card.green p { color: #16a34a; }
.card.red p { color: #dc2626; }
.card.blue p { color: #2563eb; }

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
  width: 180px;
}

/* TEXT */
.name {
  font-weight: 600;
}

.predikat {
  font-weight: 700;
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
