<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const auth = useAuthStore()
const router = useRouter()

// ✅ AUTH CHECK PALING AMAN (tanpa middleware string)
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

const siswaList: Siswa[] = [
  { id: 1, nis: '2024001', nama: 'Ahmad Fauzi', kelas: 'X IPA 1', status: 'Aktif' },
  { id: 2, nis: '2024002', nama: 'Siti Aisyah', kelas: 'X IPA 2', status: 'Aktif' },
  { id: 3, nis: '2024003', nama: 'Budi Santoso', kelas: 'XI IPS 1', status: 'Nonaktif' }
]
</script>

<template>
  <section class="page">
    <header class="page-header">
      <h1>Data Siswa</h1>
      <button class="btn-primary">+ Tambah Siswa</button>
    </header>

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
        <tr v-for="(siswa, index) in siswaList" :key="siswa.id">
          <td>{{ index + 1 }}</td>
          <td>{{ siswa.nis }}</td>
          <td>{{ siswa.nama }}</td>
          <td>{{ siswa.kelas }}</td>
          <td>
            <span
              :class="[
                'badge',
                siswa.status === 'Aktif' ? 'badge-green' : 'badge-red'
              ]"
            >
              {{ siswa.status }}
            </span>
          </td>
          <td class="aksi">
            <button class="btn-sm">Detail</button>
            <button class="btn-sm warning">Edit</button>
            <button class="btn-sm danger">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.page {
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.table th,
.table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.table th {
  background: #f9fafb;
  font-weight: 600;
}

.badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
}

.badge-green {
  background: #dcfce7;
  color: #166534;
}

.badge-red {
  background: #fee2e2;
  color: #991b1b;
}

.btn-primary {
  background: #2563eb;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.btn-sm {
  padding: 4px 8px;
  margin-right: 4px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-sm.warning {
  background: #facc15;
}

.btn-sm.danger {
  background: #ef4444;
  color: white;
}

.aksi {
  white-space: nowrap;
}
</style>
