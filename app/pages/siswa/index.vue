<script setup lang="ts">
import siswaOnly from '@/middleware/siswaOnly'

definePageMeta({
  layout: 'siswa',
  middleware: siswaOnly
})

type Info = {
  label: string
  value: string | number
}

const infoList: Info[] = [
  { label: 'Nama', value: 'Ahmad Fauzi' },
  { label: 'NIS', value: '2024001' },
  { label: 'Kelas', value: 'X IPA 1' },
  { label: 'Semester', value: 'Ganjil 2024/2025' }
]

type Ringkasan = {
  title: string
  value: string
}

const ringkasanList: Ringkasan[] = [
  { title: 'Rata-rata Nilai', value: '88.5' },
  { title: 'Total Mapel', value: '12' },
  { title: 'Kehadiran', value: '96%' }
]
</script>

<template>
  <section class="page">
    <h1>Dashboard Siswa</h1>
    <p class="subtitle">Informasi akademik singkat</p>

    <!-- Info Siswa -->
    <div class="info-grid">
      <div v-for="info in infoList" :key="info.label" class="info-card">
        <span class="label">{{ info.label }}</span>
        <strong>{{ info.value }}</strong>
      </div>
    </div>

    <!-- Ringkasan -->
    <div class="summary-grid">
      <div v-for="item in ringkasanList" :key="item.title" class="summary-card">
        <h3>{{ item.value }}</h3>
        <p>{{ item.title }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  padding: 24px;
}

.subtitle {
  margin-bottom: 16px;
  color: #065f46;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.info-card {
  background: white;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #16a34a;
}

.label {
  font-size: 12px;
  color: #6b7280;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.summary-card {
  background: #dcfce7;
  padding: 16px;
  border-radius: 10px;
  text-align: center;
}

.summary-card h3 {
  font-size: 28px;
  margin-bottom: 4px;
}
</style>
