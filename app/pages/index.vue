<script setup lang="ts">
import redirect from '@/middleware/redirect'

definePageMeta({
  middleware: [redirect]
})
</script>

<template>
  <div class="landing">
    <header class="hero">
      <span class="badge">DEMO VERSION</span>

      <h1>
        Sistem Akademik Sekolah
        <br />
        <span class="highlight">Modern & Terintegrasi</span>
      </h1>

      <p class="subtitle">
        Platform manajemen akademik untuk Admin, Guru, dan Siswa.
        <br />
        Dibuat sebagai demo UI sebelum integrasi backend.
      </p>

      <div class="cta">
        <NuxtLink to="/login" class="btn-primary">
          🚀 Coba Demo Sekarang
        </NuxtLink>
        <span class="hint">Tanpa registrasi</span>
      </div>
    </header>

    <section class="features">
      <div class="feature-card">
        <h3>Admin</h3>
        <p>Kelola siswa, guru, mata pelajaran, dan data akademik.</p>
      </div>

      <div class="feature-card">
        <h3>Guru</h3>
        <p>Input nilai, lihat daftar siswa, dan jadwal mengajar.</p>
      </div>

      <div class="feature-card">
        <h3>Siswa</h3>
        <p>Lihat jadwal pelajaran dan nilai rapor secara real-time.</p>
      </div>
    </section>

    <footer class="footer">
      <p>
        © {{ new Date().getFullYear() }} Sistem Akademik Sekolah — Demo UI
      </p>
    </footer>
  </div>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f8fafc, #eef2ff);
}

/* HERO */
.hero {
  max-width: 960px;
  margin: 0 auto;
  padding: 100px 24px 80px;
  text-align: center;
}

.badge {
  display: inline-block;
  background: #e0e7ff;
  color: #3730a3;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  margin-bottom: 16px;
  font-weight: 600;
}

.hero h1 {
  font-size: 40px;
  font-weight: 800;
  line-height: 1.2;
  color: #0f172a;
}

.highlight {
  color: #2563eb;
}

.subtitle {
  margin-top: 16px;
  font-size: 16px;
  color: #475569;
}

.cta {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: #2563eb;
  color: white;
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.hint {
  font-size: 12px;
  color: #64748b;
}

/* FEATURES */
.features {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px 80px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.feature-card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.05);
}

.feature-card h3 {
  margin-bottom: 8px;
  color: #0f172a;
}

.feature-card p {
  font-size: 14px;
  color: #475569;
}

/* FOOTER */
.footer {
  margin-top: auto;
  padding: 20px;
  text-align: center;
  font-size: 12px;
  color: #64748b;
}
</style>
