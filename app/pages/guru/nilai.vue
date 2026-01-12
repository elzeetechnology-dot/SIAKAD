<script setup lang="ts">
definePageMeta({
  layout: 'guru',
  middleware: ['auth']
})

type Nilai = {
  id: number
  siswa: string
  nis: string
  mapel: string
  nilai: number
  semester: 'Ganjil' | 'Genap'
}

const nilaiList: Nilai[] = [
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
]
</script>

<template>
  <section class="page">
    <header class="page-header">
      <h1>Input Nilai Siswa</h1>
      <button class="btn-primary">+ Input Nilai</button>
    </header>

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
        <tr v-for="(item, index) in nilaiList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.nis }}</td>
          <td>{{ item.siswa }}</td>
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
