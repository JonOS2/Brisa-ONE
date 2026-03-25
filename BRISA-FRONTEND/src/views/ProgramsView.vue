<template>
  <div class="programs-view">
    <div class="header">
      <div class="header-left">
        <h1>Programas</h1>
        <p class="subtitle">Gerenciar programas e turmas</p>
      </div>
      <div class="header-actions">
        <button @click="showCreateModal = true" class="btn-create">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Cadastrar
        </button>
        <button @click="showUploadModal = true" class="btn-import">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          Importar
        </button>
      </div>
    </div>
    <div class="search-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" class="search-icon">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input v-model="searchTerm" type="text" placeholder="Buscar por código ou nome do programa..."
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
import { programService } from '@/services/programService';
import { classService } from '@/services/classService'; // ✅ import adicionado
import { useRouter } from 'vue-router';

export default {
  name: 'ProgramsView',
  setup() {
    const router = useRouter();
    const programs = ref([]);
    const classesCount = ref({}); // ✅ novo ref para contagem de turmas
    const loading = ref(false);
    const error = ref(null);
    const searchTerm = ref('');
    const showUploadModal = ref(false);
    const showCreateModal = ref(false);
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
      if (!searchTerm.value) return programs.value;
      const term = searchTerm.value.toLowerCase();
      return programs.value.filter(program =>
        program.code?.toLowerCase().includes(term) ||
        program.name?.toLowerCase().includes(term)
      );
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
      programs,
      classesCount, // ✅ exposto para o template
      loading,
      error,
      searchTerm,
      filteredPrograms,
      showUploadModal,
      showCreateModal,
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
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}
.header-left h1 {
  margin: 0 0 4px 0;
  color: #1F285F;
  font-size: 32px;
  font-weight: 700;
}
.subtitle {
  margin: 0;
  color: #666;
  font-size: 15px;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.btn-create {
  height: 44px;
  background: linear-gradient(135deg, #1F285F 0%, #0288d1 100%);
  color: white;
  border: none;
  padding: 0 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(31, 40, 95, 0.2);
}
.btn-create:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(31, 40, 95, 0.3);
}
.btn-create:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(31, 40, 95, 0.15);
}
.btn-import {
  height: 44px;
  box-sizing: border-box;
  background: white;
  color: #0288d1;
  border: 2px solid #0288d1;
  padding: 0 22px;
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
.btn-import:hover {
  background: #0288d1;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(2, 136, 209, 0.25);
}
.btn-import:active {
  transform: translateY(0);
}
.search-container {
  position: relative;
  margin-bottom: 32px;
  max-width: 500px;
}
.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}
.search-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
}
.search-input:focus {
  outline: none;
  border-color: #0288d1;
  box-shadow: 0 0 0 3px rgba(2, 136, 209, 0.1);
}
.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}
.program-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(31, 40, 95, 0.08);
  transition: all 0.3s;
  cursor: pointer;
  border: 2px solid transparent;
}
.program-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(31, 40, 95, 0.12);
  border-color: #0288d1;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.card-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #0288d1 0%, #0277bd 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.btn-icon {
  background: #f5f5f5;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
}
.btn-icon:hover {
  background: #0288d1;
  color: white;
}
.card-body {
  margin-bottom: 20px;
}
.program-name {
  margin: 0 0 8px 0;
  color: #1F285F;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
}
.program-code {
  display: inline-block;
  background: #e3f2fd;
  color: #0277bd;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}
.program-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
}
.detail-item svg {
  color: #999;
  flex-shrink: 0;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}
.stat-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f7fa;
  padding: 8px 12px;
  border-radius: 8px;
  color: #1F285F;
  font-size: 14px;
  font-weight: 600;
}
.stat-badge svg {
  color: #0288d1;
}
.arrow-icon {
  color: #0288d1;
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
</style>