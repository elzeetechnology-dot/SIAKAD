<script setup lang="ts">
import { computed } from 'vue'

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

const rataRata = computed(() =>
  Math.round(
    nilaiList.reduce((a, b) => a + b.nilai, 0) / nilaiList.length
  )
)

const lulus = computed(() => nilaiList.filter(n => n.nilai >= 75).length)
const remedial = computed(() => nilaiList.filter(n => n.nilai < 75).length)
</script>

<template>
  <section class="page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>Nilai Rapor</h1>
        <p class="subtitle">Semester Ganjil · Kelas X IPA 1</p>
      </div>
      <button class="btn-primary">Cetak Rapor</button>
    </div>

    <!-- SUMMARY -->
    <div class="stats">
      <div class="card">
        <h3>Rata-rata Nilai</h3>
        <p>{{ rataRata }}</p>
      </div>

      <div class="card green">
        <h3>Lulus</h3>
        <p>{{ lulus }}</p>
      </div>

      <div class="card yellow">
        <h3>Remedial</h3>
        <p>{{ remedial }}</p>
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-wrapper">
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
            <td class="name">{{ item.mapel }}</td>
            <td>{{ item.guru }}</td>
            <td>
              <span
                :class="[
                  'badge',
                  item.nilai >= 80
                    ? 'badge-green'
                    : item.nilai >= 75
                    ? 'badge-yellow'
                    : 'badge-red'
                ]"
              >
                {{ item.nilai }}
              </span>
            </td>
            <td>
              <span
                :class="[
                  'predikat',
                  'p-' + item.predikat.toLowerCase()
                ]"
              >
                {{ item.predikat }}
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

/* ===== HEADER ===== */
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

/* ===== STATS ===== */
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
  margin-bottom: 6px;
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

/* ===== TABLE ===== */
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
  letter-spacing: 0.04em;
  color: #475569;
}

/* COLUMN */
.table th:nth-child(1),
.table td:nth-child(1) {
  width: 60px;
  text-align: center;
}

.table th:nth-child(4),
.table td:nth-child(4),
.table th:nth-child(5),
.table td:nth-child(5) {
  text-align: center;
  width: 140px;
}

.table tbody tr:hover {
  background: #f9fafb;
}

/* TEXT */
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

.badge-yellow {
  background: #fef9c3;
  color: #854d0e;
}

.badge-red {
  background: #fee2e2;
  color: #991b1b;
}

/* PREDIKAT */
.predikat {
  font-weight: 700;
}

.p-a { color: #16a34a; }
.p-b { color: #2563eb; }
.p-c { color: #ca8a04; }
.p-d { color: #dc2626; }

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

