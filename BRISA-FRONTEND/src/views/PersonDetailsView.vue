<template>
  <div class="person-details-view">
    <div class="header">
      <button @click="goBack" class="btn-back">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Voltar
      </button>
      <div class="header-actions" v-if="!isEditing && person">
        <button @click="isEditing = true" class="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Editar
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregando...</p>
    </div>

    <div v-else-if="error" class="error-box">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      {{ error }}
    </div>

    <div v-else class="content">
      <div class="person-card">
        <div class="card-header">
          <div class="avatar-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h1 v-if="!isEditing">{{ person.name }}</h1>
          <input 
            v-else 
            v-model="editForm.name" 
            type="text" 
            class="edit-title"
            placeholder="Nome completo *"
            required
          />
        </div>

        <form @submit.prevent="handleSave" class="person-form">
          <div class="form-grid">
            <div class="form-group">
              <label>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                E-mail *
              </label>
              <input 
                v-model="editForm.email" 
                type="email" 
                :readonly="!isEditing"
                :class="{ readonly: !isEditing }"
                placeholder="email@exemplo.com"
                required
              />
            </div>

            <div class="form-group">
              <label>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                CPF
              </label>
              <input 
                v-model="editForm.cpf" 
                type="text" 
                :readonly="!isEditing"
                :class="{ readonly: !isEditing }"
                placeholder="000.000.000-00"
                @input="formatCPFInput"
              />
            </div>

            <div class="form-group">
              <label>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Data de Nascimento
              </label>
              <input 
                v-model="editForm.birthDate" 
                type="date" 
                :readonly="!isEditing"
                :class="{ readonly: !isEditing }"
              />
            </div>

            <div class="form-group">
              <label>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4M12 8h.01"></path>
                </svg>
                Gênero
              </label>
              <select 
                v-model="editForm.gender" 
                :disabled="!isEditing"
                :class="{ readonly: !isEditing }"
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
                <option value="Prefiro não informar">Prefiro não informar</option>
              </select>
            </div>

            <div class="form-group full-width">
              <label>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Nível de Escolaridade
              </label>
              <input 
                v-model="editForm.educationLevel" 
                type="text" 
                :readonly="!isEditing"
                :class="{ readonly: !isEditing }"
                placeholder="Ex: Ensino Superior Completo"
              />
            </div>

            <div class="form-group full-width">
              <label>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Endereço
              </label>
              <input 
                v-model="editForm.address" 
                type="text" 
                :readonly="!isEditing"
                :class="{ readonly: !isEditing }"
                placeholder="Rua, número, bairro"
              />
            </div>

            <div class="form-group">
              <label>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                  <circle cx="12" cy="9" r="2.5"></circle>
                </svg>
                Cidade
              </label>
              <input 
                v-model="editForm.city" 
                type="text" 
                :readonly="!isEditing"
                :class="{ readonly: !isEditing }"
                placeholder="Cidade - UF"
              />
            </div>
          </div>

          <div class="form-actions" v-if="isEditing">
            <button type="button" @click="cancelEdit" class="btn-secondary">
              Cancelar
            </button>
            <button type="submit" class="btn-primary" :disabled="saving">
              <span v-if="!saving">Salvar</span>
              <span v-else class="loading-text">
                <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-opacity="0.25"/>
                  <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                </svg>
                Salvando...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { peopleService } from '@/services/peopleService';

export default {
  name: 'PersonDetailsView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const person = ref(null);
    const editForm = ref({
      name: '',
      email: '',
      cpf: '',
      birthDate: '',
      gender: '',
      educationLevel: '',
      address: '',
      city: ''
    });
    const isEditing = ref(false);
    const loading = ref(true);
    const saving = ref(false);
    const error = ref('');

    const loadPerson = async () => {
      try {
        loading.value = true;
        error.value = '';
        const id = route.params.id;
        const data = await peopleService.getById(id);
        person.value = data;
        editForm.value = { ...data };
      } catch (err) {
        error.value = 'Erro ao carregar dados da pessoa';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    const handleSave = async () => {
      if (!editForm.value.name || !editForm.value.email) {
        error.value = 'Nome e e-mail são obrigatórios';
        return;
      }

      try {
        saving.value = true;
        error.value = '';
        await peopleService.update(person.value.id, editForm.value);
        person.value = { ...editForm.value, id: person.value.id };
        isEditing.value = false;
      } catch (err) {
        error.value = err.response?.data?.message || 'Erro ao salvar alterações';
        console.error(err);
      } finally {
        saving.value = false;
      }
    };

    const cancelEdit = () => {
      editForm.value = { ...person.value };
      isEditing.value = false;
      error.value = '';
    };

    const formatCPFInput = (event) => {
      let value = event.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      
      if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
      } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
      }
      
      editForm.value.cpf = value;
    };

    const goBack = () => {
      router.push('/people');
    };

    onMounted(() => {
      loadPerson();
    });

    return {
      person,
      editForm,
      isEditing,
      loading,
      saving,
      error,
      handleSave,
      cancelEdit,
      formatCPFInput,
      goBack
    };
  }
};
</script>

<style scoped>
.person-details-view {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  color: #1F285F;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-back:hover {
  border-color: #0288d1;
  color: #0288d1;
  transform: translateX(-2px);
}

.header-actions {
  display: flex;
  gap: 12px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e0e0e0;
  border-top-color: #0288d1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: #ffebee;
  border: 1px solid #ef5350;
  border-radius: 10px;
  color: #c62828;
  margin-bottom: 24px;
}

.person-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 2px solid #f5f5f5;
}

.avatar-large {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #1F285F 0%, #0288d1 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(31, 40, 95, 0.2);
}

.avatar-large svg {
  color: white;
}

.card-header h1 {
  margin: 0;
  color: #1F285F;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
}

.edit-title {
  font-size: 24px;
  font-weight: 700;
  color: #1F285F;
  text-align: center;
  padding: 12px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  transition: all 0.2s ease;
}

.edit-title:focus {
  outline: none;
  border-color: #0288d1;
  box-shadow: 0 0 0 4px rgba(2, 136, 209, 0.08);
}

.person-form {
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: #1F285F;
  font-weight: 600;
  font-size: 14px;
}

.form-group label svg {
  color: #0288d1;
}

.form-group input,
.form-group select {
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.2s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #0288d1;
  box-shadow: 0 0 0 4px rgba(2, 136, 209, 0.08);
}

.form-group input.readonly,
.form-group select:disabled {
  background: #f5f5f5;
  color: #666;
  cursor: default;
  border-color: #e0e0e0;
}

.form-group input.readonly:focus {
  box-shadow: none;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 2px solid #f5f5f5;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #1F285F 0%, #0288d1 100%);
  color: white;
  border: none;
  border-radius: 10px;
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
  padding: 12px 24px;
  background: white;
  color: #1F285F;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  border-color: #0288d1;
  color: #0288d1;
}

.loading-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .person-details-view {
    padding: 16px;
  }

  .person-card {
    padding: 24px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
