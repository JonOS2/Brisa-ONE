<template>
  <div class="program-registration-view">
    
    <div v-if="activeDatePicker" class="picker-overlay" @click="closeDatePicker"></div>

    <div v-if="showNewStageModal" class="modal-overlay" @click="closeNewStageModal">
       <div class="modal-content" @click.stop>
          <div class="modal-header">
             <div>
               <h3>Adicionar Nova Etapa</h3>
               <p class="modal-subtitle">Configure as informações da nova etapa do processo seletivo</p>
             </div>
             <button class="btn-close-modal" @click="closeNewStageModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
             </button>
          </div>
          
          <div class="modal-body">
             <div class="form-row two-cols">
               <div class="form-group">
                 <label>Nome da Etapa <span class="required">*</span></label>
                 <input v-model="newStageForm.title" @keydown.enter="$event.target.blur()" type="text" placeholder="Ex: Entrevista Técnica" class="form-input"/>
               </div>
               <div class="form-group">
                 <label>Tipo</label>
                 <input v-model="newStageForm.type" @keydown.enter="$event.target.blur()" type="text" placeholder="Ex: Avaliação" class="form-input"/>
               </div>
             </div>

             <div class="form-group">
               <label>Descrição</label>
               <textarea v-model="newStageForm.desc" placeholder="Descreva brevemente o objetivo desta etapa..." class="form-textarea" rows="2"></textarea>
             </div>

             <div class="form-row three-cols-special" style="margin-bottom: 0;">
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Modalidade</label>
                 <select v-model="newStageForm.modality" class="form-input form-select">
                   <option value="Online">Online</option>
                   <option value="Presencial">Presencial</option>
                   <option value="Híbrida">Híbrida</option>
                   <option value="Remota Assíncrona">Remota Assíncrona</option>
                 </select>
               </div>
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Duração</label>
                 <div class="duration-input-group">
                    <input v-model="newStageForm.durationValue" @keydown.enter="$event.target.blur()" type="number" min="1" placeholder="Ex: 15" class="form-input"/>
                    <select v-model="newStageForm.durationUnit" class="form-input form-select min-w-select">
                      <option value="dias">dias</option>
                      <option value="meses">meses</option>
                    </select>
                 </div>
               </div>
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Vagas</label>
                 <input v-model="newStageForm.slots" @keydown.enter="$event.target.blur()" type="text" placeholder="Ex: 20 vagas" class="form-input"/>
               </div>
             </div>
          </div>

          <div class="modal-footer">
             <button class="btn-footer-back" @click="closeNewStageModal">Cancelar</button>
             <button class="btn-footer-continue" @click="saveNewStage">Adicionar</button>
          </div>
       </div>
    </div>

    <div v-if="showEditStageModal" class="modal-overlay" @click="closeEditStageModal">
       <div class="modal-content" @click.stop>
          <div class="modal-header">
             <div>
               <h3>Editar Etapa</h3>
               <p class="modal-subtitle">Configure as informações da etapa do processo seletivo</p>
             </div>
             <button class="btn-close-modal" @click="closeEditStageModal">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
             </button>
          </div>
          
          <div class="modal-body">
             <div class="form-row two-cols">
               <div class="form-group">
                 <label>Nome da Etapa <span class="required">*</span></label>
                 <input v-model="editStageForm.title" @keydown.enter="$event.target.blur()" type="text" class="form-input"/>
               </div>
               <div class="form-group">
                 <label>Tipo</label>
                 <input v-model="editStageForm.type" @keydown.enter="$event.target.blur()" type="text" class="form-input"/>
               </div>
             </div>

             <div class="form-group">
               <label>Descrição</label>
               <textarea v-model="editStageForm.desc" class="form-textarea" rows="2"></textarea>
             </div>

             <div class="form-row three-cols-special" style="margin-bottom: 0;">
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Modalidade</label>
                 <select v-model="editStageForm.modality" class="form-input form-select">
                   <option value="Online">Online</option>
                   <option value="Presencial">Presencial</option>
                   <option value="Híbrida">Híbrida</option>
                   <option value="Remota Assíncrona">Remota Assíncrona</option>
                 </select>
               </div>
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Duração</label>
                 <div class="duration-input-group">
                    <input v-model="editStageForm.durationValue" @keydown.enter="$event.target.blur()" type="number" min="1" class="form-input"/>
                    <select v-model="editStageForm.durationUnit" class="form-input form-select min-w-select">
                      <option value="dias">dias</option>
                      <option value="meses">meses</option>
                    </select>
                 </div>
               </div>
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Vagas</label>
                 <input v-model="editStageForm.slots" @keydown.enter="$event.target.blur()" type="text" class="form-input"/>
               </div>
             </div>
          </div>

          <div class="modal-footer">
             <button class="btn-footer-back" @click="closeEditStageModal">Cancelar</button>
             <button class="btn-footer-continue" @click="saveEditStage">Salvar</button>
          </div>
       </div>
    </div>

    <div v-if="showDeleteConfirmModal" class="modal-overlay" @click="cancelDeleteStage">
       <div class="modal-content modal-sm" @click.stop>
          <div class="modal-header">
             <div>
               <h3>Excluir Etapa</h3>
               <p class="modal-subtitle">Esta ação não poderá ser desfeita.</p>
             </div>
             <button class="btn-close-modal" @click="cancelDeleteStage">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
             </button>
          </div>
          <div class="modal-body">
             <p class="delete-confirm-text">Deseja excluir a etapa <strong>{{ stageToDelete?.title }}</strong>?</p>
          </div>
          <div class="modal-footer">
             <button class="btn-footer-back" @click="cancelDeleteStage">Cancelar</button>
             <button class="btn-footer-danger" @click="executeDeleteStage">Excluir</button>
          </div>
       </div>
    </div>

    <div v-if="showCustomFieldModal" class="modal-overlay" @click="closeCustomFieldModal">
       <div class="modal-content" @click.stop>
          <div class="modal-header">
             <div>
               <h3>Adicionar Campo Personalizado</h3>
               <p class="modal-subtitle">Crie um novo campo para o formulário de inscrição</p>
             </div>
             <button class="btn-close-modal" @click="closeCustomFieldModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
             </button>
          </div>
          <div class="modal-body">
             <div class="form-group relative">
               <label>Nome do Campo <span class="required">*</span></label>
               <input v-model="customFieldForm.name" @input="customFieldFormError = false" @keydown.enter="$event.target.blur()" type="text" placeholder="Ex: Link do Portfólio, Gênero, etc." :class="['form-input', { 'input-error': customFieldFormError }]"/>
               <span v-if="customFieldFormError" class="error-text">O campo de Nome não pode ficar vazio.</span>
             </div>
             <div class="form-row two-cols" style="margin-bottom: 0;">
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Tipo de Resposta</label>
                 <select v-model="customFieldForm.type" class="form-input form-select">
                   <option value="text">Texto Curto</option>
                   <option value="textarea">Texto Longo</option>
                   <option value="number">Número</option>
                   <option value="url">Link / URL</option>
                   <option value="select">Múltipla Escolha</option>
                 </select>
               </div>
               <div class="form-group" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: center;">
                 <label>Campo Obrigatório?</label>
                 <label class="toggle-switch" style="margin-top: 4px;">
                   <input type="checkbox" v-model="customFieldForm.required" class="toggle-input">
                   <span class="toggle-slider"></span>
                 </label>
               </div>
             </div>
          </div>
          <div class="modal-footer">
             <button class="btn-footer-back" @click="closeCustomFieldModal">Cancelar</button>
             <button class="btn-footer-continue" @click="saveCustomField">Adicionar Campo</button>
          </div>
       </div>
    </div>

    <div v-if="showCustomDocumentModal" class="modal-overlay" @click="closeCustomDocumentModal">
       <div class="modal-content" @click.stop>
          <div class="modal-header">
             <div>
               <h3>Adicionar Documento</h3>
               <p class="modal-subtitle">Configure o novo documento exigido na inscrição</p>
             </div>
             <button class="btn-close-modal" @click="closeCustomDocumentModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
             </button>
          </div>
          <div class="modal-body">
             <div class="form-group relative">
               <label>Nome do Documento <span class="required">*</span></label>
               <input v-model="customDocumentForm.name" @input="customDocumentFormError = false" @keydown.enter="$event.target.blur()" type="text" placeholder="Ex: Histórico Escolar, Carta de Recomendação, etc." :class="['form-input', { 'input-error': customDocumentFormError }]"/>
               <span v-if="customDocumentFormError" class="error-text">O nome do documento não pode ficar vazio.</span>
             </div>
             <div class="form-row two-cols" style="margin-bottom: 0; align-items: flex-start;">
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Tipos Aceitos <span class="required">*</span></label>
                 <div :class="['doc-types-container', { 'error-border': customDocumentTypeError }]">
                    <span v-for="docType in availableDocTypes" :key="docType" @click="toggleDocType(docType)" :class="['doc-type-pill', { 'active': customDocumentForm.types.includes(docType) }]">
                      {{ docType }}
                    </span>
                 </div>
                 <span v-if="customDocumentTypeError" class="error-text">Selecione ao menos um tipo de arquivo.</span>
               </div>
               <div class="form-group" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: flex-start;">
                 <label>Documento Obrigatório?</label>
                 <label class="toggle-switch" style="margin-top: 4px;">
                   <input type="checkbox" v-model="customDocumentForm.required" class="toggle-input">
                   <span class="toggle-slider"></span>
                 </label>
               </div>
             </div>
          </div>
          <div class="modal-footer">
             <button class="btn-footer-back" @click="closeCustomDocumentModal">Cancelar</button>
             <button class="btn-footer-continue" @click="saveCustomDocument">Adicionar Documento</button>
          </div>
       </div>
    </div>

    <div v-if="showNewCourseModal" class="modal-overlay" @click="closeNewCourseModal">
       <div class="modal-content" @click.stop>
          <div class="modal-header">
             <div>
               <h3>Adicionar Novo Curso</h3>
               <p class="modal-subtitle">Cadastre um novo curso para a etapa de nivelamento</p>
             </div>
             <button class="btn-close-modal" @click="closeNewCourseModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
             </button>
          </div>
          <div class="modal-body">
             <div class="form-row" style="display: grid; grid-template-columns: 3fr 1fr; gap: 16px; margin-bottom: 16px;">
               <div class="form-group relative" style="margin-bottom: 0;">
                 <label>Nome do Curso <span class="required">*</span></label>
                 <input v-model="newCourseForm.name" @input="newCourseFormError = false" @keydown.enter="$event.target.blur()" type="text" placeholder="Ex: Lógica de Programação II" :class="['form-input', { 'input-error': newCourseFormError }]"/>
                 <span v-if="newCourseFormError" class="error-text">O nome do curso não pode ficar vazio.</span>
               </div>
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Carga Horária</label>
                 <input v-model="newCourseForm.hours" @keydown.enter="$event.target.blur()" type="text" placeholder="Ex: 40h" class="form-input"/>
               </div>
             </div>
             <div class="form-row" style="display: flex; align-items: flex-start; gap: 32px; margin-bottom: 0;">
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Obrigatório?</label>
                 <label class="toggle-switch" style="margin-top: 4px;">
                   <input type="checkbox" v-model="newCourseForm.required" class="toggle-input">
                   <span class="toggle-slider"></span>
                 </label>
               </div>
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Pontua na Nota?</label>
                 <label class="toggle-switch" style="margin-top: 4px;">
                   <input type="checkbox" v-model="newCourseForm.scores" class="toggle-input">
                   <span class="toggle-slider"></span>
                 </label>
               </div>
               <div class="form-group" style="margin-bottom: 0; margin-left: auto; width: 140px;">
                 <label>Status</label>
                 <select v-model="newCourseForm.status" class="form-input form-select">
                   <option value="Ativo">Ativo</option>
                   <option value="Inativo">Inativo</option>
                 </select>
               </div>
             </div>
          </div>
          <div class="modal-footer">
             <button class="btn-footer-back" @click="closeNewCourseModal">Cancelar</button>
             <button class="btn-footer-continue" @click="saveNewCourse">Adicionar Curso</button>
          </div>
       </div>
    </div>

    <div class="header">
      <div class="header-left">
        <h1>Cadastro de Programa</h1>
        <p class="subtitle">Configure e publique novos editais</p>
      </div>
    </div>

    <div class="registration-container">
      
      <div class="sidebar">
        <div class="steps">
          <div v-for="(title, index) in stepTitles" :key="index">
            <div :class="['step', { active: currentStep === index + 1, completed: currentStep > index + 1 }]" @click="goToStep(index + 1)">
               <div :class="['step-icon', { outline: currentStep < index + 1 }]">
                  <svg v-if="currentStep > index + 1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
               </div>
               <div class="step-label">
                  <span class="step-title">{{ title }}</span>
                  <span class="step-desc">{{ stepDescs[index] }}</span>
               </div>
            </div>
            <div v-if="index < 5" class="step-divider"></div>
          </div>
        </div>
      </div>

      <div class="content">
        
        <DataProgramRegistrationView 
          v-if="currentStep === 1"
          :formData="formData"
          :displayDates="displayDates"
          :activeDatePicker="activeDatePicker"
          :calendarDate="calendarDate"
          :weekDays="weekDays"
          :monthNames="monthNames"
          :calendarDays="calendarDays"
          :isEmailInvalid="isEmailInvalid"
          @update-email-touched="emailTouched = true"
          :newPartnerName="newPartnerName"
          @update-partner-name="newPartnerName = $event"
          @add-partner="addPartner"
          @remove-partner="removePartner"
          @open-date-picker="openDatePicker"
          @parse-date-input="parseDateInput"
          @select-date="selectDate"
          @prev-month="prevMonth"
          @next-month="nextMonth"
          :isSelectedDay="isSelectedDay"
          :isToday="isToday"
        />

        <EstructureProgramRegistrationView 
          v-else-if="currentStep === 2"
          :stageList="stageList"
          :draggedStageIndex="draggedStageIndex"
          :draggedOverStageIndex="draggedOverStageIndex"
          @dragstart="onDragStart"
          @dragover="onDragOver"
          @dragenter="onDragEnter"
          @drop="onDrop"
          @dragend="onDragEnd"
          @open-edit-stage-modal="openEditStageModal"
          @duplicate-stage="duplicateStage"
          @confirm-delete-stage="confirmDeleteStage"
          @open-new-stage-modal="openNewStageModal"
          @restore-default-stages="restoreDefaultStages"
        />

        <FirstStageProgramRegistrationView 
          v-else-if="currentStep === 3"
          :inscriptionForm="inscriptionForm"
          :displayDates="displayDates"
          :activeDatePicker="activeDatePicker"
          :calendarDate="calendarDate"
          :weekDays="weekDays"
          :monthNames="monthNames"
          :calendarDays="calendarDays"
          @open-date-picker="openDatePicker"
          @parse-date-input="parseDateInput"
          @select-date="selectDate"
          @prev-month="prevMonth"
          @next-month="nextMonth"
          @open-custom-field-modal="openCustomFieldModal"
          @open-custom-document-modal="openCustomDocumentModal"
          :isSelectedDay="isSelectedDay"
          :isToday="isToday"
        />

        <SecondStageProgramRegistrationView 
          v-else-if="currentStep === 4"
          :nivelamentoForm="nivelamentoForm"
          :displayDates="displayDates"
          :activeDatePicker="activeDatePicker"
          :calendarDate="calendarDate"
          :weekDays="weekDays"
          :monthNames="monthNames"
          :calendarDays="calendarDays"
          :reqCoursesCount="reqCoursesCount"
          :optCoursesCount="optCoursesCount"
          @open-date-picker="openDatePicker"
          @parse-date-input="parseDateInput"
          @select-date="selectDate"
          @prev-month="prevMonth"
          @next-month="nextMonth"
          @parse-time-input="parseTimeInput"
          @open-new-course-modal="openNewCourseModal"
          :isSelectedDay="isSelectedDay"
          :isToday="isToday"
        />

        <ThirdStageProgramRegistrationView 
          v-else-if="currentStep === 5"
          :currentStep="currentStep"
        />

        <RevisionProgramRegistrationView 
          v-else-if="currentStep === 6"
          :currentStep="currentStep"
        />

        <div class="form-actions-footer">
           <button v-if="currentStep > 1" class="btn-footer-back" @click="prevStep">Voltar</button>
           <button v-if="currentStep < 6" class="btn-footer-continue ml-auto" @click="nextStep">Continuar →</button>
           <button v-else class="btn-footer-continue ml-auto" @click="nextStep">Finalizar</button>
        </div>

      </div>

      <div class="summary-sidebar">
         <div class="sidebar-actions">
            <button class="btn-sidebar-draft" @click="saveDraft">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                 <polyline points="17 21 17 13 7 13 7 21"></polyline>
                 <polyline points="7 3 7 8 15 8"></polyline>
               </svg>
               Salvar Rascunho
            </button>
            <span :class="['status-badge', isDraftSaved ? 'badge-saved' : 'badge-unsaved']">
              {{ isDraftSaved ? 'Rascunho Salvo' : 'Rascunho Não Salvo' }}
            </span>
         </div>
         <h3>Resumo do Edital</h3>
         <p class="summary-desc">Preencha os dados do programa para ver o resumo</p>
         <div class="summary-block">
            <span class="summary-label">Status</span>
            <span class="status-badge outline-badge">Rascunho</span>
         </div>
         <div class="summary-block">
            <span class="summary-label">Etapas do Processo</span>
            <div class="timeline">
               <template v-for="(stage, index) in stageList" :key="stage.id">
                 <div class="timeline-item">
                    <div class="timeline-number">{{ stage.id }}</div>
                    <div class="timeline-content">
                       <h4>{{ stage.title }}</h4>
                       <p>{{ stage.modality }}</p>
                       <span class="timeline-tag">{{ stage.slots }}</span>
                    </div>
                 </div>
                 <div v-if="index < stageList.length - 1" class="timeline-line"></div>
               </template>
            </div>
         </div>
         <div class="summary-footer">
            Última atualização: Hoje às {{ lastUpdatedTime }}
         </div>
      </div>

    </div>
  </div>
