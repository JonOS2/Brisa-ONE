<template>
  <div class="dashboards-page">
    <h1>Dashboards</h1>

    <div class="dashboard-controls">
      <label for="class-select">Selecione a Turma</label>
      <select id="class-select" v-model="selectedClassId">
        <option :value="null">-- Escolher Turma --</option>
        <option v-for="c in classes" :key="c.id" :value="c.id">{{ c.name || c.code }}</option>
      </select>
    </div>

    <div class="dashboard-body">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Carregando turmas...</p>
      </div>

      <div v-else>
          <div v-if="selectedClassId">
            <div v-if="stages && stages.length" class="stage-selector">
              <label for="stage-select">Etapa</label>
              <select id="stage-select" v-model="selectedStageId">
                <option v-for="s in stages" :key="s.id" :value="s.id">{{ s.name }} - {{ s.displayName || '' }}</option>
              </select>
              <button v-if="isNivelamento && getCandidateCount(selectedStageId) > 0" class="btn-open-courses" @click="openCourses">Abrir Cursos</button>
            </div>

            <CourseProgressionFunnel :classId="selectedClassId" :stageId="selectedStageId" />
          </div>
          <p v-else class="hint-text">Escolha uma turma para ver o funil de progresso.</p>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { classService } from '../services/classService';
import { stageService } from '../services/stageService';
import CourseProgressionFunnel from '../components/analytics/CourseProgressionFunnel.vue';

export default {
  name: 'DashboardsView',
  components: { CourseProgressionFunnel },
  setup() {
    const classes = ref([]);
    const selectedClassId = ref(null);
    const stages = ref([]);
    const selectedStageId = ref(null);
    const loading = ref(true);

    const loadClasses = async () => {
      loading.value = true;
      try {
        const res = await classService.getAll();
        classes.value = Array.isArray(res) ? res : [];
      } catch (err) {
        console.error('Erro ao carregar turmas:', err);
        classes.value = [];
      } finally {
        loading.value = false;
      }
    };

    const loadStages = async (classId) => {
      if (!classId) { stages.value = []; selectedStageId.value = null; return; }
      try {
        const res = await stageService.getByClassId(classId);
        stages.value = Array.isArray(res) ? res : [];
        const normalize = (str) => (str || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase();
        const nivel = stages.value.find(s => normalize(s.name) === 'NIVELAMENTO');
        selectedStageId.value = nivel ? nivel.id : (stages.value[0]?.id ?? null);
        // Load candidate counts for the class
        await loadCandidateCounts(classId);
      } catch (err) {
        console.error('Erro ao carregar etapas:', err);
        stages.value = [];
        selectedStageId.value = null;
      }
    };

    const router = useRouter();

    const selectedStage = computed(() => stages.value.find(s => s.id === selectedStageId.value));
    const isNivelamento = computed(() => {
      const normalize = (str) => (str || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase();
      return !!selectedStage.value && normalize(selectedStage.value.name) === 'NIVELAMENTO';
    });

    const openCourses = async () => {
      if (!selectedClassId.value) return;
      let programId = classes.value.find(c => c.id === selectedClassId.value)?.program?.id
        ?? classes.value.find(c => c.id === selectedClassId.value)?.programId;

      if (!programId) {
        try {
          const cls = await classService.getById(selectedClassId.value);
          programId = cls?.program?.id ?? cls?.programId;
        } catch (err) {
          console.error('Erro ao obter programId:', err);
        }
      }

      if (programId) {
        router.push({ name: 'ClassCourses', params: { programId: String(programId), classId: String(selectedClassId.value) } });
      } else {
        console.warn('programId não encontrado para a turma', selectedClassId.value);
      }
    };

    const candidateCounts = ref({});

    const loadCandidateCounts = async (classId) => {
      try {
        const res = await stageService.getCandidatesCountByClassId(classId);
        // API returns a map { stageId: count }
        candidateCounts.value = res || {};
      } catch (err) {
        console.error('Erro ao obter contagens de candidatos:', err);
        candidateCounts.value = {};
      }
    };

    watch(selectedStageId, async (newId) => {
      if (!newId) return;
      const stage = stages.value.find(s => s.id === newId);
      if (!stage) return;
      const normalize = (str) => (str || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase();
      if (normalize(stage.name) === 'NIVELAMENTO') {
        // Tenta extrair programId da lista de turmas; senão busca a turma no backend
        let programId = classes.value.find(c => c.id === selectedClassId.value)?.program?.id
          ?? classes.value.find(c => c.id === selectedClassId.value)?.programId;

        if (!programId) {
          try {
            const cls = await classService.getById(selectedClassId.value);
            programId = cls?.program?.id ?? cls?.programId;
          } catch (err) {
            console.error('Erro ao obter programId:', err);
          }
        }

        if (programId) {
          router.push({ name: 'ClassCourses', params: { programId: String(programId), classId: String(selectedClassId.value) } });
        } else {
          console.warn('programId não encontrado para a turma', selectedClassId.value);
        }
      }
    });

    onMounted(() => {
      loadClasses();
    });

    watch(selectedClassId, (newId) => {
      loadStages(newId);
    });

    const getCandidateCount = (stageId) => {
      if (!stageId) return 0;
      return candidateCounts.value?.[stageId] ?? 0;
    };

    return { classes, selectedClassId, stages, selectedStageId, loading, isNivelamento, openCourses, getCandidateCount };
  }
};
</script>

<style scoped>
.dashboards-page { padding: 28px; max-width:1100px; margin:0 auto; }
.dashboards-page h1 { color: #1F285F; margin-bottom: 12px; }
.dashboard-controls { display:flex; gap:12px; align-items:center; margin-bottom:18px; }
label { font-weight:600; color:#1F285F; }
select { padding:8px 10px; border-radius:8px; border:1px solid #dde6f0; }
.dashboard-body { background: transparent; }
.loading-state { display:flex; align-items:center; gap:10px; }
.spinner { width:28px; height:28px; border:3px solid #dde6f0; border-top-color:#1F285F; border-radius:50%; animation:spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.hint-text { color:#666; }

.btn-open-courses {
  margin-left: 12px;
  background: #1F285F;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
.btn-open-courses:hover { opacity: 0.95; }
</style>
