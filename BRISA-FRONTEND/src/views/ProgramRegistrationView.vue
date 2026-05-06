Feito! Para padronizar com as outras caixas do sistema (que usam o cinza escuro/preto `#1a233a` nos números e o cinza claro `#6b7280` para os símbolos de "%" e "pontos"), eu apenas atualizei as cores diretamente nos estilos `inline` desses três campos específicos de *input* e *span* na aba 4.

Não alterei nenhuma outra lógica, classe ou estrutura.

Aqui está o seu arquivo **completo e atualizado**:

```vue
<template>
  <div class="program-registration-view">
    
    <div 
      v-if="activeDatePicker" 
      class="picker-overlay" 
      @click="closeDatePicker"
    ></div>

    <div 
      v-if="showNewStageModal" 
      class="modal-overlay" 
      @click="closeNewStageModal"
    >
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
                 <input 
                   v-model="newStageForm.title" 
                   @keydown.enter="$event.target.blur()" 
                   type="text" 
                   placeholder="Ex: Entrevista Técnica" 
                   class="form-input"
                 />
               </div>
               <div class="form-group">
                 <label>Tipo</label>
                 <input 
                   v-model="newStageForm.type" 
                   @keydown.enter="$event.target.blur()" 
                   type="text" 
                   placeholder="Ex: Avaliação" 
                   class="form-input"
                 />
               </div>
             </div>

             <div class="form-group">
               <label>Descrição</label>
               <textarea 
                 v-model="newStageForm.desc" 
                 placeholder="Descreva brevemente o objetivo desta etapa..." 
                 class="form-textarea" 
                 rows="2"
               ></textarea>
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
                    <input 
                      v-model="newStageForm.durationValue" 
                      @keydown.enter="$event.target.blur()" 
                      type="number" 
                      min="1" 
                      placeholder="Ex: 15" 
                      class="form-input"
                    />
                    <select v-model="newStageForm.durationUnit" class="form-input form-select min-w-select">
                      <option value="dias">dias</option>
                      <option value="meses">meses</option>
                    </select>
                 </div>
               </div>
               
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Vagas</label>
                 <input 
                   v-model="newStageForm.slots" 
                   @keydown.enter="$event.target.blur()" 
                   type="text" 
                   placeholder="Ex: 20 vagas" 
                   class="form-input"
                 />
               </div>
             </div>
          </div>

          <div class="modal-footer">
             <button class="btn-footer-back" @click="closeNewStageModal">Cancelar</button>
             <button class="btn-footer-continue" @click="saveNewStage">Adicionar</button>
          </div>
       </div>
    </div>

    <div 
      v-if="showEditStageModal" 
      class="modal-overlay" 
      @click="closeEditStageModal"
    >
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

    <div 
      v-if="showDeleteConfirmModal" 
      class="modal-overlay" 
      @click="cancelDeleteStage"
    >
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
             <p class="delete-confirm-text">
               Deseja excluir a etapa <strong>{{ stageToDelete?.title }}</strong>?
             </p>
          </div>

          <div class="modal-footer">
             <button class="btn-footer-back" @click="cancelDeleteStage">Cancelar</button>
             <button class="btn-footer-danger" @click="executeDeleteStage">Excluir</button>
          </div>
       </div>
    </div>

    <div 
      v-if="showCustomFieldModal" 
      class="modal-overlay" 
      @click="closeCustomFieldModal"
    >
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
               <input 
                 v-model="customFieldForm.name" 
                 @input="customFieldFormError = false"
                 @keydown.enter="$event.target.blur()" 
                 type="text" 
                 placeholder="Ex: Link do Portfólio, Gênero, etc." 
                 :class="['form-input', { 'input-error': customFieldFormError }]"
               />
               <span v-if="customFieldFormError" class="error-text">
                 O campo de Nome não pode ficar vazio.
               </span>
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

    <div 
      v-if="showCustomDocumentModal" 
      class="modal-overlay" 
      @click="closeCustomDocumentModal"
    >
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
               <input 
                 v-model="customDocumentForm.name" 
                 @input="customDocumentFormError = false"
                 @keydown.enter="$event.target.blur()" 
                 type="text" 
                 placeholder="Ex: Histórico Escolar, Carta de Recomendação, etc." 
                 :class="['form-input', { 'input-error': customDocumentFormError }]"
               />
               <span v-if="customDocumentFormError" class="error-text">
                 O nome do documento não pode ficar vazio.
               </span>
             </div>

             <div class="form-row two-cols" style="margin-bottom: 0; align-items: flex-start;">
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Tipos Aceitos <span class="required">*</span></label>
                 
                 <div :class="['doc-types-container', { 'error-border': customDocumentTypeError }]">
                    <span 
                      v-for="docType in availableDocTypes" 
                      :key="docType"
                      @click="toggleDocType(docType)"
                      :class="['doc-type-pill', { 'active': customDocumentForm.types.includes(docType) }]"
                    >
                      {{ docType }}
                    </span>
                 </div>
                 
                 <span v-if="customDocumentTypeError" class="error-text">
                   Selecione ao menos um tipo de arquivo.
                 </span>
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

    <div 
      v-if="showNewCourseModal" 
      class="modal-overlay" 
      @click="closeNewCourseModal"
    >
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
                 <input 
                   v-model="newCourseForm.name" 
                   @input="newCourseFormError = false"
                   @keydown.enter="$event.target.blur()" 
                   type="text" 
                   placeholder="Ex: Lógica de Programação II" 
                   :class="['form-input', { 'input-error': newCourseFormError }]"
                 />
                 <span v-if="newCourseFormError" class="error-text">
                   O nome do curso não pode ficar vazio.
                 </span>
               </div>
               <div class="form-group" style="margin-bottom: 0;">
                 <label>Carga Horária</label>
                 <input 
                   v-model="newCourseForm.hours" 
                   @keydown.enter="$event.target.blur()" 
                   type="text" 
                   placeholder="Ex: 40h" 
                   class="form-input"
                 />
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
        
        <div v-if="currentStep === 1" class="step-container">
          
          <div class="step-header">
             <h2>Dados do Programa</h2>
             <p>Preencha as informações gerais do edital e do programa</p>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Informações Básicas</h3>
                <p>Dados principais do programa e edital</p>
             </div>
             
             <div class="form-row two-cols">
               <div class="form-group">
                 <label>Nome do Programa <span class="required">*</span></label>
                 <input v-model="formData.programName" @keydown.enter="$event.target.blur()" type="text" placeholder="Ex: Programa de Formação em Tecnologia" class="form-input"/>
               </div>
               <div class="form-group">
                 <label>Nome da Turma/Edição <span class="required">*</span></label>
                 <input v-model="formData.batchName" @keydown.enter="$event.target.blur()" type="text" placeholder="Ex: Turma 2026.1" class="form-input"/>
               </div>
             </div>

             <div class="form-group">
               <label>Executora <span class="required">*</span></label>
               <input v-model="formData.executor" @keydown.enter="$event.target.blur()" type="text" placeholder="Ex: Universidade Federal de Tecnologia" class="form-input"/>
             </div>

             <div class="form-group">
               <label>Objetivo do Programa <span class="required">*</span></label>
               <textarea v-model="formData.objective" placeholder="Descreva o objetivo principal do programa e os resultados esperados..." class="form-textarea" rows="3"></textarea>
             </div>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Parceiros</h3>
                <p>Instituições parceiras do programa</p>
             </div>
             
             <div class="partner-input-row">
               <input 
                 v-model="newPartnerName" 
                 @keydown.enter.prevent="addPartner" 
                 type="text" 
                 placeholder="Nome do parceiro" 
                 class="form-input"
               />
               <button @click.prevent="addPartner" class="btn-add-partner">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                 </svg>
                 Adicionar
               </button>
             </div>
             
             <div v-if="formData.partners.length > 0" class="partner-tags-container">
               <div v-for="(partner, index) in formData.partners" :key="index" class="partner-tag">
                 <span>{{ partner }}</span>
                 <button @click.prevent="removePartner(index)" class="btn-remove-tag">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                   </svg>
                 </button>
               </div>
             </div>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Localidade e Contato</h3>
                <p>Informações de localização e suporte</p>
             </div>
             
             <div class="form-row two-cols">
               <div class="form-group">
                 <label>Localidade</label>
                 <input v-model="formData.location" @keydown.enter="$event.target.blur()" type="text" placeholder="Ex: São Paulo, SP" class="form-input"/>
               </div>
               
               <div class="form-group relative">
                 <label>E-mail de Suporte <span class="required">*</span></label>
                 <input 
                   v-model="formData.supportEmail" 
                   @blur="emailTouched = true"
                   @keydown.enter="$event.target.blur()" 
                   type="email" 
                   placeholder="Ex: suporte@programa.edu.br" 
                   :class="['form-input', { 'input-error': isEmailInvalid && emailTouched }]"
                 />
                 <span v-if="isEmailInvalid && emailTouched" class="error-text">
                   E-mail inválido. Utilize o formato nome@exemplo.com.
                 </span>
               </div>
             </div>
             
             <div class="form-group">
               <label>Link da Página Oficial</label>
               <input v-model="formData.officialWebsite" @keydown.enter="$event.target.blur()" type="url" placeholder="https://programa.edu.br" class="form-input"/>
             </div>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Datas e Prazos</h3>
                <p>Defina as datas importantes do edital</p>
             </div>
             
             <div class="form-row date-row">
               
               <div class="form-group relative date-field">
                 <label>Data de Publicação</label>
                 <div class="date-input-wrapper">
                   <input 
                      v-model="displayDates.publishDate" 
                      @input="parseDateInput('publishDate')" 
                      @keydown.enter="$event.target.blur()" 
                      type="text" 
                      placeholder="dd/mm/aaaa" 
                      maxlength="10" 
                      class="form-input" 
                   />
                   <svg  @click="openDatePicker('publishDate')" class="date-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                   </svg>
                 </div>
                 
                 <div v-if="activeDatePicker === 'publishDate'" class="custom-calendar">
                    <div class="calendar-header">
                       <button type="button" class="cal-btn" @click.stop="prevMonth">‹</button>
                       <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                       <button type="button" class="cal-btn" @click.stop="nextMonth">›</button>
                    </div>
                    <div class="calendar-grid">
                       <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                       <span 
                          v-for="(day, idx) in calendarDays" 
                          :key="idx" 
                          :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('publishDate', day), 'today': isToday(day) }]" 
                          @click.stop="selectDate(day)"
                       >
                          {{ day }}
                       </span>
                    </div>
                 </div>
               </div>

               <div class="form-group relative date-field">
                 <label>Início das Inscrições <span class="required">*</span></label>
                 <div class="date-input-wrapper">
                   <input 
                      v-model="displayDates.startDate" 
                      @input="parseDateInput('startDate')" 
                      @keydown.enter="$event.target.blur()" 
                      type="text" 
                      placeholder="dd/mm/aaaa" 
                      maxlength="10" 
                      class="form-input" 
                   />
                   <svg  @click="openDatePicker('startDate')" class="date-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                   </svg>
                 </div>
                 
                 <div v-if="activeDatePicker === 'startDate'" class="custom-calendar">
                    <div class="calendar-header">
                       <button type="button" class="cal-btn" @click.stop="prevMonth">‹</button>
                       <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                       <button type="button" class="cal-btn" @click.stop="nextMonth">›</button>
                    </div>
                    <div class="calendar-grid">
                       <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                       <span 
                          v-for="(day, idx) in calendarDays" 
                          :key="idx" 
                          :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('startDate', day), 'today': isToday(day) }]" 
                          @click.stop="selectDate(day)"
                       >
                          {{ day }}
                       </span>
                    </div>
                 </div>
               </div>

               <div class="form-group relative date-field">
                 <label>Fim das Inscrições <span class="required">*</span></label>
                 <div class="date-input-wrapper">
                   <input 
                      v-model="displayDates.endDate" 
                      @input="parseDateInput('endDate')" 
                      @keydown.enter="$event.target.blur()" 
                      type="text" 
                      placeholder="dd/mm/aaaa" 
                      maxlength="10" 
                      class="form-input" 
                   />
                   <svg  @click="openDatePicker('endDate')" class="date-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                   </svg>
                 </div>
                 
                 <div v-if="activeDatePicker === 'endDate'" class="custom-calendar">
                    <div class="calendar-header">
                       <button type="button" class="cal-btn" @click.stop="prevMonth">‹</button>
                       <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                       <button type="button" class="cal-btn" @click.stop="nextMonth">›</button>
                    </div>
                    <div class="calendar-grid">
                       <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                       <span 
                          v-for="(day, idx) in calendarDays" 
                          :key="idx" 
                          :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('endDate', day), 'today': isToday(day) }]" 
                          @click.stop="selectDate(day)"
                       >
                          {{ day }}
                       </span>
                    </div>
                 </div>
               </div>

             </div>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Status e Observações</h3>
                <p>Controle de publicação e notas adicionais</p>
             </div>
             <div class="form-group">
               <label>Status do Edital</label>
               <select v-model="formData.status" class="form-input form-select">
                 <option value="Rascunho">Rascunho</option>
                 <option value="Publicado">Publicado</option>
               </select>
             </div>
             <div class="form-group">
               <label>Observações Gerais</label>
               <textarea v-model="formData.observations" placeholder="Notas internas, observações sobre o edital..." class="form-textarea" rows="3"></textarea>
             </div>
          </div>
        </div>

        <div v-else-if="currentStep === 2" class="step-container">
          
          <div class="step-header">
             <h2>Estrutura das Etapas</h2>
             <p>Configure as etapas do processo seletivo</p>
          </div>

          <div class="info-alert">
             <div class="alert-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
             </div>
             <div class="alert-content">
                <strong>Estrutura sugerida pelo sistema</strong>
                <p>O sistema criou automaticamente etapas padrão baseadas em processos seletivos acadêmicos anteriores. Você pode editar, excluir, reordenar ou adicionar novas etapas conforme necessário.</p>
             </div>
          </div>

          <div class="stages-list">
             <div 
               class="stage-card" 
               v-for="(stage, index) in stageList" 
               :key="stage.id"
               draggable="true"
               @dragstart="onDragStart(index, $event)"
               @dragover.prevent="onDragOver"
               @dragenter.prevent="onDragEnter(index)"
               @drop="onDrop(index)"
               @dragend="onDragEnd"
               :class="{ 'is-dragged': draggedStageIndex === index, 'is-dragover': draggedOverStageIndex === index }"
             >
                
                <div class="stage-drag-handle">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle>
                     <circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle>
                   </svg>
                </div>
                
                <div class="stage-body">
                   
                   <div class="stage-header">
                      <div class="stage-number">{{ stage.id }}</div>
                      
                      <div class="stage-titles">
                         <h4>
                           {{ stage.title }} 
                           <span v-if="stage.isDefault" class="badge-padrao">Padrão</span>
                         </h4>
                         <span class="stage-type">{{ stage.type }}</span>
                      </div>
                   </div>
                   
                   <p class="stage-description">{{ stage.desc }}</p>
                   
                   <div class="stage-info-grid">
                      <div class="info-item">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                           <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                         </svg>
                         <div>
                           <small>Modalidade</small>
                           <span>{{ stage.modality }}</span>
                         </div>
                      </div>
                      
                      <div class="info-item">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                           <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                         </svg>
                         <div>
                           <small>Duração</small>
                           <span>{{ stage.duration }}</span>
                         </div>
                      </div>
                      
                      <div class="info-item">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                           <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>
                           <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                         </svg>
                         <div>
                           <small>Vagas</small>
                           <span>{{ stage.slots }}</span>
                         </div>
                      </div>
                   </div>

                   <div class="stage-actions">
                      <button class="btn-stage-action" @click="openEditStageModal(stage)">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                           <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                         </svg>
                         Editar
                      </button>

                     <button class="btn-stage-action" @click="duplicateStage(stage)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Duplicar
                     </button>

                      <button class="btn-stage-action btn-danger" @click="confirmDeleteStage(stage)">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                           <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                         </svg>
                         Excluir
                      </button>
                   </div>
                </div>
             </div>
          </div>

          <div class="stage-list-actions">
             <button class="btn-action-outline" @click="openNewStageModal">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
               </svg>
               Adicionar Nova Etapa
             </button>
             <button class="btn-action-outline" @click="restoreDefaultStages">
               <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path>
               </svg>
               Restaurar Estrutura Padrão
             </button>
          </div>
        </div>

        <div v-else-if="currentStep === 3" class="step-container">
          
          <div class="step-header">
             <h2>Etapa 0 — Inscrição</h2>
             <p>Configure o formulário de inscrição e elegibilidade</p>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Informações da Etapa</h3>
                <p>Dados básicos da etapa de inscrição</p>
             </div>
             
             <div class="form-row two-cols">
               <div class="form-group">
                 <label>Nome da Etapa</label>
                 <input v-model="inscriptionForm.title" type="text" class="form-input"/>
               </div>
               <div class="form-group">
                 <label>Tipo</label>
                 <select v-model="inscriptionForm.type" class="form-input form-select">
                   <option value="Inscrição / Triagem">Inscrição / Triagem</option>
                   <option value="Avaliação">Avaliação</option>
                 </select>
               </div>
             </div>

             <div class="form-group">
               <label>Descrição</label>
               <textarea v-model="inscriptionForm.desc" class="form-textarea" rows="2"></textarea>
             </div>

             <div class="form-row three-cols-special">
               <div class="form-group relative">
                 <label>Início do Período</label>
                 <div class="date-input-wrapper">
                   <input v-model="displayDates.inscStart" @input="parseDateInput('inscStart')" type="text" placeholder="dd/mm/aaaa" class="form-input" maxlength="10"/>
                   <svg @click="openDatePicker('inscStart')" class="date-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                 </div>
                 <div v-if="activeDatePicker === 'inscStart'" class="custom-calendar">
                    <div class="calendar-header">
                       <button type="button" class="cal-btn" @click.stop="prevMonth">‹</button>
                       <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                       <button type="button" class="cal-btn" @click.stop="nextMonth">›</button>
                    </div>
                    <div class="calendar-grid">
                       <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                       <span v-for="(day, idx) in calendarDays" :key="idx" :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('inscStart', day), 'today': isToday(day) }]" @click.stop="selectDate(day)">{{ day }}</span>
                    </div>
                 </div>
               </div>
               
               <div class="form-group relative">
                 <label>Fim do Período</label>
                 <div class="date-input-wrapper">
                   <input v-model="displayDates.inscEnd" @input="parseDateInput('inscEnd')" type="text" placeholder="dd/mm/aaaa" class="form-input" maxlength="10"/>
                   <svg @click="openDatePicker('inscEnd')" class="date-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                 </div>
                 <div v-if="activeDatePicker === 'inscEnd'" class="custom-calendar">
                    <div class="calendar-header">
                       <button type="button" class="cal-btn" @click.stop="prevMonth">‹</button>
                       <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                       <button type="button" class="cal-btn" @click.stop="nextMonth">›</button>
                    </div>
                    <div class="calendar-grid">
                       <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                       <span v-for="(day, idx) in calendarDays" :key="idx" :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('inscEnd', day), 'today': isToday(day) }]" @click.stop="selectDate(day)">{{ day }}</span>
                    </div>
                 </div>
               </div>
               
               <div class="form-group">
                 <label>Situação</label>
                 <select v-model="inscriptionForm.situation" class="form-input form-select">
                   <option value="Obrigatória">Obrigatória</option>
                   <option value="Opcional">Opcional</option>
                 </select>
               </div>
             </div>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Elegibilidade</h3>
                <p>Requisitos e regras de participação</p>
             </div>
             
             <div class="form-group">
               <label>Público-Alvo</label>
               <input v-model="inscriptionForm.targetAudience" type="text" placeholder="Descreva o público-alvo do programa..." class="form-input"/>
             </div>
             
             <div class="form-group">
               <label>Requisitos de Formação</label>
               <textarea v-model="inscriptionForm.educationReqs" placeholder="Ex: Ensino médio completo, graduação em andamento..." class="form-textarea" rows="2"></textarea>
             </div>

             <div class="list-item-row toggle-row-simple">
               <span class="list-item-title">Exigir LinkedIn?</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="inscriptionForm.requireLinkedin" class="toggle-input">
                 <span class="toggle-slider"></span>
               </label>
             </div>
             
             <div class="list-item-row toggle-row-simple">
               <span class="list-item-title">Exigir CPF válido?</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="inscriptionForm.requireCPF" class="toggle-input">
                 <span class="toggle-slider"></span>
               </label>
             </div>

             <div class="list-item-row toggle-row-simple" style="margin-bottom: 0;">
               <span class="list-item-title">Permitir apenas uma inscrição por pessoa?</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="inscriptionForm.singleRegistration" class="toggle-input">
                 <span class="toggle-slider"></span>
               </label>
             </div>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Formulário de Inscrição</h3>
                <p>Campos que o candidato deverá preencher</p>
             </div>
             
             <div v-for="(field, index) in inscriptionForm.fields" :key="'field-'+index" class="list-item-row">
                <div class="list-item-info">
                   <span class="list-item-title">{{ field.name }}</span>
                   <span v-if="field.required" class="badge-required">Obrigatório</span>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="field.required" class="toggle-input">
                  <span class="toggle-slider"></span>
                </label>
             </div>
             
             <button class="btn-dashed-add" @click="openCustomFieldModal">
               <span>+</span> Adicionar Campo Personalizado
             </button>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Documentos Exigidos</h3>
                <p>Arquivos que devem ser anexados na inscrição</p>
             </div>
             
             <div v-for="(doc, index) in inscriptionForm.documents" :key="'doc-'+index" class="list-item-row">
                <div class="list-item-info-stacked">
                   <div style="display: flex; align-items: center;">
                      <span class="list-item-title">{{ doc.name }}</span>
                   </div>
                   <span class="list-item-sub">Tipos aceitos: {{ doc.types }}</span>
                </div>
                <div style="display: flex; align-items: center;">
                   <span v-if="doc.required" class="badge-required" style="margin-right: 16px;">Obrigatório</span>
                   <label class="toggle-switch">
                     <input type="checkbox" v-model="doc.required" class="toggle-input">
                     <span class="toggle-slider"></span>
                   </label>
                </div>
             </div>
             
             <button class="btn-dashed-add" @click="openCustomDocumentModal">
               <span>+</span> Adicionar Documento
             </button>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Configuração de Cotas</h3>
                <p>Defina os percentuais de vagas reservadas</p>
             </div>
             
             <div class="quota-row">
               <span class="list-item-title">Ampla concorrência</span>
               <div class="quota-input-wrapper">
                 <input type="number" v-model="inscriptionForm.quotas.ampla" class="quota-input"/>
                 <span class="quota-symbol">%</span>
               </div>
             </div>
             <div class="quota-row">
               <span class="list-item-title">PCD / Neurodivergentes</span>
               <div class="quota-input-wrapper">
                 <input type="number" v-model="inscriptionForm.quotas.pcd" class="quota-input"/>
                 <span class="quota-symbol">%</span>
               </div>
             </div>
             <div class="quota-row">
               <span class="list-item-title">Negros e pardos</span>
               <div class="quota-input-wrapper">
                 <input type="number" v-model="inscriptionForm.quotas.negros" class="quota-input"/>
                 <span class="quota-symbol">%</span>
               </div>
             </div>
             <div class="quota-row">
               <span class="list-item-title">Mulheres</span>
               <div class="quota-input-wrapper">
                 <input type="number" v-model="inscriptionForm.quotas.mulheres" class="quota-input"/>
                 <span class="quota-symbol">%</span>
               </div>
             </div>
             <div class="quota-row" style="border-bottom: none; margin-bottom: 16px;">
               <span class="list-item-title">45+</span>
               <div class="quota-input-wrapper">
                 <input type="number" v-model="inscriptionForm.quotas.age45" class="quota-input"/>
                 <span class="quota-symbol">%</span>
               </div>
             </div>

             <div class="list-item-row toggle-row-simple">
               <span class="list-item-title">Permitir apenas uma cota por candidato</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="inscriptionForm.quotas.singleQuota" class="toggle-input">
                 <span class="toggle-slider"></span>
               </label>
             </div>
             <div class="list-item-row toggle-row-simple" style="margin-bottom: 0;">
               <span class="list-item-title">Reverter vagas não preenchidas para ampla concorrência</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="inscriptionForm.quotas.revertUnfilled" class="toggle-input">
                 <span class="toggle-slider"></span>
               </label>
             </div>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Classificação para a Próxima Etapa</h3>
                <p>Configure a seleção de candidatos para o nivelamento</p>
             </div>
             
             <div class="green-toggle-box">
                <span class="list-item-title" style="color: #065f46;">Esta etapa seleciona candidatos para a próxima?</span>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="inscriptionForm.classification.active" class="toggle-input">
                  <span class="toggle-slider"></span>
                </label>
             </div>
             
             <div class="form-row two-cols" style="margin-top: 24px;">
               <div class="form-group">
                 <label>Número de Classificados</label>
                 <input v-model="inscriptionForm.classification.count" type="number" class="form-input" :disabled="!inscriptionForm.classification.active"/>
               </div>
               <div class="form-group">
                 <label>Critério de Classificação</label>
                 <select v-model="inscriptionForm.classification.criteria" class="form-input form-select" :disabled="!inscriptionForm.classification.active">
                   <option value="Ordem de inscrição">Ordem de inscrição</option>
                   <option value="Sorteio">Sorteio</option>
                   <option value="Nota em teste">Nota em teste</option>
                 </select>
               </div>
             </div>

             <div class="form-group">
               <label>Critério de Desempate</label>
               <input v-model="inscriptionForm.classification.tiebreaker" type="text" placeholder="Ex: Maior idade, ordem de inscrição..." class="form-input" :disabled="!inscriptionForm.classification.active"/>
             </div>

             <div class="list-item-row toggle-row-simple" style="border: none; padding: 0 0 16px 0;">
               <span class="list-item-title">Gerar lista de espera</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="inscriptionForm.classification.waitlist" class="toggle-input" :disabled="!inscriptionForm.classification.active">
                 <span class="toggle-slider"></span>
               </label>
             </div>
             
             <div class="list-item-row toggle-row-simple" style="border: none; padding: 0 0 16px 0;">
               <span class="list-item-title">Permitir recursos</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="inscriptionForm.classification.allowAppeals" class="toggle-input" :disabled="!inscriptionForm.classification.active">
                 <span class="toggle-slider"></span>
               </label>
             </div>

             <div class="form-group" style="margin-bottom: 0;">
               <label>Prazo de Recurso</label>
               <input v-model="inscriptionForm.classification.appealDeadline" type="text" placeholder="Dias após a divulgação" class="form-input" :disabled="!inscriptionForm.classification.allowAppeals || !inscriptionForm.classification.active"/>
             </div>
          </div>
        </div>

        <div v-else-if="currentStep === 4" class="step-container">
          
          <div class="step-header">
             <h2>Etapa 1 — Nivelamento</h2>
             <p>Configure os cursos, avaliações e critérios de aprovação</p>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Configuração Geral</h3>
                <p>Dados principais da etapa de nivelamento</p>
             </div>
             
             <div class="form-row two-cols">
               <div class="form-group">
                 <label>Nome da Etapa</label>
                 <input v-model="nivelamentoForm.title" type="text" class="form-input"/>
               </div>
               <div class="form-group">
                 <label>Modalidade</label>
                 <select v-model="nivelamentoForm.modality" class="form-input form-select">
                   <option value="Online">Online</option>
                   <option value="Presencial">Presencial</option>
                   <option value="Híbrida">Híbrida</option>
                   <option value="Remota Assíncrona">Remota Assíncrona</option>
                 </select>
               </div>
             </div>

             <div class="form-row three-cols-special">
               <div class="form-group">
                 <label>Carga Horária Total</label>
                 <input v-model="nivelamentoForm.workload" type="text" class="form-input"/>
               </div>
               
               <div class="form-group relative">
                 <label>Data de Início</label>
                 <div class="date-input-wrapper">
                   <input v-model="displayDates.nivStart" @input="parseDateInput('nivStart')" type="text" placeholder="dd/mm/aaaa" class="form-input" maxlength="10"/>
                   <svg @click="openDatePicker('nivStart')" class="date-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                 </div>
                 <div v-if="activeDatePicker === 'nivStart'" class="custom-calendar">
                    <div class="calendar-header">
                       <button type="button" class="cal-btn" @click.stop="prevMonth">‹</button>
                       <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                       <button type="button" class="cal-btn" @click.stop="nextMonth">›</button>
                    </div>
                    <div class="calendar-grid">
                       <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                       <span v-for="(day, idx) in calendarDays" :key="idx" :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('nivStart', day), 'today': isToday(day) }]" @click.stop="selectDate(day)">{{ day }}</span>
                    </div>
                 </div>
               </div>
               
               <div class="form-group relative">
                 <label>Data de Fim</label>
                 <div class="date-input-wrapper">
                   <input v-model="displayDates.nivEnd" @input="parseDateInput('nivEnd')" type="text" placeholder="dd/mm/aaaa" class="form-input" maxlength="10"/>
                   <svg @click="openDatePicker('nivEnd')" class="date-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                 </div>
                 <div v-if="activeDatePicker === 'nivEnd'" class="custom-calendar">
                    <div class="calendar-header">
                       <button type="button" class="cal-btn" @click.stop="prevMonth">‹</button>
                       <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                       <button type="button" class="cal-btn" @click.stop="nextMonth">›</button>
                    </div>
                    <div class="calendar-grid">
                       <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                       <span v-for="(day, idx) in calendarDays" :key="idx" :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('nivEnd', day), 'today': isToday(day) }]" @click.stop="selectDate(day)">{{ day }}</span>
                    </div>
                 </div>
               </div>
             </div>

             <div class="form-group" style="margin-bottom: 0;">
               <label>Plataforma Utilizada</label>
               <input v-model="nivelamentoForm.platform" type="text" placeholder="Ex: Moodle, Google Classroom..." class="form-input"/>
             </div>
          </div>

          <div class="card-section">
             <div class="section-title" style="margin-bottom: 8px;">
                <h3>Cursos do Nivelamento</h3>
                <p>Configure os cursos obrigatórios e opcionais</p>
             </div>
             
             <div style="font-size: 13px; margin-bottom: 16px;">
                <span style="color: #0d9488; font-weight: 500;">{{ reqCoursesCount }} obrigatórios</span> 
                <span style="color: #d1d5db; margin: 0 8px;">|</span> 
                <span style="color: #6b7280;">{{ optCoursesCount }} opcionais</span>
             </div>

             <div class="course-table">
                <div class="course-header">
                   <span>Curso</span>
                   <span>C.H.</span>
                   <span>Obrigatório</span>
                   <span>Pontua</span>
                   <span>Status</span>
                </div>
                
                <div v-for="(course, idx) in nivelamentoForm.courses" :key="idx" class="course-row">
                   <span class="course-name">{{ course.name }}</span>
                   <span class="course-hours">{{ course.hours }}</span>
                   
                   <label class="toggle-switch">
                     <input type="checkbox" v-model="course.required" class="toggle-input">
                     <span class="toggle-slider"></span>
                   </label>
                   
                   <label class="toggle-switch">
                     <input type="checkbox" v-model="course.scores" class="toggle-input">
                     <span class="toggle-slider"></span>
                   </label>
                   
                   <div>
                     <span class="badge-active">{{ course.status }}</span>
                   </div>
                </div>
             </div>
             
             <button class="btn-dashed-add" style="margin-top: 16px;" @click="openNewCourseModal">
               <span>+</span> Adicionar Novo Curso
             </button>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Regra de Conclusão dos Cursos</h3>
                <p>Defina quando um curso é considerado concluído</p>
             </div>
             
             <div class="list-item-row toggle-row-simple">
               <span class="list-item-title">Exigir conclusão de atividades</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="nivelamentoForm.completionRules.requireActivities" class="toggle-input">
                 <span class="toggle-slider"></span>
               </label>
             </div>
             
             <div class="list-item-row toggle-row-simple" :style="nivelamentoForm.completionRules.requireMinScore ? 'border-bottom: none; padding-bottom: 8px;' : ''">
               <span class="list-item-title">Exigir acerto mínimo em exercícios</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="nivelamentoForm.completionRules.requireMinScore" class="toggle-input">
                 <span class="toggle-slider"></span>
               </label>
             </div>
             <div v-if="nivelamentoForm.completionRules.requireMinScore" class="form-group" style="margin-top: 0; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
               <input v-model="nivelamentoForm.completionRules.minScoreValue" type="text" class="form-input" style="background-color: #f9fafb;"/>
             </div>

             <div class="list-item-row toggle-row-simple" style="margin-bottom: 0; border: none; padding-bottom: 0; margin-top: 16px;">
               <span class="list-item-title">Exigir avaliação final do curso</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="nivelamentoForm.completionRules.requireFinalEval" class="toggle-input">
                 <span class="toggle-slider"></span>
               </label>
             </div>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Prova Final</h3>
                <p>Configuração da avaliação final da etapa</p>
             </div>
             
             <div class="green-toggle-box">
                <span class="list-item-title" style="color: #065f46;">Habilitar prova final</span>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="nivelamentoForm.finalExam.active" class="toggle-input">
                  <span class="toggle-slider"></span>
                </label>
             </div>
             
             <div class="form-row three-cols-special" style="margin-top: 24px; grid-template-columns: 1.5fr 1fr 1fr;">
               <div class="form-group relative">
                 <label>Data</label>
                 <div class="date-input-wrapper">
                   <input v-model="displayDates.nivExamDate" @input="parseDateInput('nivExamDate')" type="text" placeholder="dd/mm/aaaa" class="form-input" maxlength="10" :disabled="!nivelamentoForm.finalExam.active"/>
                   <svg v-if="nivelamentoForm.finalExam.active" @click="openDatePicker('nivExamDate')" class="date-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                 </div>
                 <div v-if="activeDatePicker === 'nivExamDate'" class="custom-calendar">
                    <div class="calendar-header">
                       <button type="button" class="cal-btn" @click.stop="prevMonth">‹</button>
                       <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                       <button type="button" class="cal-btn" @click.stop="nextMonth">›</button>
                    </div>
                    <div class="calendar-grid">
                       <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                       <span v-for="(day, idx) in calendarDays" :key="idx" :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('nivExamDate', day), 'today': isToday(day) }]" @click.stop="selectDate(day)">{{ day }}</span>
                    </div>
                 </div>
               </div>
               
               <div class="form-group relative">
                 <label>Horário</label>
                 <input 
                   v-model="nivelamentoForm.finalExam.time" 
                   @input="parseTimeInput"
                   type="text" 
                   placeholder="00:00" 
                   maxlength="5"
                   class="form-input" 
                   :disabled="!nivelamentoForm.finalExam.active"
                 />
               </div>

               <div class="form-group">
                 <label>Duração (minutos)</label>
                 <input v-model="nivelamentoForm.finalExam.duration" type="number" class="form-input" :disabled="!nivelamentoForm.finalExam.active"/>
               </div>
             </div>

             <div class="form-row two-cols">
               <div class="form-group">
                 <label>Quantidade de Questões</label>
                 <input v-model="nivelamentoForm.finalExam.questionsCount" type="number" class="form-input" :disabled="!nivelamentoForm.finalExam.active"/>
               </div>
               <div class="form-group">
                 <label>Tipo</label>
                 <select v-model="nivelamentoForm.finalExam.type" class="form-input form-select" :disabled="!nivelamentoForm.finalExam.active">
                   <option value="Múltipla Escolha">Múltipla Escolha</option>
                   <option value="Dissertativa">Dissertativa</option>
                 </select>
               </div>
             </div>

             <div class="list-item-row toggle-row-simple" style="border: none; padding: 0 0 16px 0;">
               <span class="list-item-title">Questões apresentadas sequencialmente</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="nivelamentoForm.finalExam.sequential" class="toggle-input" :disabled="!nivelamentoForm.finalExam.active">
                 <span class="toggle-slider"></span>
               </label>
             </div>
             
             <div class="list-item-row toggle-row-simple" style="border: none; padding: 0 0 16px 0;">
               <span class="list-item-title">Permitir voltar em questões anteriores</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="nivelamentoForm.finalExam.allowBack" class="toggle-input" :disabled="!nivelamentoForm.finalExam.active">
                 <span class="toggle-slider"></span>
               </label>
             </div>

             <div class="list-item-row toggle-row-simple" style="margin-bottom: 0; border: none; padding: 0;">
               <span class="list-item-title">Botão enviar obrigatório ao finalizar</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="nivelamentoForm.finalExam.mandatorySubmit" class="toggle-input" :disabled="!nivelamentoForm.finalExam.active">
                 <span class="toggle-slider"></span>
               </label>
             </div>
          </div>

          <div class="card-section" style="border: 1px solid #e5e7eb;"> <div class="section-title">
                <h3 style="color: #0f172a;">Cálculo da Nota e Aprovação</h3>
                <p>Configure a fórmula de pontuação e critérios de classificação</p>
             </div>
             
             <div class="formula-box">
               <span class="formula-label">Fórmula de Cálculo</span>
               <div class="formula-text">
                 Nota Final = (Nota Prova × {{ nivelamentoForm.grading.examWeight }}%) + (Cursos Opcionais × {{ nivelamentoForm.grading.optionalWeight }}%) + Bônus Localidade
               </div>
             </div>
             
             <div class="form-group" style="margin-bottom: 24px;">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                 <label style="margin: 0;">Pontuação Máxima da Prova (%)</label>
                 <div style="display: flex; align-items: center; gap: 6px;">
                   <input 
                     type="number" 
                     v-model="nivelamentoForm.grading.examWeight" 
                     @keydown.enter="$event.target.blur()"
                     class="quota-input" 
                     style="color: #1a233a; font-weight: 500; padding: 4px 8px; width: 60px; text-align: center;" 
                     min="0" max="100" 
                   />
                   <span style="font-size: 13px; color: #6b7280; font-weight: 500;">%</span>
                 </div>
               </div>
               <input 
                 type="range" 
                 v-model="nivelamentoForm.grading.examWeight" 
                 class="form-range" 
                 min="0" max="100"
                 :style="{ background: `linear-gradient(to right, #1e1b4b ${nivelamentoForm.grading.examWeight}%, #e5e7eb ${nivelamentoForm.grading.examWeight}%)` }"
               >
             </div>

             <div class="form-group" style="margin-bottom: 24px;">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                 <label style="margin: 0;">Pontos por Cursos Não Obrigatórios (%)</label>
                 <div style="display: flex; align-items: center; gap: 6px;">
                   <input 
                     type="number" 
                     v-model="nivelamentoForm.grading.optionalWeight" 
                     @keydown.enter="$event.target.blur()"
                     class="quota-input" 
                     style="color: #1a233a; font-weight: 500; padding: 4px 8px; width: 60px; text-align: center;" 
                     min="0" max="100" 
                   />
                   <span style="font-size: 13px; color: #6b7280; font-weight: 500;">%</span>
                 </div>
               </div>
               <input 
                 type="range" 
                 v-model="nivelamentoForm.grading.optionalWeight" 
                 class="form-range" 
                 min="0" max="100"
                 :style="{ background: `linear-gradient(to right, #1e1b4b ${nivelamentoForm.grading.optionalWeight}%, #e5e7eb ${nivelamentoForm.grading.optionalWeight}%)` }"
               >
             </div>

             <div class="form-group">
               <label>Bônus por Localidade/Residência</label>
               <input v-model="nivelamentoForm.grading.bonusLocation" type="number" class="form-input"/>
             </div>

             <div class="form-group" style="margin-bottom: 32px;">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                 <label style="margin: 0;">Nota Mínima para Aprovação</label>
                 <div style="display: flex; align-items: center; gap: 6px;">
                   <input 
                     type="number" 
                     v-model="nivelamentoForm.grading.minPassingScore" 
                     @keydown.enter="$event.target.blur()"
                     class="quota-input" 
                     style="color: #1a233a; font-weight: 500; padding: 4px 8px; width: 60px; text-align: center;" 
                     min="0" max="100" 
                   />
                   <span style="font-size: 13px; color: #6b7280; font-weight: 500;">pontos</span>
                 </div>
               </div>
               <input 
                 type="range" 
                 v-model="nivelamentoForm.grading.minPassingScore" 
                 class="form-range" 
                 min="0" max="100"
                 :style="{ background: `linear-gradient(to right, #1e1b4b ${nivelamentoForm.grading.minPassingScore}%, #e5e7eb ${nivelamentoForm.grading.minPassingScore}%)` }"
               >
             </div>

             <div class="list-item-row toggle-row-simple">
               <span class="list-item-title">Regra de corte: % da maior nota da turma</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="nivelamentoForm.grading.cutOffRule" class="toggle-input">
                 <span class="toggle-slider"></span>
               </label>
             </div>
             
             <div class="form-group">
               <label>Quantidade de Aprovados para Próxima Etapa</label>
               <input v-model="nivelamentoForm.grading.approvedCount" type="number" class="form-input"/>
             </div>

             <div class="list-item-row toggle-row-simple" style="border: none; padding: 0 0 16px 0;">
               <span class="list-item-title">Gerar lista preliminar</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="nivelamentoForm.grading.generatePrelimList" class="toggle-input">
                 <span class="toggle-slider"></span>
               </label>
             </div>
             
             <div class="list-item-row toggle-row-simple" style="border: none; padding: 0 0 16px 0;">
               <span class="list-item-title">Permitir recurso</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="nivelamentoForm.grading.allowAppeals" class="toggle-input">
                 <span class="toggle-slider"></span>
               </label>
             </div>

             <div class="list-item-row toggle-row-simple" style="margin-bottom: 0; border: none; padding: 0;">
               <span class="list-item-title">Gerar lista final</span>
               <label class="toggle-switch">
                 <input type="checkbox" v-model="nivelamentoForm.grading.generateFinalList" class="toggle-input">
                 <span class="toggle-slider"></span>
               </label>
             </div>
          </div>

          <div class="card-section">
             <div class="section-title">
                <h3>Certificação</h3>
                <p>Configure a emissão de certificados</p>
             </div>
             
             <div class="green-toggle-box" style="margin-bottom: 24px;">
                <span class="list-item-title" style="color: #065f46;">Emitir certificado</span>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="nivelamentoForm.certification.active" class="toggle-input">
                  <span class="toggle-slider"></span>
                </label>
             </div>

             <div class="form-group">
               <label>Critério para Certificação</label>
               <select v-model="nivelamentoForm.certification.criteria" class="form-input form-select" :disabled="!nivelamentoForm.certification.active">
                 <option value="Aprovação na etapa">Aprovação na etapa</option>
                 <option value="Conclusão dos cursos">Conclusão dos cursos</option>
               </select>
             </div>

             <div class="form-group" style="margin-bottom: 0;">
               <label>Texto Padrão do Certificado</label>
               <textarea v-model="nivelamentoForm.certification.defaultText" placeholder="Ex: Certificamos que concluiu com aproveitamento..." class="form-textarea" rows="2" :disabled="!nivelamentoForm.certification.active"></textarea>
             </div>
          </div>

        </div>

        <div v-else class="step-container">
           <div class="step-header">
             <h2>Etapa {{ currentStep }}</h2>
             <p>Em desenvolvimento...</p>
           </div>
        </div>

        <div class="form-actions-footer">
           <button v-if="currentStep > 1" class="btn-footer-back" @click="prevStep">
             Voltar
           </button>

           <button v-if="currentStep < 6" class="btn-footer-continue ml-auto" @click="nextStep">
             Continuar →
           </button>
           <button v-else class="btn-footer-continue ml-auto" @click="nextStep">
             Finalizar
           </button>
        </div>

      </div>

      <div class="summary-sidebar">
         
         <div class="sidebar-actions">
            <button class="btn-sidebar-draft">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                 <polyline points="17 21 17 13 7 13 7 21"></polyline>
                 <polyline points="7 3 7 8 15 8"></polyline>
               </svg>
               Salvar Rascunho
            </button>
            <span class="status-badge outline-badge">Rascunho</span>
         </div>

         <h3>Resumo do Edital</h3>
         <p class="summary-desc">Preencha os dados do programa para ver o resumo</p>
         
         <div class="summary-block">
            <span class="summary-label">Status</span>
            <span class="status-badge">Rascunho</span>
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
export default {
  /**
   * Nome do componente de visualização
   */
  name: 'ProgramRegistrationView',
  
  /**
   * Estado reativo da aplicação
   * Mantém todas as variáveis de controle, formulários e lógica
   */
  data() {
    return {
      // String que armazena o último horário de alteração (HH:MM)
      lastUpdatedTime: '', 
      
      // Navegação da página (1 a 6) - Iniciando na etapa 4 (Nivelamento) para facilitar seu teste
      currentStep: 4, 
      
      // TEXTOS DA BARRA LATERAL
      stepTitles: ['Dados do Programa', 'Estrutura das Etapas', 'Etapa 0 — Inscrição', 'Etapa 1 — Nivelamento', 'Etapa 2 — Imersão', 'Revisão Final'],
      stepDescs: ['Informações gerais', 'Definição do fluxo', 'Formulário e elegibilidade', 'Cursos e avaliação', 'Projetos e benefícios', 'Validar e publicar'],
      
      // Controle do input de parceiros na Etapa 1
      newPartnerName: '', 
      
      // Controle de interação para impedir alerta prematuro no campo E-mail
      emailTouched: false, 
      
      // Controle do índice sendo arrastado e o alvo (Drag and Drop)
      draggedStageIndex: null,
      draggedOverStageIndex: null,
      
      // Objeto principal que armazena os dados do programa (Aba 1)
      formData: { 
        programName: '', 
        batchName: '', 
        executor: '', 
        objective: '', 
        partners: [], 
        location: '', 
        supportEmail: '', 
        officialWebsite: '', 
        publishDate: '', 
        startDate: '', 
        endDate: '', 
        inscStart: '', // Data customizada extra para aba 3
        inscEnd: '',   // Data customizada extra para aba 3
        nivStart: '',  // Data customizada para aba 4 (Nivelamento Inicio)
        nivEnd: '',    // Data customizada para aba 4 (Nivelamento Fim)
        nivExamDate: '', // Data customizada para aba 4 (Nivelamento Prova)
        status: 'Rascunho', 
        observations: '' 
      },
      
      // ==========================================
      // OBJETO: Formulário de Inscrição (Aba 3)
      // ==========================================
      inscriptionForm: {
        title: 'Inscrição',
        type: 'Inscrição / Triagem',
        desc: 'Etapa de inscrições e triagem inicial dos candidatos',
        situation: 'Obrigatória',
        targetAudience: '',
        educationReqs: '',
        requireLinkedin: false,
        requireCPF: true,
        singleRegistration: true,
        fields: [
          { name: 'Nome completo', required: true },
          { name: 'E-mail', required: true },
          { name: 'CPF', required: true },
          { name: 'Data de nascimento', required: true },
          { name: 'Telefone', required: true },
          { name: 'LinkedIn', required: false },
          { name: 'Município', required: true },
          { name: 'Estado', required: true },
          { name: 'Formação', required: true },
          { name: 'Instituição de ensino', required: false },
          { name: 'Grau de escolaridade', required: true },
        ],
        documents: [
          { name: 'Documento de identidade', types: 'PDF, JPG', required: true },
          { name: 'CPF', types: 'PDF, JPG', required: true },
          { name: 'Comprovante de escolaridade', types: 'PDF', required: true },
        ],
        quotas: { ampla: 50, pcd: 10, negros: 30, mulheres: 0, age45: 10, singleQuota: true, revertUnfilled: true },
        classification: { active: true, count: 250, criteria: 'Ordem de inscrição', tiebreaker: '', waitlist: true, allowAppeals: true, appealDeadline: '' }
      },

      // ==========================================
      // OBJETO: Formulário de Nivelamento (Aba 4)
      // ==========================================
      nivelamentoForm: {
        title: 'Nivelamento',
        modality: 'Remota Assíncrona',
        workload: '172h',
        platform: '',
        // Array com os cursos extraídos do mockup
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
        completionRules: {
          requireActivities: true,
          requireMinScore: true,
          minScoreValue: '70',
          requireFinalEval: true
        },
        finalExam: {
          active: true,
          time: '',
          duration: 120,
          questionsCount: 50,
          type: 'Múltipla Escolha',
          sequential: true,
          allowBack: false,
          mandatorySubmit: true
        },
        grading: {
          examWeight: 70,
          optionalWeight: 30,
          bonusLocation: 5,
          minPassingScore: 50,
          cutOffRule: false,
          approvedCount: 50,
          generatePrelimList: true,
          allowAppeals: true,
          generateFinalList: true
        },
        certification: {
          active: true,
          criteria: 'Aprovação na etapa',
          defaultText: ''
        }
      },
      
      // Variáveis do Modal de Adicionar Etapa
      showNewStageModal: false,
      newStageForm: { 
        title: '', 
        type: '', 
        modality: 'Online', 
        durationValue: '', 
        durationUnit: 'dias', 
        slots: '', 
        desc: '' 
      },
      
      // Variáveis do Modal de Editar Etapa
      showEditStageModal: false,
      editStageForm: { 
        id: null, 
        title: '', 
        type: '', 
        modality: 'Online', 
        durationValue: '', 
        durationUnit: 'dias', 
        slots: '', 
        desc: '' 
      },

      // Variáveis do Modal de Confirmação de Exclusão
      showDeleteConfirmModal: false,
      stageToDelete: null,
      
      // Variáveis do Novo Modal de Adicionar Campo Personalizado
      showCustomFieldModal: false,
      customFieldFormError: false, 
      customFieldForm: { name: '', type: 'text', required: true },

      // Variáveis do Novo Modal de Adicionar Documento Personalizado
      showCustomDocumentModal: false,
      customDocumentFormError: false, 
      customDocumentTypeError: false, 
      customDocumentForm: { name: '', types: ['PDF'], required: true },
      availableDocTypes: ['PDF', 'DOCX', 'JPG', 'PNG', 'XLSX', 'ZIP'],

      // Variáveis do Novo Modal de Adicionar Curso Personalizado (Aba 4)
      showNewCourseModal: false,
      newCourseFormError: false,
      newCourseForm: {
        name: '',
        hours: '',
        required: false,
        scores: true,
        status: 'Ativo'
      },

      // Array que guarda todas as etapas (Aba 2)
      stageList: [], 
      
      // Dicionário visual para os campos de data (exibe como dd/mm/aaaa)
      displayDates: { 
        publishDate: '', 
        startDate: '', 
        endDate: '',
        inscStart: '',
        inscEnd: '',
        nivStart: '',     // Adicionado para Aba 4
        nivEnd: '',       // Adicionado para Aba 4
        nivExamDate: ''   // Adicionado para Aba 4
      }, 
      
      // Identifica qual dos campos de calendário está aberto no momento
      activeDatePicker: null, 
      
      // Data de referência do calendário (Mês/Ano exibido no header do popup)
      calendarDate: new Date(), 
      
      // Arrays auxiliares para construção do calendário em português
      weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    };
  },
  
  /**
   * Hook Lifecycle - Disparado quando o componente é montado no HTML
   */
  mounted() { 
    // Popula a Aba 2 com as etapas sugeridas pelo sistema automaticamente
    this.restoreDefaultStages(); 
    // Define a hora inicial de carregamento da página
    this.updateLastModifiedTime();
  },
  
  /**
   * Observadores (Watchers)
   * Ficam "escutando" variáveis específicas para disparar ações automaticamente.
   */
  watch: {
    // Sincroniza formatações de data da Aba 1
    'formData.publishDate'(val) { this.displayDates.publishDate = this.formatDateDisplay(val); },
    'formData.startDate'(val) { this.displayDates.startDate = this.formatDateDisplay(val); },
    'formData.endDate'(val) { this.displayDates.endDate = this.formatDateDisplay(val); },
    
    // Sincroniza formatações de data da Aba 3
    'formData.inscStart'(val) { this.displayDates.inscStart = this.formatDateDisplay(val); },
    'formData.inscEnd'(val) { this.displayDates.inscEnd = this.formatDateDisplay(val); },

    // Sincroniza formatações de data da Aba 4 (Nivelamento)
    'formData.nivStart'(val) { this.displayDates.nivStart = this.formatDateDisplay(val); },
    'formData.nivEnd'(val) { this.displayDates.nivEnd = this.formatDateDisplay(val); },
    'formData.nivExamDate'(val) { this.displayDates.nivExamDate = this.formatDateDisplay(val); },
    
    // Escuta qualquer mudança profunda no formulário de dados e atualiza a hora
    formData: { handler() { this.updateLastModifiedTime(); }, deep: true },
    inscriptionForm: { handler() { this.updateLastModifiedTime(); }, deep: true },
    nivelamentoForm: { handler() { this.updateLastModifiedTime(); }, deep: true },
    stageList: { handler() { this.updateLastModifiedTime(); }, deep: true }
  },
  
  /**
   * Propriedades Computadas (Reativas e Cacheadas)
   */
  computed: {
    // Contagem de cursos obrigatórios da Aba 4
    reqCoursesCount() {
      return this.nivelamentoForm.courses.filter(c => c.required).length;
    },
    // Contagem de cursos opcionais da Aba 4
    optCoursesCount() {
      return this.nivelamentoForm.courses.filter(c => !c.required).length;
    },

    // Retorna true caso o e-mail não bata com a Regex padrão. Retorna false se estiver vazio.
    isEmailInvalid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return this.formData.supportEmail && !emailRegex.test(this.formData.supportEmail);
    },
    
    // Constrói a matriz do mês selecionado preenchendo null onde não há dias
    calendarDays() {
      const year = this.calendarDate.getFullYear();
      const month = this.calendarDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay(); // Qual dia da semana inicia
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // Quantidade de dias
      
      const days = [];
      // Empurra slots nulos para adequar a semana
      for (let i = 0; i < firstDay; i++) { 
        days.push(null); 
      }
      // Empurra os números do mês
      for (let i = 1; i <= daysInMonth; i++) { 
        days.push(i); 
      }
      return days;
    }
  },
  
  /**
   * Métodos contendo a lógica e as ações do Componente
   */
  methods: {
    // Atualiza a variável com a hora atual do sistema em formato HH:MM
    updateLastModifiedTime() {
      const now = new Date();
      // O padStart garante que horas como "9" fiquem "09"
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      this.lastUpdatedTime = `${hours}:${minutes}`;
    },

    // ----------------------------------------------------------------------
    // CONTROLE DE NAVEGAÇÃO ENTRE ABAS
    // ----------------------------------------------------------------------
    nextStep() { 
      if (this.currentStep < 6) this.currentStep++; 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    },
    prevStep() { 
      if (this.currentStep > 1) this.currentStep--; 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    },
    goToStep(num) { 
      this.currentStep = num; 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    },
    
    // ----------------------------------------------------------------------
    // LÓGICA DE DRAG AND DROP (Reordenação de Etapas)
    // ----------------------------------------------------------------------
    onDragStart(index, event) {
      // Define qual card está sendo arrastado atualmente
      this.draggedStageIndex = index;
      // Define o efeito de movimento nativo
      event.dataTransfer.effectAllowed = 'move';
    },
    onDragOver(event) {
      // Necessário para permitir que a área seja um "drop target" válido
      event.preventDefault(); 
    },
    onDragEnter(index) {
      // Atualiza o índice do card sobre o qual o mouse está passando no momento
      this.draggedOverStageIndex = index;
    },
    onDrop(index) {
      // Só reordena se realmente houve mudança de lugar
      if (this.draggedStageIndex !== null && this.draggedStageIndex !== index) {
        // Remove o card da posição original e insere na nova posição (index alvo)
        const draggedItem = this.stageList.splice(this.draggedStageIndex, 1)[0];
        this.stageList.splice(index, 0, draggedItem);
      }
      // Limpa os estados de arraste
      this.onDragEnd();
    },
    onDragEnd() {
      // Zera as variáveis, removendo as classes visuais de feedback
      this.draggedStageIndex = null;
      this.draggedOverStageIndex = null;
    },

    // ----------------------------------------------------------------------
    // CONTROLE E GERENCIAMENTO DE ETAPAS (ABA 2)
    // ----------------------------------------------------------------------
    restoreDefaultStages() {
      this.stageList = [
        { id: 0, title: 'Inscrição', type: 'Inscrição / Triagem', desc: 'Etapa de inscrições e triagem inicial dos candidatos', modality: 'Online', duration: '30 dias', slots: 'Ilimitado', isDefault: true },
        { id: 1, title: 'Nivelamento', type: 'Capacitação', desc: 'Cursos online e avaliação teórica', modality: 'Remota Assíncrona', duration: '3 meses', slots: '250 vagas', isDefault: true },
        { id: 2, title: 'Imersão', type: 'Projeto Prático', desc: 'Desenvolvimento de projetos em grupos', modality: 'Híbrida', duration: '6 meses', slots: '50 vagas', isDefault: true }
      ];
    },
    
    openNewStageModal() { 
      this.showNewStageModal = true; 
    },
    
    closeNewStageModal() { 
      this.showNewStageModal = false; 
      this.newStageForm = { title: '', type: '', modality: 'Online', durationValue: '', durationUnit: 'dias', slots: '', desc: '' }; 
    },
    
    saveNewStage() {
       // Previne criar etapa sem título
       if(!this.newStageForm.title) return; 
       
       // Cria um ID progressivo (maior ID + 1)
       const nextId = this.stageList.length > 0 ? Math.max(...this.stageList.map(s => s.id)) + 1 : 0;
       
       // Concatena número com unidade de tempo (ex: "15" + "dias" = "15 dias")
       const finalDuration = this.newStageForm.durationValue ? `${this.newStageForm.durationValue} ${this.newStageForm.durationUnit}` : '';
       
       this.stageList.push({ 
         id: nextId, 
         title: this.newStageForm.title, 
         type: this.newStageForm.type, 
         desc: this.newStageForm.desc, 
         modality: this.newStageForm.modality, 
         duration: finalDuration, 
         slots: this.newStageForm.slots, 
         isDefault: false 
       });
       
       this.closeNewStageModal();
    },
    
    openEditStageModal(stage) {
       // Clonagem simples para que alterações no formulário não reflitam na lista antes de "Salvar"
       this.editStageForm = { ...stage }; 
       
       // Processo reverso: quebra a string "15 dias" para preencher input e select de duração
       if (stage.duration) {
          const parts = stage.duration.split(' ');
          this.editStageForm.durationValue = parts[0] || '';
          this.editStageForm.durationUnit = parts[1] || 'dias';
       }
       
       this.showEditStageModal = true;
    },
    
    closeEditStageModal() { 
      this.showEditStageModal = false; 
    },
    
    saveEditStage() {
       // Acha o índice real do elemento modificado na lista geral
       const index = this.stageList.findIndex(s => s.id === this.editStageForm.id);
       
       if (index !== -1) {
          const finalDuration = this.editStageForm.durationValue ? `${this.editStageForm.durationValue} ${this.editStageForm.durationUnit}` : '';
          this.stageList[index] = { ...this.editStageForm, duration: finalDuration };
       }
       
       this.closeEditStageModal();
    },
    
    // Apenas aciona a abertura do modal de confirmação
    confirmDeleteStage(stage) {
      this.stageToDelete = stage;
      this.showDeleteConfirmModal = true;
    },

    // Fecha o modal de confirmação sem excluir
    cancelDeleteStage() {
      this.showDeleteConfirmModal = false;
      this.stageToDelete = null;
    },

    // Executa a exclusão de fato
    executeDeleteStage() {
      if (this.stageToDelete) {
        this.stageList = this.stageList.filter(s => s.id !== this.stageToDelete.id);
        this.cancelDeleteStage();
      }
    },

    // ----------------------------------------------------------------------
    // CONTROLE DE DUPLICAÇÃO DE ETAPA
    // ----------------------------------------------------------------------
    duplicateStage(stage) {
      // 1. Encontra o maior ID atual na lista para gerar um novo ID único
      const nextId = this.stageList.length > 0 ? Math.max(...this.stageList.map(s => s.id)) + 1 : 0;
      
      // 2. Cria uma cópia rasa (shallow copy) e independente do objeto stage original
      const duplicatedStage = { ...stage };
      
      // 3. Altera as propriedades da cópia para caracterizar a duplicação
      duplicatedStage.id = nextId;
      duplicatedStage.title = `${stage.title} (Cópia)`; // Adiciona o sufixo (Cópia) ao título
      duplicatedStage.isDefault = false; // Remove a tag visual azul de "Padrão"
      
      // 4. Encontra o índice da etapa que foi clicada para inserir a cópia logo abaixo dela
      const originalIndex = this.stageList.findIndex(s => s.id === stage.id);
      
      // 5. Injeta a nova etapa exatamente na posição "Índice Original + 1"
      if (originalIndex !== -1) {
        this.stageList.splice(originalIndex + 1, 0, duplicatedStage);
      } else {
        // Fallback de segurança: apenas empurra para o final da lista caso falhe
        this.stageList.push(duplicatedStage);
      }
    },

    // ----------------------------------------------------------------------
    // LÓGICA DO MODAL: ADICIONAR CAMPO PERSONALIZADO
    // ----------------------------------------------------------------------
    openCustomFieldModal() {
      this.showCustomFieldModal = true;
    },
    
    closeCustomFieldModal() {
      this.showCustomFieldModal = false;
      this.customFieldFormError = false; // Reseta o estado de erro
      // Reseta o formulário para o padrão limpo quando o modal fechar
      this.customFieldForm = { name: '', type: 'text', required: true };
    },
    
    saveCustomField() {
      // Impede salvar campos sem nome e ativa o estilo de erro visual
      if (!this.customFieldForm.name.trim()) {
        this.customFieldFormError = true;
        return;
      }
      
      // Empurra o novo objeto para a matriz fields da inscriptionForm se validado
      this.inscriptionForm.fields.push({
        name: this.customFieldForm.name,
        required: this.customFieldForm.required
      });
      
      this.closeCustomFieldModal();
    },

    // ----------------------------------------------------------------------
    // LÓGICA DO MODAL: ADICIONAR DOCUMENTO PERSONALIZADO
    // ----------------------------------------------------------------------
    toggleDocType(type) {
      const index = this.customDocumentForm.types.indexOf(type);
      if (index > -1) {
        this.customDocumentForm.types.splice(index, 1);
      } else {
        this.customDocumentForm.types.push(type);
      }
      this.customDocumentTypeError = false;
    },

    openCustomDocumentModal() {
      this.showCustomDocumentModal = true;
    },
    
    closeCustomDocumentModal() {
      this.showCustomDocumentModal = false;
      this.customDocumentFormError = false; 
      this.customDocumentTypeError = false; 
      this.customDocumentForm = { name: '', types: ['PDF'], required: true };
    },
    
    saveCustomDocument() {
      if (!this.customDocumentForm.name.trim()) {
        this.customDocumentFormError = true;
      }
      if (this.customDocumentForm.types.length === 0) {
        this.customDocumentTypeError = true;
      }
      
      if (this.customDocumentFormError || this.customDocumentTypeError) return;
      
      this.inscriptionForm.documents.push({
        name: this.customDocumentForm.name,
        types: this.customDocumentForm.types.join(', '),
        required: this.customDocumentForm.required
      });
      
      this.closeCustomDocumentModal();
    },

    // ----------------------------------------------------------------------
    // LÓGICA DO MODAL: ADICIONAR NOVO CURSO (ABA 4)
    // ----------------------------------------------------------------------
    openNewCourseModal() {
      this.showNewCourseModal = true;
    },
    
    closeNewCourseModal() {
      this.showNewCourseModal = false;
      this.newCourseFormError = false; // Reseta erro visual
      // Reseta o formulário para o padrão limpo quando o modal fechar
      this.newCourseForm = { name: '', hours: '', required: false, scores: true, status: 'Ativo' };
    },
    
    saveNewCourse() {
      // Impede salvar curso sem nome e ativa o estilo de erro visual
      if (!this.newCourseForm.name.trim()) {
        this.newCourseFormError = true;
        return;
      }
      
      // Empurra o novo objeto para a matriz courses do nivelamentoForm
      this.nivelamentoForm.courses.push({
        name: this.newCourseForm.name,
        hours: this.newCourseForm.hours || '0h', // Se deixar vazio, salva como '0h'
        required: this.newCourseForm.required,
        scores: this.newCourseForm.scores,
        status: this.newCourseForm.status
      });
      
      this.closeNewCourseModal();
    },
    
    // ----------------------------------------------------------------------
    // CONTROLE DE TAGS PARCEIROS
    // ----------------------------------------------------------------------
    addPartner() { 
      // Só adiciona se o campo não for vazio e a string não existir ainda na lista
      if (this.newPartnerName.trim() && !this.formData.partners.includes(this.newPartnerName.trim())) { 
        this.formData.partners.push(this.newPartnerName.trim()); 
        this.newPartnerName = ''; 
      } 
    },
    
    removePartner(idx) { 
      this.formData.partners.splice(idx, 1); 
    },
    
    // ----------------------------------------------------------------------
    // CONTROLE DE LÓGICA DO CALENDÁRIO CUSTOMIZADO
    // ----------------------------------------------------------------------
    openDatePicker(f) { 
        // Lógica de Toggle: Clicar fecha, clicar de novo abre
        if (this.activeDatePicker === f) { 
          this.closeDatePicker(); 
          return; 
        } 
        this.activeDatePicker = f; 
        
        // Sincroniza o cabeçalho do popup com a data já existente no campo, caso exista
        const exist = this.formData[f]; 
        if (exist) { 
          const [y, m, d] = exist.split('-'); 
          this.calendarDate = new Date(y, m - 1, d); 
        } else { 
          this.calendarDate = new Date(); 
        } 
    },
    
    closeDatePicker() { 
      this.activeDatePicker = null; 
    },
    
    selectDate(d) { 
      // Impede clique nas áreas "nulas" ou vazias do grid do calendário
      if (!d) return; 
      
      const y = this.calendarDate.getFullYear();
      // PadStart adiciona um zero a esquerda (ex: 5 -> 05) para manter formatação rígida
      const m = String(this.calendarDate.getMonth() + 1).padStart(2, '0'); 
      const day = String(d).padStart(2, '0'); 
      
      this.formData[this.activeDatePicker] = `${y}-${m}-${day}`; 
      this.closeDatePicker(); 
    },
    
    prevMonth() { 
      // Retrocede o mês alterando a data base (O JS lida com a virada de ano automaticamente)
      this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() - 1, 1); 
    },
    
    nextMonth() { 
      this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 1); 
    },
    
    formatDateDisplay(s) { 
      // Quebra AAAA-MM-DD e inverte para DD/MM/AAAA
      if (!s) return ''; 
      const [y, m, d] = s.split('-'); 
      return `${d}/${m}/${y}`; 
    },
    
    parseDateInput(f) {
      // Máscara reativa. Limpa tudo que não for dígito.
      let v = this.displayDates[f].replace(/\D/g, ''); 
      
      // Regras de negócio de dias (limita de 01 a 31)
      if (v.length >= 2) { 
        let d = parseInt(v.substring(0, 2)); 
        if (d > 31) v = '31' + v.substring(2); 
        else if (d === 0) v = '01' + v.substring(2); 
      }
      
      // Regras de negócio de meses (limita de 01 a 12)
      if (v.length >= 4) { 
        let m = parseInt(v.substring(2, 4)); 
        if (m > 12) v = v.substring(0, 2) + '12' + v.substring(4); 
        else if (m === 0) v = v.substring(0, 2) + '01' + v.substring(4); 
      }
      
      // Insere as barras formatando a string
      let fmt = v; 
      if (v.length > 2) fmt = v.substring(0, 2) + '/' + v.substring(2); 
      if (v.length > 4) fmt = fmt.substring(0, 5) + '/' + v.substring(4, 8);
      
      this.displayDates[f] = fmt;
      
      // Se tiver 8 dígitos numéricos válidos (data completa), salva no objeto do sistema
      if (v.length === 8) { 
        const d = v.substring(0, 2);
        const m = v.substring(2, 4);
        const y = v.substring(4, 8);
        const obj = new Date(y, m - 1, d); 
        
        // Verifica se é uma data real pelo construtor do JS (exclui coisas como 30/02)
        if (obj.getFullYear() == y && obj.getMonth() == m - 1 && obj.getDate() == d) { 
          this.formData[f] = `${y}-${m}-${d}`; 
          this.calendarDate = new Date(y, m - 1, d); 
        } else { 
          this.formData[f] = ''; 
        } 
      } else { 
        // Se deletar ou tiver incompleto, apaga no sistema principal
        this.formData[f] = ''; 
      }
    },

    // ----------------------------------------------------------------------
    // NOVA LÓGICA DE MÁSCARA PARA HORÁRIO (HH:MM)
    // ----------------------------------------------------------------------
    parseTimeInput() {
      // Limpa letras e caracteres especiais
      let v = this.nivelamentoForm.finalExam.time.replace(/\D/g, ''); 
      
      // Regras para horas (não pode ser maior que 23)
      if (v.length >= 2) { 
        let h = parseInt(v.substring(0, 2)); 
        if (h > 23) v = '23' + v.substring(2); 
      }
      
      // Regras para minutos (não pode ser maior que 59)
      if (v.length >= 4) { 
        let m = parseInt(v.substring(2, 4)); 
        if (m > 59) v = v.substring(0, 2) + '59'; 
      }
      
      // Injeta os dois pontos (:) no meio da string
      let fmt = v; 
      if (v.length > 2) {
        fmt = v.substring(0, 2) + ':' + v.substring(2, 4); 
      }
      
      this.nivelamentoForm.finalExam.time = fmt;
    },
    
    isSelectedDay(f, d) { 
      // Classe CSS ativa que pinta o fundo de Azul caso seja o dia selecionado atualmente
      if (!d || !this.formData[f]) return false; 
      const [y, m, day] = this.formData[f].split('-'); 
      return Number(y) === this.calendarDate.getFullYear() && Number(m) === this.calendarDate.getMonth() + 1 && Number(day) === d; 
    },
    
    isToday(day) { 
      // Negrita o dia atual comparando com Data()
      const t = new Date(); 
      return day && t.getFullYear() === this.calendarDate.getFullYear() && t.getMonth() === this.calendarDate.getMonth() && t.getDate() === day; 
    }
  }
};
</script>

