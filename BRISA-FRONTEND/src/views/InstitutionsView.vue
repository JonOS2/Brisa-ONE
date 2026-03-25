<template>
  <div class="institutions-view">
    <div class="header">
      <div class="header-left">
        <h1>Instituições</h1>
        <p class="subtitle">{{ institutions.length}} instituição(ões) cadastrada(s)</p>
      </div>
      <div class="header-actions">
        <button @click="openCreateModal" class="btn-create">
          <!-- Ícone Opção 1 (ativo): casa/instituição com + dentro -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"></path>
            <line x1="12" y1="10" x2="12" y2="16"></line>
            <line x1="9" y1="13" x2="15" y2="13"></line>
          </svg>
          Cadastrar
        </button>
        <button @click="showUploadModal = true" class="btn-import">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
      <input v-model="searchTerm" type="text" placeholder="Buscar por nome, sigla ou estado..." class="search-input" />
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregando instituições...</p>
    </div>

    <div v-else-if="error" class="error-box">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      {{ error }}
    </div>

    <div v-else-if="filteredInstitutions.length === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
      <h3>Nenhuma instituição encontrada</h3>
      <p>Comece cadastrando uma nova instituição</p>
    </div>

    <div v-else class="institutions-grid">
      <div v-for="institution in filteredInstitutions" :key="institution.id" class="institution-card">
        <div class="card-header">
          <div class="institution-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div class="card-actions">
            <button @click="openEditModal(institution)" class="btn-icon" title="Editar">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button @click="confirmDelete(institution)" class="btn-icon btn-danger" title="Excluir">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="institution-name">
            {{ institution.name }}
            <span v-if="institution.acronym" class="acronym">{{ institution.acronym }}</span>
          </div>

          <div class="institution-details">
            <!-- ✅ Estado exibido no card -->
            <div class="detail-item" v-if="institution.state">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{{ institution.state }}</span>
            </div>

            <div class="detail-item" v-if="institution.code">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>{{ institution.code }}</span>
            </div>

            <div class="detail-item" v-if="institution.localCoordinatorName">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>{{ institution.localCoordinatorName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Criar/Editar Instituição -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>{{ isEditing ? 'Editar Instituição' : 'Nova Instituição' }}</h2>
        
        <form @submit.prevent="handleSave" class="institution-form">
          <div class="form-grid">
            <div class="form-group full-width">
              <label>Nome da Instituição *</label>
              <input 
                v-model="form.name" 
                type="text" 
                placeholder="Ex: Universidade Federal de Alagoas"
                required
              />
            </div>

            <div class="form-group">
              <label>Sigla</label>
              <input 
                v-model="form.acronym" 
                type="text" 
                placeholder="Ex: UFAL"
              />
            </div>

            <div class="form-group">
              <label>Código</label>
              <input 
                v-model="form.code" 
                type="text" 
                placeholder="Código identificador"
              />
            </div>

            <!-- ✅ Campo Estado adicionado ao formulário -->
            <div class="form-group full-width">
              <label>Estado (UF) *</label>
              <input 
                v-model="form.state" 
                type="text" 
                placeholder="Ex: AL"
                maxlength="2"
                required
                style="text-transform: uppercase"
                @input="form.state = form.state.toUpperCase()"
              />
            </div>

            <div class="form-group full-width">
              <label>Coordenador Local</label>
              <input 
                v-model="form.localCoordinatorName" 
                type="text" 
                placeholder="Nome do coordenador"
              />
            </div>
          </div>

          <div v-if="formError" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {{ formError }}
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn-secondary">Cancelar</button>
            <button type="submit" :disabled="saving" class="btn-primary">
              {{ saving ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="showDeleteModal = false">
      <div class="modal-content modal-small" @click.stop>
        <h2>Confirmar Exclusão</h2>
        <p class="delete-message">Tem certeza que deseja excluir a instituição <strong>{{ institutionToDelete?.name }}</strong>?</p>
        
        <div v-if="deleteError" class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {{ deleteError }}
        </div>

        <div class="modal-actions">
          <button type="button" @click="showDeleteModal = false" class="btn-secondary">Cancelar</button>
          <button @click="handleDelete" :disabled="deleting" class="btn-danger">
            {{ deleting ? 'Excluindo...' : 'Excluir' }}
          </button>
        </div>
      </div>
    </div>
    <!-- Modal de Upload -->
    <div v-if="showUploadModal" class="modal-overlay" @click="closeUploadModal">
      <div class="modal-content" @click.stop>
        <h2>Importar Instituições via Excel</h2>
        <div
          class="upload-area"
          :class="{ 'drag-over': isDragging, 'has-file': selectedFile }"
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
          @click="fileInput.click()"
        >
          <input type="file" @change="handleFileSelect" accept=".xlsx,.xls" ref="fileInput" class="hidden-input" />
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
        <div v-if="uploadError" class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {{ uploadError }}
        </div>
        <div v-if="uploadSuccess" class="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          {{ uploadSuccess }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { institutionService } from '@/services/institutionService';

// ✅ Objeto base do formulário — centralizado para evitar inconsistências
const emptyForm = () => ({
  name: '',
  acronym: '',
  code: '',
  state: '',           // ✅ adicionado
  localCoordinatorName: ''
});

export default {
  name: 'InstitutionsView',
  setup() {
    const institutions = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const showModal = ref(false);
    const isEditing = ref(false);
    const form = ref(emptyForm());
    const saving = ref(false);
    const formError = ref(null);
    const showDeleteModal = ref(false);
    const institutionToDelete = ref(null);
    const deleting = ref(false);
    const deleteError = ref(null);
    const showUploadModal = ref(false);
    const selectedFile = ref(null);
    const uploading = ref(false);
    const uploadError = ref(null);
    const uploadSuccess = ref(null);
    const fileInput = ref(null);
    const isDragging = ref(false);
    const searchTerm = ref('');

    const filteredInstitutions = computed(() => {
      if (!searchTerm.value) return institutions.value;
      const term = searchTerm.value.toLowerCase();
      return institutions.value.filter(i =>
        i.name?.toLowerCase().includes(term) ||
        i.acronym?.toLowerCase().includes(term) ||
        i.state?.toLowerCase().includes(term)
      );
    });

    watch(searchTerm, () => { /* reatividade automática via computed */ });

    const loadInstitutions = async () => {
      loading.value = true;
      error.value = null;
      try {
        institutions.value = await institutionService.getAll();
      } catch (err) {
        error.value = 'Erro ao carregar instituições: ' + (err.response?.data?.message || err.message);
      } finally {
        loading.value = false;
      }
    };

    const openCreateModal = () => {
      isEditing.value = false;
      form.value = emptyForm(); // ✅ usa a função centralizada
      formError.value = null;
      showModal.value = true;
    };

    const openEditModal = (institution) => {
      isEditing.value = true;
      form.value = { ...institution }; // inclui state automaticamente pois vem da API
      formError.value = null;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      form.value = emptyForm(); // ✅ usa a função centralizada
      formError.value = null;
    };

    const handleSave = async () => {
      if (!form.value.name) {
        formError.value = 'Nome da instituição é obrigatório';
        return;
      }
      if (!form.value.state || form.value.state.trim().length !== 2) {
        formError.value = 'Estado (UF) é obrigatório e deve ter 2 letras';
        return;
      }

      saving.value = true;
      formError.value = null;

      try {
        if (isEditing.value) {
          await institutionService.update(form.value.id, form.value);
        } else {
          await institutionService.create(form.value);
        }
        closeModal();
        loadInstitutions();
      } catch (err) {
        formError.value = err.response?.data?.message || 'Erro ao salvar instituição';
      } finally {
        saving.value = false;
      }
    };

    const confirmDelete = (institution) => {
      institutionToDelete.value = institution;
      deleteError.value = null;
      showDeleteModal.value = true;
    };

    const handleDelete = async () => {
      if (!institutionToDelete.value) return;

      deleting.value = true;
      deleteError.value = null;

      try {
        await institutionService.delete(institutionToDelete.value.id);
        showDeleteModal.value = false;
        institutionToDelete.value = null;
        loadInstitutions();
      } catch (err) {
        deleteError.value = err.response?.data?.message || 'Erro ao excluir instituição';
      } finally {
        deleting.value = false;
      }
    };

    const handleFileSelect = (event) => {
      selectedFile.value = event.target.files[0];
      uploadError.value = null;
      uploadSuccess.value = null;
    };

    const handleDragOver = () => { isDragging.value = true; };
    const handleDragLeave = () => { isDragging.value = false; };

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
        await institutionService.importExcel(selectedFile.value);
        uploadSuccess.value = 'Arquivo importado com sucesso!';
        setTimeout(() => {
          closeUploadModal();
          loadInstitutions();
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
      if (fileInput.value) fileInput.value.value = '';
    };

    onMounted(() => {
      loadInstitutions();
    });

    return {
      institutions,
      filteredInstitutions,
      searchTerm,
      loading,
      error,
      showModal,
      isEditing,
      form,
      saving,
      formError,
      showDeleteModal,
      institutionToDelete,
      deleting,
      deleteError,
      showUploadModal,
      selectedFile,
      uploading,
      uploadError,
      uploadSuccess,
      fileInput,
      isDragging,
      openCreateModal,
      openEditModal,
      closeModal,
      handleSave,
      confirmDelete,
      handleDelete,
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
.institutions-view {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
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

.search-container {
  position: relative;
  max-width: 480px;
  margin-bottom: 28px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  font-size: 15px;
  color: #333;
  background: white;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #0288d1;
  box-shadow: 0 0 0 4px rgba(2, 136, 209, 0.08);
}

.search-input::placeholder {
  color: #aaa;
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

.btn-create svg,
.btn-import svg {
  flex-shrink: 0;
  display: block;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
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
}

.btn-import:hover {
  background: #e3f2fd;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(2, 136, 209, 0.2);
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
.upload-area:hover::before { opacity: 1; }
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
.hidden-input { display: none; }
.upload-icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}
.upload-icon {
  color: #90a4d4;
  transition: color 0.3s ease, transform 0.3s ease;
}
.upload-area:hover .upload-icon { color: #0288d1; transform: translateY(-4px); }
.upload-area.drag-over .upload-icon { color: #1F285F; transform: translateY(-6px) scale(1.1); }
.upload-icon.file-ok { color: #43a047; }
.upload-area:hover .upload-icon.file-ok { color: #2e7d32; }
.upload-text { display: flex; flex-direction: column; gap: 6px; }
.upload-main-text {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #3d4a6e;
  transition: color 0.3s ease;
}
.upload-area:hover .upload-main-text { color: #1F285F; }
.upload-link {
  color: #0288d1;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.file-name { color: #2e7d32; word-break: break-all; }
.upload-sub-text {
  margin: 0;
  font-size: 13px;
  color: #8a96b3;
  transition: color 0.3s ease;
}
.upload-area:hover .upload-sub-text { color: #5c6bc0; }
.alert-success {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 12px;
  background: #e8f5e9;
  color: #2e7d32;
  border-left: 4px solid #4caf50;
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
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  border-left: 5px solid #f44336;
  padding: 16px 20px;
  border-radius: 10px;
  color: #c62828;
  margin-bottom: 20px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.15);
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
  margin: 0;
  color: #666;
  font-size: 15px;
}

.institutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.institution-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.institution-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(31, 40, 95, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.institution-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #1F285F 0%, #0288d1 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(31, 40, 95, 0.2);
}

.institution-icon svg {
  color: white;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  width: 36px;
  height: 36px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  min-width: 36px;
  min-height: 36px;
}

.btn-icon:hover {
  border-color: #0288d1;
  background: #f5f9fc;
  transform: translateY(-2px);
}

.btn-icon svg {
  color: #666;
  flex-shrink: 0;
  display: block;
  width: 18px;
  height: 18px;
}

.btn-icon:hover svg {
  color: #0288d1;
}

.btn-icon.btn-danger {
  border-color: #f44336;
  background: white;
}

.btn-icon.btn-danger svg {
  color: #f44336 !important;
}

.btn-icon.btn-danger:hover {
  border-color: #d32f2f;
  background: #ffebee;
}

.btn-icon.btn-danger:hover svg {
  color: #d32f2f !important;
}

.card-body {
  padding-top: 16px;
}

.institution-name {
  font-size: 20px;
  font-weight: 700;
  color: #1F285F;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.acronym {
  display: inline-flex;
  padding: 4px 12px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #0288d1;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
}

.institution-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
  font-size: 14px;
}

.detail-item svg {
  color: #0288d1;
  flex-shrink: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(31, 40, 95, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  padding: 32px;
  border-radius: 16px;
  max-width: 700px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(31, 40, 95, 0.3);
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-small {
  max-width: 500px;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-content h2 {
  margin: 0 0 24px 0;
  color: #1F285F;
  font-size: 24px;
  font-weight: 700;
}

.institution-form {
  margin-top: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #1F285F;
  font-weight: 600;
  font-size: 14px;
}

.form-group input {
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.2s ease;
  background: white;
}

.form-group input:focus {
  outline: none;
  border-color: #0288d1;
  box-shadow: 0 0 0 4px rgba(2, 136, 209, 0.1);
}

.alert {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
}

.alert-error {
  background: #ffebee;
  color: #c62828;
  border-left: 4px solid #f44336;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.btn-secondary {
  padding: 12px 24px;
  background: white;
  color: #666;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: #999;
  background: #f5f5f5;
}

.btn-primary {
  padding: 12px 24px;
  background: linear-gradient(135deg, #1F285F 0%, #0288d1 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(31, 40, 95, 0.2);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(31, 40, 95, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-danger {
  padding: 12px 24px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-danger:hover:not(:disabled) {
  background: #d32f2f;
}

.btn-danger:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.delete-message {
  color: #555;
  font-size: 15px;
  margin-bottom: 24px;
  line-height: 1.5;
}
</style>