<template>
  <div class="enrollments-view">
    <div class="header">
      <div>
        <h1>Matrículas / Participantes</h1>
        <p v-if="filterByClass" class="subtitle">
          Turma: {{ currentClass?.code || 'Carregando...' }} - {{ currentClass?.program?.name }}
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
        placeholder="Buscar por nome ou CPF..."
        class="search-input"
      />
      <select v-model="filterRole" class="filter-select">
        <option value="">Todas as funções</option>
        <option value="Aluno">Aluno</option>
        <option value="Professor">Professor</option>
        <option value="Orientador">Orientador</option>
        <option value="Coordenador">Coordenador</option>
      </select>
    </div>

    <div v-if="loading" class="loading">Carregando...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Função</th>
            <th>Status</th>
            <th>Data Matrícula</th>
            <th>Nota</th>
            <th>Frequência</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="enrollment in filteredEnrollments" :key="enrollment.id">
            <td>{{ enrollment.people?.name }}</td>
            <td>{{ formatCPF(enrollment.people?.cpf) }}</td>
            <td>{{ enrollment.people?.email }}</td>
            <td>
              <span :class="['role-badge', getRoleClass(enrollment.academicRole?.name)]">
                {{ enrollment.academicRole?.name || '-' }}
              </span>
            </td>
            <td>
              <span :class="['status-badge', getStatusClass(enrollment.status)]">
                {{ enrollment.status || 'Pendente' }}
              </span>
            </td>
            <td>{{ formatDate(enrollment.enrollmentDate) }}</td>
            <td>{{ enrollment.grade !== null ? enrollment.grade : '-' }}</td>
            <td>{{ enrollment.attendancePercentage !== null ? enrollment.attendancePercentage + '%' : '-' }}</td>
            <td class="actions">
              <button @click="editEnrollment(enrollment)" class="btn-edit">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredEnrollments.length === 0" class="no-data">
        Nenhuma matrícula encontrada
      </div>
    </div>

    <!-- Modal de Upload -->
    <div v-if="showUploadModal" class="modal-overlay" @click="closeUploadModal">
      <div class="modal-content" @click.stop>
        <h2>Importar Matrículas via Excel</h2>
        <div class="upload-area">
          <input 
            type="file" 
            @change="handleFileSelect" 
            accept=".xlsx,.xls"
            ref="fileInput"
          />
          <p v-if="selectedFile">{{ selectedFile.name }}</p>
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
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { enrollmentService } from '@/services/enrollmentService';
import { classService } from '@/services/classService';

export default {
  name: 'EnrollmentsView',
  setup() {
    const route = useRoute();
    const enrollments = ref([]);
    const currentClass = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const searchTerm = ref('');
    const filterRole = ref('');
    const showUploadModal = ref(false);
    const selectedFile = ref(null);
    const uploading = ref(false);
    const uploadError = ref(null);
    const uploadSuccess = ref(null);
    const fileInput = ref(null);

    const filterByClass = computed(() => route.query.classId);

    const filteredEnrollments = computed(() => {
      let result = enrollments.value;

      if (filterRole.value) {
        result = result.filter(e => e.academicRole?.name === filterRole.value);
      }

      if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase();
        result = result.filter(e => 
          e.people?.name?.toLowerCase().includes(term) ||
          e.people?.cpf?.includes(term)
        );
      }

      return result;
    });

    const loadEnrollments = async () => {
      loading.value = true;
      error.value = null;
      try {
        if (filterByClass.value) {
          enrollments.value = await enrollmentService.getByClassId(filterByClass.value);
          currentClass.value = await classService.getById(filterByClass.value);
        } else {
          enrollments.value = await enrollmentService.getAll();
        }
      } catch (err) {
        error.value = 'Erro ao carregar matrículas: ' + (err.response?.data?.message || err.message);
      } finally {
        loading.value = false;
      }
    };

    const formatCPF = (cpf) => {
      if (!cpf) return '-';
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatDate = (date) => {
      if (!date) return '-';
      return new Date(date).toLocaleDateString('pt-BR');
    };

    const getRoleClass = (role) => {
      const roleMap = {
        'Aluno': 'role-student',
        'Professor': 'role-teacher',
        'Orientador': 'role-advisor',
        'Coordenador': 'role-coordinator'
      };
      return roleMap[role] || 'role-default';
    };

    const getStatusClass = (status) => {
      const statusMap = {
        'Realizado': 'status-completed',
        'Em andamento': 'status-in-progress',
        'Não-realizado': 'status-not-completed'
      };
      return statusMap[status] || 'status-pending';
    };

    const editEnrollment = (enrollment) => {
      console.log('Edit enrollment:', enrollment);
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
        await enrollmentService.importExcel(selectedFile.value);
        uploadSuccess.value = 'Arquivo importado com sucesso!';
        setTimeout(() => {
          closeUploadModal();
          loadEnrollments();
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
      loadEnrollments();
    });

    return {
      enrollments,
      currentClass,
      loading,
      error,
      searchTerm,
      filterRole,
      filterByClass,
      filteredEnrollments,
      showUploadModal,
      selectedFile,
      uploading,
      uploadError,
      uploadSuccess,
      fileInput,
      formatCPF,
      formatDate,
      getRoleClass,
      getStatusClass,
      editEnrollment,
      handleFileSelect,
      uploadFile,
      closeUploadModal
    };
  }
};
</script>

<style scoped>
.enrollments-view {
  padding: 20px;
  max-width: 1600px;
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
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  max-width: 400px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.filter-select {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
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
  white-space: nowrap;
}

td {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

tbody tr:hover {
  background: #f8f9fa;
}

.role-badge, .status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.role-student {
  background: #e3f2fd;
  color: #1976d2;
}

.role-teacher {
  background: #f3e5f5;
  color: #7b1fa2;
}

.role-advisor {
  background: #e8f5e9;
  color: #388e3c;
}

.role-coordinator {
  background: #fff3e0;
  color: #f57c00;
}

.role-default {
  background: #f5f5f5;
  color: #666;
}

.status-completed {
  background: #d4edda;
  color: #155724;
}

.status-in-progress {
  background: #fff3cd;
  color: #856404;
}

.status-not-completed {
  background: #f8d7da;
  color: #721c24;
}

.status-pending {
  background: #e2e3e5;
  color: #383d41;
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
