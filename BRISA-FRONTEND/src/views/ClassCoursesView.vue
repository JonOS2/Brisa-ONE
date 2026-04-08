<template>
  <div class="courses-view">
    <!-- Header -->
    <div class="page-header">
      <button class="btn-back" @click="router.back()">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Voltar
      </button>
      <div class="header-info">
        <h1 class="page-title">{{ classData.code || 'Turma' }}</h1>
        <span v-if="classData.location" class="header-badge">
          {{ classData.location.state }} · {{ classData.location.acronym }}
        </span>
      </div>
      <button class="btn-import-progressions" @click="showProgressionImportModal = true">
        Importar Progressões (Excel)
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Carregando cursos...</p>
    </div>

    <!-- Conteúdo -->
    <div v-else>
      <!-- Cards de resumo -->
      <div class="summary-cards">
        <div class="summary-card">
          <span class="summary-label">TOTAL DE CURSOS</span>
          <span class="summary-number">{{ courseStats.total }}</span>
        </div>
        <div class="summary-card not-started">
          <span class="summary-label">NÃO INICIADOS</span>
          <span class="summary-number">{{ courseStats.notStarted }}</span>
        </div>
        <div class="summary-card in-progress">
          <span class="summary-label">EM ANDAMENTO</span>
          <span class="summary-number">{{ courseStats.inProgress }}</span>
        </div>
        <div class="summary-card completed">
          <span class="summary-label">CONCLUÍDOS</span>
          <span class="summary-number">{{ courseStats.completed }}</span>
        </div>
      </div>

      <!-- Lista de cursos -->
      <div class="courses-list">
        <div v-if="courseItems.length === 0" class="no-data">
          Nenhum curso encontrado para esta turma.
        </div>
        <div
          v-for="course in courseItems"
          :key="course.id"
          class="course-card"
          @click="goToCourse(course)"
        >
          <div class="course-left">
            <!-- Badge circular de % -->
            <div class="completion-badge" :style="{ '--pct': course.completionPct, '--color': getCompletionColor(course.completionPct) }">
              <svg viewBox="0 0 36 36" class="circular-chart">
                <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                <path
                  class="circle"
                  :stroke="getCompletionColor(course.completionPct)"
                  :stroke-dasharray="`${course.completionPct}, 100`"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span class="badge-pct">{{ course.completionPct }}%</span>
            </div>

            <!-- Info do curso -->
            <div class="course-info">
              <div class="course-name-row">
                <span class="course-name">{{ course.name }}</span>
                <span v-if="course.required" class="tag-required">Obrigatório</span>
              </div>
              <span v-if="course.knowledgeArea" class="course-area">{{ course.knowledgeArea }}</span>

              <!-- Barra de progresso segmentada -->
              <div class="progress-bar-wrapper">
                <div class="progress-bar">
                  <div
                    class="progress-segment not-started"
                    :style="{ width: course.pctNotStarted + '%' }"
                    :title="`Não iniciado: ${course.pctNotStarted}%`"
                  ></div>
                  <div
                    class="progress-segment in-progress"
                    :style="{ width: course.pctInProgress + '%' }"
                    :title="`Em andamento: ${course.pctInProgress}%`"
                  ></div>
                  <div
                    class="progress-segment completed"
                    :style="{ width: course.pctCompleted + '%' }"
                    :title="`Concluído: ${course.pctCompleted}%`"
                  ></div>
                </div>
                <div class="progress-legend">
                  <span class="legend-item not-started-text">
                    <span class="legend-dot-sm not-started"></span>
                    Não iniciado {{ course.pctNotStarted }}%
                  </span>
                  <span class="legend-item in-progress-text">
                    <span class="legend-dot-sm in-progress"></span>
                    Em andamento {{ course.pctInProgress }}%
                  </span>
                  <span class="legend-item completed-text">
                    <span class="legend-dot-sm completed"></span>
                    Concluído {{ course.pctCompleted }}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="course-actions">
            <button v-if="course.assigned" class="btn-remove" @click.stop="removeCourse(course)">Remover</button>
            <button v-else class="btn-add" @click.stop="assignCourse(course)">Adicionar</button>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2" class="arrow-icon">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </div>

    <div v-if="showProgressionImportModal" class="modal-overlay" @click="closeProgressionImportModal">
      <div class="modal-content" @click.stop>
        <h2>Importar Progressões por Excel</h2>
        <p class="modal-hint">Formato esperado: Nome do curso | CPF | Nota | Progresso</p>

        <div class="upload-area">
          <input
            type="file"
            accept=".xlsx,.xls"
            @change="handleProgressionFileChange"
          />
          <p v-if="progressionImportFile">{{ progressionImportFile.name }}</p>
        </div>

        <div v-if="progressionImportError" class="alert-error">{{ progressionImportError }}</div>
        <div v-if="progressionImportSuccess" class="alert-success">{{ progressionImportSuccess }}</div>

        <div class="modal-actions">
          <button class="btn-cancel" @click="closeProgressionImportModal">Cancelar</button>
          <button
            class="btn-send"
            :disabled="importingProgressions || !progressionImportFile"
            @click="importProgressionsExcel"
          >
            {{ importingProgressions ? 'Importando...' : 'Importar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { classService } from '@/services/classService';
import { courseService } from '@/services/courseService';

export default {
  name: 'ClassCoursesView',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const classData = ref({});
    const courses = ref([]);
    const progressions = ref([]);
    const assignments = ref([]);
    const assignedCourseIds = ref([]);
    const loading = ref(true);
    const showProgressionImportModal = ref(false);
    const progressionImportFile = ref(null);
    const importingProgressions = ref(false);
    const progressionImportError = ref(null);
    const progressionImportSuccess = ref('');

    const classId = computed(() => route.params.classId);
    const programId = computed(() => route.params.programId);

    // Monta os itens de curso com estatísticas calculadas
    const courseItems = computed(() => {
      if (courses.value.length === 0) {
        return [];
      }

      return courses.value.map(course => {
        const courseProgressions = progressions.value.filter(p => p.course?.id === course.id);
        const total = courseProgressions.length || 1;
        const assignment = assignments.value.find(a => a.course?.id === course.id);

        const notStarted  = courseProgressions.filter(p => p.status === 'não iniciado').length;
        const inProgress  = courseProgressions.filter(p => p.status === 'em andamento').length;
        const completed   = courseProgressions.filter(p => p.status === 'concluído').length;

        const avgCompletion = courseProgressions.length
          ? Math.round(courseProgressions.reduce((acc, p) => acc + p.completionPercentage, 0) / total)
          : 0;

        return {
          id: course.id,
          name: course.name,
          knowledgeArea: course.knowledgeArea?.name,
          required: assignment ? assignment.required !== false : true,
          completionPct: avgCompletion,
          pctNotStarted:  Math.round((notStarted / total) * 100),
          pctInProgress:  Math.round((inProgress / total) * 100),
          pctCompleted:   Math.round((completed  / total) * 100),
          assigned: assignedCourseIds.value.includes(course.id),
        };
      });
    });

    const courseStats = computed(() => ({
      total:      courseItems.value.length,
      notStarted: courseItems.value.filter(c => c.completionPct === 0).length,
      inProgress: courseItems.value.filter(c => c.completionPct > 0 && c.completionPct < 100).length,
      completed:  courseItems.value.filter(c => c.completionPct === 100).length,
    }));

    const getCompletionColor = (pct) => {
      if (pct >= 80) return '#27ae60';
      if (pct >= 40) return '#f39c12';
      return '#e74c3c';
    };

    const goToCourse = (course) => {
      router.push({
        name: 'CourseDetails',
        params: { programId: programId.value, classId: classId.value, courseId: course.id }
      });
    };

    const assignCourse = async (course) => {
      try {
        loading.value = true;
        await courseService.assignCourseToClass(course.id, classId.value, true);
        await loadData();
      } catch (err) {
        console.error('Erro ao atribuir curso:', err);
      } finally {
        loading.value = false;
      }
    };

    const removeCourse = async (course) => {
      try {
        loading.value = true;
        await courseService.removeCourseFromClass(course.id, classId.value);
        await loadData();
      } catch (err) {
        console.error('Erro ao remover curso:', err);
      } finally {
        loading.value = false;
      }
    };

    const loadData = async () => {
      loading.value = true;
      try {
        const cls = await classService.getById(classId.value);
        const asgs = await courseService.getAssignmentsByClassId(classId.value).catch(() => []);
        const progs = await courseService.getProgressionsByClassId(classId.value).catch(() => []);

        classData.value = cls || {};
        assignments.value = Array.isArray(asgs) ? asgs : [];
        progressions.value = Array.isArray(progs) ? progs : [];

        // Cursos atribuídos à turma (a partir das assignments persistidas)
        const assignedIds = Array.from(new Set(assignments.value.map(a => a.course?.id).filter(Boolean)));
        assignedCourseIds.value = assignedIds;

        if (assignedIds.length > 0) {
          const allCourses = await courseService.getAll();
          courses.value = Array.isArray(allCourses) ? allCourses.filter(c => assignedIds.includes(c.id)) : [];
        } else {
          courses.value = [];
        }

      } catch (err) {
        console.error('Erro ao carregar cursos:', err);
      } finally {
        loading.value = false;
      }
    };

    const handleProgressionFileChange = (event) => {
      const file = event.target.files[0];
      progressionImportFile.value = file || null;
      progressionImportError.value = null;
      progressionImportSuccess.value = '';
    };

    const importProgressionsExcel = async () => {
      if (!progressionImportFile.value) return;
      importingProgressions.value = true;
      progressionImportError.value = null;
      progressionImportSuccess.value = '';

      try {
        const formData = new FormData();
        formData.append('file', progressionImportFile.value);
        const result = await courseService.importProgressionsFromExcel(classId.value, formData);

        progressionImportSuccess.value =
          `Processadas: ${result.totalProcessed}. ` +
          `Criadas: ${result.createdProgressions}. ` +
          `Atualizadas: ${result.updatedProgressions}. ` +
          `Notas atualizadas: ${result.updatedGrades}. ` +
          `Ignoradas: ${result.skippedRows}.`;

        await loadData();
      } catch (err) {
        progressionImportError.value = 'Erro ao importar progressões: ' + (err.response?.data?.message || err.message);
      } finally {
        importingProgressions.value = false;
      }
    };

    const closeProgressionImportModal = () => {
      showProgressionImportModal.value = false;
      progressionImportFile.value = null;
      progressionImportError.value = null;
      progressionImportSuccess.value = '';
    };

    onMounted(loadData);

    return {
      router, classData, loading,
      courseItems, courseStats,
      getCompletionColor, goToCourse,
      assignCourse, removeCourse,
      showProgressionImportModal,
      progressionImportFile,
      importingProgressions,
      progressionImportError,
      progressionImportSuccess,
      handleProgressionFileChange,
      importProgressionsExcel,
      closeProgressionImportModal
    };
  }
};
</script>

<style scoped>
.courses-view {
  padding: 28px 32px;
  max-width: 1100px;
  margin: 0 auto;
  background: #eaf1fb;
  min-height: 100vh;
}

/* Header */
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 28px;
}
.header-info { display: flex; align-items: center; gap: 12px; flex: 1; }
.btn-back {
  display: flex;
  align-items: center;
  gap: 6px;
  background: white;
  border: 1.5px solid #dde6f0;
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #1F285F;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-back:hover { background: #f0f6ff; }
.page-title { font-size: 24px; font-weight: 700; color: #1F285F; margin: 0; }
.header-badge {
  background: #1F285F;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}
.btn-import-progressions {
  background: #1F285F;
  color: #fff;
  border: 1px solid #1F285F;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.btn-import-progressions:hover { background: #2f3d8f; }

/* Loading */
.loading-state {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 80px; gap: 16px; color: #666;
}
.spinner {
  width: 40px; height: 40px;
  border: 3px solid #dde6f0;
  border-top-color: #1F285F;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Summary cards */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}
.summary-card {
  background: white;
  border-radius: 14px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 2px 12px rgba(31,40,95,0.07);
  border-left: 4px solid #1F285F;
}
.summary-card.not-started { border-left-color: #e74c3c; }
.summary-card.in-progress { border-left-color: #f39c12; }
.summary-card.completed   { border-left-color: #27ae60; }
.summary-label {
  font-size: 10px; font-weight: 700;
  color: #888; letter-spacing: 0.5px; text-transform: uppercase;
}
.summary-number { font-size: 32px; font-weight: 700; color: #1F285F; line-height: 1; }

/* Courses list */
.courses-list { display: flex; flex-direction: column; gap: 14px; }
.course-card {
  background: white;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 2px 12px rgba(31,40,95,0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.15s;
}
.course-card:hover {
  box-shadow: 0 4px 20px rgba(31,40,95,0.13);
  transform: translateY(-1px);
}
.course-left { display: flex; align-items: center; gap: 20px; flex: 1; }

/* Badge circular */
.completion-badge {
  position: relative;
  width: 56px; height: 56px;
  flex-shrink: 0;
}
.circular-chart { width: 56px; height: 56px; }
.circle-bg {
  fill: none;
  stroke: #eaf1fb;
  stroke-width: 3.5;
}
.circle {
  fill: none;
  stroke-width: 3.5;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dasharray 0.6s ease;
}
.badge-pct {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #1F285F;
}

/* Course info */
.course-info { flex: 1; }
.course-name-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}
.course-name { font-size: 15px; font-weight: 700; color: #1F285F; }
.tag-required {
  background: #eaf1fb;
  color: #1F285F;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 20px;
  border: 1px solid #c8d8ee;
}
.course-area { font-size: 12px; color: #888; display: block; margin-bottom: 10px; }

/* Barra segmentada */
.progress-bar-wrapper { display: flex; flex-direction: column; gap: 6px; }
.progress-bar {
  height: 10px;
  border-radius: 8px;
  background: #eaf1fb;
  display: flex;
  overflow: hidden;
  width: 100%;
  max-width: 500px;
}
.progress-segment { height: 100%; transition: width 0.5s ease; }
.progress-segment.not-started { background: #e74c3c; }
.progress-segment.in-progress { background: #f39c12; }
.progress-segment.completed   { background: #27ae60; }
.progress-legend {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #666; }
.legend-dot-sm {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.legend-dot-sm.not-started { background: #e74c3c; }
.legend-dot-sm.in-progress { background: #f39c12; }
.legend-dot-sm.completed   { background: #27ae60; }

.arrow-icon { flex-shrink: 0; margin-left: 12px; }
.no-data { text-align: center; color: #aaa; padding: 48px; font-size: 14px; }

.course-actions { display: flex; gap: 8px; align-items: center; margin-right: 8px; }
.btn-add, .btn-remove {
  background: #fff; border: 1px solid #c8d8ee; color: #1F285F; padding: 8px 10px; border-radius: 8px; font-weight: 700; cursor: pointer;
}
.btn-add:hover { background: #f0fbff; }
.btn-remove { border-color: #f5d2d2; color: #b71c1c; }
.btn-remove:hover { background: #fff5f5; }

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: #fff;
  border-radius: 14px;
  width: 520px;
  max-width: 94vw;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.modal-content h2 {
  margin: 0 0 8px 0;
  color: #1F285F;
  font-size: 20px;
}

.modal-hint {
  margin: 0 0 16px 0;
  color: #666;
  font-size: 13px;
}

.upload-area {
  border: 2px dashed #d8e1ee;
  border-radius: 12px;
  padding: 18px;
  background: #f8fbff;
}

.upload-area p {
  margin: 10px 0 0;
  color: #1F285F;
  font-size: 13px;
  font-weight: 600;
}

.alert-error {
  background: #fdf0ef;
  color: #c0392b;
  border-radius: 8px;
  padding: 10px 12px;
  margin-top: 12px;
  font-size: 13px;
}

.alert-success {
  background: #edfaf3;
  color: #1e8449;
  border-radius: 8px;
  padding: 10px 12px;
  margin-top: 12px;
  font-size: 13px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}

.btn-cancel {
  background: #fff;
  color: #555;
  border: 1px solid #cfd9e8;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
}

.btn-send {
  background: #1F285F;
  color: #fff;
  border: 1px solid #1F285F;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
}

.btn-send:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .summary-cards { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .courses-view { padding: 16px; }
  .summary-cards { grid-template-columns: 1fr 1fr; }
}
</style>