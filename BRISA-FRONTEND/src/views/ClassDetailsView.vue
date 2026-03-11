<template>
  <div class="class-details-view">
    <div v-if="loading" class="loading">Carregando...</div>
    
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else>
      <!-- Cabeçalho da Turma -->
      <div class="class-header">
        <button @click="goBack" class="btn-back">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Voltar
      </button>
        <div class="class-info">
          <h1>Turma: {{ classData.code }}</h1>
          <div class="class-meta">
            <span class="meta-item"><strong>Programa:</strong> {{ classData.program?.name }}</span>
            <span class="meta-item"><strong>Início:</strong> {{ formatDate(classData.startDate) }}</span>
            <span class="meta-item"><strong>Fim:</strong> {{ formatDate(classData.endDate) }}</span>
            <span class="meta-item"><strong>Local:</strong> {{ classData.location?.name || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- Etapas da Turma -->
      <div class="stages-section">
        <div class="section-header">
          <h2>Etapas da Turma</h2>
          <button @click="showCreateStageModal = true" class="btn-primary">
            + Criar Etapa
          </button>
        </div>

        <div v-if="stages.length === 0" class="no-data">
          Nenhuma etapa criada para esta turma
        </div>

        <div v-else class="stages-grid">
          <div v-for="stage in stages" :key="stage.id" class="stage-card" @click="goToStageDetails(stage)">
            <div class="stage-card-header">
              <h3>{{ stage.name }}</h3>
              <span class="candidates-count">{{ getStageCandidatesCount(stage.id) }} candidatos</span>
            </div>
            <p v-if="stage.description" class="stage-description">{{ stage.description }}</p>
            <div class="stage-card-footer" @click.stop>
              <button @click="openEditStageModal(stage)" class="btn-edit-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Editar
              </button>
              <button @click="deleteStage(stage.id)" class="btn-delete-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
                Deletar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Criar Etapa -->
    <div v-if="showCreateStageModal" class="modal-overlay" @click="closeCreateStageModal">
      <div class="modal-content" @click.stop>
        <h2>Criar Nova Etapa</h2>
        <div class="form-group">
          <label for="stageName">Nome da Etapa *</label>
          <input 
            id="stageName"
            v-model="newStage.name" 
            type="text" 
            class="form-input"
            placeholder="Ex: Seleção, Entrevista, Prova..."
          />
        </div>
        <div class="form-group">
          <label for="stageDescription">Descrição</label>
          <textarea 
            id="stageDescription"
            v-model="newStage.description" 
            class="form-input"
            rows="3"
            placeholder="Descrição da etapa (opcional)"
          ></textarea>
        </div>
        <div class="modal-actions">
          <button @click="closeCreateStageModal" class="btn-secondary">Cancelar</button>
          <button @click="createStage" :disabled="!newStage.name || creatingStage" class="btn-primary">
            {{ creatingStage ? 'Criando...' : 'Criar' }}
          </button>
        </div>
        <div v-if="stageError" class="error">{{ stageError }}</div>
      </div>
    </div>

    <!-- Modal de Editar Etapa -->
    <div v-if="showEditStageModal" class="modal-overlay" @click="closeEditStageModal">
      <div class="modal-content" @click.stop>
        <h2>Editar Etapa</h2>
        <div class="form-group">
          <label for="editStageName">Nome da Etapa *</label>
          <input 
            id="editStageName"
            v-model="editingStage.name" 
            type="text" 
            class="form-input"
            placeholder="Ex: Seleção, Entrevista, Prova..."
          />
        </div>
        <div class="form-group">
          <label for="editStageDescription">Descrição</label>
          <textarea 
            id="editStageDescription"
            v-model="editingStage.description" 
            class="form-input"
            rows="3"
            placeholder="Descrição da etapa (opcional)"
          ></textarea>
        </div>
        <div class="modal-actions">
          <button @click="closeEditStageModal" class="btn-secondary">Cancelar</button>
          <button @click="updateStage" :disabled="!editingStage.name || updatingStage" class="btn-primary">
            {{ updatingStage ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
        <div v-if="editStageError" class="error">{{ editStageError }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { classService } from '@/services/classService';
import { stageService } from '@/services/stageService';

export default {
  name: 'ClassDetailsView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const classData = ref({});
    const stages = ref([]);
    const stageCandidatesCount = ref({});
    const loading = ref(false);
    const error = ref(null);

    // Stage modal states
    const showCreateStageModal = ref(false);
    const creatingStage = ref(false);
    const stageError = ref(null);

    const showEditStageModal = ref(false);
    const updatingStage = ref(false);
    const editStageError = ref(null);

    const newStage = ref({
      name: '',
      description: ''
    });

    const editingStage = ref({
      id: null,
      name: '',
      description: ''
    });

    const programId = computed(() => route.params.programId);
    const classId = computed(() => route.params.classId);

    const loadClassDetails = async () => {
      loading.value = true;
      error.value = null;
      try {
        classData.value = await classService.getById(classId.value);
        await loadStages();
      } catch (err) {
        error.value = 'Erro ao carregar detalhes da turma: ' + (err.response?.data?.message || err.message);
      } finally {
        loading.value = false;
      }
    };

    const loadStages = async () => {
      try {
        stages.value = await stageService.getByClassId(classId.value);
        // Carregar contagem de candidatos para todas as etapas em uma única requisição
        stageCandidatesCount.value = await stageService.getCandidatesCountByClassId(classId.value);
      } catch (err) {
        console.error('Erro ao carregar etapas:', err);
      }
    };

    const getStageCandidatesCount = (stageId) => {
      return stageCandidatesCount.value[stageId] || 0;
    };

    const createStage = async () => {
      creatingStage.value = true;
      stageError.value = null;

      try {
        await stageService.create({
          name: newStage.value.name,
          classId: classId.value,
          description: newStage.value.description
        });
        await loadStages();
        closeCreateStageModal();
      } catch (err) {
        stageError.value = 'Erro ao criar etapa: ' + (err.response?.data?.message || err.message);
      } finally {
        creatingStage.value = false;
      }
    };

    const deleteStage = async (stageId) => {
      if (!confirm('Tem certeza que deseja deletar esta etapa?')) return;

      try {
        await stageService.delete(stageId);
        await loadStages();
      } catch (err) {
        alert('Erro ao deletar etapa: ' + (err.response?.data?.message || err.message));
      }
    };

    const openEditStageModal = (stage) => {
      editingStage.value = {
        id: stage.id,
        name: stage.name,
        description: stage.description || ''
      };
      showEditStageModal.value = true;
    };

    const updateStage = async () => {
      updatingStage.value = true;
      editStageError.value = null;

      try {
        await stageService.update(editingStage.value.id, {
          name: editingStage.value.name,
          description: editingStage.value.description
        });
        await loadStages();
        closeEditStageModal();
      } catch (err) {
        editStageError.value = 'Erro ao atualizar etapa: ' + (err.response?.data?.message || err.message);
      } finally {
        updatingStage.value = false;
      }
    };

    const closeEditStageModal = () => {
      showEditStageModal.value = false;
      editingStage.value = { id: null, name: '', description: '' };
      editStageError.value = null;
    };

    const goToStageDetails = (stage) => {
      router.push({ 
        name: 'StageDetails', 
        params: { 
          programId: programId.value,
          classId: classId.value,
          stageId: stage.id 
        } 
      });
    };

    const closeCreateStageModal = () => {
      showCreateStageModal.value = false;
      newStage.value = { name: '', description: '' };
      stageError.value = null;
    };

    const formatDate = (date) => {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('pt-BR');
    };

    const goBack = () => {
      router.push({ name: 'ProgramDetails', params: { id: programId.value } });
    };

    onMounted(() => {
      loadClassDetails();
    });

    return {
      classData,
      stages,
      loading,
      error,
      showCreateStageModal,
      creatingStage,
      stageError,
      newStage,
      showEditStageModal,
      updatingStage,
      editStageError,
      editingStage,
      getStageCandidatesCount,
      createStage,
      deleteStage,
      openEditStageModal,
      updateStage,
      closeEditStageModal,
      goToStageDetails,
      closeCreateStageModal,
      formatDate,
      goBack
    };
  }
};
</script>

<style scoped>
.class-details-view {
  padding: 20px;
  max-width: 1600px;
  margin: 0 auto;
}

.class-header {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.btn-back {
  background: white;
  border: 2px solid #e0e0e0;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #666;
  margin-bottom: 15px;
  transition: all 0.2s;
}

.btn-back:hover {
  border-color: #0288d1;
  color: #0288d1;
}

.class-info h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 24px;
}

.class-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  color: #666;
  font-size: 14px;
}

.meta-item {
  display: flex;
  gap: 5px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

/* Stages Section */
.stages-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stage-card {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s;
  cursor: pointer;
  background: white;
  display: flex;
  flex-direction: column;
  min-height: 180px;
}

.stage-card:hover {
  border-color: #0288d1;
  box-shadow: 0 4px 12px rgba(2, 136, 209, 0.2);
  transform: translateY(-2px);
}

.stage-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.stage-card-header h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.candidates-count {
  background: #e3f2fd;
  color: #0288d1;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.stage-description {
  margin: 0 0 16px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  flex-grow: 1;
}

.stage-card-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  margin-top: auto;
}

.btn-edit-card {
  padding: 8px 14px;
  background: white;
  color: #0288d1;
  border: 2px solid #0288d1;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-edit-card:hover {
  background: #0288d1;
  color: white;
}

.btn-delete-card {
  padding: 8px 14px;
  background: white;
  color: #dc3545;
  border: 2px solid #dc3545;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-delete-card:hover {
  background: #dc3545;
  color: white;
}

.btn-primary {
  background: white;
  color: #0288d1;
  border: 2px solid #0288d1;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(2, 136, 209, 0.1);
}

.btn-primary:hover {
  background: #0288d1;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(2, 136, 209, 0.25);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: white;
  color: #666;
  border: 2px solid #e0e0e0;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  background: #f8f8f8;
  border-color: #bbb;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.btn-secondary:active {
  transform: translateY(0);
  box-shadow: none;
}

.loading, .error, .no-data {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error {
  color: #dc3545;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #0288d1;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>
