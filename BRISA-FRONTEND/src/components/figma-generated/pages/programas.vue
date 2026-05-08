<template>
  <div class="programs-page">
    <section class="page-header-card">
      <div class="page-header-top">
        <div>
          <h1>Programas</h1>
          <p class="subtitle">
            Gerencie os programas cadastrados, acompanhe suas turmas, etapas e andamento geral.
          </p>
        </div>

        <div class="top-actions">
          <button type="button" class="ghost-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Nova turma
          </button>

          <button type="button" class="primary-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Novo programa
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.programs-page {
  min-height: 100%;
  background: #eef3f8;
  padding: 14px 16px 20px;
}

.page-header-card {
  background: #fff;
  border: 1px solid #dfe7f1;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(13, 27, 42, 0.05);
  padding: 18px 18px 16px;
}

.page-header-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.page-header-top h1 {
  margin: 0;
  font-size: 34px;
  line-height: 1.1;
  color: #13233f;
  font-weight: 800;
}

.subtitle {
  margin: 6px 0 0;
  color: #6a7a90;
  font-size: 14px;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.ghost-btn,
.primary-btn {
  height: 40px;
  border-radius: 12px;
  border: 1px solid #d1dbe8;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 14px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  font-weight: 700;
  font: inherit;
}

.ghost-btn {
  background: #fff;
  color: #13233f;
}

.primary-btn {
  background: #14b8a6;
  color: #fff;
  border-color: #14b8a6;
  box-shadow: 0 8px 16px rgba(20, 184, 166, 0.2);
}

.ghost-btn:hover {
  background: #f8fafc;
  border-color: #cfd9e6;
  transform: translateY(-1px);
}

.primary-btn:hover {
  background: #0d9488;
  border-color: #0d9488;
  box-shadow: 0 12px 20px rgba(13, 148, 136, 0.24);
  transform: translateY(-1px);
}

@media (max-width: 720px) {
  .programs-page {
    padding: 12px;
  }

  .page-header-top h1 {
    font-size: 28px;
  }

  .top-actions {
    width: 100%;
  }

  .ghost-btn,
  .primary-btn {
    width: 100%;
  }
}
</style>