<style scoped>
/* =======================================================================
1. RESET E ESTRUTURA GERAL
=======================================================================
*/

/* Zera as medidas incluindo paddings na largura total para evitar estouros no layout */
* { 
  box-sizing: border-box; 
}

/* Div raiz que engloba toda a página de cadastro */
.program-registration-view { 
  /* Estica no mínimo 100% da viewport vertical */
  min-height: 100vh; 
  /* Cor de fundo gelo/acinzentado, padrão do Brisa One */
  background-color: #fafbfd; 
  /* Espaço generoso das margens até o conteúdo de fato */
  padding: 24px; 
  /* Fonte sem serifa moderna e limpa, compatível em qualquer OS */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
}

/* =======================================================================
2. CABEÇALHO SUPERIOR (Header)
=======================================================================
*/

/* Engloba o título principal e subtítulo da página */
.header { 
  /* Transforma em modelo de caixa flexível para alinhar conteúdos */
  display: flex; 
  /* Empurra elementos para os extremos horizontais (se existirem botões lá) */
  justify-content: space-between; 
  /* Alinha tudo ao centro verticalmente */
  align-items: center; 
  /* Dá uma margem de escape na parte inferior */
  margin-bottom: 24px; 
}

/* Tamanho do texto principal (Cadastro de Programa) */
.header-left h1 { 
  /* Escala maior para destaque principal */
  font-size: 22px; 
  /* Espessura em semi-negrito para chamar atenção sem peso */
  font-weight: 600; 
  /* Azul Marinho que contrasta bem */
  color: #1a233a; 
  /* Reseta margens e dá um mínimo distanciamento do subtítulo */
  margin: 0 0 4px 0; 
}

