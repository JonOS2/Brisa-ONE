<template>
  <div class="courses-view">
    <div class="header">
      <div class="header-left">
        <h1>Cursos</h1>
        <p class="subtitle">{{ courses.length }} curso(s) — Gerencie, crie manualmente ou importe via Excel</p>
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
      <input v-model="searchTerm" type="text" placeholder="Buscar por nome ou competência..." class="search-input" />
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregando cursos...</p>
    </div>

    <div v-else-if="courses.length === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      <h3>Nenhum curso encontrado</h3>
      <p>Crie manualmente ou importe via Excel (Nome | Descrição | Competencia)</p>
    </div>

    <div v-else class="courses-grid">
      <div v-for="c in filtered" :key="c.id" class="institution-card">
        <div class="card-header">
          <div class="institution-icon">
            <!-- Book icon for courses -->
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H20v15a1 1 0 0 1-1 1H5.5A2.5 2.5 0 0 1 3 17.5z"></path>
              <path d="M20 4v16"></path>
              <path d="M8 8h8"></path>
            </svg>
          </div>
          <div class="card-actions">
            <button @click="openEditModal(c)" class="btn-icon" title="Editar">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button @click="confirmDelete(c)" class="btn-icon btn-danger" title="Excluir">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
            <button @click="openDetails(c.id)" class="btn-icon" title="Ver">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="institution-name">
            {{ c.name }}
            <span v-if="c.knowledgeArea?.name" class="acronym">{{ c.knowledgeArea.name }}</span>
          </div>

          <div class="institution-details">
            <div class="detail-item" v-if="c.description">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span v-html="c.description"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create / Edit Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="closeCreateModal">
      <div class="modal-content modal-form" @click.stop>
        <h2>{{ isEditing ? 'Editar Curso' : 'Novo Curso' }}</h2>
        <form @submit.prevent="saveCourse">
          <div class="form-group">
            <label for="name">Nome *</label>
            <input id="name" v-model="courseForm.name" type="text" required placeholder="Nome do curso" />
          </div>
          <div class="form-group">
            <label for="competence">Competência</label>
            <input id="competence" v-model="courseForm.competence" type="text" placeholder="Ex: Matemática" />
          </div>
          <div class="form-group">
            <label for="description">Descrição</label>
            <textarea id="description" v-model="courseForm.description" rows="4" placeholder="Descrição"></textarea>
          </div>
          <div v-if="formError" class="error">{{ formError }}</div>
          <div class="modal-actions">
            <button type="button" @click="closeCreateModal" class="btn-secondary">Cancelar</button>
            <button type="submit" :disabled="saving" class="btn-primary">{{ saving ? (isEditing ? 'Atualizando...' : 'Salvando...') : (isEditing ? 'Atualizar' : 'Salvar') }}</button>
          </div>
        </form>
      </div>
    </div>

      <!-- Details Modal -->
      <div v-if="showDetailsModal" class="modal-overlay" @click="closeDetailsModal">
        <div class="modal-box" @click.stop>
          <div class="modal-header">
            <h3>{{ selectedCourse?.name || 'Curso' }}</h3>
            <button class="modal-close" @click="closeDetailsModal">×</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Competência</label>
              <div class="form-input">{{ selectedCourse?.knowledgeArea?.name || '-' }}</div>
            </div>

            <div v-if="selectedCourse?.description" class="form-group">
              <label class="form-label">Descrição</label>
              <div class="form-textarea" style="white-space: pre-wrap">{{ selectedCourse.description }}</div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" @click="closeDetailsModal">Fechar</button>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="modal-overlay" @click="showDeleteModal = false">
        <div class="modal-content modal-small" @click.stop>
          <h2>Confirmar Exclusão</h2>
          <p class="delete-message">Tem certeza que deseja excluir o curso <strong>{{ courseToDelete?.name }}</strong>?</p>

          <div v-if="deleteError" class="error">{{ deleteError }}</div>

          <div class="modal-actions">
            <button type="button" @click="showDeleteModal = false" class="btn-secondary">Cancelar</button>
            <button @click="handleDelete" :disabled="deleting" class="btn-danger">{{ deleting ? 'Excluindo...' : 'Excluir' }}</button>
          </div>
        </div>
      </div>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="modal-overlay" @click="closeUploadModal">
      <div class="modal-content" @click.stop>
        <h2>Importar Cursos via Excel</h2>
        <div class="upload-area" :class="{ 'drag-over': isDragging, 'has-file': selectedFile }"
             @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop" @click="fileInput.click()">
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
            <p class="upload-sub-text">Formatos aceitos: .xlsx, .xls — colunas: Nome | Descrição | Competencia</p>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="closeUploadModal" class="btn-secondary">Cancelar</button>
          <button @click="parseAndUpload" :disabled="!selectedFile || uploading" class="btn-primary">{{ uploading ? 'Enviando...' : 'Enviar' }}</button>
        </div>
        <div v-if="uploadError" class="error">{{ uploadError }}</div>
        <div v-if="uploadSuccess" class="success">{{ uploadSuccess }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue';
import { courseService } from '@/services/courseService';
import { useRouter } from 'vue-router';
import * as XLSX from 'xlsx';

export default {
  name: 'CoursesView',
  setup() {
    const router = useRouter();
    const courses = ref([]);
    const loading = ref(false);
    const searchTerm = ref('');

    const showCreateModal = ref(false);
    const isEditing = ref(false);
    const courseForm = ref({ id: null, name: '', description: '', competence: '' });
    const showDeleteModal = ref(false);
    const courseToDelete = ref(null);
    const deleting = ref(false);
    const deleteError = ref(null);
    const saving = ref(false);
    const formError = ref(null);
    const showDetailsModal = ref(false);
    const selectedCourse = ref(null);

    const showUploadModal = ref(false);
    const selectedFile = ref(null);
    const fileInput = ref(null);
    const isDragging = ref(false);
    const uploading = ref(false);
    const uploadError = ref(null);
    const uploadSuccess = ref(null);

    const load = async () => {
      loading.value = true;
      try {
        courses.value = await courseService.getAll();
      } catch (err) {
        console.error('Falha ao carregar cursos', err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(load);

    const filtered = ref([]);
    const updateFiltered = () => {
      const term = searchTerm.value.toLowerCase();
      if (!term) filtered.value = courses.value;
      else filtered.value = courses.value.filter(c =>
        (c.name || '').toLowerCase().includes(term) || (c.knowledgeArea?.name || '').toLowerCase().includes(term)
      );
    };

    watchEffect(() => updateFiltered());

    const openDetails = async (id) => {
      selectedCourse.value = null;
      try {
        selectedCourse.value = await courseService.getById(id);
        showDetailsModal.value = true;
      } catch (err) {
        console.error('Falha ao carregar curso', err);
      }
    };

    const closeDetailsModal = () => {
      showDetailsModal.value = false;
      selectedCourse.value = null;
    };

    const closeCreateModal = () => {
      showCreateModal.value = false;
      isEditing.value = false;
      courseForm.value = { id: null, name: '', description: '', competence: '' };
      formError.value = null;
    };

    const saveCourse = async () => {
      if (!courseForm.value.name || !courseForm.value.name.trim()) {
        formError.value = 'Nome é obrigatório';
        return;
      }
      saving.value = true;
      try {
        const payload = {
          name: courseForm.value.name.trim(),
          description: courseForm.value.description || null,
          knowledgeArea: courseForm.value.competence ? { name: courseForm.value.competence.trim() } : null
        };

        if (isEditing.value && courseForm.value.id) {
          await courseService.update(courseForm.value.id, payload);
        } else {
          await courseService.create(payload);
        }

        closeCreateModal();
        await load();
      } catch (err) {
        formError.value = 'Erro ao salvar curso: ' + (err.response?.data?.message || err.message);
      } finally {
        saving.value = false;
      }
    };

    const openEditModal = (course) => {
      isEditing.value = true;
      courseForm.value = {
        id: course.id,
        name: course.name || '',
        description: course.description || '',
        competence: course.knowledgeArea?.name || ''
      };
      formError.value = null;
      showCreateModal.value = true;
    };

    const confirmDelete = (course) => {
      courseToDelete.value = course;
      deleteError.value = null;
      showDeleteModal.value = true;
    };

    const handleDelete = async () => {
      if (!courseToDelete.value) return;
      deleting.value = true;
      deleteError.value = null;
      try {
        await courseService.delete(courseToDelete.value.id);
        showDeleteModal.value = false;
        courseToDelete.value = null;
        await load();
      } catch (err) {
        deleteError.value = err.response?.data?.message || 'Erro ao excluir curso';
      } finally {
        deleting.value = false;
      }
    };

    // Upload handlers
    const handleFileSelect = (e) => { selectedFile.value = e.target.files[0]; uploadError.value = null; uploadSuccess.value = null; };
    const handleDragOver = () => { isDragging.value = true; };
    const handleDragLeave = () => { isDragging.value = false; };
    const handleDrop = (e) => { isDragging.value = false; const f = e.dataTransfer.files[0]; if (f) selectedFile.value = f; };

    const closeUploadModal = () => {
      showUploadModal.value = false;
      selectedFile.value = null;
      uploadError.value = null;
      uploadSuccess.value = null;
      if (fileInput.value) fileInput.value.value = '';
    };

    const parseAndUpload = async () => {
      if (!selectedFile.value) return;
      uploading.value = true; uploadError.value = null; uploadSuccess.value = null;
      try {
        const data = await selectedFile.value.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const raw = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });

        // Expect columns: Nome | Descrição | Competencia (case-insensitive)
        const dtos = raw.map(row => {
          // normalize keys
          const keys = Object.keys(row);
          const lower = {};
          for (const k of keys) lower[k.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')] = row[k];
          return {
            name: lower['nome'] || lower['name'] || '',
            description: lower['descri' + 'cao'] || lower['descricao'] || lower['description'] || '',
            competencia: lower['competencia'] || lower['competence'] || lower['competency'] || ''
          };
        }).filter(r => r.name && r.name.trim());

        if (dtos.length === 0) {
          uploadError.value = 'Nenhuma linha válida encontrada no arquivo.';
          return;
        }

        await courseService.importBulk(dtos);
        uploadSuccess.value = `Importados ${dtos.length} curso(s)`;
        setTimeout(async () => { closeUploadModal(); await load(); }, 1200);
      } catch (err) {
        console.error(err);
        uploadError.value = 'Erro ao processar o arquivo: ' + (err.response?.data?.message || err.message || err);
      } finally {
        uploading.value = false;
      }
    };

    return {
      courses,
      loading,
      searchTerm,
      filtered,
      load,
      openDetails,
      showDetailsModal,
      selectedCourse,
      closeDetailsModal,
      showCreateModal,
      isEditing,
      courseForm,
      saveCourse,
      openEditModal,
      closeCreateModal,
      saving,
      formError,
      showDeleteModal,
      courseToDelete,
      confirmDelete,
      handleDelete,
      deleting,
      deleteError,
      showUploadModal,
      selectedFile,
      handleFileSelect,
      fileInput,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      parseAndUpload,
      closeUploadModal,
      isDragging,
      uploading,
      uploadError,
      uploadSuccess
    };
  }
};
</script>
<style scoped>
.courses-view {
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
.btn-import svg { flex-shrink: 0; display: block; }

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

.upload-area:hover { border-color: #0288d1; background: linear-gradient(135deg, #f0f8ff 0%, #e3f2fd 100%); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(2, 136, 209, 0.18); }
.upload-area:hover::before { opacity: 1; }
.upload-area.drag-over { border-color: #1F285F; background: linear-gradient(135deg, #e8ebff 0%, #dce8ff 100%); transform: translateY(-4px) scale(1.01); box-shadow: 0 16px 40px rgba(31, 40, 95, 0.2); }
.upload-area.has-file { border-color: #43a047; border-style: solid; background: linear-gradient(135deg, #f1fff4 0%, #e8f5e9 100%); }
.hidden-input { display: none; }
.upload-icon-wrapper { display: flex; justify-content: center; margin-bottom: 16px; }
.upload-icon { color: #90a4d4; transition: color 0.3s ease, transform 0.3s ease; }
.upload-area:hover .upload-icon { color: #0288d1; transform: translateY(-4px); }
.upload-area.drag-over .upload-icon { color: #1F285F; transform: translateY(-6px) scale(1.1); }
.upload-icon.file-ok { color: #43a047; }
.upload-area:hover .upload-icon.file-ok { color: #2e7d32; }
.upload-text { display: flex; flex-direction: column; gap: 6px; }
.upload-main-text { margin: 0; font-size: 16px; font-weight: 600; color: #3d4a6e; transition: color 0.3s ease; }
.upload-area:hover .upload-main-text { color: #1F285F; }
.upload-link { color: #0288d1; text-decoration: underline; text-underline-offset: 3px; }
.file-name { color: #2e7d32; word-break: break-all; }
.upload-sub-text { margin: 0; font-size: 13px; color: #8a96b3; transition: color 0.3s ease; }
.upload-area:hover .upload-sub-text { color: #5c6bc0; }
.alert-success { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 8px; font-size: 14px; margin-top: 12px; background: #e8f5e9; color: #2e7d32; border-left: 4px solid #4caf50; }

.loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 20px; color: #666; }
.spinner { width: 48px; height: 48px; border: 4px solid #f0f0f0; border-top-color: #0288d1; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 16px; }
@keyframes spin { to { transform: rotate(360deg); } }

.error-box { display: flex; align-items: center; gap: 12px; background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); border-left: 5px solid #f44336; padding: 16px 20px; border-radius: 10px; color: #c62828; margin-bottom: 20px; font-weight: 500; box-shadow: 0 2px 8px rgba(244, 67, 54, 0.15); }

.empty-state { text-align: center; padding: 80px 20px; }
.empty-state svg { color: #e0e0e0; margin-bottom: 16px; }
.empty-state h3 { margin: 0 0 8px 0; color: #333; font-size: 20px; }
.empty-state p { margin: 0; color: #666; font-size: 15px; }

.courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px; }

.institution-card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.institution-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(31, 40, 95, 0.15); }

.card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
.institution-icon { width: 56px; height: 56px; background: linear-gradient(135deg, #1F285F 0%, #0288d1 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(31, 40, 95, 0.2); }
.institution-icon svg { color: white; }

.card-actions { display: flex; gap: 8px; }
.btn-icon { width: 36px; height: 36px; border: 2px solid #e0e0e0; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; padding: 0; min-width: 36px; min-height: 36px; }
.btn-icon:hover { border-color: #0288d1; background: #f5f9fc; transform: translateY(-2px); }
.btn-icon svg { color: #666; flex-shrink: 0; display: block; width: 18px; height: 18px; }
.btn-icon:hover svg { color: #0288d1; }
.btn-icon.btn-danger { border-color: #f44336; background: white; }
.btn-icon.btn-danger svg { color: #f44336 !important; }
.btn-icon.btn-danger:hover { border-color: #d32f2f; background: #ffebee; }
.btn-icon.btn-danger:hover svg { color: #d32f2f !important; }

.card-body { padding-top: 16px; }
.institution-name { font-size: 20px; font-weight: 700; color: #1F285F; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
.acronym { display: inline-flex; padding: 4px 12px; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); color: #0288d1; border-radius: 6px; font-size: 14px; font-weight: 600; }

.institution-details { display: flex; flex-direction: column; gap: 12px; }
.detail-item { display: flex; align-items: center; gap: 10px; color: #666; font-size: 14px; }
.detail-item svg { color: #0288d1; flex-shrink: 0; }

.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(31, 40, 95, 0.6); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 2000; animation: fadeIn 0.2s ease-out; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.modal-content { background: white; padding: 32px; border-radius: 16px; max-width: 700px; width: 90%; box-shadow: 0 20px 60px rgba(31, 40, 95, 0.3); animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.modal-small { max-width: 500px; }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.modal-content h2 { margin: 0 0 24px 0; color: #1F285F; font-size: 24px; font-weight: 700; }

.institution-form { margin-top: 24px; }
.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 24px; }
.form-group { display: flex; flex-direction: column; }
.form-group.full-width { grid-column: 1 / -1; }
.form-group label { display: block; margin-bottom: 8px; color: #1F285F; font-weight: 600; font-size: 14px; }
.form-group input { padding: 14px 16px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 15px; transition: all 0.2s ease; background: white; }
.form-group textarea { padding: 14px 16px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 15px; transition: all 0.2s ease; background: white; min-height: 140px; resize: vertical; line-height: 1.5; }
.form-group input:focus, .form-group textarea:focus { outline: none; border-color: #0288d1; box-shadow: 0 0 0 4px rgba(2, 136, 209, 0.1); }

.alert { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 8px; font-size: 14px; margin-bottom: 16px; }
.alert-error { background: #ffebee; color: #c62828; border-left: 4px solid #f44336; }

.modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px; }

.btn-secondary { padding: 12px 24px; background: white; color: #666; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.btn-secondary:hover { border-color: #999; background: #f5f5f5; }

.btn-primary { padding: 12px 24px; background: linear-gradient(135deg, #1F285F 0%, #0288d1 100%); color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(31, 40, 95, 0.2); }
.btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(31, 40, 95, 0.3); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-danger { padding: 12px 24px; background: #f44336; color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.btn-danger:hover:not(:disabled) { background: #d32f2f; }
.btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }

.delete-message { color: #555; font-size: 15px; margin-bottom: 24px; line-height: 1.5; }

/* Support modal-box and modal-close so details modal matches other screens */
.modal-box { background: white; border-radius: 16px; max-width: 700px; width: 90%; box-shadow: 0 20px 60px rgba(31, 40, 95, 0.3); overflow: hidden; }
.modal-header { padding: 20px 24px; border-bottom: 1px solid #eaf1fb; display:flex; align-items:center; justify-content:space-between; }
.modal-header h3 { margin:0; color:#1F285F; font-size:18px; font-weight:700; }
.modal-close {
  background: none;
  border: 0;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  transition: color 140ms ease, transform 120ms ease;
  transform-origin: center;
  transform: scale(1);
  padding: 2px;
  line-height: 1;
}
.modal-close:hover { color: #333; transform: scale(1.06); }
.modal-close:active { transform: scale(0.98); }
.modal-body { padding:20px 24px; }
.form-label { display:block; margin-bottom:6px; font-weight:600; color:#1F285F; }
.form-input { padding:10px 12px; border:1.5px solid #dde6f0; border-radius:8px; background:white; color:#333; }
.form-textarea { padding:10px 12px; border:1.5px solid #dde6f0; border-radius:8px; background:white; min-height:100px; white-space:pre-wrap; }
.modal-footer { padding:16px 24px; border-top:1px solid #eaf1fb; display:flex; justify-content:flex-end; gap:12px; }
.btn-cancel {
  padding: 9px 18px;
  background: white;
  border: 1.5px solid #dde6f0;
  border-radius: 8px;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  transition: background 160ms ease, transform 120ms ease, box-shadow 160ms ease;
}
.btn-cancel:hover {
  background: #f4f7fb;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(31, 40, 95, 0.06);
}
.btn-cancel:active { transform: translateY(0); }
</style>
