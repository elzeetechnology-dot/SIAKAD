<script setup lang="ts">
definePageMeta({
  layout: 'siswa',
  middleware: ['auth']
})

type Jadwal = {
  id: number
  hari: string
  jam: string
  mapel: string
  guru: string
  ruang: string
}

const jadwalList: Jadwal[] = [
  {
    id: 1,
    hari: 'Senin',
    jam: '07:00 - 08:30',
    mapel: 'Matematika',
    guru: 'Drs. Hendra Wijaya',
    ruang: 'Ruang 101'
  },
  {
    id: 2,
    hari: 'Senin',
    jam: '08:30 - 10:00',
    mapel: 'Bahasa Indonesia',
    guru: 'Siti Rahmawati, S.Pd',
    ruang: 'Ruang 102'
  },
  {
    id: 3,
    hari: 'Selasa',
    jam: '07:00 - 08:30',
    mapel: 'Sejarah',
    guru: 'Ahmad Zainal, S.Pd',
    ruang: 'Ruang 201'
  },
  {
    id: 4,
    hari: 'Rabu',
    jam: '10:00 - 11:30',
    mapel: 'IPA',
    guru: 'Dewi Lestari, S.Pd',
    ruang: 'Lab IPA'
  }
]
</script>

<template>
  <section class="page">
    <header class="page-header">
      <h1>Jadwal Pelajaran</h1>
      <span class="kelas-info">Kelas X IPA 1</span>
    </header>

    <table class="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Hari</th>
          <th>Jam</th>
          <th>Mata Pelajaran</th>
          <th>Guru</th>
          <th>Ruang</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(jadwal, index) in jadwalList" :key="jadwal.id">
          <td>{{ index + 1 }}</td>
          <td>{{ jadwal.hari }}</td>
          <td>{{ jadwal.jam }}</td>
          <td>{{ jadwal.mapel }}</td>
          <td>{{ jadwal.guru }}</td>
          <td>{{ jadwal.ruang }}</td>
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

.kelas-info {
  font-size: 14px;
  color: #475569;
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
  text-align: left;
}

.table th {
  background: #f9fafb;
  font-weight: 600;
}
</style>
