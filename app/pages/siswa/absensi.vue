<script setup lang="ts">
definePageMeta({
  layout: 'siswa'
})

type Absensi = {
  id: number
  tanggal: string
  mapel: string
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha'
}

const absensiList: Absensi[] = [
  { id: 1, tanggal: '01 Okt 2026', mapel: 'Matematika', status: 'Hadir' },
  { id: 2, tanggal: '02 Okt 2026', mapel: 'Bahasa Indonesia', status: 'Hadir' },
  { id: 3, tanggal: '03 Okt 2026', mapel: 'Sejarah', status: 'Alpha' }
]
</script>

<template>
  <section class="page">
    <header class="page-header">
      <h1>Riwayat Absensi</h1>
      <p class="subtitle">Kehadiran siswa</p>
    </header>

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>Mata Pelajaran</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(a, i) in absensiList" :key="a.id">
            <td>{{ i + 1 }}</td>
            <td>{{ a.tanggal }}</td>
            <td>{{ a.mapel }}</td>
            <td>
              <span
                :class="[
                  'badge',
                  a.status === 'Hadir'
                    ? 'green'
                    : a.status === 'Alpha'
                    ? 'red'
                    : 'yellow'
                ]"
              >
                {{ a.status }}
              </span>
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

.page-header {
  margin-bottom: 16px;
}

.subtitle {
  font-size: 13px;
  color: #64748b;
}

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

/* BADGE */
.badge {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.green {
  background: #dcfce7;
  color: #166534;
}

.yellow {
  background: #fef9c3;
  color: #854d0e;
}

.red {
  background: #fee2e2;
  color: #991b1b;
}
</style>