/* Classe reaproveitável de subtítulo discreto */
.subtitle { 
  /* Cinza claro para não tirar atenção principal */
  color: #6b7280; 
  /* Reseta as margens do P */
  margin: 0; 
  /* Tamanho pequeno */
  font-size: 13px; 
}

/* =======================================================================
3. LAYOUT PRINCIPAL EM GRID (3 COLUNAS)
=======================================================================
*/

/* Container das 3 partes cruciais: Menu Esquerdo, Formulario Meio, Resumo Direito */
.registration-container { 
  /* Habilita grade para dividir seções */
  display: grid; 
  /* Define exatamente o tamanho: 260px na esquerda, fluido (1fr) no centro, 280px na direita */
  grid-template-columns: 260px 1fr 280px; 
  /* Espaçamento super folgado (gap) de 32px entre as colunas para "respirar" */
  gap: 32px; 
  /* Alinha todos os itens a partir do topo */
  align-items: start; 
}

/* =======================================================================
4. MENU LATERAL DE ETAPAS (Esquerda)
=======================================================================
*/

/* Sidebar que prende na tela (sticky) e não some no scroll */
.sidebar { 
  /* Prende (gruda) o objeto com base no scroll */
  position: sticky; 
  /* Define quantos px do topo ele grudará (90px devido à navbar global) */
  top: 90px; 
  /* Altura que abrange o tamanho total do conteúdo inserido */
  height: fit-content; 
  /* Max-height dinâmico que impede transbordamento fora da janela com cálculos css */
  max-height: calc(100vh - 110px); 
  /* Habilita barra de rolagem local apenas se for necessário */
  overflow-y: auto; 
}

