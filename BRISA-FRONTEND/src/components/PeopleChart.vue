<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'PeopleChart',
  components: {
    Bar
  },
  props: {
    peopleData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    chartData() {
      // Agrupa pessoas por nível de educação
      const educationCounts = {};
      
      this.peopleData.forEach(person => {
        const education = person.educationLevel || 'Não informado';
        educationCounts[education] = (educationCounts[education] || 0) + 1;
      });

      const labels = Object.keys(educationCounts);
      const data = Object.values(educationCounts);

      return {
        labels: labels,
        datasets: [
          {
            label: 'Quantidade de Pessoas',
            backgroundColor: [
              '#0288d1',
              '#1F285F',
              '#0277bd',
              '#151d45',
              '#0288d1',
              '#1F285F'
            ],
            data: data,
            borderRadius: 8,
            borderWidth: 0
          }
        ]
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Distribuição de Pessoas por Nível de Educação',
            font: {
              size: 18,
              weight: '600',
              family: "'Inter', sans-serif"
            },
            color: '#1F285F',
            padding: {
              top: 10,
              bottom: 20
            }
          },
          tooltip: {
            backgroundColor: 'rgba(31, 40, 95, 0.9)',
            padding: 12,
            titleFont: {
              size: 14,
              weight: '600'
            },
            bodyFont: {
              size: 13
            },
            borderColor: '#1F285F',
            borderWidth: 1,
            cornerRadius: 8
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: '#666',
              font: {
                size: 12
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            ticks: {
              color: '#666',
              font: {
                size: 12
              }
            },
            grid: {
              display: false
            }
          }
        }
      };
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 350px;
  width: 100%;
}
</style>
