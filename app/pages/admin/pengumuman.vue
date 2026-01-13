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
type Pengumuman = {
  id: number
  judul: string
  target: 'Semua' | 'Guru' | 'Siswa'
  tanggal: string
  status: 'Draft' | 'Publish'
}

/* =====================
   DATA DEMO
===================== */
const pengumumanList = ref<Pengumuman[]>([
  {
    id: 1,
    judul: 'Libur Nasional Hari Raya',
    target: 'Semua',
    tanggal: '2026-01-10',
    status: 'Publish'
  },
  {
    id: 2,
    judul: 'Rapat Guru Semester Genap',
    target: 'Guru',
    tanggal: '2026-01-12',
    status: 'Publish'
  },
  {
    id: 3,
    judul: 'Pengambilan Rapor Semester Ganjil',
    target: 'Siswa',
    tanggal: '2026-01-15',
    status: 'Draft'
  }
])

/* =====================
   COMPUTED
===================== */
const total = computed(() => pengumumanList.value.length)
const published = computed(
  () => pengumumanList.value.filter(p => p.status === 'Publish').length
)
const draft = computed(
  () => pengumumanList.value.filter(p => p.status === 'Draft').length
)
</script>

<template>
  <section class="page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>Pengumuman</h1>
        <p class="subtitle">Kelola pengumuman sekolah</p>
      </div>
      <button class="btn-primary">+ Buat Pengumuman</button>
    </div>

    <!-- SUMMARY -->
    <div class="stats">
      <div class="card">
        <h3>Total</h3>
        <p>{{ total }}</p>
      </div>

      <div class="card green">
        <h3>Dipublish</h3>
        <p>{{ published }}</p>
      </div>

      <div class="card yellow">
        <h3>Draft</h3>
        <p>{{ draft }}</p>
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Judul</th>
            <th>Target</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in pengumumanList"
            :key="item.id"
          >
            <td>{{ index + 1 }}</td>
            <td class="name">{{ item.judul }}</td>
            <td>
              <span class="chip">{{ item.target }}</span>
            </td>
            <td>{{ item.tanggal }}</td>
            <td>
              <span
                :class="[
                  'badge',
                  item.status === 'Publish'
                    ? 'badge-green'
                    : 'badge-yellow'
                ]"
              >
                {{ item.status }}
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

          <tr v-if="pengumumanList.length === 0">
            <td colspan="6" class="empty">
              Belum ada pengumuman
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

.card.yellow p {
  color: #ca8a04;
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
  width: 200px;
}

.name {
  font-weight: 600;
}

/* CHIP */
.chip {
  background: #e0f2fe;
  color: #0369a1;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
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

.badge-yellow {
  background: #fef9c3;
  color: #854d0e;
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

.btn-sm.danger {
  background: #ef4444;
  color: white;
}

/* EMPTY */
.empty {
  text-align: center;
  padding: 20px;
  color: #94a3b8;
}
</style>