/* Engloba a lista iterável dos botões .step */
.steps { 
  /* Coloca o menu em modo coluna descendente */
  display: flex; 
  flex-direction: column; 
}

/* Bloco único visual (ex: 1. Dados do Programa) */
.step { 
  /* Facilita alinhar ícone + textos */
  display: flex; 
  /* Alinha tudo centralizado de pé */
  align-items: center; 
  /* Espaçamento entre as lines internas */
  gap: 14px; 
  /* Cria uma bolha protetora invisível para o clique */
  padding: 16px; 
  /* Arredonda essas bolhas visuais */
  border-radius: 8px; 
  /* Garante o cursor de mão mostrando clicabilidade */
  cursor: pointer; 
  /* Suaviza a animação das cores no Hover e Active */
  transition: all 0.2s; 
}

/* Cor leve ao passar o mouse */
.step:hover { 
  /* Cor sutil de cinza */
  background-color: #f3f4f6; 
}

/* Cor Azul e borda ao identificar a etapa selecionada no momento */
.step.active { 
  /* Fundo azul bebê transparente */
  background-color: #e0f2fe; 
  /* Contorno levemente mais forte pra dar demarcação do limite */
  border: 1px solid #bae6fd; 
}

/* Bolinha redonda e colorida contendo os números */
.step-icon { 
  /* Altura e largura cravados com proporção */
  width: 36px; 
  height: 36px; 
  /* Torna um círculo perfeito de fato (50%) */
  border-radius: 50%; 
  /* Sistema Flex pra centralizar com exatidão o número dentro do círculo */
  display: flex; 
  align-items: center; 
  justify-content: center; 
  /* Fundo na cor primária de destaque de clique Brisa One */
  background-color: #0288d1; 
  /* Contrasta letras brancas */
  color: white; 
  /* Animações fluídas */
  transition: all 0.2s; 
}

