<script setup lang="ts">
import guruOnly from '@/middleware/guruOnly'

definePageMeta({
  layout: 'guru',
  middleware: guruOnly
})

type Kelas = {
  id: number
  nama: string
  mapel: string
  jumlahSiswa: number
}

const kelasList: Kelas[] = [
  { id: 1, nama: 'X IPA 1', mapel: 'Matematika', jumlahSiswa: 32 },
  { id: 2, nama: 'X IPA 2', mapel: 'Matematika', jumlahSiswa: 30 },
  { id: 3, nama: 'XI IPA 1', mapel: 'Fisika', jumlahSiswa: 28 }
]
</script>

<template>
  <section class="page">
    <h1>Dashboard Guru</h1>
    <p class="subtitle">Daftar kelas yang Anda ajar</p>

    <div class="card-grid">
      <div v-for="kelas in kelasList" :key="kelas.id" class="card">
        <h3>{{ kelas.nama }}</h3>
        <p>Mata Pelajaran: <b>{{ kelas.mapel }}</b></p>
        <p>Jumlah Siswa: {{ kelas.jumlahSiswa }}</p>

        <NuxtLink
          :to="`/guru/nilai?kelas=${kelas.id}`"
          class="btn"
        >
          Input Nilai
        </NuxtLink>
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
  color: #64748b;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
}

.btn {
  display: inline-block;
  margin-top: 12px;
  background: #2563eb;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  text-decoration: none;
}
</style>
