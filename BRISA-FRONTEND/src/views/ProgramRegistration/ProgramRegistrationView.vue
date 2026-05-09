<template>
  <div class="program-registration-view">
    
    <div v-if="activeDatePicker" class="picker-overlay" @click="closeDatePicker"></div>

    <div v-if="showNewStageModal" class="modal-overlay" @click="closeNewStageModal">
       <div class="modal-content" @click.stop>
          
          <div class="modal-header">
             <div>
               <h3>Adicionar Nova Etapa</h3> <p class="modal-subtitle">Configure as informações da nova etapa do processo seletivo</p> </div>
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
                 <label>Nome da Etapa <span class="required">*</span></label> <input v-model="newStageForm.title" @keydown.enter="$event.target.blur()" type="text" placeholder="Ex: Entrevista Técnica" class="form-input"/>
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
       <div class="modal-content modal-sm" @click.stop> <div class="modal-header">
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
            <div :class="['step', { active: currentStep === index + 1, completed: stepStatuses[index] === 'completed', warning: stepStatuses[index] === 'warning' }]" @click="goToStep(index + 1)">
               
               <div :class="['step-icon', { outline: stepStatuses[index] === 'pending' && currentStep !== index + 1 }]">
                  <svg v-if="stepStatuses[index] === 'completed'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <svg v-else-if="stepStatuses[index] === 'warning'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
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
          :formData="formData"
          :stageList="stageList"
          :inscriptionForm="inscriptionForm"
          :nivelamentoForm="nivelamentoForm"
          :displayDates="displayDates"
          @go-to-step="goToStep"
          @save-draft="saveDraft"
        />

        <div v-if="currentStep < 6" class="form-actions-footer">
           <button v-if="currentStep > 1" class="btn-footer-back" @click="prevStep">Voltar</button>
           <button class="btn-footer-continue ml-auto" @click="nextStep">Continuar →</button>
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
// =======================================================================
// IMPORTAÇÃO DOS ARQUIVOS COMPONENTIZADOS FILHOS
// Eles contêm o HTML específico de cada etapa para manter este arquivo limpo
// =======================================================================
import DataProgramRegistrationView from './components/DataProgramRegistrationView.vue';
import EstructureProgramRegistrationView from './components/EstructureProgramRegistrationView.vue';
import FirstStageProgramRegistrationView from './components/FirstStageProgramRegistrationView.vue';
import SecondStageProgramRegistrationView from './components/SecondStageProgramRegistrationView.vue';
import ThirdStageProgramRegistrationView from './components/ThirdStageProgramRegistrationView.vue';
import RevisionProgramRegistrationView from './components/RevisionProgramRegistrationView.vue';