/* Quando não clicada, a bolinha é vazada (cinza) */
.step-icon.outline { 
  /* Cor de fundo para etapas futuras inativas */
  background-color: #f3f4f6; 
  /* Cor do número cinza */
  color: #9ca3af; 
}

/* Força que bolinhas antigas/concluídas voltem a ficar acesas */
.step.completed .step-icon { 
  /* Mantém o azul primário do sistema */
  background-color: #0288d1; 
  /* Mantém o ícone interno branco */
  color: white; 
}

/* Caixa para o Título (H4) + Subtítulo de Menu */
.step-label { 
  /* Posiciona título sobre o subtítulo */
  display: flex; 
  flex-direction: column; 
}

/* Texto 1 (Principal) do link na barra lateral */
.step-title { 
  /* Tamanho de leitura limpa */
  font-size: 14px; 
  /* Leve peso para destacar o título */
  font-weight: 500; 
  /* Cor cinza escura para leitura */
  color: #1a233a; 
  /* Suaviza a transição de cor ao clicar */
  transition: color 0.2s; 
}

/* Altera a cor do Título 1 ao Clicar / Concluir a etapa */
.step.active .step-title, 
.step.completed .step-title { 
  /* AQUI VOCÊ PODE ALTERAR PARA A COR DESEJADA NO ITEM ATIVO */
  color: #000000; 
}

/* Texto 2 (Subtítulo/Descrição) do Link na barra lateral */
.step-desc { 
  /* Texto menorzinho */
  font-size: 13px; 
  /* Cinza médio */
  color: #6b7280; 
  /* Transição suave de cor */
  transition: color 0.2s; 
}

/* Altera a cor do Subtítulo 2 ao Clicar / Concluir a etapa */
.step.active .step-desc, 
.step.completed .step-desc { 
  /* AQUI VOCÊ PODE ALTERAR PARA A COR DESEJADA NO ITEM ATIVO */
  color: #000000; 
}

/* Linha vertical que imita o elo entre bolinhas de números */
.step-divider { 
  /* Espessura fina do traço */
  width: 1px; 
  /* Cavação entre botões com altura fixa */
  height: 16px; 
  /* Cor cinza claro linha lápis */
  background-color: #e5e7eb; 
  /* Empurrado em 32px até alinhar esteticamente com o centro das bolinhas */
  margin-left: 32px; 
}

/* Oculta e customiza scrollbars de abas laterais Webkit Based navegadores (Chrome/Edge) */
.sidebar::-webkit-scrollbar, 
.summary-sidebar::-webkit-scrollbar { 
  /* Largura discreta da barra de rolagem */
  width: 4px; 
}

.sidebar::-webkit-scrollbar-thumb, 
.summary-sidebar::-webkit-scrollbar-thumb { 
  /* Alça da barrinha scroll cinza e arredondada */
  background: #e5e7eb; 
  /* Curvatura natural da ponta da barra */
  border-radius: 4px; 
}

/* =======================================================================
5. CONTEÚDO CENTRAL (Área dos Formulários)
=======================================================================
*/

/* O container principal dos forms, engloba todo o centro da tela */
.content { 
  /* Estrutura flexível principal do miolo */
  display: flex; 
  /* Distribui verticalmente em formato cascata */
  flex-direction: column; 
  /* Empurra os itens flexíveis (incluindo o rodapé de próximo) pro fundo */
  justify-content: space-between; 
  /* Altura que previne que o form fique com tamanho quebrado (desalinhado do view base) */
  min-height: calc(100vh - 120px); 
}

/* Envolve as visualizações renderizadas de cada passo 1, 2, 3.. */
.step-container { 
  /* Flexbox para gerenciar o gap interno */
  display: flex; 
  /* Forma colunar descendente */
  flex-direction: column; 
  /* Espaçamento vertical entre um card branco e outro (12px folgado) */
  gap: 12px; 
}

/* Título em destaque do centro H2 (Ex: "Dados Gerais") */
.step-header h2 { 
  /* Tamanho grande H2 */
  font-size: 20px; 
  /* Cor padrão azul escuro */
  color: #1a233a; 
  /* Afasta apenas o fundo (bottom) levemente da descrição p */
  margin: 0 0 4px 0; 
}

/* Padrão texto descrição abaixo do H2 */
.step-header p { 
  /* Reseta margin base HTML */
  margin: 0; 
  /* Cinza de texto descritivo */
  color: #6b7280; 
  /* Tamanho amigável de ler */
  font-size: 14px; 
}

/* =======================================================================
6. CARDS DE FORMULÁRIO BRANCOS
=======================================================================
*/

/* Cada bloco do form fica numa "ilha" branca que agrupa dados */
.card-section { 
  /* Preenche tudo com Fundo Branco */
  background: white; 
  /* Borda sutil demarca o limite do card */
  border: 1px solid #e5e7eb; 
  /* Arredondamento corporativo de 8px */
  border-radius: 8px; 
  /* Folga interna (Margens brancas e acolchoadas pro form não ficar grudado) */
  padding: 18px 24px; 
}

/* Container do título menor do próprio card (Ex: "Informações Básicas") */
.section-title { 
  /* Adiciona espaço embaixo do bloco de título pra o resto não pular */
  margin-bottom: 16px; 
}

/* Texto do Título H3 do Card Branco */
.section-title h3 { 
  /* Tamanho um pouco menor que H2, denotando hierarquia secundária */
  font-size: 17px; 
  /* Font ligeiramente visível mas sem peso excessivo */
  font-weight: 600; 
  /* Azul escuro */
  color: #1a233a; 
  /* Margem leve pro P que vem depois */
  margin: 0 0 4px 0; 
}

/* Texto P descritivo do card branco */
.section-title p { 
  /* Mesma classe base de P */
  font-size: 15px; 
  /* Cinza clássico descritivo */
  color: #6b7280; 
  /* Reseta margin padrão navegador */
  margin: 0; 
}

/* =======================================================================
7. GRIDS FLEXÍVEIS DO FORMULÁRIO E INPUTS
=======================================================================
*/

/* Garante a colocação de N elementos num eixo horizontal (Lado a lado) */
.form-row { 
  /* Cria uma linha com Flexbox */
  display: flex; 
  /* Separa os itens internos lateralmente (ex: Localidade vs E-mail) */
  gap: 16px; 
  /* Importante para corrigir inputs min-width em telas pequenas no flexbox */
  width: 100%; 
}

/* Quando usado classes auxiliares two-cols, determina expansão flexível igualitária */
.form-row.two-cols > .form-group { 
  /* Faz os dois lados tomarem exatos 50% livres do espaço */
  flex: 1; 
}

/* Grid especializado e travado para os inputs da Aba de criar Etapa (Onde precisa de 3) */
.three-cols-special { 
  /* Transita a linha do Flexbox para CSS Grid (Mais rígido geometricamente) */
  display: grid; 
  /* Proporção: 1 pedaço pra Modalidade, 1.5 pedaços pra Duração (porque tem select junto), 1 pedaço pra vagas */
  grid-template-columns: 1fr 1.5fr 1fr; 
  /* Geração do vão entre colunas */
  gap: 16px; 
}

