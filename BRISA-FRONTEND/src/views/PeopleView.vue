<template>
  <div class="people-view">
    <div class="header">
      <div class="header-left">
        <h1>Pessoas</h1>
        <p class="subtitle">{{ totalPeople }} pessoa(s) cadastrada(s)</p>
      </div>
      <div class="header-actions">
        <button @click="showCreateModal = true" class="btn-create">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
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
      <input v-model="searchTerm" type="text" placeholder="Buscar por nome, CPF ou email..." class="search-input" />
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregando pessoas...</p>
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

    <div v-else-if="paginatedPeople.length === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
      <h3>Nenhuma pessoa encontrada</h3>
      <p>Comece importando pessoas via Excel</p>
    </div>

    <div v-else>
      <div class="people-grid">
        <div v-for="person in paginatedPeople" :key="person.id" class="person-card">
          <div class="card-header">
            <div class="person-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div class="card-actions">
              <button @click="viewDetails(person)" class="btn-icon" title="Ver detalhes">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
              <button @click="editPerson(person)" class="btn-icon" title="Editar">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="card-body">
            <h3 class="person-name">{{ person.name }}</h3>

            <div class="person-details">
              <div class="detail-item" v-if="person.cpf">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>{{ formatCPF(person.cpf) }}</span>
              </div>

              <div class="detail-item" v-if="person.email">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span class="email-text">{{ person.email }}</span>
              </div>

              <div class="detail-item" v-if="person.educationLevel">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                <span>{{ person.educationLevel }}</span>
              </div>

              <div class="detail-item" v-if="person.city">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ person.city }}</span>
              </div>

              <div class="detail-item" v-if="person.birthDate">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{{ formatDate(person.birthDate) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Paginação -->
      <div class="pagination" v-if="totalPages > 1">
        <button @click="goToPage(1)" :disabled="currentPage === 1" class="pagination-btn pagination-btn-icon"
          title="Primeira página">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <polyline points="11 17 6 12 11 7"></polyline>
            <polyline points="18 17 13 12 18 7"></polyline>
          </svg>
        </button>

        <button @click="currentPage--" :disabled="currentPage === 1" class="pagination-btn pagination-btn-icon"
          title="Página anterior">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div class="pagination-pages">
          <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
            :class="['pagination-number', { active: page === currentPage }]">
            {{ page }}
          </button>
        </div>

        <button @click="currentPage++" :disabled="currentPage === totalPages" class="pagination-btn pagination-btn-icon"
          title="Próxima página">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages"
          class="pagination-btn pagination-btn-icon" title="Última página">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <polyline points="13 17 18 12 13 7"></polyline>
            <polyline points="6 17 11 12 6 7"></polyline>
          </svg>
        </button>
      </div>

      <div class="pagination-info" v-if="totalPages > 1">
        Mostrando {{ ((currentPage - 1) * itemsPerPage) + 1 }} a {{ Math.min(currentPage * itemsPerPage,
          filteredPeople.length) }} de {{ filteredPeople.length }} pessoa(s)
      </div>
    </div>

    <!-- Modal de Upload -->
    <div v-if="showUploadModal" class="modal-overlay" @click="closeUploadModal">
      <div class="modal-content" @click.stop>
        <h2>Importar Pessoas via Excel</h2>
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
        <div v-if="uploadError" class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {{ uploadError }}
        </div>

        <div v-if="uploadSuccess" class="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          {{ uploadSuccess }}
        </div>

        <div v-if="uploadResult && uploadResult.alreadyExists > 0" class="alert alert-warning">
          <div class="alert-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <div>
              <strong>{{ uploadResult.alreadyExists }} pessoa(s) já existente(s)</strong>
              <p>As seguintes pessoas já estão cadastradas no sistema:</p>
            </div>
          </div>
          <div class="duplicate-list">
            <div v-for="(person, index) in uploadResult.duplicatePersons" :key="index" class="duplicate-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {{ person }}
            </div>
          </div>
          <div class="alert-footer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Estas pessoas não foram importadas novamente.
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Criar Pessoa -->
    <div v-if="showCreateModal" class="modal-overlay" @click="closeCreateModal">
      <div class="modal-content modal-large" @click.stop>
        <h2>Nova Pessoa</h2>
        <form @submit.prevent="handleCreate" class="create-form">
          <div class="form-grid">
            <div class="form-group full-width">
              <label>Nome Completo *</label>
              <input v-model="createForm.name" type="text" placeholder="Digite o nome completo" required />
            </div>

            <div class="form-group">
              <label>E-mail *</label>
              <input v-model="createForm.email" type="email" placeholder="email@exemplo.com" required />
            </div>

            <div class="form-group">
              <label>CPF *</label>
              <input v-model="createForm.cpf" type="text" placeholder="000.000.000-00" @input="formatCPFInput"
                required />
            </div>

            <div class="form-group">
              <label>Data de Nascimento</label>
              <input v-model="createForm.birthDate" type="date" />
            </div>

            <div class="form-group">
              <label>Gênero</label>
              <select v-model="createForm.gender">
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
                <option value="Prefiro não informar">Prefiro não informar</option>
              </select>
            </div>

            <div class="form-group full-width">
              <label>Nível de Escolaridade</label>
              <input v-model="createForm.educationLevel" type="text" placeholder="Ex: Ensino Superior Completo" />
            </div>

            <div class="form-group full-width">
              <label>Endereço</label>
              <input v-model="createForm.address" type="text" placeholder="Rua, número, bairro" />
            </div>

            <div class="form-group">
              <label>Cidade</label>
              <input v-model="createForm.city" type="text" placeholder="Cidade - UF" />
            </div>
          </div>

          <div v-if="createError" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {{ createError }}
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeCreateModal" class="btn-secondary">Cancelar</button>
            <button type="submit" :disabled="creating || !createForm.name || !createForm.email || createForm.cpf.replace(/\D/g,'').length !== 11"
              class="btn-primary">
              {{ creating ? 'Criando...' : 'Criar Pessoa' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { peopleService } from '@/services/peopleService';

export default {
  name: 'PeopleView',
  setup() {
    const router = useRouter();
    const people = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const searchTerm = ref('');
    const showUploadModal = ref(false);
    const showCreateModal = ref(false);
    const selectedFile = ref(null);
    const uploading = ref(false);
    const uploadError = ref(null);
    const uploadSuccess = ref(null);
    const uploadResult = ref(null);
    const fileInput = ref(null);
    const isDragging = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = 20;
    const createForm = ref({
      name: '',
      email: '',
      cpf: '',
      birthDate: '',
      gender: '',
      educationLevel: '',
      address: '',
      city: ''
    });
    const creating = ref(false);
    const createError = ref(null);

    const totalPeople = computed(() => people.value.length);

    const isValidCPFLength = (cpf) => {
      const digits = cpf.replace(/\D/g, '');
      return digits.length === 11;
    };


    const filteredPeople = computed(() => {
      if (!searchTerm.value) return people.value;

      const term = searchTerm.value.toLowerCase();
      return people.value.filter(person =>
        person.name?.toLowerCase().includes(term) ||
        person.cpf?.includes(term) ||
        person.email?.toLowerCase().includes(term)
      );
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredPeople.value.length / itemsPerPage);
    });

    const paginatedPeople = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredPeople.value.slice(start, end);
    });

    const visiblePages = computed(() => {
      const pages = [];
      const maxVisible = 5;

      if (totalPages.value <= maxVisible) {
        // Mostra todas as páginas se forem poucas
        for (let i = 1; i <= totalPages.value; i++) {
          pages.push(i);
        }
      } else {
        // Lógica para mostrar páginas com ... quando houver muitas
        if (currentPage.value <= 3) {
          for (let i = 1; i <= 4; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages.value);
        } else if (currentPage.value >= totalPages.value - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages.value - 3; i <= totalPages.value; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages.value);
        }
      }

      return pages;
    });

    const goToPage = (page) => {
      if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const loadPeople = async () => {
      loading.value = true;
      error.value = null;
      try {
        people.value = await peopleService.getAll();
      } catch (err) {
        error.value = 'Erro ao carregar pessoas: ' + (err.response?.data?.message || err.message);
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

    const viewDetails = (person) => {
      router.push(`/people/${person.id}`);
    };

    const editPerson = (person) => {
      router.push(`/people/${person.id}`);
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
      } else {
        createError.value = 'CPF deve conter apenas números e no máximo 11 dígitos';
      }
      createForm.value.cpf = value;
    };

    const handleCreate = async () => {
      const cpfDigits = createForm.value.cpf.replace(/\D/g, '');

      if (!createForm.value.name || !createForm.value.email || !createForm.value.cpf) {
        createError.value = 'Nome, CPF e e-mail são obrigatórios';
        return;
      }

      if (cpfDigits.length !== 11) {
        createError.value = 'CPF deve conter exatamente 11 dígitos numéricos';
        return;
      }

      creating.value = true;
      createError.value = null;

      try {
        await peopleService.create({
          ...createForm.value,
          cpf: cpfDigits // envia só números pro backend (recomendado)
        });

        closeCreateModal();
        loadPeople();
      } catch (err) {
        createError.value = err.response?.data?.message || 'Erro ao criar pessoa';
      } finally {
        creating.value = false;
      }
    };


    const closeCreateModal = () => {
      showCreateModal.value = false;
      createForm.value = {
        name: '',
        email: '',
        cpf: '',
        birthDate: '',
        gender: '',
        educationLevel: '',
        address: '',
        city: ''
      };
      createError.value = null;
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
      uploadResult.value = null;

      try {
        const response = await peopleService.importExcel(selectedFile.value);
        uploadResult.value = response;

        if (response.successfullyInserted > 0) {
          uploadSuccess.value = `${response.successfullyInserted} pessoa(s) importada(s) com sucesso!`;
        }

        // Recarrega a lista após 3 segundos se houver duplicados (para usuário ver o alerta)
        const delay = response.alreadyExists > 0 ? 3000 : 2000;
        setTimeout(() => {
          if (response.alreadyExists === 0 || response.successfullyInserted > 0) {
            closeUploadModal();
          }
          loadPeople();
        }, delay);
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
      uploadResult.value = null;
      if (fileInput.value) {
        fileInput.value.value = '';
      }
    };

    // Reseta para página 1 quando a busca muda
    watch(searchTerm, () => {
      currentPage.value = 1;
    });

    onMounted(() => {
      loadPeople();
    });

    return {
      people,
      loading,
      error,
      searchTerm,
      filteredPeople,
      paginatedPeople,
      currentPage,
      totalPages,
      totalPeople,
      visiblePages,
      itemsPerPage,
      showUploadModal,
      showCreateModal,
      selectedFile,
      uploading,
      uploadError,
      uploadSuccess,
      uploadResult,
      fileInput,
      isDragging,
      createForm,
      creating,
      createError,
      formatCPF,
      formatDate,
      viewDetails,
      editPerson,
      handleFileSelect,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      uploadFile,
      closeUploadModal,
      handleCreate,
      closeCreateModal,
      formatCPFInput,
      goToPage
    };
  }
};
</script>

<style scoped>
.people-view {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
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

.header-actions {
  display: flex;
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
}

/* Search */
.search-container {
  position: relative;
  margin-bottom: 24px;
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
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #0288d1;
  box-shadow: 0 0 0 3px rgba(2, 136, 209, 0.1);
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

.btn-view {
  padding: 8px 16px;
  background: #0288d1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-view:hover {
  background: #0277bd;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(2, 136, 209, 0.3);
}

.btn-edit {
  padding: 8px 16px;
  background: white;
  color: #0288d1;
  border: 2px solid #0288d1;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;
}

/* Import Button */
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

/* People Grid */
.people-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.person-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(31, 40, 95, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid #f0f0f0;
}

.person-card:hover {
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

.person-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #1F285F 0%, #0288d1 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(31, 40, 95, 0.2);
}

.card-actions {
  display: flex;
  gap: 8px;
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
  transform: scale(1.1);
}

.card-body {
  padding-top: 12px;
}

.person-name {
  margin: 0 0 16px 0;
  color: #1F285F;
  font-size: 20px;
  font-weight: 700;
}

.person-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
  font-size: 14px;
}

.detail-item svg {
  color: #999;
  flex-shrink: 0;
}

.email-text {
  word-break: break-all;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(31, 40, 95, 0.1);
  border: 2px solid #f5f5f5;
}

.pagination-btn-icon {
  background: white;
  border: 2px solid #e0e0e0;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.pagination-btn-icon:hover:not(:disabled) {
  background: linear-gradient(135deg, #1F285F 0%, #0288d1 100%);
  color: white;
  border-color: #0288d1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(2, 136, 209, 0.3);
}

.pagination-btn-icon:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(2, 136, 209, 0.2);
}

.pagination-btn-icon:disabled {
  opacity: 0.25;
  cursor: not-allowed;
  background: #fafafa;
}

.pagination-pages {
  display: flex;
  gap: 6px;
  padding: 0 8px;
  align-items: center;
}

.pagination-number {
  min-width: 44px;
  height: 44px;
  padding: 0 12px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background: white;
  color: #666;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-number:hover:not(.active) {
  background: #f5f9fc;
  border-color: #0288d1;
  color: #0288d1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(2, 136, 209, 0.15);
}

.pagination-number.active {
  background: linear-gradient(135deg, #1F285F 0%, #0288d1 100%);
  color: white;
  border-color: #0288d1;
  cursor: default;
  box-shadow: 0 4px 16px rgba(2, 136, 209, 0.3);
  transform: scale(1.05);
}

.pagination-info {
  text-align: center;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  margin-top: 12px;
  padding: 12px 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

@media (max-width: 640px) {
  .pagination {
    flex-wrap: wrap;
    gap: 6px;
    padding: 16px;
  }

  .pagination-pages {
    padding: 0 4px;
  }

  .pagination-number,
  .pagination-btn-icon {
    min-width: 40px;
    height: 40px;
  }
}

/* Loading & States */
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
  to {
    transform: rotate(360deg);
  }
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

/* Alert Styles */
.alert {
  padding: 16px 20px;
  border-radius: 12px;
  margin-top: 16px;
  font-weight: 500;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  animation: slideInRight 0.3s ease-out;
}

.alert svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.alert-success {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  color: #2e7d32;
  border-left: 5px solid #4caf50;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
}

.alert-error {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  color: #c62828;
  border-left: 5px solid #f44336;
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.2);
}

.alert-warning {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  color: #f57c00;
  border-left: 5px solid #ff9800;
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.2);
  flex-direction: column;
  padding: 20px;
}

.alert-header {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 16px;
}

.alert-header svg {
  color: #f57c00;
  flex-shrink: 0;
}

.alert-header strong {
  display: block;
  font-size: 16px;
  margin-bottom: 6px;
  color: #e65100;
}

.alert-header p {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: #f57c00;
}

.duplicate-list {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 16px;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 12px;
  border: 1px solid rgba(255, 152, 0, 0.2);
}

.duplicate-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #e65100;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(255, 152, 0, 0.1);
  transition: all 0.2s;
}

.duplicate-item:last-child {
  margin-bottom: 0;
}

.duplicate-item:hover {
  transform: translateX(4px);
  box-shadow: 0 2px 6px rgba(255, 152, 0, 0.15);
}

.duplicate-item svg {
  color: #ff9800;
  flex-shrink: 0;
}

.alert-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #f57c00;
  padding: 12px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  border: 1px dashed rgba(255, 152, 0, 0.3);
}

.alert-footer svg {
  color: #ff9800;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Modal */
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
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  padding: 32px;
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(31, 40, 95, 0.3);
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
  border-top: 2px solid #f0f0f0;
}

.modal-large {
  max-width: 900px;
}

.create-form {
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

.form-group input::placeholder {
  color: #999;
}

@media (max-width: 768px) {
  .people-grid {
    grid-template-columns: 1fr;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    flex-direction: column;
    width: 100%;
  }

  .header-actions button {
    width: 100%;
    justify-content: center;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>