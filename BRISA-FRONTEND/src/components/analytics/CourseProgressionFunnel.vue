<template>
  <div class="funnel-card">
    <h3 class="stats-title">Funil de Progresso por Turma</h3>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Carregando funil...</p>
    </div>

    <div v-else>
      <div v-if="!hasData" class="empty-state-info">Nenhum dado encontrado para a turma selecionada.</div>
      <div v-else class="chart-container">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { analyticsService } from '../../services/analyticsService';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'CourseProgressionFunnel',
  components: { Bar },
  props: {
    classId: {
      type: [Number, String],
      required: true
    },
    stageId: {
      type: [Number, String],
      required: false,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      rows: []
    };
  },
  computed: {
    hasData() {
      return this.rows && this.rows.length > 0;
    },
    chartData() {
      const labels = this.rows.map(r => r.status);
      const data = this.rows.map(r => r.total);
      return {
        labels,
        datasets: [
          {
            label: 'Alunos',
            data,
            backgroundColor: ['#1F285F', '#0288d1', '#0277bd', '#9fb3e7', '#c8d8ee'],
            borderRadius: 6
          }
        ]
      };
    },
    chartOptions() {
      return {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: false },
          tooltip: { backgroundColor: 'rgba(31,40,95,0.95)' }
        },
        scales: {
          x: { beginAtZero: true, ticks: { color: '#666' }, grid: { color: 'rgba(0,0,0,0.05)' } },
          y: { ticks: { color: '#666' }, grid: { display: false } }
        }
      };
    }
  },
  watch: {
    classId: { immediate: true, handler() { this.load(); } },
    stageId: { immediate: true, handler() { this.load(); } }
  },
  methods: {
    async load() {
      if (!this.classId) {
        this.rows = [];
        return;
      }
      this.loading = true;
      try {
        const options = {};
        if (this.stageId) options.stageId = this.stageId;
        const res = await analyticsService.getCourseProgressionFunnel(this.classId, options);
        this.rows = Array.isArray(res) ? res : [];
      } catch (err) {
        console.error('Erro ao buscar funil:', err);
        this.rows = [];
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.funnel-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(31,40,95,0.06);
}
.chart-container {
  position: relative;
  height: 260px;
}
.empty-state-info { color: #666; padding: 12px; }
.loading-state { display:flex; flex-direction:column; align-items:center; gap:8px; padding:16px; }
.spinner { width:36px; height:36px; border:3px solid #dde6f0; border-top-color:#1F285F; border-radius:50%; animation:spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