/* Caixa agrupadora de título(label) + input de texto/select. */
.form-group { 
  /* Afastamento pra baixo se algo vier depois de um input */
  margin-bottom: 16px; 
  /* Position Relative prepara o div parent pra abrigar algo colado nele no absolute (como ícone data) */
  position: relative; 
}

/* Configuração universal do <label> do campo */
.form-group label { 
  /* Força a ser uma linha independente pra empurrar o campo p/ baixo */
  display: block; 
  /* Tamanho base padrão 13 */
  font-size: 14px; 
  /* Leve peso no font-weight para diferenciar da string digitada */
  font-weight: 500; 
  /* Separa do input field abaixo dele */
  margin-bottom: 6px; 
  /* Cinza puxado pro carvão */
  color: #374151; 
}

/* O Asterisco Vermelho da Obrigatoriedade de preenchimento */
.required { 
  /* Vermelho Perigo Padrão Tailwind UI / Alerta */
  color: #ef4444; 
}

/* Estilo unificado para Text Inputs e TextAreas nativas HTML */
.form-input, 
.form-textarea { 
  /* Força o cupamento máximo do bloco parent (pai) flex */
  width: 100%; 
  /* Box interno que cria volume pra clicar e digitar agradavelmente */
  padding: 10px 12px; 
  /* Borda oculta inicial para que animação funcione lisa depois, sem trepidar os itens em volta */
  border: 1px solid transparent; 
  /* Arredondamento padrão Brisa */
  border-radius: 6px; 
  /* Fundo sutilmente acinzentado marcando caixas preenchíveis visualmente */
  background-color: #f9fafb; 
  /* Garante mesma familia padrao do body pra evitar que input puxe serifas soltas do Windows/Mac */
  font-family: inherit; 
  /* Mesma fonte descritiva pra n estourar layouts */
  font-size: 14px; 
  /* Cor texto inserido */
  color: #1a233a; 
  /* Adiciona lentidão pro hover e color focus em 0.2s de animação */
  transition: all 0.2s; 
}

/* Propriedades exclusivas da setinha do Menu Dropdown <Select> */
.form-select { 
  /* Faz o HTML assumir modelo padrão de caixinha clicável com setinha dependendo do browser/OS nativo */
  appearance: auto; 
  /* Força ponteiro do mouse mudando no hover visualmente pra mãozinha */
  cursor: pointer; 
  /* Recuo lateral sutil para não engolir o texto do dropdown na extremidade */
  padding-left: 8px; 
}

/* Acionador hover/tabbing: Quando o usuário foca na caixa pra digitar */
.form-input:focus, 
.form-textarea:focus { 
  /* Remove brilho quadrado e feio genérico do Chrome/Brave/Edge nativo */
  outline: none; 
  /* Escurece fundo mudando de transparente/falso fundo pro branco sólido e forte (Focus state) */
  background-color: white; 
  /* Cria Falsa Borda com sombra suave contendo um azul padrão (3b82f6) dando o anel de focus limpo */
  box-shadow: 0 0 0 1px #3b82f6; 
}

/* Opcional: Define cor do Texto Vazio/Fantasma de exemplo que orienta (Ex: aaa@gmail.com) */
.form-input::placeholder, 
.form-textarea::placeholder { 
  /* Cor mais suave para ninguem achar que já tá preenchido */
  color: #9ca3af; 
}

/* Impede o usuário de esgarçar campo textarea lateralmente, evitando quebra da interface inteira (Responsive Break) */
.form-textarea { 
  /* Restringe resizer nativo ao eixo das colunas (Y/Vertical) e desabilita puxar pro X */
  resize: vertical; 
}

/* Regra visual imposta ao Input que reprovou num Check VueJS (ex: Regex e-mail falso validando v-if) */
.form-input.input-error { 
  /* Fundinho rosa suave de alerta */
  background-color: #fef2f2; 
  /* Substitui foco Azul Normal pelo Foco Vermelho Forte Alert */
  box-shadow: 0 0 0 1px #ef4444; 
}

/* O texto em p/span string contendo os detalhes ("Ops E-mail erradao mestre") injetado abaixo do input em erro */
.error-text { 
  /* Cria linhagem em block push pra evitar de invadir float do campo parent */
  display: block; 
  /* Vermelho Alerta Padrão */
  color: #ef4444; 
  /* Levemente minusculo do que textos normais 13 */
  font-size: 11px; 
  /* Se afasta ligeiramente da caixa avermelhada */
  margin-top: 6px; 
  /* Dá uma força de letreiro para facil absorção rápida de socorro */
  font-weight: 500; 
}

/* =======================================================================
8. CONJUNTO DE CUSTOMIZAÇÕES DE DURAÇÃO (INPUT LIGADO A SELECT)
=======================================================================
*/

/* Onde você dita se quer meses ou dias. Agrupa os 2 forms num flex row colado pra agir como um Input Duplo */
.duration-input-group { 
  /* Cria o row flex */
  display: flex; 
  /* Dá uma frestinha sutil de 8px separando as bordas das caixas Number e Options */
  gap: 8px; 
  /* Expande o maximo possivel disponivel do bloco original form-group Pai */
  width: 100%; 
}

/* Parte Numérica da Duração cresce mais rápida no FlexBox (flex 1 solto) do que o Select para ganhar espaço pra String Digitável */
.duration-input-group input { 
  flex: 1; 
}

/* Selecionador DropDown de string "Mêses/Dias". Ganha limite fixado. */
.duration-input-group select { 
  /* Ainda acompanha cresciment Flex mas com limitação de piso */
  flex: 1; 
  /* Proteção Absoluta: Não encolha a menos de 100px pra evitar que a letra 's' seja devorada ao vivo no redimensionamento. */
  min-width: 100px; 
}

/* =======================================================================
9. COMPORTAMENTO TAGS DE PARCEIROS ADDABLES
=======================================================================
*/

/* Caixa de Input Digite e botão Adicionar colados, gerando o form de injetar Arrays listáveis. */
.partner-input-row { 
  /* Fila única de elementos pra digitar e empurrar add */
  display: flex; 
  /* 12px de espaço na juncao lateral */
  gap: 12px; 
  /* Centraliza eixo y pra q os buttons não decolem/desnivelem do inputbox */
  align-items: center; 
}

/* Força somente a barra de digitar parceiros a engolir espaço residual empurrando Add pra encostar */
.partner-input-row .form-input { 
  flex: 1; 
}

/* Botão Azulão de submissão do parceiro escrito pra a VUE var array. */
.btn-add-partner { 
  /* Flexibilidade baseada dentro do escopo container do btn para alinhar texto+svg icon */
  display: flex; 
  /* CEntra SVG com Texto "Adicionar" */
  align-items: center; 
  /* espaco entre icon e texto */
  gap: 6px; 
  /* Azul Marinho Identidade Primaria */
  background-color: #1e1b4b; 
  /* Texto contra-backgroun Branco puro. */
  color: white; 
  /* Reset nativo navegador Button Border */
  border: none; 
  /* Caixotagem fofa com 10px alto e 16 lados. */
  padding: 10px 16px; 
  /* Curva raio pareada com padroes inputs 6px */
  border-radius: 6px; 
  /* Tamanho legivel Padrão Brisa */
  font-size: 13px; 
  /* Semi negritinho pra ficar sólido a visualização do botao de CTA "Call to Action" */
  font-weight: 500; 
  /* Ponta dedo no Hover Mouse indicando clique habilitado */
  cursor: pointer; 
}

/* Caixa agrupadora Mestre de múltiplas Tags/Cards que foram criados no DOM. Embrulha dinâmicamente. */
.partner-tags-container { 
  display: flex; 
  /* Flex-Wrap: Se as etiquetas encherem toda a Linha 1 no X-Axis, a lógica HTML transfere eles quebrando suavemente pra uma Linha 2 abaixo. */
  flex-wrap: wrap; 
  /* O Vão gerado entre bolhas etiquetas horizontais e verticais */
  gap: 8px; 
  /* Distância pro teto (input form de parceiro). Fica longe de engolir campos */
  margin-top: 16px; 
}

/* Visual Unico do Balãozinho Label Individualmente injetado por FOR (Ex: Tag 'IFAL'/'UFAL') */
.partner-tag { 
  /* Mantem tudo arranjado interno centro-centro base */
  display: flex; 
  align-items: center; 
  /* O Ponto de Respiro da lixeira/x de remoção vs. Nome do Parceiro*/
  gap: 6px; 
  /* Tamanho de padding diminuto, criando a cápsula final. */
  padding: 6px 12px; 
  /* Um Filetinho Azul Forte Demarcando Perimetro Capsular */
  border: 1px solid #0288d1; 
  /* Fundo ultra-clarinho azul combinando com borda e harmonizando (Azul Bebe) */
  background-color: #e1f5fe; 
  /* Texto em azul intermedio para constrastar. */
  color: #01579b; 
  /* Border Radius 16 transforma retangulo numa pílula (Rounded Caps) 100% cilindrica lateralmente. */
  border-radius: 16px; 
  /* Fontes microzinhas e delicadas para labels extras */
  font-size: 13px; 
  font-weight: 500; 
}

/* O Botãozinho Ícone do "Lixinho/Xis" para fechar/matar a tag no sistema reactivo Vue. */
.btn-remove-tag { 
  /* Remove o cinza natural feio de botão gerado por browsers */
  background: transparent; 
  /* Corta stroke feio */
  border: none; 
  /* Zerar padding nativo do browser form pra icones escalados */
  padding: 0; 
  /* Pinta o SVG iconzinho (fill="none" mas stroke="currentColor") com a cor primária Azul claro Brisa */
  color: #0288d1; 
  /* Mãozinha clássica indicando clickable action destroy */
  cursor: pointer; 
  /* Center position force via Flex. */
  display: flex; 
  align-items: center; 
  justify-content: center; 
  /* Bolinha raio perfeita pro hover nao ficar feio quadrado depois */
  border-radius: 50%; 
  /* O CSS Time Delay Transition all = todos os movimentos (cor + padding grow) rola em 0.2 s  */
  transition: all 0.2s; 
}

/* =======================================================================
10. CARDS E COMPORTAMENTO VISUAL ESTRUTURA DE ETAPAS (ABA 2 VUE)
=======================================================================
*/

/* Faixa/Sinalizador azul superior descritiva com ícone no topo da Etapa 2 de Formularios */
.info-alert { 
  /* Usa flexbox pra ligar icone svg ℹ️ com o texto orientador */
  display: flex; 
  /* Empurra svg e textos dando respiro centralizado no grid  */
  gap: 12px; 
  /* Azul bb soft clarinho no preenchimento principal */
  background-color: #e1f5fe; 
  /* Contorno leve pra delimitar onde acaba/comeca bg branco */
  border: 1px solid #b3e5fc; 
  /* Arredondamento classico dos cards da plataforma (10px padrao) */
  border-radius: 10px; 
  /* Afastamento recheio interior do div. Padding encorpa */
  padding: 16px; 
  /* Margin empurrando pro chao impedindo elementos subsequentes subam colando na bunda do aviso */
  margin-bottom: 8px; 
  /* Cor default dos subitens em azul cobalto forte */
  color: #01579b; 
}

/* Correção de distorção de SVG ao lado de Blocos de Textos FlexBoxs (Icone i) */
.alert-icon { 
  /* O 0 cancela e FIXA de encolher/achatar o quadrado com texto massante ao lado */
  flex-shrink: 0; 
  /* Leve margin ajusta no olho precisão do alinhamento do Ícone com título T1 */
  margin-top: 2px; 
}

/* Titulo Negrito no box de warning/aviso de etapa padrão. */
.alert-content strong { 
  /* Força pulada de breakline pra descer o subtext do Strong sem usar br no DOM HTML. */
  display: block; 
  /* FontSize um pingo de destaque em proporção. 14! */
  font-size: 14px; 
  /* Separacao linha descritiva <p> baixo  */
  margin-bottom: 4px; 
}

/* Parágrafo de descrição detalhada que fala "sistema gerou auto bla bla bla." */
.alert-content p { 
  /* Reset basico browser */
  margin: 0; 
  /* Fonte padrão letrinhas */
  font-size: 13px; 
  /* LineHeight de 1.4 ajuda nas entrelinhas (entre a primeira frase do p e a segunda caso de WordWrap de tela) */
  line-height: 1.4; 
  /* Escurece menos agredindo pupila abaixando alpha channel para 90% (Opacidade). Mistura soft cor */
  opacity: 0.9; 
}

/* Container Mestre de todos os cartõeszinhos iteráveis Vue.js Rendered DOM. Embrulha tudo num div e repete. */
.stages-list { 
  /* Força a enfileirarem descendemente 1/2/3 como colunas list row-by-row */
  display: flex; 
  flex-direction: column; 
  /* Espaco de folga entre final de um Card e o Topo da borda do OUTRO card abaixo dele = 16px! */
  gap: 16px; 
}

/* A Caixona branca Inteira do item Etapa listado na Aba2 "ESTRUTURA" (Ex Box "Etapa Nivelamento") */
.stage-card { 
  /* O Flexbox base pra posicionar alça de puxar com o body form texto */
  display: flex; 
  /* Box branco puro pra pular na frente do bg gray site */
  background: white; 
  /* Contorno leve pra nao flutuar do nada no vazio */
  border: 1px solid #e5e7eb; 
  /* Borda card padrão (10 radius) */
  border-radius: 10px; 
  /* Esconde qualque rebarba caso elemento escape da moldura do raio CSS, evita pixel bleed. */
  overflow: hidden; 
  /* Adiciona transição suave para os estilos de feedback visual de drag & drop */
  transition: all 0.2s ease;
}

/* Feedback Visual: Quando o card está sendo arrastado atualmente (via Vue class binding .is-dragged) */
.stage-card.is-dragged {
  /* Reduz a opacidade para mostrar que o card "saiu" do lugar e flutua com o cursor */
  opacity: 0.4;
  /* Altera a borda para pontilhada indicando "espaço vago/placeholder original" no layout DOM. */
  border: 2px dashed #9ca3af;
}

/* Feedback Visual: Quando algum outro card voa sobre ELE na intenção de "Drop", acende local (via Vue .is-dragover) */
.stage-card.is-dragover {
  /* Pinta o topo com traço azul grosso indicando "Se soltar ele entra aqui acima" */
  border-top: 4px solid #0288d1;
  /* Empurra o card momentaneamente pra baixo liberando uma fresta de ilusão visual de empilhe na tela */
  margin-top: 8px;
}

/* Célula Vertical fina e inteira do canto esquerdo pra dar o affordance (Dica Visual) drag 'n drop */
.stage-drag-handle { 
  /* Afasta os 6 pontinhos SVG das bordas verticais limitrofes Left/Right */
  padding: 0 12px; 
  /* Posicionador Flex para o SVG dos pontos fixar exato no centro do pilar vertical gray. */
  display: flex; 
  align-items: center; 
  justify-content: center; 
  /* Cor Default do pontinho apagadinha.  */
  color: #d1d5db; 
  /* O Cursor Específico em CSS de agarrar/mãozinha aberta de drag-and-drop HTML5 (Grappling/Grab) */
  cursor: grab; 
  /* Linha fina que corta essa parte esquerda cinza do resto do card principal Branco  */
  border-right: 1px solid #e5e7eb; 
  /* Fundinho Gray Falso pra cor do SVG saltar de levinho. */
  background: #f9fafb; 
}

/* Alternância natural do HTML DOM quando a mãozinha (cursor grab) FECHA e "agarra" efetivamente em dragState */
.stage-drag-handle:active {
  /* Muda pra iconografia da mão fechada apertando os pontinhos. Feedback Micro Interaction! */
  cursor: grabbing;
}

/* Miolo principal flexionado contendo Text Labels, Info Grids e os botões editar/excluir no card aba 2 */
.stage-body { 
  /* Padrao base margem de 20 de seguranca */
  padding: 20px; 
  /* Toma 100% de qualquer esparçadura sobrando da Alça esquerdo dragdrop (Flex-box rule)*/
  flex: 1; 
}

/* Container Cabeçalho daquele cardiznho (Envolve Bolinha de Numero (0, 1, 2) e titulo "Inscricao") */
.stage-header { 
  /* Flexo em fila pra alinhar os 2 elementos H + Bolinha  */
  display: flex; 
  /* Cola centro Y */
  align-items: center; 
  /* Vai dar 16 de gap entre bolinha azul  e texto */
  gap: 16px; 
  /* Separacao pra baixo do P descritivo "Etapa inicial da formacao blblalbl" */
  margin-bottom: 8px; 
}

