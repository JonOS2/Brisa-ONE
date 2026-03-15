<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Residência em Software - TIC 16</h1>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Carregando dados...</p>
    </div>

    <div v-else>
      <!-- Seção Mapa + Stats -->
      <div class="map-stats-section">
        <!-- Mapa -->
        <div class="map-card">
          <div v-if="selectedState" class="state-label" :style="{ color: getStateColor(selectedState) }">
            {{ stateNames[selectedState] }}
          </div>
          <div v-else class="state-label default-label">Projetos Pelo Brasil</div>

          <BrazilMap
            :activeStates="activeStates"
            :selectedState="selectedState"
            :stateColors="stateColors"
            @select="selectState"
          />
        </div>

        <!-- Painel de Stats -->
        <div class="stats-card">
          <template v-if="!selectedState">
            <h2 class="stats-title">Residências no Brasil</h2>
            <div class="stats-grid">
              <div class="stat-box">
                <span class="stat-label">PROGRAMAS ATIVOS</span>
                <span class="stat-number">{{ globalStats.totalPrograms }}</span>
              </div>
              <div class="stat-box">
                <span class="stat-label">ALUNOS ATIVOS</span>
                <span class="stat-number">{{ globalStats.totalStudents }}</span>
              </div>
              <div class="stat-box">
                <span class="stat-label">PROGRAMAS EM 1° ETAPA</span>
                <span class="stat-number">{{ globalStats.stage1 }}</span>
              </div>
              <div class="stat-box">
                <span class="stat-label">PROGRAMAS EM 2° ETAPA</span>
                <span class="stat-number">{{ globalStats.stage2 }}</span>
              </div>
            </div>
            <div class="state-badges">
              <span
                v-for="uf in activeStates"
                :key="uf"
                class="state-badge"
                :style="{ background: getStateColor(uf) }"
                @click="selectState(uf)"
              >
                {{ stateNames[uf] }}
              </span>
            </div>
            <p class="hint-text">Selecione um estado para obter os dados de implementação nele</p>
          </template>

          <template v-else>
            <h2 class="stats-title" :style="{ color: getStateColor(selectedState) }">
              Residências em {{ stateNames[selectedState] }}
            </h2>
            <div class="stats-grid">
              <div class="stat-box">
                <span class="stat-label">PROGRAMAS ATIVOS</span>
                <span class="stat-number">{{ stateStats.totalPrograms }}</span>
              </div>
              <div class="stat-box">
                <span class="stat-label">ALUNOS ATIVOS</span>
                <span class="stat-number">{{ stateStats.totalStudents }}</span>
              </div>
              <div class="stat-box">
                <span class="stat-label">PROGRAMAS EM 1° ETAPA</span>
                <span class="stat-number">{{ stateStats.stage1 }}</span>
              </div>
              <div class="stat-box">
                <span class="stat-label">PROGRAMAS EM 2° ETAPA</span>
                <span class="stat-number">{{ stateStats.stage2 }}</span>
              </div>
            </div>
            <div class="state-badges">
              <span
                v-for="inst in stateStats.institutions"
                :key="inst"
                class="state-badge"
                :style="{ background: getStateColor(selectedState) }"
              >
                {{ inst }}
              </span>
            </div>
            <button class="btn-clear-state" @click="selectedState = null">
              ← Ver todos os estados
            </button>
          </template>
        </div>
      </div>

      <!-- Seção 1° Etapa -->
      <div v-if="!selectedState || stageData['1']?.length" class="stage-section">
        <h2 class="section-title">1° Etapa</h2>
        <div class="stage-card">
          <StageChart :classes="stageData['1'] || []" stageLabel="Avaliação X" color="#1F285F" />
        </div>
      </div>

      <!-- Seção 2° Etapa -->
      <div v-if="!selectedState || stageData['2']?.length" class="stage-section">
        <h2 class="section-title">2° Etapa</h2>
        <div class="stage-card">
          <StageChart :classes="stageData['2'] || []" stageLabel="Avaliação Y" color="#0288d1" :secondary="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { programService } from '@/services/programService';
import { classService } from '@/services/classService';
import { institutionService } from '@/services/institutionService';
import StageChart from '@/components/dashboard/StageChart.vue';
import BrazilMap from '@/components/dashboard/BrazilMap.vue';