</template>

<script>
// IMPORTANDO OS ARQUIVOS FILHOS DA PASTA COMPONENTS
import DataProgramRegistrationView from './components/DataProgramRegistrationView.vue';
import EstructureProgramRegistrationView from './components/EstructureProgramRegistrationView.vue';
import FirstStageProgramRegistrationView from './components/FirstStageProgramRegistrationView.vue';
import SecondStageProgramRegistrationView from './components/SecondStageProgramRegistrationView.vue';
import ThirdStageProgramRegistrationView from './components/ThirdStageProgramRegistrationView.vue';
import RevisionProgramRegistrationView from './components/RevisionProgramRegistrationView.vue';

export default {
  name: 'ProgramRegistrationView',
  // DECLARANDO OS COMPONENTES PARA O VUE RENDERIZAR
  components: {
    DataProgramRegistrationView,
    EstructureProgramRegistrationView,
    FirstStageProgramRegistrationView,
    SecondStageProgramRegistrationView,
    ThirdStageProgramRegistrationView,
    RevisionProgramRegistrationView
  },
  data() {
    return {
      lastUpdatedTime: '', 
      
      // Controladores Principais
      currentStep: 1, // Voltado para a etapa 1 por padrão
      isDraftSaved: false, // Nova flag de controle do Rascunho
      
      stepTitles: ['Dados do Programa', 'Estrutura das Etapas', 'Etapa 0 — Inscrição', 'Etapa 1 — Nivelamento', 'Etapa 2 — Imersão', 'Revisão Final'],
      stepDescs: ['Informações gerais', 'Definição do fluxo', 'Formulário e elegibilidade', 'Cursos e avaliação', 'Projetos e benefícios', 'Validar e publicar'],
      newPartnerName: '', 
      emailTouched: false, 
      draggedStageIndex: null,
      draggedOverStageIndex: null,
      
      formData: { 
        programName: '', batchName: '', executor: '', objective: '', partners: [], location: '', supportEmail: '', officialWebsite: '', publishDate: '', startDate: '', endDate: '', inscStart: '', inscEnd: '', nivStart: '', nivEnd: '', nivExamDate: '', status: 'Rascunho', observations: '' 
      },
      
      inscriptionForm: {
        title: 'Inscrição', type: 'Inscrição / Triagem', desc: 'Etapa de inscrições e triagem inicial dos candidatos', situation: 'Obrigatória', targetAudience: '', educationReqs: '', requireLinkedin: false, requireCPF: true, singleRegistration: true,
        fields: [
          { name: 'Nome completo', required: true }, { name: 'E-mail', required: true }, { name: 'CPF', required: true }, { name: 'Data de nascimento', required: true }, { name: 'Telefone', required: true }, { name: 'LinkedIn', required: false }, { name: 'Município', required: true }, { name: 'Estado', required: true }, { name: 'Formação', required: true }, { name: 'Instituição de ensino', required: false }, { name: 'Grau de escolaridade', required: true },
        ],
        documents: [
          { name: 'Documento de identidade', types: 'PDF, JPG', required: true }, { name: 'CPF', types: 'PDF, JPG', required: true }, { name: 'Comprovante de escolaridade', types: 'PDF', required: true },
        ],
        quotas: { ampla: 50, pcd: 10, negros: 30, mulheres: 0, age45: 10, singleQuota: true, revertUnfilled: true },
        classification: { active: true, count: 250, criteria: 'Ordem de inscrição', tiebreaker: '', waitlist: true, allowAppeals: true, appealDeadline: '' }
      },

      nivelamentoForm: {
        title: 'Nivelamento', modality: 'Remota Assíncrona', workload: '172h', platform: '',
        courses: [
          { name: 'Introdução à plataforma', hours: '2h', required: true, scores: false, status: 'Ativo' },
          { name: 'Lógica de programação', hours: '40h', required: true, scores: true, status: 'Ativo' },
          { name: 'Programação Python', hours: '60h', required: true, scores: true, status: 'Ativo' },
          { name: 'Organização de computadores', hours: '30h', required: true, scores: true, status: 'Ativo' },
          { name: 'Banco de dados', hours: '40h', required: true, scores: true, status: 'Ativo' },
          { name: 'Empreendedorismo e gerência de projetos', hours: '20h', required: false, scores: true, status: 'Ativo' },
          { name: 'Desenvolvimento mobile', hours: '30h', required: false, scores: true, status: 'Ativo' },
          { name: 'Business Intelligence', hours: '25h', required: false, scores: true, status: 'Ativo' },
          { name: 'Big Data', hours: '30h', required: false, scores: true, status: 'Ativo' },
          { name: 'Inteligência Artificial', hours: '35h', required: false, scores: true, status: 'Ativo' },
          { name: 'IoT', hours: '20h', required: false, scores: true, status: 'Ativo' },
          { name: 'Engenharia de Requisitos', hours: '15h', required: false, scores: true, status: 'Ativo' },
          { name: 'Treinamento de IA', hours: '25h', required: false, scores: true, status: 'Ativo' },
          { name: 'UI/UX', hours: '30h', required: false, scores: true, status: 'Ativo' },
        ],
        completionRules: { requireActivities: true, requireMinScore: true, minScoreValue: '70', requireFinalEval: true },
        finalExam: { active: true, time: '', duration: 120, questionsCount: 50, type: 'Múltipla Escolha', sequential: true, allowBack: false, mandatorySubmit: true },
        grading: { examWeight: 70, optionalWeight: 30, bonusLocation: 5, minPassingScore: 50, cutOffRule: false, approvedCount: 50, generatePrelimList: true, allowAppeals: true, generateFinalList: true },
        certification: { active: true, criteria: 'Aprovação na etapa', defaultText: '' }
      },
      
      showNewStageModal: false,
      newStageForm: { title: '', type: '', modality: 'Online', durationValue: '', durationUnit: 'dias', slots: '', desc: '' },
      
      showEditStageModal: false,
      editStageForm: { id: null, title: '', type: '', modality: 'Online', durationValue: '', durationUnit: 'dias', slots: '', desc: '' },

      showDeleteConfirmModal: false,
      stageToDelete: null,
      
      showCustomFieldModal: false,
      customFieldFormError: false, 
      customFieldForm: { name: '', type: 'text', required: true },

      showCustomDocumentModal: false,
      customDocumentFormError: false, 
      customDocumentTypeError: false, 
      customDocumentForm: { name: '', types: ['PDF'], required: true },
      availableDocTypes: ['PDF', 'DOCX', 'JPG', 'PNG', 'XLSX', 'ZIP'],

      showNewCourseModal: false,
      newCourseFormError: false,
      newCourseForm: { name: '', hours: '', required: false, scores: true, status: 'Ativo' },

      stageList: [], 
      displayDates: { publishDate: '', startDate: '', endDate: '', inscStart: '', inscEnd: '', nivStart: '', nivEnd: '', nivExamDate: '' }, 
      activeDatePicker: null, 
      calendarDate: new Date(), 
      weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    };
  },
  
  mounted() { 
    this.restoreDefaultStages(); 
    this.updateLastModifiedTime();

    // NOVA LÓGICA: Verifica se há um rascunho salvo no navegador
    const savedStep = localStorage.getItem('programDraftStep');
    if (savedStep) {
      this.currentStep = parseInt(savedStep, 10);
      this.isDraftSaved = true;
    } else {
      this.currentStep = 1;
    }
  },
  
  watch: {
    'formData.publishDate'(val) { this.displayDates.publishDate = this.formatDateDisplay(val); },
    'formData.startDate'(val) { this.displayDates.startDate = this.formatDateDisplay(val); },
    'formData.endDate'(val) { this.displayDates.endDate = this.formatDateDisplay(val); },
    'formData.inscStart'(val) { this.displayDates.inscStart = this.formatDateDisplay(val); },
    'formData.inscEnd'(val) { this.displayDates.inscEnd = this.formatDateDisplay(val); },
    'formData.nivStart'(val) { this.displayDates.nivStart = this.formatDateDisplay(val); },
    'formData.nivEnd'(val) { this.displayDates.nivEnd = this.formatDateDisplay(val); },
    'formData.nivExamDate'(val) { this.displayDates.nivExamDate = this.formatDateDisplay(val); },
    
    // Agora, qualquer digitação nos forms avisa que o rascunho não está salvo
    formData: { handler() { this.updateLastModifiedTime(); this.isDraftSaved = false; }, deep: true },
    inscriptionForm: { handler() { this.updateLastModifiedTime(); this.isDraftSaved = false; }, deep: true },
    nivelamentoForm: { handler() { this.updateLastModifiedTime(); this.isDraftSaved = false; }, deep: true },
    stageList: { handler() { this.updateLastModifiedTime(); this.isDraftSaved = false; }, deep: true }
  },
  
  computed: {
    reqCoursesCount() { return this.nivelamentoForm.courses.filter(c => c.required).length; },
    optCoursesCount() { return this.nivelamentoForm.courses.filter(c => !c.required).length; },
    isEmailInvalid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return this.formData.supportEmail && !emailRegex.test(this.formData.supportEmail);
    },
    calendarDays() {
      const year = this.calendarDate.getFullYear();
      const month = this.calendarDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay(); 
      const daysInMonth = new Date(year, month + 1, 0).getDate(); 
      const days = [];
      for (let i = 0; i < firstDay; i++) { days.push(null); }
      for (let i = 1; i <= daysInMonth; i++) { days.push(i); }
      return days;
    }
  },
  
  methods: {
    updateLastModifiedTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      this.lastUpdatedTime = `${hours}:${minutes}`;
    },
    
    // NOVA LÓGICA: Salva a etapa atual no navegador
    saveDraft() {
      this.isDraftSaved = true;
      localStorage.setItem('programDraftStep', this.currentStep.toString());
    },

    nextStep() { if (this.currentStep < 6) this.currentStep++; window.scrollTo({ top: 0, behavior: 'smooth' }); },
    prevStep() { if (this.currentStep > 1) this.currentStep--; window.scrollTo({ top: 0, behavior: 'smooth' }); },
    goToStep(num) { this.currentStep = num; window.scrollTo({ top: 0, behavior: 'smooth' }); },
    
    onDragStart(index, event) { this.draggedStageIndex = index; event.dataTransfer.effectAllowed = 'move'; },
    onDragOver(event) { event.preventDefault(); },
    onDragEnter(index) { this.draggedOverStageIndex = index; },
    onDrop(index) {
      if (this.draggedStageIndex !== null && this.draggedStageIndex !== index) {
        const draggedItem = this.stageList.splice(this.draggedStageIndex, 1)[0];
        this.stageList.splice(index, 0, draggedItem);
      }
      this.onDragEnd();
    },
    onDragEnd() { this.draggedStageIndex = null; this.draggedOverStageIndex = null; },

    restoreDefaultStages() {
      this.stageList = [
        { id: 0, title: 'Inscrição', type: 'Inscrição / Triagem', desc: 'Etapa de inscrições e triagem inicial dos candidatos', modality: 'Online', duration: '30 dias', slots: 'Ilimitado', isDefault: true },
        { id: 1, title: 'Nivelamento', type: 'Capacitação', desc: 'Cursos online e avaliação teórica', modality: 'Remota Assíncrona', duration: '3 meses', slots: '250 vagas', isDefault: true },
        { id: 2, title: 'Imersão', type: 'Projeto Prático', desc: 'Desenvolvimento de projetos em grupos', modality: 'Híbrida', duration: '6 meses', slots: '50 vagas', isDefault: true }
      ];
    },
    
    openNewStageModal() { this.showNewStageModal = true; },
    closeNewStageModal() { this.showNewStageModal = false; this.newStageForm = { title: '', type: '', modality: 'Online', durationValue: '', durationUnit: 'dias', slots: '', desc: '' }; },
    saveNewStage() {
       if(!this.newStageForm.title) return; 
       const nextId = this.stageList.length > 0 ? Math.max(...this.stageList.map(s => s.id)) + 1 : 0;
       const finalDuration = this.newStageForm.durationValue ? `${this.newStageForm.durationValue} ${this.newStageForm.durationUnit}` : '';
       this.stageList.push({ id: nextId, title: this.newStageForm.title, type: this.newStageForm.type, desc: this.newStageForm.desc, modality: this.newStageForm.modality, duration: finalDuration, slots: this.newStageForm.slots, isDefault: false });
       this.closeNewStageModal();
    },
    
    openEditStageModal(stage) {
       this.editStageForm = { ...stage }; 
       if (stage.duration) {
          const parts = stage.duration.split(' ');
          this.editStageForm.durationValue = parts[0] || '';
          this.editStageForm.durationUnit = parts[1] || 'dias';
       }
       this.showEditStageModal = true;
    },
    closeEditStageModal() { this.showEditStageModal = false; },
    saveEditStage() {
       const index = this.stageList.findIndex(s => s.id === this.editStageForm.id);
       if (index !== -1) {
          const finalDuration = this.editStageForm.durationValue ? `${this.editStageForm.durationValue} ${this.editStageForm.durationUnit}` : '';
          this.stageList[index] = { ...this.editStageForm, duration: finalDuration };
       }
       this.closeEditStageModal();
    },
    
    confirmDeleteStage(stage) { this.stageToDelete = stage; this.showDeleteConfirmModal = true; },
    cancelDeleteStage() { this.showDeleteConfirmModal = false; this.stageToDelete = null; },
    executeDeleteStage() {
      if (this.stageToDelete) {
        this.stageList = this.stageList.filter(s => s.id !== this.stageToDelete.id);
        this.cancelDeleteStage();
      }
    },

    duplicateStage(stage) {
      const nextId = this.stageList.length > 0 ? Math.max(...this.stageList.map(s => s.id)) + 1 : 0;
      const duplicatedStage = { ...stage };
      duplicatedStage.id = nextId;
      duplicatedStage.title = `${stage.title} (Cópia)`; 
      duplicatedStage.isDefault = false; 
      const originalIndex = this.stageList.findIndex(s => s.id === stage.id);
      if (originalIndex !== -1) {
        this.stageList.splice(originalIndex + 1, 0, duplicatedStage);
      } else {
        this.stageList.push(duplicatedStage);
      }
    },

    openCustomFieldModal() { this.showCustomFieldModal = true; },
    closeCustomFieldModal() {
      this.showCustomFieldModal = false;
      this.customFieldFormError = false; 
      this.customFieldForm = { name: '', type: 'text', required: true };
    },
    saveCustomField() {
      if (!this.customFieldForm.name.trim()) { this.customFieldFormError = true; return; }
      this.inscriptionForm.fields.push({ name: this.customFieldForm.name, required: this.customFieldForm.required });
      this.closeCustomFieldModal();
    },

    toggleDocType(type) {
      const index = this.customDocumentForm.types.indexOf(type);
      if (index > -1) { this.customDocumentForm.types.splice(index, 1); } 
      else { this.customDocumentForm.types.push(type); }
      this.customDocumentTypeError = false;
    },
    openCustomDocumentModal() { this.showCustomDocumentModal = true; },
    closeCustomDocumentModal() {
      this.showCustomDocumentModal = false;
      this.customDocumentFormError = false; 
      this.customDocumentTypeError = false; 
      this.customDocumentForm = { name: '', types: ['PDF'], required: true };
    },
    saveCustomDocument() {
      if (!this.customDocumentForm.name.trim()) { this.customDocumentFormError = true; }
      if (this.customDocumentForm.types.length === 0) { this.customDocumentTypeError = true; }
      if (this.customDocumentFormError || this.customDocumentTypeError) return;
      this.inscriptionForm.documents.push({ name: this.customDocumentForm.name, types: this.customDocumentForm.types.join(', '), required: this.customDocumentForm.required });
      this.closeCustomDocumentModal();
    },

    openNewCourseModal() { this.showNewCourseModal = true; },
    closeNewCourseModal() {
      this.showNewCourseModal = false;
      this.newCourseFormError = false; 
      this.newCourseForm = { name: '', hours: '', required: false, scores: true, status: 'Ativo' };
    },
    saveNewCourse() {
      if (!this.newCourseForm.name.trim()) { this.newCourseFormError = true; return; }
      this.nivelamentoForm.courses.push({ name: this.newCourseForm.name, hours: this.newCourseForm.hours || '0h', required: this.newCourseForm.required, scores: this.newCourseForm.scores, status: this.newCourseForm.status });
      this.closeNewCourseModal();
    },
    
    addPartner() { 
      if (this.newPartnerName.trim() && !this.formData.partners.includes(this.newPartnerName.trim())) { 
        this.formData.partners.push(this.newPartnerName.trim()); 
        this.newPartnerName = ''; 
      } 
    },
    removePartner(idx) { this.formData.partners.splice(idx, 1); },
    
    openDatePicker(f) { 
        if (this.activeDatePicker === f) { this.closeDatePicker(); return; } 
        this.activeDatePicker = f; 
        const exist = this.formData[f]; 
        if (exist) { 
          const [y, m, d] = exist.split('-'); 
          this.calendarDate = new Date(y, m - 1, d); 
        } else { 
          this.calendarDate = new Date(); 
        } 
    },
    closeDatePicker() { this.activeDatePicker = null; },
    selectDate(d) { 
      if (!d) return; 
      const y = this.calendarDate.getFullYear();
      const m = String(this.calendarDate.getMonth() + 1).padStart(2, '0'); 
      const day = String(d).padStart(2, '0'); 
      this.formData[this.activeDatePicker] = `${y}-${m}-${day}`; 
      this.closeDatePicker(); 
    },
    prevMonth() { this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() - 1, 1); },
    nextMonth() { this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 1); },
    formatDateDisplay(s) { 
      if (!s) return ''; 
      const [y, m, d] = s.split('-'); 
      return `${d}/${m}/${y}`; 
    },
    parseDateInput(f) {
      let v = this.displayDates[f].replace(/\D/g, ''); 
      if (v.length >= 2) { 
        let d = parseInt(v.substring(0, 2)); 
        if (d > 31) v = '31' + v.substring(2); 
        else if (d === 0) v = '01' + v.substring(2); 
      }
      if (v.length >= 4) { 
        let m = parseInt(v.substring(2, 4)); 
        if (m > 12) v = v.substring(0, 2) + '12' + v.substring(4); 
        else if (m === 0) v = v.substring(0, 2) + '01' + v.substring(4); 
      }
      let fmt = v; 
      if (v.length > 2) fmt = v.substring(0, 2) + '/' + v.substring(2); 
      if (v.length > 4) fmt = fmt.substring(0, 5) + '/' + v.substring(4, 8);
      this.displayDates[f] = fmt;
      if (v.length === 8) { 
        const d = v.substring(0, 2); const m = v.substring(2, 4); const y = v.substring(4, 8);
        const obj = new Date(y, m - 1, d); 
        if (obj.getFullYear() == y && obj.getMonth() == m - 1 && obj.getDate() == d) { 
          this.formData[f] = `${y}-${m}-${d}`; 
          this.calendarDate = new Date(y, m - 1, d); 
        } else { 
          this.formData[f] = ''; 
        } 
      } else { 
        this.formData[f] = ''; 
      }
    },

    parseTimeInput() {
      let v = this.nivelamentoForm.finalExam.time.replace(/\D/g, ''); 
      if (v.length >= 2) { 
        let h = parseInt(v.substring(0, 2)); 
        if (h > 23) v = '23' + v.substring(2); 
      }
      if (v.length >= 4) { 
        let m = parseInt(v.substring(2, 4)); 
        if (m > 59) v = v.substring(0, 2) + '59'; 
      }
      let fmt = v; 
      if (v.length > 2) { fmt = v.substring(0, 2) + ':' + v.substring(2, 4); }
      this.nivelamentoForm.finalExam.time = fmt;
    },
    
    isSelectedDay(f, d) { 
      if (!d || !this.formData[f]) return false; 
      const [y, m, day] = this.formData[f].split('-'); 
      return Number(y) === this.calendarDate.getFullYear() && Number(m) === this.calendarDate.getMonth() + 1 && Number(day) === d; 
    },
    isToday(day) { 
      const t = new Date(); 
      return day && t.getFullYear() === this.calendarDate.getFullYear() && t.getMonth() === this.calendarDate.getMonth() && t.getDate() === day; 
    }
  }
};
</script>

