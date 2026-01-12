<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

type Mapel = {
  id: number
  kode: string
  nama: string
  guru: string
  kelas: string
  status: 'Aktif' | 'Nonaktif'
}

const mapelList: Mapel[] = [
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
]
</script>

<template>
  <section class="page">
    <header class="page-header">
      <h1>Mata Pelajaran</h1>
      <button class="btn-primary">+ Tambah Mapel</button>
    </header>

    <table class="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Kode</th>
          <th>Nama</th>
          <th>Guru</th>
          <th>Kelas</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(mapel, index) in mapelList" :key="mapel.id">
          <td>{{ index + 1 }}</td>
          <td>{{ mapel.kode }}</td>
          <td>{{ mapel.nama }}</td>
          <td>{{ mapel.guru }}</td>
          <td>{{ mapel.kelas }}</td>
          <td>
            <span
              :class="[
                'badge',
                mapel.status === 'Aktif' ? 'badge-green' : 'badge-red'
              ]"
            >
              {{ mapel.status }}
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
  color: #ffffff;
}

.aksi {
  white-space: nowrap;
}
</style>
