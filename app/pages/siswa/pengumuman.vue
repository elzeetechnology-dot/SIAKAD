<script setup lang="ts">
definePageMeta({
  layout: 'siswa'
})

type Pengumuman = {
  id: number
  judul: string
  isi: string
  tanggal: string
}

const pengumumanList: Pengumuman[] = [
  {
    id: 1,
    judul: 'Libur Nasional',
    isi: 'Kegiatan belajar mengajar diliburkan pada tanggal 17 Agustus.',
    tanggal: '15 Agustus 2026'
  },
  {
    id: 2,
    judul: 'Ulangan Tengah Semester',
    isi: 'UTS dimulai tanggal 5 Oktober sesuai jadwal.',
    tanggal: '1 Oktober 2026'
  }
]
</script>

<template>
  <section class="page">
    <header class="page-header">
      <h1>Pengumuman</h1>
      <p class="subtitle">Informasi resmi sekolah</p>
    </header>

    <div class="list">
      <div
        v-for="p in pengumumanList"
        :key="p.id"
        class="card"
      >
        <div class="card-header">
          <h3>{{ p.judul }}</h3>
          <span class="date">{{ p.tanggal }}</span>
        </div>

        <p class="content">{{ p.isi }}</p>
      </div>
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

.list {
  display: grid;
  gap: 16px;
  max-width: 720px;
}

.card {
  background: white;
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 600;
}

.date {
  font-size: 12px;
  color: #64748b;
}

.content {
  font-size: 14px;
  line-height: 1.6;
  color: #334155;
}
</style>