<style>
/* Zera as medidas incluindo paddings na largura total para evitar estouros no layout */
* { 
  box-sizing: border-box; 
}

/* Div raiz que engloba toda a página de cadastro */
.program-registration-view { 
  min-height: 100vh; 
  background-color: #fafbfd; 
  padding: 24px; 
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
}

/* Engloba o título principal e subtítulo da página */
.header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 24px; 
}

.header-left h1 { 
  font-size: 22px; 
  font-weight: 600; 
  color: #1a233a; 
  margin: 0 0 4px 0; 
}

.subtitle { 
  color: #6b7280; 
  margin: 0; 
  font-size: 13px; 
}

.registration-container { 
  display: grid; 
  grid-template-columns: 260px 1fr 280px; 
  gap: 32px; 
  align-items: start; 
}

.sidebar { 
  position: sticky; 
  top: 90px; 
  height: fit-content; 
  max-height: calc(100vh - 110px); 
  overflow-y: auto; 
}

.steps { 
  display: flex; 
  flex-direction: column; 
}

.step { 
  display: flex; 
  align-items: center; 
  gap: 14px; 
  padding: 16px; 
  border-radius: 8px; 
  cursor: pointer; 
  transition: all 0.2s; 
}

.step:hover { 
  background-color: #f3f4f6; 
}

