<script setup lang="ts">
definePageMeta({
  layout: 'guru'
})

type Absensi = {
  id: number
  nama: string
  kelas: string
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha'
}

const absensiList: Absensi[] = [
  { id: 1, nama: 'Ahmad Fauzi', kelas: 'X IPA 1', status: 'Hadir' },
  { id: 2, nama: 'Siti Aisyah', kelas: 'X IPA 2', status: 'Hadir' },
  { id: 3, nama: 'Budi Santoso', kelas: 'XI IPS 1', status: 'Alpha' }
]
</script>

<template>
  <section class="page">
    <!-- HEADER -->
    <header class="page-header">
      <div>
        <h1>Absensi Siswa</h1>
        <p class="subtitle">Input kehadiran siswa hari ini</p>
      </div>
      <button class="btn-primary">Simpan Absensi</button>
    </header>

    <!-- TABLE -->
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Siswa</th>
            <th>Kelas</th>
            <th>Status Kehadiran</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(s, i) in absensiList" :key="s.id">
            <td>{{ i + 1 }}</td>
            <td class="name">{{ s.nama }}</td>
            <td>{{ s.kelas }}</td>
            <td>
              <select v-model="s.status" class="select">
                <option>Hadir</option>
                <option>Izin</option>
                <option>Sakit</option>
                <option>Alpha</option>
              </select>
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

.subtitle {
  font-size: 13px;
  color: #64748b;
}

/* TABLE */
.table-wrapper {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
  overflow: hidden;
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
  letter-spacing: 0.04em;
  color: #475569;
}

.name {
  font-weight: 600;
}

/* SELECT */
.select {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  outline: none;
  font-size: 13px;
}

.select:focus {
  border-color: #2563eb;
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

.btn-primary:hover {
  background: #1d4ed8;
}
</style>
