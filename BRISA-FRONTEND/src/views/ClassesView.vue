<template>
  <div class="classes-view">
    <div class="header">
      <div>
        <h1>Turmas</h1>
        <p v-if="filterByProgram" class="subtitle">
          Programa: {{ currentProgram?.name || 'Carregando...' }}
        </p>
      </div>
      <button @click="showUploadModal = true" class="btn-primary">
        Importar Excel
      </button>
    </div>

    <div class="filters">
      <input 
        v-model="searchTerm" 
        type="text" 
        placeholder="Buscar por código da turma..."
        class="search-input"
      />
    </div>

    <div v-if="loading" class="loading">Carregando...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Programa</th>
            <th>Data Início</th>
            <th>Data Fim</th>
            <th>Local</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="classItem in filteredClasses" :key="classItem.id">
            <td>{{ classItem.code }}</td>
            <td>{{ classItem.program?.name || '-' }}</td>
            <td>{{ formatDate(classItem.startDate) }}</td>
            <td>{{ formatDate(classItem.endDate) }}</td>
            <td>{{ classItem.location?.name || '-' }}</td>
            <td class="actions">
              <button @click="viewEnrollments(classItem)" class="btn-view">Alunos</button>
              <button @click="editClass(classItem)" class="btn-edit">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredClasses.length === 0" class="no-data">
        Nenhuma turma encontrada
      </div>
    </div>

    <!-- Modal de Upload -->
    
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { classService } from '@/services/classService';
import { programService } from '@/services/programService';

export default {
  name: 'ClassesView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const classes = ref([]);
    const currentProgram = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const searchTerm = ref('');
    const showUploadModal = ref(false);
    const selectedFile = ref(null);
    const uploading = ref(false);
    const uploadError = ref(null);
    const uploadSuccess = ref(null);
    const fileInput = ref(null);

    const filterByProgram = computed(() => route.query.programId);

    const filteredClasses = computed(() => {
      let result = classes.value;

      if (filterByProgram.value) {
        result = result.filter(c => c.program?.id == filterByProgram.value);
      }

      if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase();
        result = result.filter(c => c.code?.toLowerCase().includes(term));
      }

      return result;
    });

    const loadClasses = async () => {
      loading.value = true;
      error.value = null;
      try {
        classes.value = await classService.getAll();
        
        if (filterByProgram.value) {
          currentProgram.value = await programService.getById(filterByProgram.value);
        }
      } catch (err) {
        error.value = 'Erro ao carregar turmas: ' + (err.response?.data?.message || err.message);
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (date) => {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('pt-BR');
    };

    const viewEnrollments = (classItem) => {
      router.push({ name: 'Enrollments', query: { classId: classItem.id } });
    };

    const editClass = (classItem) => {
      console.log('Edit class:', classItem);
    };

    const handleFileSelect = (event) => {
      selectedFile.value = event.target.files[0];
      uploadError.value = null;
      uploadSuccess.value = null;
    };

    const uploadFile = async () => {
      if (!selectedFile.value) return;

      uploading.value = true;
      uploadError.value = null;
      uploadSuccess.value = null;

      try {
        await classService.importExcel(selectedFile.value);
        uploadSuccess.value = 'Arquivo importado com sucesso!';
        setTimeout(() => {
          closeUploadModal();
          loadClasses();
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
      loadClasses();
    });

    return {
      classes,
      currentProgram,
      loading,
      error,
      searchTerm,
      filterByProgram,
      filteredClasses,
      showUploadModal,
      selectedFile,
      uploading,
      uploadError,
      uploadSuccess,
      fileInput,
      formatDate,
      viewEnrollments,
      editClass,
      handleFileSelect,
      uploadFile,
      closeUploadModal
    };
  }
};
</script>

<style scoped>
.classes-view {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
  color: #333;
}

.subtitle {
  margin: 5px 0 0 0;
  color: #666;
  font-size: 14px;
}

.filters {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f8f9fa;
}

th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #555;
  border-bottom: 2px solid #dee2e6;
}

td {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

tbody tr:hover {
  background: #f8f9fa;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-primary {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  padding: 10px 20px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-view {
  padding: 6px 12px;
  background: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.btn-view:hover {
  background: #138496;
}

.btn-edit {
  padding: 6px 12px;
  background: #ffc107;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.btn-edit:hover {
  background: #e0a800;
}

.loading, .error, .no-data {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error {
  color: #dc3545;
}

.success {
  color: #28a745;
  padding: 10px;
  margin-top: 10px;
  background: #d4edda;
  border-radius: 4px;
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

.upload-area {
  margin: 20px 0;
  padding: 20px;
  border: 2px dashed #ddd;
  border-radius: 4px;
  text-align: center;
}

.upload-area input[type="file"] {
  margin-bottom: 10px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>
