<template>
  <div class="career-view">
    <div class="header">
      <h1>Painel de Controle Geral</h1>
      <p class="subtitle"></p>
    </div>

    <div class="development-box">
      <p>Página em desenvolvimento</p>
    </div>
  </div>
</template>

<script>
export default {
  // Mantive o nome como CoursesView caso seu vue-router esteja buscando por ele,
  // mas você pode alterar para CareerView se preferir organizar assim.
  name: 'CoursesView' 
};
</script>

<style scoped>
.career-view {
  padding: 32px 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  margin-bottom: 32px;
}

.header h1 {
  margin: 0 0 8px 0;
  color: #1F285F;
  font-size: 24px;
  font-weight: 600;
}

.subtitle {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.development-box {
  border: 1px solid #e0e6ed;
  border-radius: 8px;
  padding: 60px 20px;
  text-align: center;
  background-color: #ffffff;
  /* Uma sombra bem sutil para descolar um pouco do fundo, caso ele seja cinza claro */
  box-shadow: 0 2px 4px rgba(31, 40, 95, 0.02); 
}

.development-box p {
  margin: 0;
  color: #55607a;
  font-size: 15px;
}
</style>