.step.active { 
  background-color: #e0f2fe; 
  border: 1px solid #bae6fd; 
}

.step-icon { 
  width: 36px; 
  height: 36px; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  background-color: #0288d1; 
  color: white; 
  transition: all 0.2s; 
}

.step-icon.outline { 
  background-color: #f3f4f6; 
  color: #9ca3af; 
}

.step.completed .step-icon { 
  background-color: #0288d1; 
  color: white; 
}

.step-label { 
  display: flex; 
  flex-direction: column; 
}

.step-title { 
  font-size: 14px; 
  font-weight: 500; 
  color: #1a233a; 
  transition: color 0.2s; 
}

.step.active .step-title, 
.step.completed .step-title { 
  color: #000000; 
}

.step-desc { 
  font-size: 13px; 
  color: #6b7280; 
  transition: color 0.2s; 
}

.step.active .step-desc, 
.step.completed .step-desc { 
  color: #000000; 
}

.step-divider { 
  width: 1px; 
  height: 16px; 
  background-color: #e5e7eb; 
  margin-left: 32px; 
}

.sidebar::-webkit-scrollbar, 
.summary-sidebar::-webkit-scrollbar { 
  width: 4px; 
}

.sidebar::-webkit-scrollbar-thumb, 
.summary-sidebar::-webkit-scrollbar-thumb { 
  background: #e5e7eb; 
  border-radius: 4px; 
}