export default {
  // Nome oficial deste componente principal
  name: 'ProgramRegistrationView',
  
  // Declaração dos componentes para que o Vue permita o uso das tags HTML deles lá em cima
  components: {
    DataProgramRegistrationView,
    EstructureProgramRegistrationView,
    FirstStageProgramRegistrationView,
    SecondStageProgramRegistrationView,
    ThirdStageProgramRegistrationView,
    RevisionProgramRegistrationView
  },
  
  // =======================================================================
  // ESTADO DA APLICAÇÃO (DATA)
  // Define todas as variáveis que controlam o comportamento, telas e inputs
  // =======================================================================
  data() {
    return {
      // Guarda a última vez que o usuário mexeu em algum form
      lastUpdatedTime: '', 
      
      // Controlador principal de abas: Define qual etapa da barra lateral está aberta
      currentStep: 1, 
      
      // Variável de controle: Define se as últimas alterações já foram salvas pelo botão
      isDraftSaved: false, 
      
      // ALTERAÇÃO AQUI: Array que guarda o status de preenchimento (validação) de cada etapa
      stepStatuses: ['pending', 'pending', 'pending', 'pending', 'pending', 'pending'],

      // Arrays que montam os nomes dos 6 botões da barra lateral esquerda
      stepTitles: ['Dados do Programa', 'Estrutura das Etapas', 'Etapa 0 — Inscrição', 'Etapa 1 — Nivelamento', 'Etapa 2 — Imersão', 'Revisão Final'],
      stepDescs: ['Informações gerais', 'Definição do fluxo', 'Formulário e elegibilidade', 'Cursos e avaliação', 'Projetos e benefícios', 'Validar e publicar'],
      
      // Aba 1: Guarda texto temporário digitado no input de adicionar parceiro
      newPartnerName: '', 
      
      // Aba 1: Flag que evita disparar erro de email antes do usuário terminar de digitar
      emailTouched: false, 
      
      // Aba 2: Variáveis que gerenciam a origem e destino dos cards arrastados (Drag and Drop)
      draggedStageIndex: null,
      draggedOverStageIndex: null,
      
      // OBJETO ABA 1: Armazena os inputs de texto, selects e datas gerais do edital
      formData: { 
        programName: '', batchName: '', executor: '', objective: '', partners: [], location: '', supportEmail: '', officialWebsite: '', publishDate: '', startDate: '', endDate: '', inscStart: '', inscEnd: '', nivStart: '', nivEnd: '', nivExamDate: '', status: 'Rascunho', observations: '' 
      },
      
      // OBJETO ABA 3: Configurações do formulário de Inscrição / Triagem / Documentos
      inscriptionForm: {
        title: 'Inscrição', type: 'Inscrição / Triagem', desc: 'Etapa de inscrições e triagem inicial dos candidatos', situation: 'Obrigatória', targetAudience: '', educationReqs: '', requireLinkedin: false, requireCPF: true, singleRegistration: true,
        // Array de configurações de switch liga/desliga de campos de texto no form
        fields: [
          { name: 'Nome completo', required: true }, { name: 'E-mail', required: true }, { name: 'CPF', required: true }, { name: 'Data de nascimento', required: true }, { name: 'Telefone', required: true }, { name: 'LinkedIn', required: false }, { name: 'Município', required: true }, { name: 'Estado', required: true }, { name: 'Formação', required: true }, { name: 'Instituição de ensino', required: false }, { name: 'Grau de escolaridade', required: true },
        ],
        // Array com os documentos de upload exigidos do candidato
        documents: [
          { name: 'Documento de identidade', types: 'PDF, JPG', required: true }, { name: 'CPF', types: 'PDF, JPG', required: true }, { name: 'Comprovante de escolaridade', types: 'PDF', required: true },
        ],
        // Cotas, deficiencias, idade
        quotas: { ampla: 50, pcd: 10, negros: 30, mulheres: 0, age45: 10, singleQuota: true, revertUnfilled: true },
        // Aprovação e envio para fila de espera/Nivelamento
        classification: { active: true, count: 250, criteria: 'Ordem de inscrição', tiebreaker: '', waitlist: true, allowAppeals: true, appealDeadline: '' }
      },

      // OBJETO ABA 4: Configurações do Nivelamento (Aulas, Cursos e Provas)
      nivelamentoForm: {
        title: 'Nivelamento', modality: 'Remota Assíncrona', workload: '172h', platform: '',
        // Tabela completa de minicursos listados
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
        // Regras lógicas de conclusão (Ex: Tirar mais de 70)
        completionRules: { requireActivities: true, requireMinScore: true, minScoreValue: '70', requireFinalEval: true },
        finalExam: { active: true, time: '', duration: 120, questionsCount: 50, type: 'Múltipla Escolha', sequential: true, allowBack: false, mandatorySubmit: true },
        // Sliders de pesos e fórmulas de matemática
        grading: { examWeight: 70, optionalWeight: 30, bonusLocation: 5, minPassingScore: 50, cutOffRule: false, approvedCount: 50, generatePrelimList: true, allowAppeals: true, generateFinalList: true },
        certification: { active: true, criteria: 'Aprovação na etapa', defaultText: '' }
      },
      
      // Controle do Modal: Adicionar Etapa (Aba 2)
      showNewStageModal: false,
      newStageForm: { title: '', type: '', modality: 'Online', durationValue: '', durationUnit: 'dias', slots: '', desc: '' },
      
      // Controle do Modal: Editar Etapa Existente (Aba 2)
      showEditStageModal: false,
      editStageForm: { id: null, title: '', type: '', modality: 'Online', durationValue: '', durationUnit: 'dias', slots: '', desc: '' },

      // Controle do Modal: Alertar Exclusão de Etapa (Aba 2)
      showDeleteConfirmModal: false,
      stageToDelete: null,
      
      // Controle do Modal: Injetar Novo Input Field no form do candidato (Aba 3)
      showCustomFieldModal: false,
      customFieldFormError: false, // Flag que acende a borda vermelha de erro
      customFieldForm: { name: '', type: 'text', required: true },

      // Controle do Modal: Injetar Requerimento de Arquivo/Documento (Aba 3)
      showCustomDocumentModal: false,
      customDocumentFormError: false, 
      customDocumentTypeError: false, // Flag erro se tentar salvar sem selecionar nenhum PDF, DOC, etc
      customDocumentForm: { name: '', types: ['PDF'], required: true },
      availableDocTypes: ['PDF', 'DOCX', 'JPG', 'PNG', 'XLSX', 'ZIP'], // Botões de Pills

      // Controle do Modal: Cadastrar novo Curso de Nivelamento (Aba 4)
      showNewCourseModal: false,
      newCourseFormError: false,
      newCourseForm: { name: '', hours: '', required: false, scores: true, status: 'Ativo' },

      // Array que guarda a ordem exata das etapas do fluxo visual da tela (Aba 2)
      stageList: [], 
      
      // Dicionário reativo usado para exibir e mascarar as datas formatadas em tela (DD/MM/AAAA) enquanto mantém ISO no BD
      displayDates: { publishDate: '', startDate: '', endDate: '', inscStart: '', inscEnd: '', nivStart: '', nivEnd: '', nivExamDate: '' }, 
      
      // Variáveis responsáveis pelo motor do Calendário Customizado
      activeDatePicker: null, // Guarda o nome do campo de data que foi clicado
      calendarDate: new Date(), // Mês/Ano base que o calendário está mostrando
      weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    };
  },
  
  // =======================================================================
  // LIFECYCLE HOOKS (Ciclo de Vida do Vue)
  // =======================================================================
  mounted() { 
    // Captura o minuto/hora atual de carregamento
    this.updateLastModifiedTime();

    // =======================================================================
    // CARREGAMENTO DOS DADOS DO RASCUNHO E DOS STATUS DE VALIDAÇÃO (LOCAL STORAGE)
    // =======================================================================
    const savedStep = localStorage.getItem('programDraftStep');
    if (savedStep) {
      // Se achou, abre a tela exatamente na aba em que a pessoa salvou
      this.currentStep = parseInt(savedStep, 10);
      this.isDraftSaved = true;

      // Resgata o status das bolinhas da barra lateral (Check Azul ou Aviso Amarelo)
      const savedStatuses = localStorage.getItem('draftStepStatuses');
      if (savedStatuses) this.stepStatuses = JSON.parse(savedStatuses);

      // Resgata os formulários salvos e converte de texto (JSON) para objeto novamente
      const savedFormData = localStorage.getItem('draftFormData');
      if (savedFormData) this.formData = JSON.parse(savedFormData);

      const savedInscription = localStorage.getItem('draftInscriptionForm');
      if (savedInscription) this.inscriptionForm = JSON.parse(savedInscription);

      const savedNivelamento = localStorage.getItem('draftNivelamentoForm');
      if (savedNivelamento) this.nivelamentoForm = JSON.parse(savedNivelamento);

      const savedStageList = localStorage.getItem('draftStageList');
      if (savedStageList) {
        this.stageList = JSON.parse(savedStageList);
      } else {
        // Fallback: Se não havia etapas na lista, restaura as 3 padrões
        this.restoreDefaultStages();
      }

      const savedDisplayDates = localStorage.getItem('draftDisplayDates');
      if (savedDisplayDates) this.displayDates = JSON.parse(savedDisplayDates);

    } else {
      // Se NÃO achou nenhum rascunho salvo, vai pra tela inicial (Aba 1) e carrega as etapas originais do sistema.
      this.currentStep = 1;
      this.restoreDefaultStages(); 
    }
  },
  
  // =======================================================================
  // WATCHERS (Observadores)
  // Funções que vigiam e detectam reativamente alterações nos Data Objects
  // =======================================================================
  watch: {
    // ---------------------------------------------------------------------
    // Bloco de Watchers de Datas: Sempre que o sistema/BD (formData) sofrer alteração na data "Y-M-D", 
    // esse watcher entra em ação e engatilha a função formatDateDisplay pra refazer a visualização em tela para "D/M/Y"
    // ---------------------------------------------------------------------
    'formData.publishDate'(val) { this.displayDates.publishDate = this.formatDateDisplay(val); },
    'formData.startDate'(val) { this.displayDates.startDate = this.formatDateDisplay(val); },
    'formData.endDate'(val) { this.displayDates.endDate = this.formatDateDisplay(val); },
    'formData.inscStart'(val) { this.displayDates.inscStart = this.formatDateDisplay(val); },
    'formData.inscEnd'(val) { this.displayDates.inscEnd = this.formatDateDisplay(val); },
    'formData.nivStart'(val) { this.displayDates.nivStart = this.formatDateDisplay(val); },
    'formData.nivEnd'(val) { this.displayDates.nivEnd = this.formatDateDisplay(val); },
    'formData.nivExamDate'(val) { this.displayDates.nivExamDate = this.formatDateDisplay(val); },
    
    // ---------------------------------------------------------------------
    // Watchers Deep (Profundos): Olham O OBJETO INTEIRO e não apenas um campo.
    // Qualquer tecla que o usuário digitar nos formulários vai acionar essas funções.
    // O sistema atualiza o relógio (updateLastModifiedTime) e tira o status de "Rascunho Salvo" (isDraftSaved = false)
    // ---------------------------------------------------------------------
    formData: { handler() { this.updateLastModifiedTime(); this.isDraftSaved = false; }, deep: true },
    inscriptionForm: { handler() { this.updateLastModifiedTime(); this.isDraftSaved = false; }, deep: true },
    nivelamentoForm: { handler() { this.updateLastModifiedTime(); this.isDraftSaved = false; }, deep: true },
    stageList: { handler() { this.updateLastModifiedTime(); this.isDraftSaved = false; }, deep: true }
  },
  
  // =======================================================================
  // COMPUTED PROPERTIES (Propriedades Computadas)
  // Valores cacheados que só se atualizam quando seus dependentes mudam
  // =======================================================================
  computed: {
    // Varre o array de cursos do nivelamento e conta quantos estão com a chave 'required' ligada
    reqCoursesCount() { return this.nivelamentoForm.courses.filter(c => c.required).length; },
    
    // Varre o array de cursos do nivelamento e conta quantos NÃO estão com a chave ligada (são opcionais)
    optCoursesCount() { return this.nivelamentoForm.courses.filter(c => !c.required).length; },
    
    // Expressão Regular (Regex) que verifica se a string de email contém "@" e "." nos lugares certos
    isEmailInvalid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return this.formData.supportEmail && !emailRegex.test(this.formData.supportEmail);
    },
    
    // Mecânica geométrica do Calendário: Calcula quantos "buracos vazios" devem existir antes do dia 1 do mês,
    // garantindo que os dias da semana encaixem corretamente debaixo da matriz [Dom, Seg, Ter...]
    calendarDays() {
      const year = this.calendarDate.getFullYear();
      const month = this.calendarDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay(); // Em que dia da semana cai o dia 01
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // Quantidade exata de dias naquele mês específico
      
      const days = [];
      // Injeta campos nulos para empurrar o layout pro dia da semana correto
      for (let i = 0; i < firstDay; i++) { days.push(null); }
      // Injeta os números numéricos iteráveis normais 
      for (let i = 1; i <= daysInMonth; i++) { days.push(i); }
      return days;
    }
  },
  
  // =======================================================================
  // METHODS (Funções ativas da interface)
  // =======================================================================
  methods: {
    
    // Gera a string de hora no formato de relógio 00:00 atual
    updateLastModifiedTime() {
      const now = new Date();
      // O padStart evita o bug de formatação onde hora "9" vira "9:5" em vez de "09:05"
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      this.lastUpdatedTime = `${hours}:${minutes}`;
    },

    // =======================================================================
    // LÓGICA DE VALIDAÇÃO (ALTERAÇÃO): Verifica os campos vazios da aba atual
    // =======================================================================
    validateCurrentStep() {
      let isValid = true;
      
      // Validação da Aba 1 (Dados Gerais)
      if (this.currentStep === 1) {
        isValid = !!(this.formData.programName && this.formData.batchName && this.formData.executor && this.formData.objective && this.formData.supportEmail && this.displayDates.startDate && this.displayDates.endDate);
      } 
      // Validação da Aba 2 (Estrutura)
      else if (this.currentStep === 2) {
        isValid = this.stageList.length > 0;
      } 
      // Validação da Aba 3 (Inscrição)
      else if (this.currentStep === 3) {
        isValid = !!(this.displayDates.inscStart && this.displayDates.inscEnd);
      } 
      // Validação da Aba 4 (Nivelamento)
      else if (this.currentStep === 4) {
        isValid = !!(this.nivelamentoForm.title && this.displayDates.nivStart && this.displayDates.nivEnd);
      } 
      // Validação da Aba 5 (Imersão) - Considerada ok por padrão, ou pode aplicar lógica futura
      else if (this.currentStep === 5) {
        isValid = true; 
      }
      // Validação da Aba 6 (Revisão)
      else if (this.currentStep === 6) {
        isValid = true;
      }
      
      // Atualiza o Array que controla as cores das bolinhas do menu lateral
      this.stepStatuses[this.currentStep - 1] = isValid ? 'completed' : 'warning';
    },
    
    // =======================================================================
    // LÓGICA DE SALVAMENTO DE RASCUNHO (MÉTODO ACIONADO PELO BOTÃO E NAVEGAÇÃO)
    // =======================================================================
    saveDraft() {
      // 1. Muda a cor da pílula para verde (Rascunho Salvo)
      this.isDraftSaved = true;
      
      // 2. Salva a aba atual em que o usuário está navegando
      localStorage.setItem('programDraftStep', this.currentStep.toString());
      
      // 3. Salva a validação das bolinhas
      localStorage.setItem('draftStepStatuses', JSON.stringify(this.stepStatuses));

      // 4. Converte todos os grandes objetos preenchidos para texto (JSON) e salva no cache do navegador
      localStorage.setItem('draftFormData', JSON.stringify(this.formData));
      localStorage.setItem('draftInscriptionForm', JSON.stringify(this.inscriptionForm));
      localStorage.setItem('draftNivelamentoForm', JSON.stringify(this.nivelamentoForm));
      localStorage.setItem('draftStageList', JSON.stringify(this.stageList));
      localStorage.setItem('draftDisplayDates', JSON.stringify(this.displayDates));
    },

    // Funções de pular tela (ALTERAÇÃO: Agora elas Valida e Salvam o Rascunho antes de pular a aba!)
    nextStep() { 
      this.validateCurrentStep(); // Verifica os campos vazios da aba atual
      if (this.currentStep < 6) {
        this.currentStep++; 
      }
      this.saveDraft(); // Salva o progresso e as validações
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    },
    
    prevStep() { 
      this.validateCurrentStep();
      if (this.currentStep > 1) {
        this.currentStep--; 
      }
      this.saveDraft(); 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    },
    
    goToStep(num) { 
      this.validateCurrentStep();
      this.currentStep = num; 
      this.saveDraft(); 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    },
    
    // ---------------------------------------------------------------------
    // SISTEMA DE DRAG & DROP (Arraste de blocos de Etapas no DOM HTML5)
    // ---------------------------------------------------------------------
    
    // Quando o usuário APERTA E SEGURA a alça do card...
    onDragStart(index, event) { 
      this.draggedStageIndex = index; // Armazena a memória de quem é a vítima do arraste
      event.dataTransfer.effectAllowed = 'move'; 
    },
    
    // Permite por override nativo JS/HTML que a tela seja soltável em certas coordenadas
    onDragOver(event) { event.preventDefault(); },
    
    // Quando o item arrastado voa por cima da cabeça de um outro card diferente...
    onDragEnter(index) { this.draggedOverStageIndex = index; },
    
    // Quando solta o botão do mouse: O array do Vue sofre uma mutação (Splice) reordenando os objetos instantaneamente em tela
    onDrop(index) {
      if (this.draggedStageIndex !== null && this.draggedStageIndex !== index) {
        // Tira da posição velha e soca no index da posição nova (Target)
        const draggedItem = this.stageList.splice(this.draggedStageIndex, 1)[0];
        this.stageList.splice(index, 0, draggedItem);
      }
      this.onDragEnd();
    },
    
    // Limpa a sujeira das variáveis de cache de click
    onDragEnd() { this.draggedStageIndex = null; this.draggedOverStageIndex = null; },

    // Método injetor base do sistema (Reseta o projeto pra abaixar as etapas Inscrição/Niv/Imersão padrões)
    restoreDefaultStages() {
      this.stageList = [
        { id: 0, title: 'Inscrição', type: 'Inscrição / Triagem', desc: 'Etapa de inscrições e triagem inicial dos candidatos', modality: 'Online', duration: '30 dias', slots: 'Ilimitado', isDefault: true },
        { id: 1, title: 'Nivelamento', type: 'Capacitação', desc: 'Cursos online e avaliação teórica', modality: 'Remota Assíncrona', duration: '3 meses', slots: '250 vagas', isDefault: true },
        { id: 2, title: 'Imersão', type: 'Projeto Prático', desc: 'Desenvolvimento de projetos em grupos', modality: 'Híbrida', duration: '6 meses', slots: '50 vagas', isDefault: true }
      ];
    },
    
    // Abre a tela sobreposta para Adição
    openNewStageModal() { this.showNewStageModal = true; },
    // Fecha a tela e limpa/mata os dados rascunhados soltos por lá (Reset)
    closeNewStageModal() { this.showNewStageModal = false; this.newStageForm = { title: '', type: '', modality: 'Online', durationValue: '', durationUnit: 'dias', slots: '', desc: '' }; },
    
    // Confirma envio do card pro sistema.
    saveNewStage() {
       if(!this.newStageForm.title) return; // Bloco hard fail se nao tiver nome
       
       // Procura na array de etapas qual o maior número de etapa atual para gerar um sequencial +1
       const nextId = this.stageList.length > 0 ? Math.max(...this.stageList.map(s => s.id)) + 1 : 0;
       
       // O formulário pede "3" e "dias" separados. O sistema concaceta e vira "3 dias".
       const finalDuration = this.newStageForm.durationValue ? `${this.newStageForm.durationValue} ${this.newStageForm.durationUnit}` : '';
       
       // Empurra o objeto pro array reativo (DOM V-FOR renderiza e estufa automaticamente!)
       this.stageList.push({ id: nextId, title: this.newStageForm.title, type: this.newStageForm.type, desc: this.newStageForm.desc, modality: this.newStageForm.modality, duration: finalDuration, slots: this.newStageForm.slots, isDefault: false });
       this.closeNewStageModal();
    },
    
    // Pega o objeto nativo que foi clicado, quebra as chaves e espelha no modal de Edição para alteração pre-existente
    openEditStageModal(stage) {
       this.editStageForm = { ...stage }; 
       if (stage.duration) {
          // Operação reversa. Pega a String bruta (15 dias), split no espaço e entrega (15) para caixa numerica e (dias) para select
          const parts = stage.duration.split(' ');
          this.editStageForm.durationValue = parts[0] || '';
          this.editStageForm.durationUnit = parts[1] || 'dias';
       }
       this.showEditStageModal = true;
    },
    
    // Fecha Modal de Edit sem salvar
    closeEditStageModal() { this.showEditStageModal = false; },
    
    // Salva o Card por cima do mesmo índice ID exato que ele habitava anteriormente no Array de Objetos local (update state base)
    saveEditStage() {
       const index = this.stageList.findIndex(s => s.id === this.editStageForm.id);
       if (index !== -1) {
          const finalDuration = this.editStageForm.durationValue ? `${this.editStageForm.durationValue} ${this.editStageForm.durationUnit}` : '';
          this.stageList[index] = { ...this.editStageForm, duration: finalDuration };
       }
       this.closeEditStageModal();
    },
    
    // Triggers da Lixeira
    confirmDeleteStage(stage) { this.stageToDelete = stage; this.showDeleteConfirmModal = true; },
    cancelDeleteStage() { this.showDeleteConfirmModal = false; this.stageToDelete = null; },
    
    executeDeleteStage() {
      if (this.stageToDelete) {
        // Redefine a lista geral usando filter = Traga pra mim apenas os itens na qual o ID SEJA DIFERENTE do cara da Lixeira atual.
        this.stageList = this.stageList.filter(s => s.id !== this.stageToDelete.id);
        this.cancelDeleteStage();
      }
    },

    // Processo de duplicagem. Clona objeto, gera nova numeração, insere sufixo (Cópia) no nome
    duplicateStage(stage) {
      const nextId = this.stageList.length > 0 ? Math.max(...this.stageList.map(s => s.id)) + 1 : 0;
      const duplicatedStage = { ...stage };
      duplicatedStage.id = nextId;
      duplicatedStage.title = `${stage.title} (Cópia)`; 
      duplicatedStage.isDefault = false; // Remove visual Badge de ser stage Padrão base.
      
      const originalIndex = this.stageList.findIndex(s => s.id === stage.id);
      if (originalIndex !== -1) {
        // Insere fisicamente exatamente 1 casa abaixo do alvo no DOM layout Array base do Vue render object
        this.stageList.splice(originalIndex + 1, 0, duplicatedStage);
      } else {
        this.stageList.push(duplicatedStage);
      }
    },

    // Aba 3 (Modal Custom field) Toggle, reset n' saves.
    openCustomFieldModal() { this.showCustomFieldModal = true; },
    closeCustomFieldModal() {
      this.showCustomFieldModal = false;
      this.customFieldFormError = false; 
      this.customFieldForm = { name: '', type: 'text', required: true };
    },
    saveCustomField() {
      if (!this.customFieldForm.name.trim()) { this.customFieldFormError = true; return; } // Valida campo em branco
      this.inscriptionForm.fields.push({ name: this.customFieldForm.name, required: this.customFieldForm.required });
      this.closeCustomFieldModal();
    },

    // Aba 3 (Modal Documentos) Controladores de Pills e Selects.
    toggleDocType(type) {
      const index = this.customDocumentForm.types.indexOf(type);
      // Lógica de Pill toggle: Se clicou num botão PDF que já tá na lista do form, corta. Se não tiver, poe.
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
      if (this.customDocumentForm.types.length === 0) { this.customDocumentTypeError = true; } // Evita erro crash vazio
      if (this.customDocumentFormError || this.customDocumentTypeError) return;
      
      // Salva e utiliza função array .JOIN pra colar PDF e XLS em "PDF, XLS" plano string pra tela visual read
      this.inscriptionForm.documents.push({ name: this.customDocumentForm.name, types: this.customDocumentForm.types.join(', '), required: this.customDocumentForm.required });
      this.closeCustomDocumentModal();
    },

    // Aba 4 (Cursos Nivelamento) Modais Controlers
    openNewCourseModal() { this.showNewCourseModal = true; },
    closeNewCourseModal() {
      this.showNewCourseModal = false;
      this.newCourseFormError = false; 
      this.newCourseForm = { name: '', hours: '', required: false, scores: true, status: 'Ativo' };
    },
    saveNewCourse() {
      if (!this.newCourseForm.name.trim()) { this.newCourseFormError = true; return; } // Barra campos fantasmas
      this.nivelamentoForm.courses.push({ name: this.newCourseForm.name, hours: this.newCourseForm.hours || '0h', required: this.newCourseForm.required, scores: this.newCourseForm.scores, status: this.newCourseForm.status });
      this.closeNewCourseModal();
    },
    
    // Funções Add/Del de Tag de Entidades Parceiras na Aba 1
    addPartner() { 
      if (this.newPartnerName.trim() && !this.formData.partners.includes(this.newPartnerName.trim())) { 
        this.formData.partners.push(this.newPartnerName.trim()); 
        this.newPartnerName = ''; 
      } 
    },
    removePartner(idx) { this.formData.partners.splice(idx, 1); },
    
    // ---------------------------------------------------------------------
    // SISTEMA MASTER: CALENDÁRIO REACTIVO VUE + MASKS
    // ---------------------------------------------------------------------
    openDatePicker(f) { 
        if (this.activeDatePicker === f) { this.closeDatePicker(); return; } // Fecha se clicar 2x seguidas no icone
        this.activeDatePicker = f; 
        const exist = this.formData[f]; 
        
        // Mantém a sanidade de abrir a janela no mês que você clicou ao invés de resetar sempre pro "Date.Now" atual no ano.
        if (exist) { 
          const [y, m, d] = exist.split('-'); 
          this.calendarDate = new Date(y, m - 1, d); 
        } else { 
          this.calendarDate = new Date(); 
        } 
    },
    
    closeDatePicker() { this.activeDatePicker = null; },
    
    selectDate(d) { 
      if (!d) return; // Clique vazio fora de matriz. Ignore.
      
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
      return `${d}/${m}/${y}`; // Inverte String formato BD de YMD pra DMY br.
    },
    
    // Máscara customizada que age e injeta traços na digitação literal humana em inputs de form box 10 slots Max
    parseDateInput(f) {
      let v = this.displayDates[f].replace(/\D/g, ''); // Limpa qlqer letra, mata tudo que n for digit
      
      // Regras de negócio de dias (limita hardcap teto de 01 a 31)
      if (v.length >= 2) { 
        let d = parseInt(v.substring(0, 2)); 
        if (d > 31) v = '31' + v.substring(2); 
        else if (d === 0) v = '01' + v.substring(2); 
      }
      
      // Regras de negócio de meses (limita hardcap teto 01 a 12)
      if (v.length >= 4) { 
        let m = parseInt(v.substring(2, 4)); 
        if (m > 12) v = v.substring(0, 2) + '12' + v.substring(4); 
        else if (m === 0) v = v.substring(0, 2) + '01' + v.substring(4); 
      }
      
      // Formatação injects das barras visuais "/"
      let fmt = v; 
      if (v.length > 2) fmt = v.substring(0, 2) + '/' + v.substring(2); 
      if (v.length > 4) fmt = fmt.substring(0, 5) + '/' + v.substring(4, 8);
      
      this.displayDates[f] = fmt; // Retorna pra visual de tela atualizado
      
      // Processa a validação fina final
      if (v.length === 8) { 
        const d = v.substring(0, 2); const m = v.substring(2, 4); const y = v.substring(4, 8);
        const obj = new Date(y, m - 1, d); 
        
        // Checa com a engine JS base se a data é geometricamente possível no tempo (exclui 30 de Fev por ex)
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

    // ----------------------------------------------------------------------
    // MÁSCARA PARA HORÁRIO (HH:MM) - Similar a de Date.
    // ----------------------------------------------------------------------
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
      if (v.length > 2) { fmt = v.substring(0, 2) + ':' + v.substring(2, 4); } // Injeta dois pontos divisor clock visual
      this.nivelamentoForm.finalExam.time = fmt;
    },
    
    // Utilizado pelo Grid System Calendar no HTML pra classBind.
    // Retorna Boolean se uma casa especifica renderizada for literalmente a data preenchida armazenada em memory slot var Vue. Pinta Azul.
    isSelectedDay(f, d) { 
      if (!d || !this.formData[f]) return false; 
      const [y, m, day] = this.formData[f].split('-'); 
      return Number(y) === this.calendarDate.getFullYear() && Number(m) === this.calendarDate.getMonth() + 1 && Number(day) === d; 
    },
    
    // Retorna Bold e Bold Black color pra casa numero se o sistema for Hoje Now System Clock Time nativo da maquina OS
    isToday(day) { 
      const t = new Date(); 
      return day && t.getFullYear() === this.calendarDate.getFullYear() && t.getMonth() === this.calendarDate.getMonth() && t.getDate() === day; 
    }
  }
};
</script>

<style>
/* CSS Global Omitido para economizar espaço - Já foi implementado anteriormente com sucesso! */
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

/* ALTERAÇÃO: CSS Para pintar de amarelo/laranja a bolinha da etapa com campos em branco */
.step.warning .step-icon { 
  background-color: #f59e0b; 
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