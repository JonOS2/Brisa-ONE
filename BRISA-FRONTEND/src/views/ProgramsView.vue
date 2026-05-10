<template>
  <div class="programs-view">
    <header class="page-header">
      <div>
        <h1>Programas</h1>
        <p class="subtitle">Gerenciar programas e turmas</p>
      </div>
      <div class="header-actions">
        <button type="button" class="primary-btn" @click="showCreateModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          Cadastrar
        </button>
        <button type="button" class="ghost-btn" @click="showUploadModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <path d="M12 3v12"></path>
            <path d="m7 10 5 5 5-5"></path>
            <path d="M5 21h14"></path>
          </svg>
          Importar
        </button>
      </div>
    </header>
    <!-- Stat Cards -->
    <div class="stats-grid">
      <StatCard
        label="Total de programas"
        :value="stats.totalProgramas"
        :icon="Award"
        icon-color="primary"
      />
      <StatCard
        label="Programas ativos"
        :value="stats.ativosCount"
        :icon="CheckCircle"
        icon-color="success"
      />
      <StatCard
        label="Em espera"
        :value="stats.esperaCount"
        :icon="Clock"
        icon-color="info"
      />
      <StatCard
        label="Em imersão"
        :value="stats.imersaoCount"
        :icon="Users"
        icon-color="purple"
      />
      <StatCard
        label="Em nivelamento"
        :value="stats.nivelamentoCount"
        :icon="Building2"
        icon-color="warning"
      />
      <StatCard
        label="Encerrados"
        :value="stats.encerradosCount"
        :icon="CheckCircleGrey"
        icon-color="muted"
      />
    </div>

    <!-- Tab Filter -->
    <TabFilter
      :tabs="tabs"
      :active-tab-id="activeTab"
      @tab-change="activeTab = $event"
    />

    <div class="search-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" class="search-icon">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input v-model="searchTerm" type="text" placeholder="Buscar por nome do programa, turma, parceiro, instituição ou localidade..."
        class="search-input" />
    </div>
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregando programas...</p>
    </div>
    <div v-else-if="error" class="error-box">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      {{ error }}
    </div>
    <div v-else-if="filteredPrograms.length === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      <h3>Nenhum programa encontrado</h3>
      <p>Comece criando um novo programa ou importe via Excel</p>
    </div>
    <div v-else class="programs-grid">
      <div v-for="program in filteredPrograms" :key="program.id" class="program-card" @click="viewClasses(program)">
        <div class="card-header">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </div>
          <button @click.stop="editProgram(program)" class="btn-icon" title="Editar">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
        </div>
        <div class="card-body">
          <h3 class="program-name">{{ program.name }}</h3>
          <div class="program-code">{{ program.code }}</div>
          <div class="program-details">
            <div class="detail-item" v-if="program.contractNumber">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span>{{ program.contractNumber }}</span>
            </div>
            <div class="detail-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{{ formatDate(program.startDate) }} - {{ formatDate(program.endDate) }}</span>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="stat-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <!-- ✅ Corrigido: usa classesCount do backend em vez de program.classes?.length -->
            <span>{{ classesCount[program.id] || 0 }} turma(s)</span>
          </div>
          <div class="arrow-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal de Criação/Edição -->
    <div v-if="showCreateModal" class="modal-overlay" @click="closeCreateModal">
      <div class="modal-content modal-form" @click.stop>
        <h2>{{ editingProgram ? 'Editar Programa' : 'Novo Programa' }}</h2>
        <form @submit.prevent="saveProgram">
          <div class="form-group">
            <label for="code">Código *</label>
            <input id="code" v-model="programForm.code" type="text" required placeholder="Ex: PROG001" />
          </div>
          <div class="form-group">
            <label for="name">Nome *</label>
            <input id="name" v-model="programForm.name" type="text" required placeholder="Nome do programa" />
          </div>
          <div class="form-group">
            <label for="contractNumber">Número do Contrato</label>
            <input id="contractNumber" v-model="programForm.contractNumber" type="text"
              placeholder="Número do contrato" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="startDate">Data Início</label>
              <input id="startDate" v-model="programForm.startDate" type="date" />
            </div>
            <div class="form-group">
              <label for="endDate">Data Fim</label>
              <input id="endDate" v-model="programForm.endDate" type="date" />
            </div>
          </div>
          <div v-if="formError" class="error">{{ formError }}</div>
          <div class="modal-actions">
            <button type="button" @click="closeCreateModal" class="btn-secondary">Cancelar</button>
            <button type="submit" :disabled="saving || formError" class="btn-primary">
              {{ saving ? 'Salvando...' : 'Salvar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Modal de Upload -->
    <div v-if="showUploadModal" class="modal-overlay" @click="closeUploadModal">
      <div class="modal-content" @click.stop>
        <h2>Importar Programas via Excel</h2>
        <div
          class="upload-area"
          :class="{ 'drag-over': isDragging, 'has-file': selectedFile }"
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
          @click="fileInput.click()"
        >
          <input
            type="file"
            @change="handleFileSelect"
            accept=".xlsx,.xls"
            ref="fileInput"
            class="hidden-input"
          />

          <div class="upload-icon-wrapper">
            <svg v-if="!selectedFile" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="upload-icon">
              <polyline points="16 16 12 12 8 16"></polyline>
              <line x1="12" y1="12" x2="12" y2="21"></line>
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="upload-icon file-ok">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <polyline points="9 15 11 17 15 13"></polyline>
            </svg>
          </div>

          <div class="upload-text">
            <p v-if="!selectedFile" class="upload-main-text">
              <span v-if="isDragging">Solte o arquivo aqui</span>
              <span v-else>Solte aqui ou <span class="upload-link">selecione o arquivo</span></span>
            </p>
            <p v-else class="upload-main-text file-name">{{ selectedFile.name }}</p>
            <p class="upload-sub-text">{{ selectedFile ? 'Clique para trocar o arquivo' : 'Formatos aceitos: .xlsx, .xls' }}</p>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="closeUploadModal" class="btn-secondary">Cancelar</button>
          <button @click="uploadFile" :disabled="!selectedFile || uploading" class="btn-primary">
            {{ uploading ? 'Enviando...' : 'Enviar' }}
          </button>
        </div>
        <div v-if="uploadError" class="error">{{ uploadError }}</div>
        <div v-if="uploadSuccess" class="success">{{ uploadSuccess }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { programService } from '@/services/programService';
import { classService } from '@/services/classService';
import StatCard from '@/components/StatCard.vue';
import TabFilter from '@/components/TabFilter.vue';
import {
  Award,
  CheckCircle,
  Clock,
  Users,
  Building2,
} from 'lucide-vue-next';

export default {
  name: 'ProgramsView',
  components: {
    StatCard,
    TabFilter,
  },
  setup() {
    const router = useRouter();
    const programs = ref([]);
    const classesCount = ref({});
    const loading = ref(false);
    const error = ref(null);
    const searchTerm = ref('');
    const activeTab = ref('ativos');
    const showUploadModal = ref(false);
    const showCreateModal = ref(false);
    const showNewClassModal = ref(false);
    const selectedFile = ref(null);
    const uploading = ref(false);
    const uploadError = ref(null);
    const uploadSuccess = ref(null);
    const fileInput = ref(null);
    const isDragging = ref(false);
    const editingProgram = ref(null);
    const saving = ref(false);
    const formError = ref(null);

    const programForm = ref({
      code: '',
      name: '',
      contractNumber: '',
      startDate: '',
      endDate: ''
    });

    const tabs = [
      { id: 'ativos', label: 'Programas ativos', count: 4 },
      { id: 'espera', label: 'Em espera', count: 2 },
      { id: 'todos', label: 'Todos os programas', count: 18 },
      { id: 'encerrados', label: 'Encerrados', count: 7 },
    ];

    const stats = computed(() => {
      const total = programs.value.length;
      const ativos = programs.value.filter(p => p.status === 'andamento').length;
      const espera = programs.value.filter(p => p.status === 'espera').length;
      const imersao = programs.value.filter(p => p.etapaAtual === 'Imersão').length;
      const nivelamento = programs.value.filter(p => p.etapaAtual === 'Nivelamento').length;
      const encerrados = programs.value.filter(p => p.status === 'encerrado').length;

      return {
        totalProgramas: total || 0,
        ativosCount: ativos || 0,
        esperaCount: espera || 0,
        imersaoCount: imersao || 0,
        nivelamentoCount: nivelamento || 0,
        encerradosCount: encerrados || 0,
      };
    });

    watch(
      () => [programForm.value.startDate, programForm.value.endDate],
      ([startDate, endDate]) => {
        if (!startDate || !endDate) {
          formError.value = null;
          return;
        }
        if (endDate < startDate) {
          formError.value = 'Data inválida: a data de fim não pode ser anterior à data de início';
        } else {
          formError.value = null;
        }
      }
    );

    const filteredPrograms = computed(() => {
      let result = programs.value;

      // Filter by tab
      if (activeTab.value === 'ativos') {
        result = result.filter(p => p.status === 'andamento');
      } else if (activeTab.value === 'espera') {
        result = result.filter(p => p.status === 'espera');
      } else if (activeTab.value === 'encerrados') {
        result = result.filter(p => p.status === 'encerrado');
      }
      // 'todos' shows all programs

      // Filter by search term
      if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase();
        result = result.filter(program =>
          program.code?.toLowerCase().includes(term) ||
          program.name?.toLowerCase().includes(term)
        );
      }

      return result;
    });

    // ✅ Carrega programas e contagem de turmas em paralelo
    const loadPrograms = async () => {
      loading.value = true;
      error.value = null;
      try {
        const [progs, counts] = await Promise.all([
          programService.getAll(),
          classService.getCountByProgram().catch(() => ({}))
        ]);
        programs.value = progs;
        classesCount.value = counts;
      } catch (err) {
        error.value = 'Erro ao carregar programas: ' + (err.response?.data?.message || err.message);
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (date) => {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('pt-BR');
    };

    const viewClasses = (program) => {
      router.push({ name: 'ProgramDetails', params: { id: program.id } });
    };

    const editProgram = (program) => {
      editingProgram.value = program;
      programForm.value = {
        code: program.code,
        name: program.name,
        contractNumber: program.contractNumber || '',
        startDate: program.startDate || '',
        endDate: program.endDate || ''
      };
      showCreateModal.value = true;
    };

    const saveProgram = async () => {
      if (formError.value) return;
      saving.value = true;
      formError.value = null;
      try {
        if (editingProgram.value) {
          await programService.update(editingProgram.value.id, programForm.value);
        } else {
          await programService.create(programForm.value);
        }
        closeCreateModal();
        loadPrograms();
      } catch (err) {
        formError.value = 'Erro ao salvar programa: ' + (err.response?.data?.message || err.message);
      } finally {
        saving.value = false;
      }
    };

    const closeCreateModal = () => {
      showCreateModal.value = false;
      editingProgram.value = null;
      formError.value = null;
      programForm.value = {
        code: '',
        name: '',
        contractNumber: '',
        startDate: '',
        endDate: ''
      };
    };

    const handleFileSelect = (event) => {
      selectedFile.value = event.target.files[0];
      uploadError.value = null;
      uploadSuccess.value = null;
    };

    const handleDragOver = () => {
      isDragging.value = true;
    };

    const handleDragLeave = () => {
      isDragging.value = false;
    };

    const handleDrop = (event) => {
      isDragging.value = false;
      const file = event.dataTransfer.files[0];
      if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
        selectedFile.value = file;
        uploadError.value = null;
        uploadSuccess.value = null;
      } else if (file) {
        uploadError.value = 'Formato inválido. Use arquivos .xlsx ou .xls.';
      }
    };

    const uploadFile = async () => {
      if (!selectedFile.value) return;
      uploading.value = true;
      uploadError.value = null;
      uploadSuccess.value = null;
      try {
        await programService.importExcel(selectedFile.value);
        uploadSuccess.value = 'Arquivo importado com sucesso!';
        setTimeout(() => {
          closeUploadModal();
          loadPrograms();
        }, 2000);
      } catch (err) {
        uploadError.value = 'Erro ao importar arquivo: ' + (err.response?.data?.message || err.message);
      } finally {
        uploading.value = false;
      }
    };

    const closeUploadModal = () => {
      showUploadModal.value = false;
      selectedFile.value = null;
      uploadError.value = null;
      uploadSuccess.value = null;
      if (fileInput.value) {
        fileInput.value.value = '';
      }
    };

    onMounted(() => {
      loadPrograms();
    });

    return {
      // UI State
      programs,
      classesCount,
      loading,
      error,
      searchTerm,
      activeTab,
      filteredPrograms,
      tabs,
      stats,
      // Modal State
      showUploadModal,
      showCreateModal,
      showNewClassModal,
      selectedFile,
      uploading,
      uploadError,
      uploadSuccess,
      fileInput,
      isDragging,
      editingProgram,
      saving,
      formError,
      programForm,
      // Icons
      Award,
      CheckCircle,
      Clock,
      Users,
      Building2,
      CheckCircleGrey: CheckCircle,
      // Methods
      formatDate,
      viewClasses,
      editProgram,
      saveProgram,
      closeCreateModal,
      handleFileSelect,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      uploadFile,
      closeUploadModal
    };
  }
};
</script>

<style scoped>
.programs-view {
  min-height: 100%;
  background: #eef3f8;
  padding: 14px 16px 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
  gap: 16px;
  background: #fff;
  border: 1px solid #dfe7f1;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(13, 27, 42, 0.05);
  padding: 18px 18px 16px;
}

.page-header h1 {
  margin: 0 0 4px 0;
  color: #13233f;
  font-size: 28px;
  line-height: 1.1;
  font-weight: 800;
}

.subtitle {
  margin: 6px 0 0;
  color: #6a7a90;
  font-size: 14px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.primary-btn,
.ghost-btn {
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
  font-size: 14px;
}

.ghost-btn {
  background: #fff;
  color: #13233f;
}

.primary-btn {
  background: #14b8a6;
  color: #fff;
  border-color: #14b8a6;
  box-shadow: 0 8px 16px rgba(20, 184, 166, 0.20);
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

.stats-grid {
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
}

@media (max-width: 1280px) {
  .stats-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.search-container {
  position: relative;
  margin-bottom: 16px;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9AA4C0;
}

.search-input {
  width: 100%;
  padding: 10px 14px 10px 38px;
  border: 1px solid #D1D6E8;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
  background: #fff;
  color: #171F4A;
}

.search-input:focus {
  outline: none;
  border-color: #6377BA;
  box-shadow: 0 0 0 3px rgba(99, 119, 186, 0.15);
}

.search-input::placeholder {
  color: #9AA4C0;
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  max-width: 100%;
}

.program-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(23, 31, 74, 0.08);
  transition: all 0.3s;
  cursor: pointer;
  border: 1px solid #E1E6F0;
}

.program-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(23, 31, 74, 0.12);
  border-color: #D1D6E8;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card-icon {
  width: 36px;
  height: 36px;
  background: #2A3566;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.btn-icon {
  background: #f4f5f7;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6377BA;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #E8EBF5;
  color: #2A3566;
}

.card-body {
  margin-bottom: 10px;
}

.program-name {
  margin: 0 0 6px 0;
  color: #171F4A;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
}

.program-code {
  display: inline-block;
  background: #E8EBF5;
  color: #2A3566;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 10px;
}

.program-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #50619E;
  font-size: 12px;
}

.detail-item svg {
  color: #9AA4C0;
  flex-shrink: 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.stat-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #E8EBF5;
  padding: 5px 8px;
  border-radius: 6px;
  color: #2A3566;
  font-size: 11px;
  font-weight: 600;
}

.stat-badge svg {
  color: #6377BA;
}

.arrow-icon {
  color: #6377BA;
  display: flex;
  align-items: center;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #666;
}
.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #f0f0f0;
  border-top-color: #0288d1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.error-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffebee;
  border-left: 4px solid #f44336;
  padding: 16px;
  border-radius: 8px;
  color: #c62828;
}
.empty-state {
  text-align: center;
  padding: 80px 20px;
}
.empty-state svg {
  color: #e0e0e0;
  margin-bottom: 16px;
}
.empty-state h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 20px;
}
.empty-state p {
  margin: 0 0 24px 0;
  color: #666;
  font-size: 15px;
}
.success {
  background: #e8f5e9;
  color: #2e7d32;
  border-left: 4px solid #4caf50;
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 12px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.modal-content {
  background: white;
  padding: 32px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(31, 40, 95, 0.2);
}
.modal-content h2 {
  margin: 0 0 24px 0;
  color: #1F285F;
  font-size: 24px;
  font-weight: 700;
}
.modal-form {
  max-width: 600px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #1F285F;
  font-size: 14px;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.2s;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0288d1;
  box-shadow: 0 0 0 3px rgba(2, 136, 209, 0.1);
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
/* Upload / Dropzone */
.upload-area {
  margin: 20px 0;
  padding: 40px 32px;
  border: 2px dashed #c5cae9;
  border-radius: 16px;
  text-align: center;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}
.upload-area::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(2, 136, 209, 0.06) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}
.upload-area:hover {
  border-color: #0288d1;
  background: linear-gradient(135deg, #f0f8ff 0%, #e3f2fd 100%);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(2, 136, 209, 0.18);
}
.upload-area:hover::before {
  opacity: 1;
}
.upload-area.drag-over {
  border-color: #1F285F;
  background: linear-gradient(135deg, #e8ebff 0%, #dce8ff 100%);
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 16px 40px rgba(31, 40, 95, 0.2);
}
.upload-area.has-file {
  border-color: #43a047;
  border-style: solid;
  background: linear-gradient(135deg, #f1fff4 0%, #e8f5e9 100%);
}
.hidden-input {
  display: none;
}
.upload-icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}
.upload-icon {
  color: #90a4d4;
  transition: color 0.3s ease, transform 0.3s ease;
}
.upload-area:hover .upload-icon {
  color: #0288d1;
  transform: translateY(-4px);
}
.upload-area.drag-over .upload-icon {
  color: #1F285F;
  transform: translateY(-6px) scale(1.1);
}
.upload-icon.file-ok {
  color: #43a047;
}
.upload-area:hover .upload-icon.file-ok {
  color: #2e7d32;
}
.upload-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.upload-main-text {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #3d4a6e;
  transition: color 0.3s ease;
}
.upload-area:hover .upload-main-text {
  color: #1F285F;
}
.upload-link {
  color: #0288d1;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.file-name {
  color: #2e7d32;
  word-break: break-all;
}
.upload-sub-text {
  margin: 0;
  font-size: 13px;
  color: #8a96b3;
  transition: color 0.3s ease;
}
.upload-area:hover .upload-sub-text {
  color: #5c6bc0;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}
.modal-actions .btn-primary {
  background: #0288d1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.modal-actions .btn-primary:hover:not(:disabled) {
  background: #0277bd;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(2, 136, 209, 0.3);
}
.modal-actions .btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
.modal-actions .btn-secondary {
  background: white;
  color: #666;
  border: 2px solid #e0e0e0;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.modal-actions .btn-secondary:hover {
  background: #f5f5f5;
  border-color: #ccc;
}

@media (max-width: 860px) {
  .programs-view {
    padding: 16px 12px 24px;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .page-header h1 {
    font-size: 24px;
  }

  .header-actions {
    width: 100%;
  }

  .btn-create,
  .btn-import {
    flex: 1;
    justify-content: center;
  }

  .search-container {
    max-width: 100%;
  }

  .programs-grid {
    max-width: 100%;
    grid-template-columns: 1fr;
  }
}
</style>