.content { 
  display: flex; 
  flex-direction: column; 
  justify-content: space-between; 
  min-height: calc(100vh - 120px); 
}

.step-container { 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
}

.step-header h2 { 
  font-size: 20px; 
  color: #1a233a; 
  margin: 0 0 4px 0; 
}

.step-header p { 
  margin: 0; 
  color: #6b7280; 
  font-size: 14px; 
}

.card-section { 
  background: white; 
  border: 1px solid #e5e7eb; 
  border-radius: 8px; 
  padding: 18px 24px; 
}

.section-title { 
  margin-bottom: 16px; 
}

.section-title h3 { 
  font-size: 17px; 
  font-weight: 600; 
  color: #1a233a; 
  margin: 0 0 4px 0; 
}

.section-title p { 
  font-size: 15px; 
  color: #6b7280; 
  margin: 0; 
}

.form-row { 
  display: flex; 
  gap: 16px; 
  width: 100%; 
}

.form-row.two-cols > .form-group { 
  flex: 1; 
}

.three-cols-special { 
  display: grid; 
  grid-template-columns: 1fr 1.5fr 1fr; 
  gap: 16px; 
}

.form-group { 
  margin-bottom: 16px; 
  position: relative; 
}

.form-group label { 
  display: block; 
  font-size: 14px; 
  font-weight: 500; 
  margin-bottom: 6px; 
  color: #374151; 
}