/* Bolinha redonda sólida e azul com o Número Identificador da etapa (Ex: [0] Inscrição / [1] Nivelamento) */
.stage-number { 
  /* Altura/Largura hardcoded limitadores (quadrado 32x32) */
  width: 32px; 
  height: 32px; 
  /* Converte Quadrado do limitador em Bolinha Perfeita. (50%) */
  border-radius: 50%; 
  /* Azul Destaque Identidade Brisa System */
  background-color: #0288d1; 
  /* Contraste Color. Fonte Fica Branca. */
  color: white; 
  /* Centralizadores XY Axis pra meter os Numeros Integers the fato perfeitamente dentro. */
  display: flex; 
  align-items: center; 
  justify-content: center; 
  /* Peso pra número ser robusto gordinho */
  font-weight: 600; 
  font-size: 14px; 
}

/* Config do Titulo do H4 (A Etapa) do card em loop DOM V-For. Ex [H4: Entrevista /  H4: Triagem Curriculo] */
.stage-titles h4 { 
  /* Reset the baseline default css margin browser no Headings */
  margin: 0 0 4px 0; 
  font-size: 15px; 
  color: #1a233a; 
  /* Fixa o Flex do titulo para comportar se possivel, um selo ao lado direito. Alinhando os textos. */
  display: flex; 
  align-items: center; 
}

/* Etiqueta v-if isDefault que injeta CSS Visual "Selo Padrão" nas etapas criadas Auto pela logica pra não confundir com customizados do User */
.badge-padrao { 
  /* Box Azul Bebe (Agua) */
  background-color: #e1f5fe; 
  /* Box Font Azul Forte  */
  color: #0288d1; 
  /* Micro Tipografia do selo. */
  font-size: 10px; 
  /* Enchimento sutil cima/baixo 2px, left/right 8px  */
  padding: 2px 8px; 
  /* Capsule format no radius 12x  */
  border-radius: 12px; 
  /* Afasta da Letra H4 final do Título pra caber espaçado bonito. */
  margin-left: 8px; 
  font-weight: 500; 
}

/* Estilizador de fonte do Type da Stage. Texto inferior no label da etapa Ex: Subtitulo-tipo (Remota / EAD / Capacitação.. ) */
.stage-type { 
  font-size: 12px; 
  color: #6b7280; 
}

/* <P> contendo texto solto descritivo detalhado do flow phase. O Long-string block */
.stage-description { 
  /* Limpeza default. Deixa margem bottom funda de 20 pro GridInfo logo abaixo não cruzar e comer letrinhas em Mobile size view*/
  margin: 0 0 20px 0; 
  font-size: 13px; 
  /* Escurece levemente mais pra Grey 800ish */
  color: #4b5563; 
}

/* GRID DIVISÓRIO dentro do card inferior que particiona e exibe a ficha resumida técnica com Icons SVG no relance (Tempo, Slots e Local) */
.stage-info-grid { 
  /* Configura Grid Box inves de form-row Flex */
  display: grid; 
  /* Matematica Fracional. Repete a regra matematica de "1 Fração" por três (3) vezes = 3 Colunas iguais responsivas no auto-resize windowing do Chromium. */
  grid-template-columns: repeat(3, 1fr); 
  /* Margem divisória de colunas GridX/Y. */
  gap: 16px; 
  /* Respiro em Margin 20. E Padding 20 criando o falso Bottom  */
  margin-bottom: 20px; 
  padding-bottom: 20px; 
  /* Traco de lápis CSS desenhado cortando sutil para demarcar área footer onde estarão botoes edit/del */
  border-bottom: 1px solid #f3f4f6; 
}

/* Wrapper Box pra Icone SVG X + Titulos Small e Text */
.info-item { 
  display: flex; 
  /* Alinhamento top de ancoragem caso o texto dobre linhas */
  align-items: flex-start; 
  /* Respiro icon VS text */
  gap: 8px; 
  color: #6b7280; 
}

/* Micro Correção: O Vector do Iconezinho precisa abaixar dois micro-pontinhos pixels para bater em eixo estético de Design Sistem. */
.info-item svg { 
  margin-top: 2px; 
  color: #9ca3af; 
}

/* Tag Texto <Small> em HTML injetado acima da Prop. Serve como Dica (Label visual) do grid info */
.info-item small { 
  display: block; 
  /* Nano letras */
  font-size: 11px; 
  margin-bottom: 2px; 
}

/* Tag Span contendo a Prop interpolada do objeto Vue {ex Vagas: {{stage.slots}} } em si do Grid */
.info-item span { 
  display: block; 
  font-size: 13px; 
  color: #1a233a; 
  font-weight: 500; 
}

/* Container de base e rodapé de Card que enfileira em linha botões "Editar, Duplicar, Excluir" do lado L -> R  */
.stage-actions { 
  /* Base line de flex */
  display: flex; 
  gap: 12px; 
}

/* O Estilo de Botão Global de Ação no sub-card em loop VUE */
.btn-stage-action { 
  /* White de base pra ser botao outline e n botao Solid preenchido colorido (n rouba atencao do primario azul no site main menu buttoning UI)*/
  background: white; 
  /* Outline trassado leve e soft gray. */
  border: 1px solid #d1d5db; 
  border-radius: 6px; 
  /* Padding de botao pequeno interno do miolo. Diferente do Btn CTA principal. */
  padding: 6px 12px; 
  font-size: 13px; 
  font-weight: 500; 
  color: #374151; 
  /* Forçar dedo ponteiro mousing trigger */
  cursor: pointer; 
  /* Permite meter ícone de lápis / lixo com o texto lado a lado alinhados X / Y flex  */
  display: flex; 
  align-items: center; 
  gap: 6px; 
}

/* Botão de Excluir possui Sobreposição/Override na Class CSS Base. Pinta cores de risco Sangue Perigo Vermelho/Red Color  */
.btn-stage-action.btn-danger { 
  color: #ef4444; 
  /* A linha em vez de cinza é rosa-vermelho desbotado */
  border-color: #fca5a5; 
}

/* Fim da Listagem de Array Card Stage Dom Elements. Inicia o Grupo Footer de Botoes Finais (Adicionar Curso / Restaurar Padroes BD) na Listview Geral  */
.stage-list-actions { 
  display: flex; 
  gap: 12px; 
  /* Margin 8 pra separar dos cards */
  margin-top: 8px; 
  /* Afasta a linha fortemente de 40px no final do DOM para gerar GAP exato na separação com a área de "Formularios de Next/Prev Passo" no fundo View */
  margin-bottom: 40px; 
}

/* Estilo outline btn desses caras no fundo. Adicionar (+) etc */
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

/* Micro Hover interacion nesses buttons footer mudando bg e linha .  */
.btn-action-outline:hover { 
  background: #f9fafb; 
  border-color: #9ca3af; 
}

/* =======================================================================
11. MODAIS VUE CSS GERAL E MODAIS ABA 2
=======================================================================
*/

/* O Fundo "Escuro/Dramático e Opaco" ShadowBox tela cheia quando janela de popup do sistema emite Trigger ativado Vue var showModal */
.modal-overlay { 
  /* Fixed pra escapar da rolagem e sempre acompanhar o zolho do user. */
  position: fixed; 
  /* Inset de shorthand CSS Zera e Trava os valores Top, Left, Right e Bottom no 0 absoluto colando a cortina nas bordas web */
  inset: 0; 
  /* Cor RGB com o 4o Argumento de Opacity/Alfa dando Escurecimento Black (Shadow layer em volta da janela de foco) na imagem background htmlDOM */
  background-color: rgba(15, 23, 42, 0.5); 
  /* Formato para centralizar a janelinha exata no meio de X e no Meio de Y (Alvos e Justify no FlexBox Mode CSS 3)  */
  display: flex; 
  align-items: center; 
  justify-content: center; 
  /* Eleva no Indice Z-Layer dimensional de Altura de monitor 1000x acima da frente de literalmente o site inteiro pra ninguém clicar nada debaixo dele acidentalmente */
  z-index: 1000; 
}

/* Quadrado Branco "Folha" Flutuante Central. Contendo os Campos Formularios preenchiveis em si (inputs do objeto popup) */
.modal-content { 
  background: white; 
  /* Raio suave na folha papel flutuante */
  border-radius: 12px; 
  padding: 24px; 
  /* Responsividade garantindo 100% quebra line caso seja exibido num smart device e travando maximo limit max de 600px esticado na visualização em monitores widescreen. */
  width: 100%; 
  max-width: 600px; 
  /* Efeito sombreado Box-Shadow massivo projetando sombra de profundidade negra para o usuário ter perspectiva visual de "Flutuar a janela sob a tela de tras" no browser.  */
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); 
}

/* Variação visual para modal de confirmação: menor que o padrão */
.modal-sm { 
  max-width: 450px; 
}

/* Cabeca contendo os letreiros com a razao/nome explicativo do pop-up current  */
.modal-header { 
  display: flex; 
  /* Bota X no final direito e o Letreiro no final Esquerdo colados afastados via space-between math div */
  justify-content: space-between; 
  /* Fixado ao teto Start eixo cross */
  align-items: flex-start; 
  /* Respiro entre Cabeca  e o Corpo Inputs (Margin baixo 24 points html) */
  margin-bottom: 24px; 
}

.modal-header h3 { 
  /* Reset */
  margin: 0; 
  /* Fonte Header Main 18p*/
  font-size: 18px; 
  color: #1a233a; 
  /* Fortissimo em 600 px wht */
  font-weight: 600; 
}

/* Texto descritor no Modal em cinza. (Ex: "Configure os status aqui")*/
.modal-subtitle { 
  /* M de margin tbm com respiro 4 px do titulo principal */
  margin: 4px 0 0 0; 
  font-size: 13px; 
  color: #6b7280; 
}

/* O Fechador (Icone "X" SVG Buttoning Superior) com transição de cor pra mouse hovers sem estourar view de usabilidade em clique de dedo e tap points de ipad. */
.btn-close-modal { 
  /* Resets botao nativo CSS default */
  background: transparent; 
  border: none; 
  /* Cor Cinza X SVG  */
  color: #9ca3af; 
  /* Dedo clicavel */
  cursor: pointer; 
  padding: 4px; 
  /* Botao retangular base vira curvinho.  */
  border-radius: 6px; 
  display: flex; 
}

/* O corpo oco onde ficarao os slots de v-model inputs injetados */
.modal-body { 
  /* Afastamento 24 entre miolo content inputs listados com as botoeiras OK e SALVAR CANCELAR na ponta final bottom card */
  margin-bottom: 24px; 
}

/* Texto customizado para a pergunta de exclusão */
.delete-confirm-text { 
  font-size: 14px; 
  color: #374151; 
  line-height: 1.5; 
  margin: 0; 
}

/* Container do Chão Rodapé. Reune botoes Cancela e Acceitar Submissions/Form de Etapa no popup  */
.modal-footer { 
  display: flex; 
  /* Joga botões Cancela e Acceita/SALVAR para encostarem Pro extremo Canto Direito Estilo "Windows Prompt Dialog/ Setup Form Formats" */
  justify-content: flex-end; 
  /* Gap entre 2 btn. */
  gap: 12px; 
  padding-top: 16px; 
  /* Risca fina traço cinza desenhado no topo do div pra separar estilo UI visual da ilha dos botões do miolo central que edita valores do app */
  border-top: 1px solid #e5e7eb; 
}

/* Botão Vermelho sólido de aprovação final de Delete/Kill Record  */
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

/* =======================================================================
12. BOTÕES RODAPÉ FLUXO PRINCIPAL (PROXIMO / VOLTAR)
=======================================================================
*/

/* O painel Bottom Navigation geral que comporta "Anterior | Proximo/Finalizar" do fluxo do VueJS State na coluna de conteúdo geral/Central */
.form-actions-footer { 
  display: flex; 
  /* Eixo X - Manda anterior esquerda e Proximo Direita afastados 100% de largura por espaco the between math flexs rule system */
  justify-content: space-between; 
  /* Centralizados num eixa horizontal cruzado Y-Axis */
  align-items: center; 
  /* Recheio de altura topo pra a linha descida. */
  padding-top: 24px; 
  /* Falsa borda trassada gris separador visual indicando final de página */
  border-top: 1px solid #e5e7eb; 
  /* Usar Margin-Top-Auto garante no flexbox column-flexed base que ele seja forçado a descer ate sobrar só no fundo rebatedo no bottom margin colado (Pega sobra do layout empty gap em Y-Axis height viewport math.) */
  margin-top: auto; 
}

/* Empurra e obriga um elemento flexivel classe individual ou div box block system a ficar inteiramente jogado pra direita gerando um "afaste-rejeição flexbox base" de margin-left auto no css3 DOM rendering. */
.ml-auto { 
  margin-left: auto; 
}

/* Styling Botão de Voltar pra Pagina Previa (Sem relevância de Cores fortes para não causar confusão)  */
.btn-footer-back { 
  background: white; 
  border: 1px solid #d1d5db; 
  border-radius: 6px; 
  padding: 10px 24px; 
  font-size: 13px; 
  font-weight: 500; 
  color: #1a233a; 
  cursor: pointer; 
  /* Retardador e Suavizador de mouse over time function delay the animation */
  transition: all 0.2s; 
}

/* Styling de botao PRIMARIO (The Principal Action to the UI system form) Avançar Pra Frente Progresser Action.  */
.btn-footer-continue { 
  /* Pintado do Azul Escuro Marinho UI Primario Theme color Brisa  */
  background-color: #1e1b4b; 
  /* Branco contraste  */
  color: white; 
  /* Sem as bordas padroes HTML  */
  border: none; 
  padding: 10px 24px; 
  border-radius: 6px; 
  font-size: 13px; 
  font-weight: 500; 
  cursor: pointer; 
  transition: opacity 0.2s; 
}

/* =======================================================================
13. CALENDÁRIO CUSTOMIZADO DINÂMICO
=======================================================================
*/

/* Container the flexão linha pra dados datados em row array do Grid Base Central de Forms  */
.date-row { 
  display: flex; 
  gap: 16px; 
  /* Corrige o Bug do "espremido" text clipping que rolava em telas estreitas, forçando a flex row inteira pai a usar de facto a width de bloco 100% total dispostiva do browser area!  */
  width: 100%; 
}

/* Força que cada campo colunar interno de date-inputs usem a medida exata de Flex:1 pro grid engine expandir e fatiar o div nas três (3x) coluninhas independentes (Start/Publi/End) com exata perfeição visual simetrica */
.date-field { 
  flex: 1; 
  /* Min width 0 destrava regra de limite nativo no motor Webkit (Chrome CSS Enginer). Necessário pro responsivo deixar encolher de fato a caixa flexivel em resizing manual browser inves de comer text font com quebras duras wrap. */
  min-width: 0; 
}

/* Um invólucro div oculto overlayed que cobre e envolve tudo atrás da renderização. Fica Invisível no Z-Indice 50, se a pessoa clicar fora e "errar o DatePicker Popup" e bater nele, a função V-On @Click atira metodo pra Close/Destroir a janela flutuante popup date e devolver foco natural ao HTML Site.  */
.picker-overlay { 
  position: fixed; 
  inset: 0; 
  z-index: 50; 
  /* Visual zeroed transparente e invisivel, mas totalmente tátil pro listener JS HTML DOM DOMMouseEvent capture click  */
  background: transparent; 
}

/* Caixote protetor Div Box Wrapper com Position Relative ativada. Basicamente prepara e ancora esse div pra colar e hospedar as Popups (Que usam Absoluto CSS) baseadas e refrenciadas no Z-Index local dele nativo HTML  */
.date-input-wrapper { 
  position: relative; 
  /* Z-Index Elevado a medida de 51 para ficar apenas 1 numero z-step acima da cortina nula overlayed que é z-50 ali acima na doc css, permitindo que somente o input focusbox possa focar no clicke do mouse pra devolver interaction e o bg ignorar.  */
  z-index: 51; 
  width: 100%; 
}

/* Iconezinho do calenário SVG SVGGraphicElement  */
.date-icon { 
  position: absolute; 
  /* Cola pro canto diretao 12px respiro final do wrapper */
  right: 12px; 
  top: 50%; 
  transform: translateY(-50%); 
  color: #9ca3af; 
  /* Removido pointer-events NONE do design system antigo pra permitir o clique. Cursor Pointer seta DEDO CLICK.  */
  cursor: pointer; 
}

