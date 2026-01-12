<script setup lang="ts">
definePageMeta({
  layout: 'siswa',
  middleware: ['auth']
})

type NilaiRapor = {
  id: number
  mapel: string
  guru: string
  nilai: number
  predikat: 'A' | 'B' | 'C' | 'D'
}

const nilaiList: NilaiRapor[] = [
  {
    id: 1,
    mapel: 'Matematika',
    guru: 'Drs. Hendra Wijaya',
    nilai: 88,
    predikat: 'A'
  },
  {
    id: 2,
    mapel: 'Bahasa Indonesia',
    guru: 'Siti Rahmawati, S.Pd',
    nilai: 82,
    predikat: 'B'
  },
  {
    id: 3,
    mapel: 'Sejarah',
    guru: 'Ahmad Zainal, S.Pd',
    nilai: 74,
    predikat: 'C'
  },
  {
    id: 4,
    mapel: 'IPA',
    guru: 'Dewi Lestari, S.Pd',
    nilai: 90,
    predikat: 'A'
  }
]
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <h1>Nilai Rapor</h1>
        <p class="subtitle">Semester Ganjil · Kelas X IPA 1</p>
      </div>
      <button class="btn-primary">Cetak Rapor</button>
    </header>

    <table class="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Mata Pelajaran</th>
          <th>Guru</th>
          <th>Nilai</th>
          <th>Predikat</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in nilaiList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.mapel }}</td>
          <td>{{ item.guru }}</td>
          <td>
            <span
              :class="[
                'badge',
                item.nilai >= 80 ? 'badge-green' : 'badge-yellow'
              ]"
            >
              {{ item.nilai }}
            </span>
          </td>
          <td>
            <span
              :class="[
                'predikat',
                item.predikat === 'A'
                  ? 'p-a'
                  : item.predikat === 'B'
                  ? 'p-b'
                  : item.predikat === 'C'
                  ? 'p-c'
                  : 'p-d'
              ]"
            >
              {{ item.predikat }}
            </span>
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

.subtitle {
  font-size: 14px;
  color: #64748b;
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

.badge-yellow {
  background: #fef9c3;
  color: #854d0e;
}

.predikat {
  font-weight: 600;
}

.p-a {
  color: #166534;
}

.p-b {
  color: #2563eb;
}

.p-c {
  color: #ca8a04;
}

.p-d {
  color: #dc2626;
}

.btn-primary {
  background: #2563eb;
  color: #ffffff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