.required {
  color: #ef4444; 
}

.form-input, 
.form-textarea { 
  width: 100%; 
  padding: 10px 12px; 
  border: 1px solid transparent; 
  border-radius: 6px; 
  background-color: #f9fafb; 
  font-family: inherit; 
  font-size: 14px; 
  color: #1a233a; 
  transition: all 0.2s; 
}

.form-select { 
  appearance: auto; 
  cursor: pointer; 
  padding-left: 8px; 
}

.form-input:focus, 
.form-textarea:focus { 
  outline: none; 
  background-color: white; 
  box-shadow: 0 0 0 1px #3b82f6; 
}

.form-input::placeholder, 
.form-textarea::placeholder { 
  color: #9ca3af; 
}

.form-textarea { 
  resize: vertical; 
}

.form-input.input-error { 
  background-color: #fef2f2; 
  box-shadow: 0 0 0 1px #ef4444; 
}

.error-text { 
  display: block; 
  color: #ef4444; 
  font-size: 11px; 
  margin-top: 6px; 
  font-weight: 500; 
}

.duration-input-group { 
  display: flex; 
  gap: 8px; 
  width: 100%; 
}

.duration-input-group input { 
  flex: 1; 
}

.duration-input-group select { 
  flex: 1; 
  min-width: 100px; 
}

.partner-input-row { 
  display: flex; 
  gap: 12px; 
  align-items: center; 
}

.partner-input-row .form-input { 
  flex: 1; 
}

.btn-add-partner { 
  display: flex; 
  align-items: center; 
  gap: 6px; 
  background-color: #1e1b4b; 
  color: white; 
  border: none; 
  padding: 10px 16px; 
  border-radius: 6px; 
  font-size: 13px; 
  font-weight: 500; 
  cursor: pointer; 
}

.partner-tags-container { 
  display: flex; 
  flex-wrap: wrap; 
  gap: 8px; 
  margin-top: 16px; 
}

.partner-tag { 
  display: flex; 
  align-items: center; 
  gap: 6px; 
  padding: 6px 12px; 
  border: 1px solid #0288d1; 
  background-color: #e1f5fe; 
  color: #01579b; 
  border-radius: 16px; 
  font-size: 13px; 
  font-weight: 500; 
}

.btn-remove-tag { 
  background: transparent; 
  border: none; 
  padding: 0; 
  color: #0288d1; 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  border-radius: 50%; 
  transition: all 0.2s; 
}

