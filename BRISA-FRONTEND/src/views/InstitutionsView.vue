<template>
  <div class="institutions-view">
    <div class="header">
      <div class="header-left">
        <h1>Instituições</h1>
        <p class="subtitle">{{ institutions.length}} instituição(ões) cadastrada(s)</p>
      </div>
      <button @click="openCreateModal" class="btn-create">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        Nova Instituição
      </button>
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

    <div v-else-if="institutions.length === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
      <h3>Nenhuma instituição encontrada</h3>
      <p>Comece cadastrando uma nova instituição</p>
    </div>

    <div v-else class="institutions-grid">
      <div v-for="institution in institutions" :key="institution.id" class="institution-card">
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
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { institutionService } from '@/services/institutionService';

export default {
  name: 'InstitutionsView',
  setup() {
    const institutions = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const showModal = ref(false);
    const isEditing = ref(false);
    const form = ref({
      name: '',
      acronym: '',
      code: '',
      localCoordinatorName: ''
    });
    const saving = ref(false);
    const formError = ref(null);
    const showDeleteModal = ref(false);
    const institutionToDelete = ref(null);
    const deleting = ref(false);
    const deleteError = ref(null);

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
      form.value = {
        name: '',
        acronym: '',
        code: '',
        localCoordinatorName: ''
      };
      formError.value = null;
      showModal.value = true;
    };

    const openEditModal = (institution) => {
      isEditing.value = true;
      form.value = { ...institution };
      formError.value = null;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      form.value = {
        name: '',
        acronym: '',
        code: '',
        localCoordinatorName: ''
      };
      formError.value = null;
    };

    const handleSave = async () => {
      if (!form.value.name) {
        formError.value = 'Nome da instituição é obrigatório';
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

    onMounted(() => {
      loadInstitutions();
    });

    return {
      institutions,
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
      openCreateModal,
      openEditModal,
      closeModal,
      handleSave,
      confirmDelete,
      handleDelete
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

.btn-create {
  background: linear-gradient(135deg, #1F285F 0%, #0288d1 100%);
  color: white;
  border: none;
  padding: 12px 24px;
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
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  box-shadow: 0 0 0 4px rgba(2, 136, 209, 0.08);
}

.form-group input::placeholder {
  color: #999;
}

.delete-message {
  color: #666;
  font-size: 15px;
  margin-bottom: 24px;
  line-height: 1.6;
}

.delete-message strong {
  color: #1F285F;
  font-weight: 600;
}

.alert {
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-weight: 500;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.alert svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.alert-error {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  color: #c62828;
  border-left: 5px solid #f44336;
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.2);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 2px solid #f0f0f0;
}

.btn-primary {
  background: linear-gradient(135deg, #1F285F 0%, #0288d1 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(31, 40, 95, 0.2);
}

.btn-primary:hover:not(:disabled) {
  box-shadow: 0 6px 20px rgba(31, 40, 95, 0.3);
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  border-color: #0288d1;
  color: #0288d1;
}

.btn-danger {
  background: linear-gradient(135deg, #d32f2f 0%, #f44336 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(211, 47, 47, 0.2);
}

.btn-danger:hover:not(:disabled) {
  box-shadow: 0 6px 20px rgba(211, 47, 47, 0.3);
  transform: translateY(-1px);
}

.btn-danger:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .institutions-grid {
    grid-template-columns: 1fr;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-create {
    width: 100%;
    justify-content: center;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
