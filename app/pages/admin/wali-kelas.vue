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
type WaliKelas = {
  id: number
  kelas: string
  guru: string
  nip: string
  status: 'Aktif' | 'Kosong'
}

/* =====================
   DATA DEMO
===================== */
const waliList = ref<WaliKelas[]>([
  {
    id: 1,
    kelas: 'X IPA 1',
    guru: 'Drs. Hendra Wijaya',
    nip: '198701012010011001',
    status: 'Aktif'
  },
  {
    id: 2,
    kelas: 'X IPA 2',
    guru: 'Siti Rahmawati, S.Pd',
    nip: '198905122012021002',
    status: 'Aktif'
  },
  {
    id: 3,
    kelas: 'XI IPS 1',
    guru: '-',
    nip: '-',
    status: 'Kosong'
  }
])

/* =====================
   COMPUTED
===================== */
const totalKelas = computed(() => waliList.value.length)
const waliAktif = computed(() =>
  waliList.value.filter(w => w.status === 'Aktif').length
)
const kelasKosong = computed(() =>
  waliList.value.filter(w => w.status === 'Kosong').length
)
</script>

<template>
  <section class="page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>Wali Kelas</h1>
        <p class="subtitle">Pengaturan guru sebagai wali kelas</p>
      </div>
      <button class="btn-primary">+ Atur Wali Kelas</button>
    </div>

    <!-- SUMMARY -->
    <div class="stats">
      <div class="card">
        <h3>Total Kelas</h3>
        <p>{{ totalKelas }}</p>
      </div>

      <div class="card green">
        <h3>Wali Aktif</h3>
        <p>{{ waliAktif }}</p>
      </div>

      <div class="card red">
        <h3>Kelas Kosong</h3>
        <p>{{ kelasKosong }}</p>
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Kelas</th>
            <th>Nama Guru</th>
            <th>NIP</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(w, index) in waliList" :key="w.id">
            <td>{{ index + 1 }}</td>
            <td class="name">{{ w.kelas }}</td>
            <td>{{ w.guru }}</td>
            <td>{{ w.nip }}</td>
            <td>
              <span
                :class="[
                  'badge',
                  w.status === 'Aktif'
                    ? 'badge-green'
                    : 'badge-gray'
                ]"
              >
                {{ w.status }}
              </span>
            </td>
            <td class="aksi">
              <div class="aksi-wrap">
                <button class="btn-sm">Ubah</button>
                <button
                  v-if="w.status === 'Aktif'"
                  class="btn-sm danger"
                >
                  Hapus
                </button>
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

.card.green p {
  color: #16a34a;
}

.card.red p {
  color: #dc2626;
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

.name {
  font-weight: 600;
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

.badge-gray {
  background: #e5e7eb;
  color: #475569;
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
