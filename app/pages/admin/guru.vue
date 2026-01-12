<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

type Guru = {
  id: number
  nip: string
  nama: string
  mapel: string
  status: 'Aktif' | 'Nonaktif'
}

const guruList: Guru[] = [
  {
    id: 1,
    nip: '198701012010011001',
    nama: 'Drs. Hendra Wijaya',
    mapel: 'Matematika',
    status: 'Aktif'
  },
  {
    id: 2,
    nip: '198905122012021002',
    nama: 'Siti Rahmawati, S.Pd',
    mapel: 'Bahasa Indonesia',
    status: 'Aktif'
  },
  {
    id: 3,
    nip: '197812302008011003',
    nama: 'Ahmad Zainal, S.Pd',
    mapel: 'Sejarah',
    status: 'Nonaktif'
  }
]
</script>

<template>
  <section class="page">
    <header class="page-header">
      <h1>Data Guru</h1>
      <button class="btn-primary">+ Tambah Guru</button>
    </header>

    <table class="table">
      <thead>
        <tr>
          <th>No</th>
          <th>NIP</th>
          <th>Nama</th>
          <th>Mata Pelajaran</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(guru, index) in guruList" :key="guru.id">
          <td>{{ index + 1 }}</td>
          <td>{{ guru.nip }}</td>
          <td>{{ guru.nama }}</td>
          <td>{{ guru.mapel }}</td>
          <td>
            <span
              :class="[
                'badge',
                guru.status === 'Aktif' ? 'badge-green' : 'badge-red'
              ]"
            >
              {{ guru.status }}
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
  background: #ffffff;
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
  font-weight: 500;
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
  color: #ffffff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
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
  color: #ffffff;
}

.aksi {
  white-space: nowrap;
}
</style>
