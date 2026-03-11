<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p class="subtitle">Bem-vindo ao sistema de gerenciamento da Brisa</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon people">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.totalPeople }}</h3>
          <p>Pessoas Cadastradas</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon programs">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.totalPrograms }}</h3>
          <p>Programas Ativos</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon classes">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.totalClasses }}</h3>
          <p>Turmas Ativas</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon institutions">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <h3>{{ stats.totalInstitutions }}</h3>
          <p>Instituições</p>
        </div>
      </div>

    </div>

    <div class="quick-actions">
      <h2>Ações Rápidas</h2>
      <div class="actions-grid">
        <button @click="navigateTo('/people')" class="action-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Gerenciar Pessoas</span>
        </button>

        <button @click="navigateTo('/programs')" class="action-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span>Gerenciar Programas</span>
        </button>


        <button @click="navigateTo('/institutions')" class="action-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Gerenciar Instituições</span>
        </button>

      </div>
    </div>

    <div class="charts-section">
      <div class="chart-card">
        <PeopleChart :peopleData="peopleData" />
      </div>
    </div>

    <div v-if="loading" class="loading">Carregando estatísticas...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { peopleService } from '@/services/peopleService';
import { programService } from '@/services/programService';
import { classService } from '@/services/classService';
import { enrollmentService } from '@/services/enrollmentService';
import { institutionService } from '@/services/institutionService';
import PeopleChart from '@/components/PeopleChart.vue';

export default {
  name: 'DashboardView',
  components: {
    PeopleChart
  },
  setup() {
    const router = useRouter();
    const loading = ref(true);
    const error = ref(null);
    const peopleData = ref([]);
    const stats = ref({
      totalPeople: 0,
      totalPrograms: 0,
      totalClasses: 0,
      totalInstitutions: 0
    });

    const loadStats = async () => {
      try {
        loading.value = true;
        error.value = null;

        const [people, programs, classes, institutions] = await Promise.all([
          peopleService.getAll().catch(() => []),
          programService.getAll().catch(() => []),
          classService.getAll().catch(() => []),
          institutionService.getAll().catch(() => [])
        ]);

        peopleData.value = Array.isArray(people) ? people : [];

        stats.value = {
          totalPeople: Array.isArray(people) ? people.length : 0,
          totalPrograms: Array.isArray(programs) ? programs.length : 0,
          totalClasses: Array.isArray(classes) ? classes.length : 0,
          totalInstitutions: Array.isArray(institutions) ? institutions.length : 0
        };
      } catch (err) {
        console.error('Erro ao carregar estatísticas:', err);
        error.value = 'Erro ao carregar estatísticas';
      } finally {
        loading.value = false;
      }
    };

    const navigateTo = (path) => {
      router.push(path);
    };

    onMounted(() => {
      loadStats();
    });

    return {
      stats,
      loading,
      error,
      peopleData,
      navigateTo
    };
  }
};
</script>

<style scoped>
.dashboard {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 40px;
}

.dashboard-header h1 {
  margin: 0;
  color: #1F285F;
  font-size: 32px;
  font-weight: 600;
}

.subtitle {
  color: #666;
  margin: 8px 0 0 0;
  font-size: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.charts-section {
  margin-top: 40px;
  margin-bottom: 40px;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(31, 40, 95, 0.08);
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(31, 40, 95, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(31, 40, 95, 0.12);
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.people {
  background: linear-gradient(135deg, #0288d1 0%, #0277bd 100%);
}

.stat-icon.programs {
  background: linear-gradient(135deg, #1F285F 0%, #151d45 100%);
}

.stat-icon.classes {
  background: linear-gradient(135deg, #0288d1 0%, #0277bd 100%);
}

.stat-icon.institutions {
  background: linear-gradient(135deg, #1F285F 0%, #151d45 100%);
}

.stat-content h3 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #1F285F;
}

.stat-content p {
  margin: 4px 0 0 0;
  color: #666;
  font-size: 14px;
}

.quick-actions {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(31, 40, 95, 0.08);
}

.quick-actions h2 {
  margin: 0 0 24px 0;
  color: #1F285F;
  font-size: 24px;
  font-weight: 600;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.action-btn {
  background: #0288d1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #0277bd;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(2, 136, 209, 0.3);
}

.action-btn svg {
  width: 32px;
  height: 32px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  background-color: #ffebee;
  color: #c62828;
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 20px;
}
</style>
