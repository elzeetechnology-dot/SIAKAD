<script setup lang="ts">
definePageMeta({
  layout: 'guru'
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
    judul: 'Rapat Guru',
    isi: 'Rapat evaluasi pembelajaran hari Jumat pukul 13.00 WIB.',
    tanggal: '20 Juni 2026'
  },
  {
    id: 2,
    judul: 'Batas Input Nilai',
    isi: 'Input nilai semester ganjil paling lambat 30 Juni.',
    tanggal: '18 Juni 2026'
  }
]
</script>

<template>
  <section class="page">
    <!-- HEADER -->
    <header class="page-header">
      <h1>Pengumuman</h1>
    </header>

    <!-- LIST -->
    <div class="announcement-list">
      <div
        v-for="p in pengumumanList"
        :key="p.id"
        class="announcement-card"
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

/* HEADER */
.page-header {
  margin-bottom: 16px;
}

.page-header h1 {
  font-size: 22px;
  font-weight: 700;
}

/* LIST */
.announcement-list {
  display: grid;
  gap: 16px;
  max-width: 720px;
}

/* CARD */
.announcement-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  color: #334155;
  line-height: 1.6;
}
</style>