.info-alert { 
  display: flex; 
  gap: 12px; 
  background-color: #e1f5fe; 
  border: 1px solid #b3e5fc; 
  border-radius: 10px; 
  padding: 16px; 
  margin-bottom: 8px; 
  color: #01579b; 
}

.alert-icon { 
  flex-shrink: 0; 
  margin-top: 2px; 
}

.alert-content strong { 
  display: block; 
  font-size: 14px; 
  margin-bottom: 4px; 
}

.alert-content p { 
  margin: 0; 
  font-size: 13px; 
  line-height: 1.4; 
  opacity: 0.9; 
}

.stages-list { 
  display: flex; 
  flex-direction: column; 
  gap: 16px; 
}

.stage-card { 
  display: flex; 
  background: white; 
  border: 1px solid #e5e7eb; 
  border-radius: 10px; 
  overflow: hidden; 
  transition: all 0.2s ease;
}

.stage-card.is-dragged {
  opacity: 0.4;
  border: 2px dashed #9ca3af;
}

.stage-card.is-dragover {
  border-top: 4px solid #0288d1;
  margin-top: 8px;
}

.stage-drag-handle { 
  padding: 0 12px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  color: #d1d5db; 
  cursor: grab; 
  border-right: 1px solid #e5e7eb; 
  background: #f9fafb; 
}

.stage-drag-handle:active {
  cursor: grabbing;
}

.stage-body { 
  padding: 20px; 
  flex: 1; 
}

.stage-header { 
  display: flex; 
  align-items: center; 
  gap: 16px; 
  margin-bottom: 8px; 
}

.stage-number { 
  width: 32px; 
  height: 32px; 
  border-radius: 50%; 
  background-color: #0288d1; 
  color: white; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-weight: 600; 
  font-size: 14px; 
}

.stage-titles h4 { 
  margin: 0 0 4px 0; 
  font-size: 15px; 
  color: #1a233a; 
  display: flex; 
  align-items: center; 
}

.badge-padrao { 
  background-color: #e1f5fe; 
  color: #0288d1; 
  font-size: 10px; 
  padding: 2px 8px; 
  border-radius: 12px; 
  margin-left: 8px; 
  font-weight: 500; 
}

.stage-type { 
  font-size: 12px; 
  color: #6b7280; 
}

.stage-description { 
  margin: 0 0 20px 0; 
  font-size: 13px; 
  color: #4b5563; 
}

.stage-info-grid { 
  display: grid; 
  grid-template-columns: repeat(3, 1fr); 
  gap: 16px; 
  margin-bottom: 20px; 
  padding-bottom: 20px; 
  border-bottom: 1px solid #f3f4f6; 
}

.info-item { 
  display: flex; 
  align-items: flex-start; 
  gap: 8px; 
  color: #6b7280; 
}

.info-item svg { 
  margin-top: 2px; 
  color: #9ca3af; 
}

.info-item small { 
  display: block; 
  font-size: 11px; 
  margin-bottom: 2px; 
}

.info-item span { 
  display: block; 
  font-size: 13px; 
  color: #1a233a; 
  font-weight: 500; 
}

.stage-actions { 
  display: flex; 
  gap: 12px; 
}

.btn-stage-action { 
  background: white; 
  border: 1px solid #d1d5db; 
  border-radius: 6px; 
  padding: 6px 12px; 
  font-size: 13px; 
  font-weight: 500; 
  color: #374151; 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  gap: 6px; 
}

.btn-stage-action.btn-danger { 
  color: #ef4444; 
  border-color: #fca5a5; 
}

.stage-list-actions { 
  display: flex; 
  gap: 12px; 
  margin-top: 8px; 
  margin-bottom: 40px; 
}

.btn-action-outline { 
  background: white; 
  border: 1px solid #d1d5db; 
  border-radius: 6px; 
  padding: 10px 16px; 
  font-size: 13px; 
  font-weight: 500; 
  color: #374151; 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  transition: all 0.2s; 
}

.btn-action-outline:hover { 
  background: #f9fafb; 
  border-color: #9ca3af; 
}

.modal-overlay { 
  position: fixed; 
  inset: 0; 
  background-color: rgba(15, 23, 42, 0.5); 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  z-index: 1000; 
}

.modal-content { 
  background: white; 
  border-radius: 12px; 
  padding: 24px; 
  width: 100%; 
  max-width: 600px; 
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); 
}

.modal-sm { 
  max-width: 450px; 
}

.modal-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: flex-start; 
  margin-bottom: 24px; 
}

.modal-header h3 { 
  margin: 0; 
  font-size: 18px; 
  color: #1a233a; 
  font-weight: 600; 
}

.modal-subtitle { 
  margin: 4px 0 0 0; 
  font-size: 13px; 
  color: #6b7280; 
}

.btn-close-modal { 
  background: transparent; 
  border: none; 
  color: #9ca3af; 
  cursor: pointer; 
  padding: 4px; 
  border-radius: 6px; 
  display: flex; 
}

.modal-body { 
  margin-bottom: 24px; 
}

.delete-confirm-text { 
  font-size: 14px; 
  color: #374151; 
  line-height: 1.5; 
  margin: 0; 
}

.modal-footer { 
  display: flex; 
  justify-content: flex-end; 
  gap: 12px; 
  padding-top: 16px; 
  border-top: 1px solid #e5e7eb; 
}

.btn-footer-danger { 
  background-color: #ef4444; 
  color: white; 
  border: none; 
  padding: 10px 24px; 
  border-radius: 6px; 
  font-size: 13px; 
  font-weight: 500; 
  cursor: pointer; 
  transition: opacity 0.2s; 
}

.btn-footer-danger:hover { 
  opacity: 0.9; 
}

.form-actions-footer { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding-top: 24px; 
  border-top: 1px solid #e5e7eb; 
  margin-top: auto; 
}

.ml-auto { 
  margin-left: auto; 
}

.btn-footer-back { 
  background: white; 
  border: 1px solid #d1d5db; 
  border-radius: 6px; 
  padding: 10px 24px; 
  font-size: 13px; 
  font-weight: 500; 
  color: #1a233a; 
  cursor: pointer; 
  transition: all 0.2s; 
}

.btn-footer-continue { 
  background-color: #1e1b4b; 
  color: white; 
  border: none; 
  padding: 10px 24px; 
  border-radius: 6px; 
  font-size: 13px; 
  font-weight: 500; 
  cursor: pointer; 
  transition: opacity 0.2s; 
}

.date-row { 
  display: flex; 
  gap: 16px; 
  width: 100%; 
}

.date-field { 
  flex: 1; 
  min-width: 0; 
}

.picker-overlay { 
  position: fixed; 
  inset: 0; 
  z-index: 50; 
  background: transparent; 
}

.date-input-wrapper { 
  position: relative; 
  z-index: 51; 
  width: 100%; 
}

.date-icon { 
  position: absolute; 
  right: 12px; 
  top: 50%; 
  transform: translateY(-50%); 
  color: #9ca3af; 
  cursor: pointer; 
}

.custom-calendar { 
  position: absolute; 
  top: calc(100% + 8px); 
  right: 0; 
  width: 260px; 
  background: white; 
  border: 1px solid #e5e7eb; 
  border-radius: 12px; 
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); 
  z-index: 100; 
  padding: 16px; 
}

.calendar-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 16px; 
  font-weight: 600; 
  color: #1a233a; 
  font-size: 14px; 
}

.cal-btn { 
  background: transparent; 
  border: 1px solid transparent; 
  cursor: pointer; 
  color: #6b7280; 
  padding: 4px; 
  border-radius: 6px; 
}