/* O Quadrado Branco Gigante Flutuante POP UP Widget Completo Desenhador interativo dos "Dias/Mêses/Anos" Numéricos de fato que é rendenderizado pela engine VueJs no site the view V-IF   */
.custom-calendar { 
  /* Position absolute pra flutuar desapegado da grid block em baixo. Fica Absoluto referenciado geometricamente ao seu pai original (Wrapper base) de origin local anchor HTML Node DOM parent  */
  position: absolute; 
  /* Eixo Y da Altura: Usa 100% da altura base Pai pra droppar abaixo. +8 da calagem a mais de pixel puro em espaço estético em tela entre inputbox and Popup Start pixel zero y   */
  top: calc(100% + 8px); 
  
  /* OPÇÃO ESCOLHIDA: Alinhado e engatado abaixo da base extrema do ícone a DIREITA, ao invés da esquerda zero do Field Inputbox. */
  right: 0; 

  /* Dimensão Fixa em 260 de Píxel. Evita Deformidade geometrica na matriz grid de numeros e evita quebra e transbordamento estranhos do FlexGrid filho dele.  */
  width: 260px; 
  /* Preenche fundo sólido de White Color  */
  background: white; 
  /* Demarcador limite. Bordar fininha.   */
  border: 1px solid #e5e7eb; 
  border-radius: 12px; 
  /* Sombra boxshadow. Lança Alpha Preta e borrada gerando e projetando Flutuação Visual em efeito the Z Depth na page UX UI visual.   */
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); 
  /* Fixador de Top Layer The render de exibição Z Axis para sobrepor com força toda a linha the components fields e caixas blocks de baixo the bottom of rest DOM HTML form site tree nodes elements, avoiding clash de view e bugs do site. */
  z-index: 100; 
  /* Ar/Respiro base estofada padding de parede de 16  */
  padding: 16px; 
}

/* Parte Textual com Setas < > e Nome String Mes atual (Ex Maio 2030) Titulo do calendario Custom the VueJS   */
.calendar-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 16px; 
  font-weight: 600; 
  color: #1a233a; 
  font-size: 14px; 
}

/* Seta Botao Customizaddo Direcional Clicáveis < > de voltar ou pular and Botões the navegação da NavBar Time Date Control   */
.cal-btn { 
  background: transparent; 
  border: 1px solid transparent; 
  cursor: pointer; 
  color: #6b7280; 
  padding: 4px; 
  border-radius: 6px; 
}

/* Cria Mágica de Matrix e Formato Calendario CSS Grid baseada na lista Matriz Numerica do Computador Reactiva Array VUE. Renderiza os numeros exatamente no padrao de 7 items colunares por Row em multiplas fileiras the colunas the Grade the proporcão Exata Fracional "1FR" !  */
.calendar-grid { 
  /* Declara modulo Engine Grid CSS */
  display: grid; 
  /* Divide a porra toda em 7 fatias Fracionadas e Iguaizinhas */
  grid-template-columns: repeat(7, 1fr); 
  /* Distancia minininha e espaco  */
  gap: 4px; 
}

/* Strings curtinhas The Text the String Array DOM ("Dom Seg Ter Qua Qui Sex Sab") the topo do grid que enfeitam e direcionam   */
.cal-weekday { 
  /* Centrado */
  text-align: center; 
  font-size: 11px; 
  font-weight: 600; 
  color: #9ca3af; 
  /* Abaixa dos grids numbers do vFor*/
  margin-bottom: 8px; 
}

/* Botão Elemento box numérico clicável da caixinha do calendario grid Vue array loop div item render (ex Box de numero: "31", box "14", box "1", box "empty gap")  */
.cal-day { 
  /* Altura hardcode pra n ficar bizarramente achatado */
  height: 32px; 
  /* Flexo centralizado X Y pros numbers não ficarem de lado e fora The center da box clicavel. Eixo estético da box*/
  display: flex; 
  align-items: center; 
  justify-content: center; 
  /* Numeruzinhos  */
  font-size: 13px; 
  border-radius: 6px; 
  /* Action mão de call ToAction pointer UX System the windows pointer  */
  cursor: pointer; 
  color: #374151; 
}

/* Altera fundo com CSS dinamico the View class VueJS reativo caso  o model V-model e Script de check function Method System JS  comprove a exata igualdade em match daquele objeto DOM V-FOR item Box Data Value sendo Rendered e The Real Selection in Data Array Memory Select ou Today Date do dia  */
.cal-day.selected { 
  /* Pint de Base Color Marinho Azul forte */
  background-color: #1e1b4b; 
  /* Contrast in branco snow texto the color in UI */
  color: white; 
  /* Encoxa bold e grita font visual atencao.  */
  font-weight: 600; 
}

/* =======================================================================
14. COLUNA 3 DA DIREITA: BARRA LATERAL LATERAL RESUMOTEXT E INFOS DO SISTEMA 
=======================================================================
*/

/* Container Box Base de toda parte de Info the Resumo Final The Flow Timeline Visuals Stats View Globais Side   */
.summary-sidebar { 
  /* Fica colado em sticky acompanhador position e gruda em tela acompanhador em scroll na vertical. Segue a Esquerda em espelha e the UX behavior form  */
  position: sticky; 
  top: 90px; 
  height: fit-content; 
  max-height: calc(100vh - 110px); 
  /* Evita quebra mas cria scroll bar hidden nativo se monitor e tela  usuario The Client PC Web estiver  nanica e com aspect the height pequeno bugging the screen CSS Engine .   */
  overflow-y: auto; 
  /* Traço fino de limitação entre Area de Escrever e Form Center the Conteúdo VS The Sidebar lateral Area Visual Side  */
  border-left: 1px solid #e5e7eb; 
  /* Afastamento 32 em margem interna padding lateral para The Left the  content visual block margin safe point   */
  padding-left: 32px; 
}

/* Área Alta the Botoes the Btn "Salvar and Save Data Button e / Tag the State Rascunho status badge  */
.sidebar-actions { 
  display: flex; 
  align-items: center; 
  gap: 12px; 
  margin-bottom: 32px; 
}

/* O Visual do Btn Salvar em state Rascunho The Form System. Formato Outline visual limpo gray button  */
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

/* Classe do Etiquetao status color de pill Tag. Gray Base Padrão Rascunhos States */
.status-badge { 
  background-color: #f3f4f6; 
  color: #4b5563; 
  /* Capsule in padd e pill shape com 12 in round circle the block box */
  padding: 4px 10px; 
  border-radius: 12px; 
  font-size: 12px; 
  font-weight: 500; 
}

/* Outline Borda Mod pra Badge em certas areas the UI visual system */
.outline-badge { 
  border: 1px solid #e5e7eb; 
  background: white; 
}

/* Estilo do Titulo Resumo lateral the Box Widget Card in sidebar area right   */
.summary-sidebar h3 { 
  font-size: 16px; 
  margin: 0 0 4px 0; 
  color: #1a233a; 
}

/* Descricao subtitulo Lateral. Italico the FontStyle */
.summary-desc { 
  font-size: 13px; 
  color: #9ca3af; 
  margin: 0 0 24px 0; 
  font-style: italic; 
}

/* Caixotes P com o Resumo Real em array de grid row the div the class base bloc block da linha listada. Ex Status, Data...*/
.summary-block { 
  margin-bottom: 24px; 
}

/* Rotulos Titulo menor descritivo the gray visual string color UI */
.summary-label { 
  display: block; 
  font-size: 13px; 
  color: #6b7280; 
  margin-bottom: 8px; 
}

/* Desenho the Engine the UI the Flow Visual the Column Base Colunar vertical Fluxo de Tempo "Timeline the steps Flow step by step visual form UI the info system flow steps UI" the Side the Timeline the tags atreladas de Imersao/Nivelamento etc the form view final render    */
.timeline { 
  display: flex; 
  /* Coloca itens empilhados para The Y-Axis CSS flow base row de list */
  flex-direction: column; 
}

/* Organiza uma fileira flex base para meter the número a esquerda, a Linha the Traçada ligadora  e  o Texto the flow cardzinho direita separados com gaps base The flex in rows The Line UX */
.timeline-item { 
  display: flex; 
  gap: 12px; 
}

/* Balão numerico 0 1 e 2  redondos the azuis solido BG in base . Não encolhem no the action de Resize Shrink do flex!  Forcado no 20x20 round 50 per circle   */
.timeline-number { 
  width: 20px; 
  height: 20px; 
  border-radius: 50%; 
  background-color: #0288d1; 
  color: white; 
  display: flex; 
  /* Centra o char numerico "0" exatamento no miolo base of the the Circle SVG like object HTML UI rendering Box */
  align-items: center; 
  justify-content: center; 
  font-size: 11px; 
  font-weight: 600; 
  /* Previne encolhimento no flex overflow math engine css e quebrar forma redonda */
  flex-shrink: 0; 
  margin-top: 2px; 
}

/* Headers do timeline flow name of phase ex (h4 = Triagem Text phase title flow base UI side ) */
.timeline-content h4 { 
  margin: 0 0 2px 0; 
  font-size: 14px; 
  color: #1a233a; 
}

/* Descs do timeline flow info string Text phase title flow  */
.timeline-content p { 
  margin: 0 0 4px 0; 
  font-size: 13px; 
  color: #6b7280; 
}

/* Tag Padrão the Span q diz "Vagas Ilimitadas / Vagas 250 numbers" em cor de azuzinho limpo font blue string color base     */
.timeline-tag { 
  font-size: 12px; 
  color: #01579b; 
}

/* Traço Mágico The Line the visual the UX vertical the draw visual gray color The cinza claríssimo que the Liga the bolinha e base top 0 na Bolinha base top  1 e de novo the draw until etc... na Vertical Y CSS Draw Object UI Component the link step system .   */
.timeline-line { 
  /* O Tracinho fino the w */
  width: 1.5px; 
  height: 24px; 
  /* Cor e draw the gray visual CSS background the paint line draw */
  background-color: #e5e7eb; 
  /* Afasta a linha milimetricamente the css margins push rules com numbers left e the margin margin the ate margin ela nascer the do centro the circle center the from  the topo do the circle HTML DOM div object até encostar com math e margins do the base  bottom e the base top side da the outr base the the bolinha element the form. */
  margin-left: 9px; 
  margin-top: 4px; 
  margin-bottom: 4px; 
}

/* RodaPe Informatico in Text View The UI Widget Sidebar the Final do the the Bottom Sidebar the Side component Flow com Update String Visual Date Time clock Info log Text Atualizado string. Renderiza cor gray clara soft por Date System Global "Hoje às XY Time Code System string view visual data information"   */
.summary-footer { 
  /* Empura the bottom of sidebar to down respiro the text string away the flow component  */
  margin-top: 40px; 
  font-size: 12px; 
  color: #9ca3af; 
}

/* =======================================================================
15. ESTILOS EXCLUSIVOS DA ETAPA 3 (FORMULÁRIOS DINÂMICOS, SWITCHES, ETC)
=======================================================================
*/

/* -----------------------------
COMPONENTE: TOGGLE SWITCH (Interruptor estilo iOS)
-----------------------------
*/
.toggle-switch { 
  /* Cria o invólucro do switch respeitando as medidas de um interruptor */
  position: relative; 
  display: inline-block; 
  width: 36px; 
  height: 20px; 
}

.toggle-input { 
  /* Esconde o checkbox HTML nativo e feio da tela, mas mantém o estado lógico */
  opacity: 0; 
  width: 0; 
  height: 0; 
}

.toggle-slider { 
  /* Desenha o fundo cinza clarinho da "trilha" do botão onde o círculo corre */
  position: absolute; 
  cursor: pointer; 
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  background-color: #d1d5db; 
  /* Suaviza o movimento de ligado/desligado */
  transition: .3s; 
  border-radius: 20px; 
}

.toggle-slider:before { 
  /* Desenha a "Bolinha Branca" que o usuário arrasta */
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

/* Quando o Vue injeta :checked=true no input escondido, pinta a trilha de Azul Escuro */
.toggle-input:checked + .toggle-slider { 
  background-color: #1e1b4b; 
}

/* Empurra a bolinha branca para a direita indicando "LIGADO" */
.toggle-input:checked + .toggle-slider:before { 
  transform: translateX(16px); 
}

/* -----------------------------
COMPONENTE: LISTA DE ITENS (Formulário de Inscrição / Documentos)
-----------------------------
*/
.list-item-row { 
  /* Fila flexível empurrando os itens para as pontas */
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  /* Borda sutil delimitando o campo como na imagem 2 e 3 */
  padding: 16px; 
  border: 1px solid #e5e7eb; 
  border-radius: 8px; 
  margin-bottom: 8px; 
  background-color: white;
}

.toggle-row-simple {
  /* Variação da lista sem borda para a seção de Elegibilidade (imagem 1) */
  border: none;
  padding: 0 0 16px 0;
  border-radius: 0;
  border-bottom: 1px solid #f3f4f6;
  margin-bottom: 16px;
}

.list-item-info { 
  /* Agrupa título e o badge obrigatório */
  display: flex; 
  align-items: center; 
}

.list-item-info-stacked { 
  /* Usado em Documentos (imagem 3) para empilhar Título e Tipos Aceitos (subtítulo) */
  display: flex; 
  flex-direction: column; 
}

.list-item-title { 
  /* Texto do campo (ex: Nome completo, CPF, etc) */
  font-size: 14px; 
  color: #1a233a; 
  font-weight: 500; 
}

.list-item-sub { 
  /* Subtexto usado abaixo dos documentos (ex: Tipos aceitos: PDF) */
  font-size: 12px; 
  color: #6b7280; 
  margin-top: 4px; 
}

/* O Badge (Etiqueta) vermelha de campo Obrigatório das imagens 2 e 3 */
.badge-required { 
  background-color: #fef2f2; 
  color: #ef4444; 
  font-size: 10px; 
  padding: 2px 6px; 
  border-radius: 4px; 
  margin-left: 8px; 
  font-weight: 500; 
}

/* Botão esticado tracejado de "Adicionar" (imagem 2 e 3) */
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

/* -----------------------------
COMPONENTE: COTAS E CLASSIFICAÇÃO (Imagem 4)
-----------------------------
*/
.quota-row { 
  /* Layout limpo em linha com separador (risco cinza) embaixo */
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 12px 0; 
  border-bottom: 1px solid #f3f4f6; 
}

.quota-input-wrapper { 
  /* Junta o input de número e o símbolo de porcentagem (%) */
  display: flex; 
  align-items: center; 
  gap: 8px; 
}

.quota-input { 
  /* O input curtinho onde se digita "50" */
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
  /* Símbolo % ao lado da caixinha */
  font-size: 14px; 
  color: #6b7280; 
  font-weight: 500;
}

.green-toggle-box { 
  /* A caixa que liga/desliga todo o sistema de aprovação para a próxima fase */
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  /* Borda verde-menta escuro sutil */
  border: 1px solid #a7f3d0; 
  /* Fundo verde aguado bem clarinho (padrão de "Success/Ativado") */
  background-color: #f0fdf4; 
  border-radius: 8px; 
  padding: 16px; 
}

/* -----------------------------
COMPONENTE: PILLS DE SELEÇÃO MÚLTIPLA (Tipos de Documento)
-----------------------------
*/
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
  user-select: none; /* Previne a seleção do texto ao clicar rápido */
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

/* =======================================================================
16. ESTILOS EXCLUSIVOS DA ETAPA 4 (NIVELAMENTO, TABELAS E SLIDERS)
=======================================================================
*/

/* -----------------------------
COMPONENTE: TABELA DE CURSOS
-----------------------------
*/
.course-table {
  display: flex;
  flex-direction: column;
}

.course-header {
  display: grid;
  /* Configuração responsiva das colunas (Nome cresce 2x mais que as outras) */
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

/* Badge verde de Status (Ativo) */
.badge-active {
  background-color: #dcfce7;
  color: #065f46;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  display: inline-block;
}

/* -----------------------------
COMPONENTE: SLIDER CUSTOMIZADO E CAIXA DE FÓRMULA
-----------------------------
*/
.form-range {
  /* Reseta a aparência feia nativa do browser */
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  /* O Vue.js sobrepõe o background com um inline-style dinâmico, mas colocamos uma fallback base aqui */
  background: #e5e7eb;
  border-radius: 4px;
  outline: none;
  transition: opacity .2s;
}

/* A "Bolinha" do Slider puxando no Safari/Chrome */
.form-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 3px solid #1e1b4b; /* Azul escuro corporativo */
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* A "Bolinha" do Slider puxando no Firefox */
.form-range::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 3px solid #1e1b4b;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Caixa Escura (Navy Box) de Fórmulas Matemáticas */
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

/* The Fim the final e End The Todas The Settings configuration rules CSS Variables and ID Classes from this view UI File e das The Configurações e style scope base do View Geral Component UI  - Fim VUE FRAMEWORK STYLE ENGINE  END  */
</style>
```