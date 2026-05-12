<template>
  <div class="figma-page">
    <ConfirmDialog ref="confirmDialog" />

    <div v-if="loading" class="state-box">Carregando...</div>
    <div v-else-if="error" class="state-box state-error">{{ error }}</div>

    <template v-else>
      <header class="hero">
        <div class="hero-inner">
          <div class="hero-top">
            <button class="back-btn" @click="goBack">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Voltar para Programas</span>
            </button>

            <div class="hero-actions">
              <button class="btn-outline" @click="goToPeople">Pessoas</button>
              <button class="btn-primary" @click="goToClassCourses">Cursos</button>
            </div>
          </div>

          <div class="hero-main">
            <h1>{{ classData.program?.name || 'Programa sem nome' }}</h1>

            <div class="badge-row">
              <span class="badge badge-teal">Turma {{ classData.code || '-' }}</span>
              <span class="badge" :class="statusBadgeClass">{{ classStatusLabel }}</span>
              <span class="badge badge-purple">Etapa: {{ currentStageLabel }}</span>
            </div>

            <div class="meta-row">
              <span>
                <strong>Local:</strong>
                {{ classData.location?.name || '-' }}
              </span>
              <span>
                <strong>Início:</strong>
                {{ formatDate(classData.startDate) }}
              </span>
              <span>
                <strong>Fim:</strong>
                {{ formatDate(classData.endDate) }}
              </span>
            </div>
          </div>
        </div>

        <div class="hero-cards">
          <article class="hero-card">
            <span class="hero-label">Inscritos</span>
            <strong>{{ totalCandidates }}</strong>
            <small>Candidatos cadastrados nas etapas</small>
          </article>
          <article class="hero-card">
            <span class="hero-label">Etapas</span>
            <strong>{{ stages.length }}</strong>
            <small>Fluxo da turma</small>
          </article>
          <article class="hero-card">
            <span class="hero-label">Progresso</span>
            <strong>{{ progressPct }}%</strong>
            <small>Ciclo geral da turma</small>
          </article>
          <article class="hero-card">
            <span class="hero-label">Próxima etapa</span>
            <strong>{{ nextStageLabel }}</strong>
            <small>Próximo marco do ciclo</small>
          </article>
        </div>

        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="tab"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
      </header>

      <main class="content">
        <section v-if="activeTab === 'visao-geral'" class="stack">
          <article class="status-card">
            <div class="status-head">
              <h3>Situação Atual</h3>
              <span class="pill pill-green">{{ classStatusLabel }}</span>
              <span class="pill pill-purple">Etapa: {{ currentStageLabel }}</span>
            </div>

            <div class="status-grid">
              <div>
                <span>Período da turma</span>
                <strong>{{ formatDate(classData.startDate) }} a {{ formatDate(classData.endDate) }}</strong>
              </div>
              <div>
                <span>Próximo marco</span>
                <strong>{{ nextStageLabel }}</strong>
              </div>
              <div>
                <span>Local</span>
                <strong>{{ classData.location?.name || '-' }}</strong>
              </div>
              <div>
                <span>Programa</span>
                <strong>{{ classData.program?.name || '-' }}</strong>
              </div>
              <div>
                <span>Etapas cadastradas</span>
                <strong>{{ stages.length }}</strong>
              </div>
              <div>
                <span>Total de candidatos</span>
                <strong>{{ totalCandidates }}</strong>
              </div>
            </div>
          </article>

          <article class="panel">
            <div class="panel-head">
              <h3>Ciclo da Turma</h3>
              <div class="panel-progress">Progresso Geral <strong>{{ progressPct }}%</strong></div>
            </div>

            <div class="progress-track">
              <div class="progress-fill" :style="{ width: `${progressPct}%` }" />
            </div>

            <div class="cycle">
              <div v-for="(item, index) in cycle" :key="item" class="cycle-item">
                <div class="cycle-pill" :class="{ done: index < currentStageIndex, current: index === currentStageIndex }">
                  {{ item }}
                </div>
                <div v-if="index < cycle.length - 1" class="cycle-line" :class="{ done: index < currentStageIndex }" />
              </div>
            </div>
          </article>

          <div class="grid-3">
            <article class="panel mini">
              <h4>Processo Seletivo</h4>
              <div class="mini-list">
                <div><span>Inscritos</span><strong>{{ totalCandidates }}</strong></div>
                <div><span>Etapas de seleção</span><strong>{{ stageBucket.selecao }}</strong></div>
                <div><span>Status</span><strong>{{ classStatusLabel }}</strong></div>
              </div>
            </article>

            <article class="panel mini">
              <h4>Nivelamento</h4>
              <div class="mini-list">
                <div><span>Etapas de nivelamento</span><strong>{{ stageBucket.nivelamento }}</strong></div>
                <div><span>Candidatos</span><strong>{{ totalCandidates }}</strong></div>
                <div><span>Gestão detalhada</span><strong>Via Cursos</strong></div>
              </div>
            </article>

            <article class="panel mini">
              <h4>Imersão</h4>
              <div class="mini-list">
                <div><span>Etapas de imersão</span><strong>{{ stageBucket.imersao }}</strong></div>
                <div><span>Status atual</span><strong>{{ classStatusLabel }}</strong></div>
                <div><span>Próximo passo</span><strong>{{ nextStageLabel }}</strong></div>
              </div>
            </article>
          </div>
        </section>

        <section v-else-if="activeTab === 'pessoas'" class="stack">
          <article class="panel">
            <h3>Pessoas vinculadas à turma</h3>
            <p class="muted">Abrir a tela de pessoas com o filtro desta turma.</p>
            <div class="actions-inline">
              <button class="btn-primary" @click="goToPeople">Abrir Pessoas</button>
            </div>
          </article>
        </section>

        <section v-else-if="activeTab === 'processo-seletivo'" class="stack">
          <article class="panel">
            <h3>Processo Seletivo</h3>
            <div class="metrics">
              <div class="metric"><span>Total de inscritos</span><strong>{{ totalCandidates }}</strong></div>
              <div class="metric"><span>Etapa atual</span><strong>{{ currentStageLabel }}</strong></div>
              <div class="metric"><span>Status da turma</span><strong>{{ classStatusLabel }}</strong></div>
              <div class="metric"><span>Etapas cadastradas</span><strong>{{ stages.length }}</strong></div>
            </div>
          </article>
        </section>

        <section v-else class="stack">
          <article class="panel">
            <div class="panel-head">
              <h3>Etapas da Turma</h3>
              <button class="btn-primary" @click="showCreateStageModal = true">+ Criar Etapa</button>
            </div>

            <div v-if="stages.length === 0" class="state-box">Nenhuma etapa criada para esta turma.</div>

            <div v-else class="stage-grid">
              <article v-for="stage in stages" :key="stage.id" class="stage-card">
                <div class="stage-top">
                  <h4>{{ displayStageName(stage.name) }}</h4>
                  <span class="stage-count">{{ getStageCandidatesCount(stage.id) }} candidatos</span>
                </div>
                <p>{{ stage.description || 'Sem descrição cadastrada.' }}</p>

                <div class="stage-actions">
                  <button class="btn-outline" @click="goToStageDetails(stage)">Detalhes</button>
                  <button class="btn-outline" @click="openEditStageModal(stage)">Editar</button>
                  <button class="btn-danger" @click="deleteStage(stage.id)">Excluir</button>
                </div>
              </article>
            </div>
          </article>
        </section>
      </main>
    </template>

    <div v-if="showCreateStageModal" class="modal-overlay" @click="closeCreateStageModal">
      <div class="modal" @click.stop>
        <h2>Criar Nova Etapa</h2>
        <div class="form-row">
          <label for="stageName">Nome da Etapa *</label>
          <input id="stageName" v-model="newStage.name" type="text" class="field" placeholder="Ex: Seleção, Entrevista, Prova..." />
        </div>
        <div class="form-row">
          <label for="stageDescription">Descrição</label>
          <textarea id="stageDescription" v-model="newStage.description" class="field" rows="3" placeholder="Descrição da etapa (opcional)" />
        </div>
        <div class="modal-actions">
          <button class="btn-outline" @click="closeCreateStageModal">Cancelar</button>
          <button class="btn-primary" :disabled="!newStage.name || creatingStage" @click="createStage">
            {{ creatingStage ? 'Criando...' : 'Criar' }}
          </button>
        </div>
        <div v-if="stageError" class="state-error">{{ stageError }}</div>
      </div>
    </div>

    <div v-if="showEditStageModal" class="modal-overlay" @click="closeEditStageModal">
      <div class="modal" @click.stop>
        <h2>Editar Etapa</h2>
        <div class="form-row">
          <label for="editStageName">Nome da Etapa *</label>
          <input id="editStageName" v-model="editingStage.name" type="text" class="field" />
        </div>
        <div class="form-row">
          <label for="editStageDescription">Descrição</label>
          <textarea id="editStageDescription" v-model="editingStage.description" class="field" rows="3" />
        </div>
        <div class="modal-actions">
          <button class="btn-outline" @click="closeEditStageModal">Cancelar</button>
          <button class="btn-primary" :disabled="!editingStage.name || updatingStage" @click="updateStage">
            {{ updatingStage ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
        <div v-if="editStageError" class="state-error">{{ editStageError }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { classService } from '@/services/classService';
import { stageService } from '@/services/stageService';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

const cycle = ['Inscrição', 'Seleção', 'Nivelamento', 'Imersão', 'Encerrado'];

export default {
  name: 'ClassDetailsView',
  components: { ConfirmDialog },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const classData = ref({});
    const stages = ref([]);
    const stageCandidatesCount = ref({});
    const loading = ref(false);
    const error = ref(null);
    const activeTab = ref('visao-geral');
    const tabs = [
      { id: 'visao-geral', label: 'Visão Geral' },
      { id: 'pessoas', label: 'Pessoas' },
      { id: 'processo-seletivo', label: 'Processo Seletivo' },
      { id: 'etapas', label: 'Etapas' },
    ];

    const showCreateStageModal = ref(false);
    const creatingStage = ref(false);
    const stageError = ref(null);
    const showEditStageModal = ref(false);
    const updatingStage = ref(false);
    const editStageError = ref(null);
    const confirmDialog = ref();
    const newStage = ref({ name: '', description: '' });
    const editingStage = ref({ id: null, name: '', description: '' });

    const programId = computed(() => route.params.programId);
    const classId = computed(() => route.params.classId);

    const normalizeText = (value) =>
      String(value ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    const mapCycle = (value) => {
      const normalized = normalizeText(value);
      if (normalized.includes('inscri')) return 'Inscrição';
      if (normalized.includes('sele')) return 'Seleção';
      if (normalized.includes('nivel')) return 'Nivelamento';
      if (normalized.includes('imers')) return 'Imersão';
      if (normalized.includes('encer')) return 'Encerrado';
      return '';
    };

    const classStatusLabel = computed(() => {
      const value = normalizeText(classData.value?.status);
      if (value.includes('encerr')) return 'Encerrado';
      if (value.includes('inscri') || value.includes('espera')) return 'Inscrição aberta';
      if (value.includes('andamento') || value.includes('ativo') || value.includes('active')) return 'Em andamento';
      return classData.value?.status || 'Sem status';
    });

    const statusBadgeClass = computed(() => {
      const value = normalizeText(classData.value?.status);
      if (value.includes('encerr')) return 'badge-slate';
      if (value.includes('inscri') || value.includes('espera')) return 'badge-blue';
      return 'badge-green';
    });

    const currentStageIndex = computed(() => {
      const fromClass = mapCycle(classData.value?.currentStage || classData.value?.status);
      if (fromClass) return cycle.indexOf(fromClass);

      let maxIndex = 0;
      stages.value.forEach((stage) => {
        const index = cycle.indexOf(mapCycle(stage.name));
        if (index > maxIndex) maxIndex = index;
      });
      return maxIndex;
    });

    const currentStageLabel = computed(() => cycle[currentStageIndex.value] || 'Inscrição');
    const nextStageLabel = computed(() => cycle[currentStageIndex.value + 1] || 'Ciclo concluído');
    const progressPct = computed(() => Math.round((currentStageIndex.value / (cycle.length - 1)) * 100));
    const totalCandidates = computed(() => Object.values(stageCandidatesCount.value || {}).reduce((sum, item) => sum + Number(item || 0), 0));

    const stageBucket = computed(() => {
      const summary = { selecao: 0, nivelamento: 0, imersao: 0 };
      stages.value.forEach((stage) => {
        const value = normalizeText(stage.name);
        if (value.includes('sele')) summary.selecao += 1;
        if (value.includes('nivel')) summary.nivelamento += 1;
        if (value.includes('imers')) summary.imersao += 1;
      });
      return summary;
    });

    const loadStages = async () => {
      try {
        stages.value = await stageService.getByClassId(classId.value);
        stageCandidatesCount.value = await stageService.getCandidatesCountByClassId(classId.value);
      } catch (err) {
        console.error('Erro ao carregar etapas:', err);
      }
    };

    const loadClassDetails = async () => {
      loading.value = true;
      error.value = null;
      try {
        classData.value = await classService.getById(classId.value);
        await loadStages();
      } catch (err) {
        error.value = `Erro ao carregar detalhes da turma: ${err.response?.data?.message || err.message}`;
      } finally {
        loading.value = false;
      }
    };

    const getStageCandidatesCount = (stageId) => stageCandidatesCount.value[stageId] || 0;

    const createStage = async () => {
      creatingStage.value = true;
      stageError.value = null;
      try {
        await stageService.create({
          name: newStage.value.name,
          classId: classId.value,
          description: newStage.value.description,
        });
        await loadStages();
        closeCreateStageModal();
      } catch (err) {
        stageError.value = `Erro ao criar etapa: ${err.response?.data?.message || err.message}`;
      } finally {
        creatingStage.value = false;
      }
    };

    const openEditStageModal = (stage) => {
      editingStage.value = {
        id: stage.id,
        name: stage.name,
        description: stage.description || '',
      };
      showEditStageModal.value = true;
    };

    const updateStage = async () => {
      updatingStage.value = true;
      editStageError.value = null;
      try {
        await stageService.update(editingStage.value.id, {
          name: editingStage.value.name,
          description: editingStage.value.description,
        });
        await loadStages();
        closeEditStageModal();
      } catch (err) {
        editStageError.value = `Erro ao atualizar etapa: ${err.response?.data?.message || err.message}`;
      } finally {
        updatingStage.value = false;
      }
    };

    const deleteStage = async (stageId) => {
      const confirmed = await confirmDialog.value.show('Tem certeza que deseja deletar esta etapa?', 'Deletar');
      if (!confirmed) return;
      try {
        await stageService.delete(stageId);
        await loadStages();
      } catch (err) {
        alert(`Erro ao deletar etapa: ${err.response?.data?.message || err.message}`);
      }
    };

    const goToStageDetails = (stage) => {
      const normalized = (stage.name || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase();
      const query = normalized === 'SELECAO' || normalized === 'NIVELAMENTO' ? { openAdd: 'true' } : {};
      router.push({
        name: 'StageDetails',
        params: { programId: programId.value, classId: classId.value, stageId: stage.id },
        query,
      });
    };

    const displayStageName = (name) => {
      if (!name) return '';
      const normalized = name.normalize('NFD').replace(/\p{Diacritic}/gu, '').toUpperCase();
      if (normalized === 'SELECAO') return 'SELEÇÃO';
      if (normalized === 'IMERSAO') return 'IMERSÃO';
      return name;
    };

    const goToPeople = () => {
      const programName = classData.value?.program?.name || 'Programa';
      const classCode = classData.value?.code || '-';
      router.push({ path: '/people', query: { programa: `${programName} - Turma ${classCode}` } });
    };

    const goToClassCourses = () => {
      router.push({
        name: 'ClassCourses',
        params: { programId: programId.value, classId: classId.value },
      });
    };

    const closeCreateStageModal = () => {
      showCreateStageModal.value = false;
      newStage.value = { name: '', description: '' };
      stageError.value = null;
    };

    const closeEditStageModal = () => {
      showEditStageModal.value = false;
      editingStage.value = { id: null, name: '', description: '' };
      editStageError.value = null;
    };

    const formatDate = (date) => {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('pt-BR');
    };

    const goBack = () => router.back();

    onMounted(() => {
      loadClassDetails();
    });

    return {
      activeTab,
      classData,
      classStatusLabel,
      closeCreateStageModal,
      closeEditStageModal,
      confirmDialog,
      createStage,
      creatingStage,
      currentStageIndex,
      currentStageLabel,
      cycle,
      deleteStage,
      displayStageName,
      editStageError,
      editingStage,
      error,
      formatDate,
      getStageCandidatesCount,
      goBack,
      goToClassCourses,
      goToPeople,
      goToStageDetails,
      loading,
      newStage,
      nextStageLabel,
      openEditStageModal,
      progressPct,
      showCreateStageModal,
      showEditStageModal,
      stageBucket,
      stageError,
      stages,
      statusBadgeClass,
      tabs,
      totalCandidates,
      updateStage,
      updatingStage,
    };
  },
};
</script>

<style>
.figma-page {
  --brand-900: #0f172a;
  --brand-800: #1e293b;
  --brand-600: #0f766e;
  --brand-300: #e2e8f0;
  --slate-50: #f8fafc;
  --slate-100: #f1f5f9;
  --slate-200: #e2e8f0;
  --slate-400: #94a3b8;
  --slate-600: #475569;
  --slate-700: #334155;
  --teal-500: #14b8a6;
  --teal-600: #0d9488;
  --teal-50: #f0fdfa;
  --green-700: #047857;
  --green-100: #dcfce7;
  --blue-700: #1d4ed8;
  --blue-100: #eff6ff;
  --purple-700: #6d28d9;
  --purple-100: #f3e8ff;
  --danger-700: #be123c;
  --danger-100: #ffe4e6;
  min-height: 100vh;
  background: var(--slate-50);
  padding: 0;
}

.hero,
.content {
  max-width: none;
  margin: 0;
}

.hero {
  background: #fff;
  border: none;
  border-bottom: 1px solid var(--slate-200);
  overflow: hidden;
  box-shadow: none;
}

.hero-inner {
  padding: 24px 32px 0;
}

.hero-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.back-btn {
  border: none;
  background: transparent;
  color: var(--slate-600);
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.back-btn:hover {
  color: var(--brand-900);
}

.hero-actions {
  display: flex;
  gap: 8px;
}

.hero-main {
  margin-top: 12px;
}

.hero-main h1 {
  margin: 0;
  color: var(--brand-900);
  font-size: 24px;
  line-height: 1.2;
  font-weight: 600;
}

.badge-row {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge {
  border-radius: 999px;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
}

.badge-teal {
  background: var(--teal-50);
  color: #115e59;
  border-color: #99f6e4;
}

.badge-green {
  background: var(--green-100);
  color: var(--green-700);
  border-color: #bbf7d0;
}

.badge-blue {
  background: var(--blue-100);
  color: var(--blue-700);
  border-color: #bfdbfe;
}

.badge-slate {
  background: var(--slate-100);
  color: var(--slate-700);
  border-color: var(--brand-300);
}

.badge-purple {
  background: var(--purple-100);
  color: var(--purple-700);
  border-color: #ddd6fe;
}

.meta-row {
  margin-top: 10px;
  color: var(--slate-600);
  font-size: 14px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-cards {
  margin-top: 20px;
  padding: 0 32px 24px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.hero-card {
  background: var(--slate-100);
  border: 1px solid var(--slate-200);
  border-radius: 10px;
  padding: 12px;
}

.hero-label {
  display: block;
  color: var(--slate-600);
  font-size: 12px;
}

.hero-card strong {
  display: block;
  margin-top: 3px;
  color: var(--brand-900);
  font-size: 30px;
  line-height: 1.2;
  font-weight: 600;
}

.hero-card small {
  display: block;
  margin-top: 4px;
  color: var(--slate-600);
  font-size: 12px;
}

.tabs {
  border-top: 1px solid var(--slate-200);
  padding: 0 32px;
  display: flex;
  gap: 2px;
  overflow-x: auto;
}

.tab {
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  padding: 13px 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--slate-600);
  cursor: pointer;
  white-space: nowrap;
}

.tab.active {
  color: var(--teal-600);
  border-bottom-color: var(--teal-500);
}

.content {
  margin-top: 0;
  padding: 24px 32px;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-card {
  background: linear-gradient(90deg, var(--teal-50) 0%, #f5f3ff 100%);
  border: 1px solid #99f6e4;
  border-radius: 12px;
  padding: 14px;
}

.status-head {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.status-head h3 {
  margin: 0;
  color: var(--brand-900);
  font-size: 18px;
}

.pill {
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
}

.pill-green {
  color: var(--green-700);
  background: var(--green-100);
}

.pill-purple {
  color: var(--purple-700);
  background: var(--purple-100);
}

.status-grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
}

.status-grid span {
  display: block;
  font-size: 12px;
  color: var(--slate-600);
}

.status-grid strong {
  display: block;
  margin-top: 2px;
  color: var(--brand-900);
  font-size: 14px;
}

.panel {
  background: #fff;
  border: 1px solid var(--brand-300);
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 1px 6px rgba(23, 31, 74, 0.06);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.panel-head h3,
.panel h3 {
  margin: 0;
  color: var(--brand-900);
  font-size: 18px;
}

.panel h4 {
  margin: 0 0 10px;
  color: var(--brand-900);
  font-size: 15px;
}

.panel-progress {
  font-size: 13px;
  color: var(--slate-600);
}

.panel-progress strong {
  color: var(--brand-600);
}

.progress-track {
  background: #dbe2f0;
  border-radius: 999px;
  height: 8px;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--teal-500) 0%, var(--teal-600) 100%);
}

.cycle {
  margin-top: 11px;
  display: flex;
  gap: 4px;
  overflow-x: auto;
}

.cycle-item {
  display: flex;
  align-items: center;
}

.cycle-pill {
  font-size: 12px;
  color: var(--slate-600);
  background: var(--slate-100);
  border: 1px solid var(--brand-300);
  border-radius: 8px;
  padding: 6px 10px;
  white-space: nowrap;
}

.cycle-pill.done {
  color: var(--green-700);
  background: var(--green-100);
  border-color: #bbf7d0;
}

.cycle-pill.current {
  color: #115e59;
  background: var(--teal-50);
  border-color: #99f6e4;
}

.cycle-line {
  width: 14px;
  height: 2px;
  background: #cbd5e1;
}

.cycle-line.done {
  background: var(--teal-500);
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.mini-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mini-list div {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  border-bottom: 1px solid #edf2ff;
  padding-bottom: 5px;
  color: var(--slate-600);
  font-size: 13px;
}

.mini-list strong {
  color: var(--brand-900);
}

.metrics {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.metric {
  border: 1px solid var(--brand-300);
  background: var(--slate-100);
  border-radius: 10px;
  padding: 10px;
}

.metric span {
  display: block;
  color: var(--slate-600);
  font-size: 12px;
}

.metric strong {
  display: block;
  margin-top: 4px;
  color: var(--brand-900);
  font-size: 20px;
}

.muted {
  margin: 6px 0 0;
  color: var(--slate-600);
  font-size: 14px;
}

.actions-inline {
  margin-top: 12px;
}

.stage-grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
}

.stage-card {
  border: 1px solid var(--brand-300);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  min-height: 170px;
}

.stage-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.stage-top h4 {
  margin: 0;
  color: var(--brand-900);
  font-size: 17px;
}

.stage-count {
  border-radius: 999px;
  border: 1px solid #bfdbfe;
  background: var(--blue-100);
  color: var(--blue-700);
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  white-space: nowrap;
}

.stage-card p {
  margin: 10px 0 0;
  color: var(--slate-600);
  font-size: 14px;
  flex-grow: 1;
}

.stage-actions {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn-outline,
.btn-primary,
.btn-danger {
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid transparent;
}

.btn-outline {
  color: var(--brand-900);
  border-color: var(--brand-300);
  background: #fff;
}

.btn-outline:hover {
  background: var(--slate-100);
}

.btn-primary {
  color: #fff;
  background: var(--teal-500);
  border-color: var(--teal-500);
}

.btn-primary:hover {
  background: var(--teal-600);
  border-color: var(--teal-600);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-danger {
  color: var(--danger-700);
  border-color: #fecdd3;
  background: #fff;
}

.btn-danger:hover {
  background: var(--danger-100);
}

.state-box {
  border: 1px solid var(--brand-300);
  border-radius: 12px;
  background: #fff;
  padding: 20px;
  text-align: center;
  color: var(--slate-600);
}

.state-error {
  color: var(--danger-700);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 16px;
}

.modal {
  width: min(520px, 100%);
  background: #fff;
  border: 1px solid var(--brand-300);
  border-radius: 12px;
  padding: 16px;
}

.modal h2 {
  margin: 0 0 12px;
  color: var(--brand-900);
  font-size: 22px;
}

.form-row {
  margin-bottom: 10px;
}

.form-row label {
  display: block;
  margin-bottom: 5px;
  font-size: 13px;
  font-weight: 700;
  color: var(--slate-700);
}

.field {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--brand-300);
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  color: var(--brand-900);
}

.field:focus {
  outline: none;
  border-color: var(--teal-500);
  box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.2);
}

.modal-actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

@media (max-width: 1200px) {
  .hero-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .status-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .grid-3 {
    grid-template-columns: 1fr;
  }

  .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .figma-page {
    padding: 10px;
  }

  .hero-inner {
    padding: 14px 14px 0;
  }

  .hero-top {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .hero-main h1 {
    font-size: 22px;
  }

  .hero-cards {
    padding: 0 14px 14px;
    grid-template-columns: 1fr;
  }

  .tabs {
    padding: 0 14px;
  }

  .status-grid,
  .metrics {
    grid-template-columns: 1fr;
  }
}
</style>