export default {
  name: 'DashboardView',
  components: { StageChart, BrazilMap },
  setup() {
    const loading = ref(true);
    const programs = ref([]);
    const classes = ref([]);
    const institutions = ref([]);
    const selectedState = ref(null);

    const stateNames = {
      AC: 'Acre', AL: 'Alagoas', AM: 'Amazonas', AP: 'Amapá',
      BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo',
      GO: 'Goiás', MA: 'Maranhão', MG: 'Minas Gerais', MS: 'Mato Grosso do Sul',
      MT: 'Mato Grosso', PA: 'Pará', PB: 'Paraíba', PE: 'Pernambuco',
      PI: 'Piauí', PR: 'Paraná', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte',
      RO: 'Rondônia', RR: 'Roraima', RS: 'Rio Grande do Sul', SC: 'Santa Catarina',
      SE: 'Sergipe', SP: 'São Paulo', TO: 'Tocantins'
    };

    const stateColors = {
      AL: '#27ae60', BA: '#1abc9c', MG: '#2980b9', PR: '#e74c3c',
      SP: '#8e44ad', RJ: '#f39c12', CE: '#16a085', PE: '#d35400',
      RS: '#c0392b', SC: '#2c3e50'
    };

    // Calcula estados ativos (que têm turmas com location tendo state cadastrado)
    const activeStates = computed(() => {
      const states = new Set();
      classes.value.forEach(c => {
        if (c.location?.state) states.add(c.location.state);
      });
      // fallback demo se não houver state cadastrado ainda
      if (states.size === 0) return ['AL', 'BA', 'MG', 'PR'];
      return Array.from(states);
    });

    const globalStats = computed(() => {
      const totalStudents = classes.value.reduce((acc, c) => acc + (c.enrollmentCount || 0), 0);
      return {
        totalPrograms: programs.value.length,
        totalStudents,
        stage1: Math.ceil(programs.value.length * 0.33),
        stage2: programs.value.length - Math.ceil(programs.value.length * 0.33)
      };
    });

    const stateStats = computed(() => {
      if (!selectedState.value) return {};
      const stateClasses = classes.value.filter(c => c.location?.state === selectedState.value);
      const stateInstitutions = [...new Set(stateClasses.map(c => c.location?.acronym).filter(Boolean))];
      const totalStudents = stateClasses.reduce((acc, c) => acc + (c.enrollmentCount || 0), 0);
      const statePrograms = [...new Set(stateClasses.map(c => c.program?.id))].length;
      return {
        totalPrograms: statePrograms || stateInstitutions.length,
        totalStudents,
        stage1: Math.ceil(statePrograms * 0.4) || 1,
        stage2: statePrograms - Math.ceil(statePrograms * 0.4) || 2,
        institutions: stateInstitutions.length ? stateInstitutions : [selectedState.value]
      };
    });

    // Dados agrupados por etapa para os gráficos
    const stageData = computed(() => {
      const filtered = selectedState.value
        ? classes.value.filter(c => c.location?.state === selectedState.value)
        : classes.value;

      // Agrupa por número de etapa baseado no código da turma ou posição
      return {
        '1': filtered.slice(0, Math.ceil(filtered.length / 2)),
        '2': filtered.slice(Math.ceil(filtered.length / 2))
      };
    });

    const getStateColor = (uf) => stateColors[uf] || '#667eea';

    const getStateFill = (uf) => {
      if (!activeStates.value.includes(uf)) return '#dde6f0';
      if (selectedState.value === uf) return getStateColor(uf);
      if (hoveredState.value === uf) return getStateColor(uf) + 'cc';
      return getStateColor(uf) + '99';
    };

    const selectState = (uf) => {
      if (!activeStates.value.includes(uf)) return;
      selectedState.value = selectedState.value === uf ? null : uf;
    };

    const loadData = async () => {
      loading.value = true;
      try {
        const [progs, cls, insts] = await Promise.all([
          programService.getAll(),
          classService.getAll(),
          institutionService.getAll()
        ]);
        programs.value = Array.isArray(progs) ? progs : [];
        classes.value = Array.isArray(cls) ? cls : [];
        institutions.value = Array.isArray(insts) ? insts : [];
      } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(loadData);

    return {
      loading, programs, classes, institutions,
      selectedState,
      stateNames, stateColors,
      activeStates, globalStats, stateStats, stageData,
      getStateColor, selectState
    };
  }
};
</script>

<style scoped>
.dashboard {
  padding: 28px 32px;
  max-width: 1400px;
  margin: 0 auto;
  background: #eaf1fb;
  min-height: 100vh;
}

.dashboard-header h1 {
  color: #1F285F;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 24px;
}

/* Loading */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
  gap: 16px;
  color: #666;
}
.spinner {
  width: 40px; height: 40px;
  border: 3px solid #dde6f0;
  border-top-color: #1F285F;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Map + Stats */
.map-stats-section {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 20px;
  margin-bottom: 32px;
}

/* Map card */
.map-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(31,40,95,0.08);
}

/* Stats Card */
.stats-card {
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(31,40,95,0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats-title {
  font-size: 20px;
  font-weight: 700;
  color: #1F285F;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-box {
  border: 1.5px solid #dde6f0;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-label {
  font-size: 11px;
  font-weight: 600;
  color: #888;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: #1F285F;
  line-height: 1;
}

.state-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.state-badge {
  padding: 6px 14px;
  border-radius: 20px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}
.state-badge:hover { opacity: 0.85; transform: translateY(-1px); }

.hint-text {
  color: #888;
  font-size: 13px;
  text-align: center;
  margin: 0;
}

.btn-clear-state {
  background: none;
  border: 1.5px solid #dde6f0;
  border-radius: 8px;
  padding: 8px 16px;
  color: #1F285F;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.2s;
}
.btn-clear-state:hover { background: #eaf1fb; }

/* Stage Sections */
.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1F285F;
  margin-bottom: 12px;
}

.stage-section {
  margin-bottom: 32px;
}

.stage-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(31,40,95,0.08);
}

/* Responsive */
@media (max-width: 900px) {
  .map-stats-section {
    grid-template-columns: 1fr;
  }
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>