.calendar-grid { 
  display: grid; 
  grid-template-columns: repeat(7, 1fr); 
  gap: 4px; 
}

.cal-weekday { 
  text-align: center; 
  font-size: 11px; 
  font-weight: 600; 
  color: #9ca3af; 
  margin-bottom: 8px; 
}

.cal-day { 
  height: 32px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: 13px; 
  border-radius: 6px; 
  cursor: pointer; 
  color: #374151; 
}

.cal-day.selected { 
  background-color: #1e1b4b; 
  color: white; 
  font-weight: 600; 
}

.summary-sidebar { 
  position: sticky; 
  top: 90px; 
  height: fit-content; 
  max-height: calc(100vh - 110px); 
  overflow-y: auto; 
  border-left: 1px solid #e5e7eb; 
  padding-left: 32px; 
}

.sidebar-actions { 
  display: flex; 
  align-items: center; 
  gap: 12px; 
  margin-bottom: 32px; 
}

.btn-sidebar-draft { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  background: white; 
  border: 1px solid #e5e7eb; 
  padding: 8px 16px; 
  border-radius: 6px; 
  font-size: 13px; 
  color: #4b5563; 
  cursor: pointer; 
  font-weight: 500; 
}

/* NOVAS CLASSES PARA O BADGE DE RASCUNHO */
.status-badge { 
  padding: 4px 10px; 
  border-radius: 12px; 
  font-size: 12px; 
  font-weight: 500; 
}

.outline-badge { 
  border: 1px solid #e5e7eb; 
  background: white; 
  color: #4b5563;
}

.badge-saved {
  background-color: #dcfce7;
  color: #065f46;
  border: 1px solid #bbf7d0;
}

.badge-unsaved {
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}

.summary-sidebar h3 { 
  font-size: 16px; 
  margin: 0 0 4px 0; 
  color: #1a233a; 
}

.summary-desc { 
  font-size: 13px; 
  color: #9ca3af; 
  margin: 0 0 24px 0; 
  font-style: italic; 
}

.summary-block { 
  margin-bottom: 24px; 
}

.summary-label { 
  display: block; 
  font-size: 13px; 
  color: #6b7280; 
  margin-bottom: 8px; 
}

.timeline { 
  display: flex; 
  flex-direction: column; 
}

.timeline-item { 
  display: flex; 
  gap: 12px; 
}

.timeline-number { 
  width: 20px; 
  height: 20px; 
  border-radius: 50%; 
  background-color: #0288d1; 
  color: white; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: 11px; 
  font-weight: 600; 
  flex-shrink: 0; 
  margin-top: 2px; 
}

.timeline-content h4 { 
  margin: 0 0 2px 0; 
  font-size: 14px; 
  color: #1a233a; 
}

.timeline-content p { 
  margin: 0 0 4px 0; 
  font-size: 13px; 
  color: #6b7280; 
}

.timeline-tag { 
  font-size: 12px; 
  color: #01579b; 
}

.timeline-line { 
  width: 1.5px; 
  height: 24px; 
  background-color: #e5e7eb; 
  margin-left: 9px; 
  margin-top: 4px; 
  margin-bottom: 4px; 
}

.summary-footer { 
  margin-top: 40px; 
  font-size: 12px; 
  color: #9ca3af; 
}

.toggle-switch { 
  position: relative; 
  display: inline-block; 
  width: 36px; 
  height: 20px; 
}

.toggle-input { 
  opacity: 0; 
  width: 0; 
  height: 0; 
}

.toggle-slider { 
  position: absolute; 
  cursor: pointer; 
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  background-color: #d1d5db; 
  transition: .3s; 
  border-radius: 20px; 
}

.toggle-slider:before { 
  position: absolute; 
  content: ""; 
  height: 16px; 
  width: 16px; 
  left: 2px; 
  bottom: 2px; 
  background-color: white; 
  transition: .3s; 
  border-radius: 50%; 
}

.toggle-input:checked + .toggle-slider { 
  background-color: #1e1b4b; 
}

.toggle-input:checked + .toggle-slider:before { 
  transform: translateX(16px); 
}

.list-item-row { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 16px; 
  border: 1px solid #e5e7eb; 
  border-radius: 8px; 
  margin-bottom: 8px; 
  background-color: white;
}

.toggle-row-simple {
  border: none;
  padding: 0 0 16px 0;
  border-radius: 0;
  border-bottom: 1px solid #f3f4f6;
  margin-bottom: 16px;
}

.list-item-info { 
  display: flex; 
  align-items: center; 
}

.list-item-info-stacked { 
  display: flex; 
  flex-direction: column; 
}

.list-item-title { 
  font-size: 14px; 
  color: #1a233a; 
  font-weight: 500; 
}

.list-item-sub { 
  font-size: 12px; 
  color: #6b7280; 
  margin-top: 4px; 
}

.badge-required { 
  background-color: #fef2f2; 
  color: #ef4444; 
  font-size: 10px; 
  padding: 2px 6px; 
  border-radius: 4px; 
  margin-left: 8px; 
  font-weight: 500; 
}

.btn-dashed-add { 
  width: 100%; 
  padding: 12px; 
  background: white; 
  border: 1px dashed #d1d5db; 
  color: #1a233a; 
  border-radius: 8px; 
  font-size: 14px;
  font-weight: 500;
  cursor: pointer; 
  margin-top: 8px;
  transition: all 0.2s;
}

.btn-dashed-add:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.quota-row { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 12px 0; 
  border-bottom: 1px solid #f3f4f6; 
}

.quota-input-wrapper { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
}

.quota-input { 
  width: 60px; 
  padding: 6px 10px;
  text-align: right; 
  border: 1px solid transparent;
  background-color: #f3f4f6;
  border-radius: 6px;
  font-size: 14px;
  color: #1a233a;
  transition: all 0.2s;
}

.quota-input:focus {
  outline: none;
  background-color: white;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.quota-symbol { 
  font-size: 14px; 
  color: #6b7280; 
  font-weight: 500;
}

.green-toggle-box { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  border: 1px solid #a7f3d0; 
  background-color: #f0fdf4; 
  border-radius: 8px; 
  padding: 16px; 
}

.doc-types-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 0;
  transition: all 0.2s;
}

.doc-types-container.error-border {
  padding: 8px;
  border: 1px dashed #ef4444;
  border-radius: 6px;
  background-color: #fef2f2;
}

.doc-type-pill {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #4b5563;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none; 
}

.doc-type-pill:hover {
  border-color: #9ca3af;
  background-color: #f9fafb;
}

.doc-type-pill.active {
  background-color: #e1f5fe;
  border-color: #0288d1;
  color: #01579b;
}

.course-table {
  display: flex;
  flex-direction: column;
}

.course-header {
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr;
  padding: 8px 16px;
  font-size: 13px;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
}

.course-row {
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
}

.course-row:last-child {
  border-bottom: none;
}

.course-name {
  color: #1a233a;
  font-weight: 500;
}

.course-hours {
  color: #6b7280;
}

.badge-active {
  background-color: #dcfce7;
  color: #065f46;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  display: inline-block;
}

.form-range {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 4px;
  outline: none;
  transition: opacity .2s;
}

.form-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 3px solid #1e1b4b; 
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.form-range::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 3px solid #1e1b4b;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.formula-box {
  background-color: #0f172a;
  border-radius: 8px;
  padding: 16px;
  color: white;
  margin-bottom: 24px;
}

.formula-label {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
  display: block;
}

.formula-text {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;
  line-height: 1.5;
}
</style>
}