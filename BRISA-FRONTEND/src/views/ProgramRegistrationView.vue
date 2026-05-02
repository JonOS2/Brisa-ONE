<template>
  <div class="program-registration-view">
    <!-- Overlay invisível para fechar o calendário ao clicar fora -->
    <div v-if="activeDatePicker" class="picker-overlay" @click="closeDatePicker"></div>

    <!-- Modal de Adicionar Nova Etapa -->
    <div v-if="showNewStageModal" class="modal-overlay" @click="closeNewStageModal">
       <div class="modal-content" @click.stop>
          <div class="modal-header">
             <div>
               <h3>Adicionar Nova Etapa</h3>
               <p class="modal-subtitle">Configure as informações da nova etapa do processo seletivo</p>
             </div>
             <button class="btn-close-modal" @click="closeNewStageModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
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

    <!-- Modal de Editar Etapa -->
    <div v-if="showEditStageModal" class="modal-overlay" @click="closeEditStageModal">
       <div class="modal-content" @click.stop>
          <div class="modal-header">
             <div>
               <h3>Editar Etapa</h3>
               <p class="modal-subtitle">Configure as informações da etapa do processo seletivo</p>
             </div>
             <button class="btn-close-modal" @click="closeEditStageModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
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

    <!-- Header -->
    <div class="header">
      <div class="header-left">
        <h1>Cadastro de Programa</h1>
        <p class="subtitle">Configure e publique novos editais</p>
      </div>
    </div>

    <!-- Layout Container -->
    <div class="registration-container">
      
      <!-- Coluna 1: Sidebar de Navegação -->
      <div class="sidebar">
        <div class="steps">
          <div :class="['step', { active: currentStep === 1, completed: currentStep > 1 }]" @click="goToStep(1)">
             <div :class="['step-icon', { outline: currentStep < 1 }]">
                <svg v-if="currentStep > 1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
             </div>
             <div class="step-label">
                <span class="step-title">Dados do Programa</span>
                <span class="step-desc">Informações gerais</span>
             </div>
          </div>
          <div class="step-divider"></div>
          <div :class="['step', { active: currentStep === 2, completed: currentStep > 2 }]" @click="goToStep(2)">
             <div :class="['step-icon', { outline: currentStep < 2 }]">
                <svg v-if="currentStep > 2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
             </div>
             <div class="step-label">
                <span class="step-title">Estrutura das Etapas</span>
                <span class="step-desc">Definição do fluxo</span>
             </div>
          </div>
          <div class="step-divider"></div>
          <div :class="['step', { active: currentStep === 3, completed: currentStep > 3 }]" @click="goToStep(3)">
             <div :class="['step-icon', { outline: currentStep < 3 }]">
                <svg v-if="currentStep > 3" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
             </div>
             <div class="step-label">
                <span class="step-title">Etapa 0 — Inscrição</span>
                <span class="step-desc">Formulário e elegibilidade</span>
             </div>
          </div>
          <div class="step-divider"></div>
          <div :class="['step', { active: currentStep === 4, completed: currentStep > 4 }]" @click="goToStep(4)">
             <div :class="['step-icon', { outline: currentStep < 4 }]">
                <svg v-if="currentStep > 4" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
             </div>
             <div class="step-label">
                <span class="step-title">Etapa 1 — Nivelamento</span>
                <span class="step-desc">Cursos e avaliação</span>
             </div>
          </div>
          <div class="step-divider"></div>
          <div :class="['step', { active: currentStep === 5, completed: currentStep > 5 }]" @click="goToStep(5)">
             <div :class="['step-icon', { outline: currentStep < 5 }]">
                <svg v-if="currentStep > 5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
             </div>
             <div class="step-label">
                <span class="step-title">Etapa 2 — Imersão</span>
                <span class="step-desc">Projetos e benefícios</span>
             </div>
          </div>
          <div class="step-divider"></div>
          <div :class="['step', { active: currentStep === 6 }]" @click="goToStep(6)">
             <div :class="['step-icon', { outline: currentStep < 6 }]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><polyline points="9 15 11 17 15 13"></polyline></svg>
             </div>
             <div class="step-label">
                <span class="step-title">Revisão Final</span>
                <span class="step-desc">Validar e publicar</span>
             </div>
          </div>
        </div>
      </div>

      <!-- Coluna 2: Formulário Principal -->
      <div class="content">
        
        <!-- ETAPA 1 -->
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
               <input v-model="newPartnerName" @keydown.enter.prevent="addPartner" type="text" placeholder="Nome do parceiro" class="form-input"/>
               <button @click.prevent="addPartner" class="btn-add-partner">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                 Adicionar
               </button>
             </div>
             <div v-if="formData.partners.length > 0" class="partner-tags-container">
               <div v-for="(partner, index) in formData.partners" :key="index" class="partner-tag">
                 <span>{{ partner }}</span>
                 <button @click.prevent="removePartner(index)" class="btn-remove-tag"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
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
                 <span v-if="isEmailInvalid && emailTouched" class="error-text">E-mail inválido. Utilize o formato nome@exemplo.com.</span>
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
             <!-- Layout de Datas Corrigido: Agora usa flexbox para ocupar largura total -->
             <div class="form-row date-row">
               <div class="form-group relative date-field">
                 <label>Data de Publicação</label>
                 <div class="date-input-wrapper" @click="openDatePicker('publishDate')">
                   <input v-model="displayDates.publishDate" @input="parseDateInput('publishDate')" @keydown.enter="$event.target.blur()" type="text" placeholder="dd/mm/aaaa" maxlength="10" class="form-input pointer-input" />
                   <svg class="date-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                 </div>
                 <div v-if="activeDatePicker === 'publishDate'" class="custom-calendar">
                    <div class="calendar-header">
                       <button type="button" class="cal-btn" @click.stop="prevMonth"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                       <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                       <button type="button" class="cal-btn" @click.stop="nextMonth"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                    </div>
                    <div class="calendar-grid">
                       <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                       <span v-for="(day, idx) in calendarDays" :key="idx" :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('publishDate', day), 'today': isToday(day) }]" @click.stop="selectDate(day)">{{ day }}</span>
                    </div>
                 </div>
               </div>

               <div class="form-group relative date-field">
                 <label>Início das Inscrições <span class="required">*</span></label>
                 <div class="date-input-wrapper" @click="openDatePicker('startDate')">
                   <input v-model="displayDates.startDate" @input="parseDateInput('startDate')" @keydown.enter="$event.target.blur()" type="text" placeholder="dd/mm/aaaa" maxlength="10" class="form-input pointer-input" />
                   <svg class="date-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                 </div>
                 <div v-if="activeDatePicker === 'startDate'" class="custom-calendar">
                    <div class="calendar-header">
                       <button type="button" class="cal-btn" @click.stop="prevMonth"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                       <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                       <button type="button" class="cal-btn" @click.stop="nextMonth"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                    </div>
                    <div class="calendar-grid">
                       <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                       <span v-for="(day, idx) in calendarDays" :key="idx" :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('startDate', day), 'today': isToday(day) }]" @click.stop="selectDate(day)">{{ day }}</span>
                    </div>
                 </div>
               </div>

               <div class="form-group relative date-field">
                 <label>Fim das Inscrições <span class="required">*</span></label>
                 <div class="date-input-wrapper" @click="openDatePicker('endDate')">
                   <input v-model="displayDates.endDate" @input="parseDateInput('endDate')" @keydown.enter="$event.target.blur()" type="text" placeholder="dd/mm/aaaa" maxlength="10" class="form-input pointer-input" />
                   <svg class="date-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                 </div>
                 <div v-if="activeDatePicker === 'endDate'" class="custom-calendar">
                    <div class="calendar-header">
                       <button type="button" class="cal-btn" @click.stop="prevMonth"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                       <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                       <button type="button" class="cal-btn" @click.stop="nextMonth"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                    </div>
                    <div class="calendar-grid">
                       <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                       <span v-for="(day, idx) in calendarDays" :key="idx" :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('endDate', day), 'today': isToday(day) }]" @click.stop="selectDate(day)">{{ day }}</span>
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

        <!-- ETAPA 2 -->
        <div v-else-if="currentStep === 2" class="step-container">
          <div class="step-header">
             <h2>Estrutura das Etapas</h2>
             <p>Configure as etapas do processo seletivo</p>
          </div>

          <div class="info-alert">
             <div class="alert-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
             </div>
             <div class="alert-content">
                <strong>Estrutura sugerida pelo sistema</strong>
                <p>O sistema criou automaticamente etapas padrão baseadas em processos seletivos acadêmicos. Você pode editar, excluir, reordenar ou adicionar novas etapas conforme necessário.</p>
             </div>
          </div>

          <div class="stages-list">
             <div class="stage-card" v-for="stage in stageList" :key="stage.id">
                <div class="stage-drag-handle">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>
                </div>
                <div class="stage-body">
                   <div class="stage-header">
                      <div class="stage-number">{{ stage.id }}</div>
                      <div class="stage-titles">
                         <h4>{{ stage.title }} <span v-if="stage.isDefault" class="badge-padrao">Padrão</span></h4>
                         <span class="stage-type">{{ stage.type }}</span>
                      </div>
                   </div>
                   <p class="stage-description">{{ stage.desc }}</p>
                   
                   <div class="stage-info-grid">
                      <div class="info-item">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                         <div><small>Modalidade</small><span>{{ stage.modality }}</span></div>
                      </div>
                      <div class="info-item">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                         <div><small>Duração</small><span>{{ stage.duration }}</span></div>
                      </div>
                      <div class="info-item">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                         <div><small>Vagas</small><span>{{ stage.slots }}</span></div>
                      </div>
                   </div>

                   <div class="stage-actions">
                      <button class="btn-stage-action" @click="openEditStageModal(stage)"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>Editar</button>
                      <button class="btn-stage-action"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>Duplicar</button>
                      <button class="btn-stage-action btn-danger" @click="deleteStage(stage.id)"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>Excluir</button>
                   </div>
                </div>
             </div>
          </div>

          <div class="stage-list-actions">
             <button class="btn-action-outline" @click="openNewStageModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>Adicionar Nova Etapa</button>
             <button class="btn-action-outline" @click="restoreDefaultStages"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>Restaurar Estrutura Padrão</button>
          </div>
        </div>

        <div v-else class="step-container">
           <div class="step-header"><h2>Etapa {{ currentStep }}</h2><p>Em desenvolvimento...</p></div>
        </div>

        <!-- FOOTER NAVEGAÇÃO -->
        <div class="form-actions-footer">
           <button v-if="currentStep > 1" class="btn-footer-back" @click="prevStep">Anterior</button>
           <button v-if="currentStep < 6" class="btn-footer-continue ml-auto" @click="nextStep">Próximo</button>
           <button v-else class="btn-footer-continue ml-auto" @click="nextStep">Finalizar</button>
        </div>
      </div>

      <!-- SIDEBAR DIREITA -->
      <div class="summary-sidebar">
         <div class="sidebar-actions">
            <button class="btn-sidebar-draft"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>Salvar Rascunho</button>
            <span class="status-badge outline-badge">Rascunho</span>
         </div>
         <h3>Resumo do Edital</h3>
         <p class="summary-desc">Preencha os dados do programa para ver o resumo</p>
         <div class="summary-block"><span class="summary-label">Status</span><span class="status-badge">Rascunho</span></div>
         <div class="summary-block"><span class="summary-label">Etapas do Processo</span>
            <div class="timeline">
               <div class="timeline-item"><div class="timeline-number">0</div><div class="timeline-content"><h4>Inscrição</h4><p>Online</p><span class="timeline-tag">Ilimitado</span></div></div>
               <div class="timeline-line"></div>
               <div class="timeline-item"><div class="timeline-number">1</div><div class="timeline-content"><h4>Nivelamento</h4><p>Remota Assíncrona</p><span class="timeline-tag">250 vagas</span></div></div>
               <div class="timeline-line"></div>
               <div class="timeline-item"><div class="timeline-number">2</div><div class="timeline-content"><h4>Imersão</h4><p>Híbrida</p><span class="timeline-tag">50 vagas</span></div></div>
            </div>
         </div>
         <div class="summary-footer">Última atualização: Hoje às 14:32</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgramRegistrationView',
  data() {
    return {
      currentStep: 1, newPartnerName: '', emailTouched: false,
      formData: { programName: '', batchName: '', executor: '', objective: '', partners: [], location: '', supportEmail: '', officialWebsite: '', publishDate: '', startDate: '', endDate: '', status: 'Rascunho', observations: '' },
      showNewStageModal: false,
      newStageForm: { title: '', type: '', modality: 'Online', durationValue: '', durationUnit: 'dias', slots: '', desc: '' },
      showEditStageModal: false,
      editStageForm: { id: null, title: '', type: '', modality: 'Online', durationValue: '', durationUnit: 'dias', slots: '', desc: '' },
      stageList: [], displayDates: { publishDate: '', startDate: '', endDate: '' }, activeDatePicker: null, calendarDate: new Date(), 
      weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    };
  },
  mounted() { this.restoreDefaultStages(); },
  watch: {
    'formData.publishDate'(val) { this.displayDates.publishDate = this.formatDateDisplay(val); },
    'formData.startDate'(val) { this.displayDates.startDate = this.formatDateDisplay(val); },
    'formData.endDate'(val) { this.displayDates.endDate = this.formatDateDisplay(val); }
  },
  computed: {
    isEmailInvalid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return this.formData.supportEmail && !emailRegex.test(this.formData.supportEmail);
    },
    calendarDays() {
      const year = this.calendarDate.getFullYear(), month = this.calendarDate.getMonth(), firstDay = new Date(year, month, 1).getDay(), daysInMonth = new Date(year, month + 1, 0).getDate();
      const days = [];
      for (let i = 0; i < firstDay; i++) { days.push(null); }
      for (let i = 1; i <= daysInMonth; i++) { days.push(i); }
      return days;
    }
  },
  methods: {
    nextStep() { if (this.currentStep < 6) this.currentStep++; window.scrollTo({ top: 0, behavior: 'smooth' }); },
    prevStep() { if (this.currentStep > 1) this.currentStep--; window.scrollTo({ top: 0, behavior: 'smooth' }); },
    goToStep(num) { this.currentStep = num; window.scrollTo({ top: 0, behavior: 'smooth' }); },
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
    deleteStage(id) { this.stageList = this.stageList.filter(s => s.id !== id); },
    addPartner() { if (this.newPartnerName.trim() && !this.formData.partners.includes(this.newPartnerName.trim())) { this.formData.partners.push(this.newPartnerName.trim()); this.newPartnerName = ''; } },
    removePartner(idx) { this.formData.partners.splice(idx, 1); },
    openDatePicker(f) { 
        this.activeDatePicker = f; 
        const exist = this.formData[f]; 
        if (exist) { const [y, m, d] = exist.split('-'); this.calendarDate = new Date(y, m - 1, d); } else { this.calendarDate = new Date(); } 
    },
    closeDatePicker() { this.activeDatePicker = null; },
    selectDate(d) { if (!d) return; const y = this.calendarDate.getFullYear(), m = String(this.calendarDate.getMonth() + 1).padStart(2, '0'), day = String(d).padStart(2, '0'); this.formData[this.activeDatePicker] = `${y}-${m}-${day}`; this.closeDatePicker(); },
    prevMonth() { this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() - 1, 1); },
    nextMonth() { this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 1); },
    formatDateDisplay(s) { if (!s) return ''; const [y, m, d] = s.split('-'); return `${d}/${m}/${y}`; },
    parseDateInput(f) {
      let v = this.displayDates[f].replace(/\D/g, ''); 
      if (v.length >= 2) { let d = parseInt(v.substring(0, 2)); if (d > 31) v = '31' + v.substring(2); else if (d === 0) v = '01' + v.substring(2); }
      if (v.length >= 4) { let m = parseInt(v.substring(2, 4)); if (m > 12) v = v.substring(0, 2) + '12' + v.substring(4); else if (m === 0) v = v.substring(0, 2) + '01' + v.substring(4); }
      let fmt = v; if (v.length > 2) fmt = v.substring(0, 2) + '/' + v.substring(2); if (v.length > 4) fmt = fmt.substring(0, 5) + '/' + v.substring(4, 8);
      this.displayDates[f] = fmt;
      if (v.length === 8) { const d = v.substring(0, 2), m = v.substring(2, 4), y = v.substring(4, 8), obj = new Date(y, m - 1, d); if (obj.getFullYear() == y && obj.getMonth() == m - 1 && obj.getDate() == d) { this.formData[f] = `${y}-${m}-${d}`; this.calendarDate = new Date(y, m - 1, d); } else { this.formData[f] = ''; } } else { this.formData[f] = ''; }
    },
    isSelectedDay(f, d) { if (!d || !this.formData[f]) return false; const [y, m, day] = this.formData[f].split('-'); return Number(y) === this.calendarDate.getFullYear() && Number(m) === this.calendarDate.getMonth() + 1 && Number(day) === d; },
    isToday(day) { const t = new Date(); return day && t.getFullYear() === this.calendarDate.getFullYear() && t.getMonth() === this.calendarDate.getMonth() && t.getDate() === day; }
  }
};
</script>

<style scoped>
* { box-sizing: border-box; }
.program-registration-view { min-height: 100vh; background-color: #fafbfd; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.header-left h1 { font-size: 22px; font-weight: 600; color: #1a233a; margin: 0 0 4px 0; }
.subtitle { color: #6b7280; margin: 0; font-size: 13px; }
.status-badge { background-color: #f3f4f6; color: #4b5563; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; }
.registration-container { display: grid; grid-template-columns: 260px 1fr 280px; gap: 32px; align-items: start; }

.sidebar { position: sticky; top: 90px; height: fit-content; max-height: calc(100vh - 110px); overflow-y: auto; }
.steps { display: flex; flex-direction: column; }
.step { display: flex; align-items: center; gap: 14px; padding: 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
.step:hover { background-color: #f3f4f6; }
.step.active { background-color: #e0f2fe; border: 1px solid #bae6fd; }
.step-icon { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background-color: #0288d1; color: white; transition: all 0.2s; }
.step-icon.outline { background-color: #f3f4f6; color: #9ca3af; }
.step.completed .step-icon { background-color: #0288d1; color: white; }
.step-label { display: flex; flex-direction: column; }
.step-title { font-size: 13px; font-weight: 500; color: #1a233a; }
.step.active .step-title, .step.completed .step-title { color: #0369a1; }
.step-desc { font-size: 12px; color: #6b7280; }
.step.active .step-desc, .step.completed .step-desc { color: #0ea5e9; }
.step-divider { width: 1px; height: 16px; background-color: #e5e7eb; margin-left: 30px; }

.content { display: flex; flex-direction: column; justify-content: space-between; min-height: calc(100vh - 120px); }
.step-container { display: flex; flex-direction: column; gap: 12px; }
.step-header h2 { font-size: 18px; color: #1a233a; margin: 0 0 4px 0; }
.step-header p { margin: 0; color: #6b7280; font-size: 13px; }
.card-section { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px 24px; }
.section-title { margin-bottom: 16px; }
.section-title h3 { font-size: 15px; font-weight: 600; color: #1a233a; margin: 0 0 4px 0; }
.section-title p { font-size: 13px; color: #6b7280; margin: 0; }
.form-row { display: flex; gap: 16px; }
.form-row.two-cols > .form-group { flex: 1; }
.three-cols-special { display: grid; grid-template-columns: 1fr 1.5fr 1fr; gap: 16px; }
.form-group { margin-bottom: 16px; position: relative; }
.form-group label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: #374151; }
.required { color: #ef4444; }
.form-input, .form-textarea { width: 100%; padding: 10px 12px; border: 1px solid transparent; border-radius: 6px; background-color: #f9fafb; font-family: inherit; font-size: 13px; color: #1a233a; transition: all 0.2s; }
.form-select { appearance: auto; cursor: pointer; padding-left: 8px; }
.form-input:focus, .form-textarea:focus { outline: none; background-color: white; box-shadow: 0 0 0 1px #3b82f6; }
.form-textarea { resize: vertical; }

.form-input.input-error { background-color: #fef2f2; box-shadow: 0 0 0 1px #ef4444; }
.error-text { display: block; color: #ef4444; font-size: 11px; margin-top: 6px; font-weight: 500; }

.duration-input-group { display: flex; gap: 8px; width: 100%; }
.duration-input-group input { flex: 1; }
.duration-input-group select { flex: 1; min-width: 100px; }

.partner-input-row { display: flex; gap: 12px; align-items: center; }
.partner-input-row .form-input { flex: 1; }
.btn-add-partner { display: flex; align-items: center; gap: 6px; background-color: #1e1b4b; color: white; border: none; padding: 10px 16px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; }
.partner-tags-container { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.partner-tag { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border: 1px solid #0288d1; background-color: #e1f5fe; color: #01579b; border-radius: 16px; font-size: 13px; font-weight: 500; }
.btn-remove-tag { background: transparent; border: none; padding: 0; color: #0288d1; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s; }

.info-alert { display: flex; gap: 12px; background-color: #e1f5fe; border: 1px solid #b3e5fc; border-radius: 10px; padding: 16px; margin-bottom: 8px; color: #01579b; }
.alert-icon { flex-shrink: 0; margin-top: 2px; }
.alert-content strong { display: block; font-size: 14px; margin-bottom: 4px; }
.alert-content p { margin: 0; font-size: 13px; line-height: 1.4; opacity: 0.9; }
.stages-list { display: flex; flex-direction: column; gap: 16px; }
.stage-card { display: flex; background: white; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
.stage-drag-handle { padding: 0 12px; display: flex; align-items: center; justify-content: center; color: #d1d5db; cursor: grab; border-right: 1px solid #e5e7eb; background: #f9fafb; }
.stage-body { padding: 20px; flex: 1; }
.stage-header { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
.stage-number { width: 32px; height: 32px; border-radius: 50%; background-color: #0288d1; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; }
.stage-titles h4 { margin: 0 0 4px 0; font-size: 15px; color: #1a233a; display: flex; align-items: center; }
.badge-padrao { background-color: #e1f5fe; color: #0288d1; font-size: 10px; padding: 2px 8px; border-radius: 12px; margin-left: 8px; font-weight: 500; }
.stage-type { font-size: 12px; color: #6b7280; }
.stage-description { margin: 0 0 20px 0; font-size: 13px; color: #4b5563; }
.stage-info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f3f4f6; }
.info-item { display: flex; align-items: flex-start; gap: 8px; color: #6b7280; }
.info-item svg { margin-top: 2px; color: #9ca3af; }
.info-item small { display: block; font-size: 11px; margin-bottom: 2px; }
.info-item span { display: block; font-size: 13px; color: #1a233a; font-weight: 500; }
.stage-actions { display: flex; gap: 12px; }
.btn-stage-action { background: white; border: 1px solid #d1d5db; border-radius: 6px; padding: 6px 12px; font-size: 13px; font-weight: 500; color: #374151; cursor: pointer; display: flex; align-items: center; gap: 6px; }
.btn-stage-action.btn-danger { color: #ef4444; border-color: #fca5a5; }

.stage-list-actions { display: flex; gap: 12px; margin-top: 8px; margin-bottom: 40px; }
.btn-action-outline { background: white; border: 1px solid #d1d5db; border-radius: 6px; padding: 10px 16px; font-size: 13px; font-weight: 500; color: #374151; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
.btn-action-outline:hover { background: #f9fafb; border-color: #9ca3af; }

.modal-overlay { position: fixed; inset: 0; background-color: rgba(15, 23, 42, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: white; border-radius: 12px; padding: 24px; width: 100%; max-width: 600px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
.modal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.modal-header h3 { margin: 0; font-size: 18px; color: #1a233a; font-weight: 600; }
.modal-subtitle { margin: 4px 0 0 0; font-size: 13px; color: #6b7280; }
.btn-close-modal { background: transparent; border: none; color: #9ca3af; cursor: pointer; padding: 4px; border-radius: 6px; display: flex; }
.modal-body { margin-bottom: 24px; }
.modal-footer { display: flex; justify-content: flex-end; gap: 12px; padding-top: 16px; border-top: 1px solid #e5e7eb; }

.form-actions-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid #e5e7eb; margin-top: auto; }
.ml-auto { margin-left: auto; }
.btn-footer-back { background: white; border: 1px solid #d1d5db; border-radius: 6px; padding: 10px 24px; font-size: 13px; font-weight: 500; color: #1a233a; cursor: pointer; transition: all 0.2s; }
.btn-footer-continue { background-color: #1e1b4b; color: white; border: none; padding: 10px 24px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; transition: opacity 0.2s; }

/* CALENDÁRIO CORRIGIDO: Agora usa flexbox para largura total */
.date-row { display: flex; gap: 16px; width: 100%; }
.date-field { flex: 1; min-width: 0; }
.picker-overlay { position: fixed; inset: 0; z-index: 50; background: transparent; }
.date-input-wrapper { position: relative; z-index: 51; width: 100%; }
.date-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }
.custom-calendar { position: absolute; top: calc(100% + 8px); left: 0; width: 260px; background: white; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); z-index: 100; padding: 16px; }
.calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; font-weight: 600; color: #1a233a; font-size: 14px; }
.cal-btn { background: transparent; border: 1px solid transparent; cursor: pointer; color: #6b7280; padding: 4px; border-radius: 6px; }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.cal-weekday { text-align: center; font-size: 11px; font-weight: 600; color: #9ca3af; margin-bottom: 8px; }
.cal-day { height: 32px; display: flex; align-items: center; justify-content: center; font-size: 13px; border-radius: 6px; cursor: pointer; color: #374151; }
.cal-day.selected { background-color: #1e1b4b; color: white; font-weight: 600; }

.summary-sidebar { position: sticky; top: 90px; height: fit-content; max-height: calc(100vh - 110px); overflow-y: auto; border-left: 1px solid #e5e7eb; padding-left: 32px; }
.sidebar-actions { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
.btn-sidebar-draft { display: flex; align-items: center; gap: 8px; background: white; border: 1px solid #e5e7eb; padding: 8px 16px; border-radius: 6px; font-size: 13px; color: #4b5563; cursor: pointer; font-weight: 500; }
.summary-sidebar h3 { font-size: 15px; margin: 0 0 4px 0; color: #1a233a; }
.summary-desc { font-size: 12px; color: #9ca3af; margin: 0 0 24px 0; font-style: italic; }
.summary-block { margin-bottom: 24px; }
.summary-label { display: block; font-size: 12px; color: #6b7280; margin-bottom: 8px; }
.timeline { display: flex; flex-direction: column; }
.timeline-item { display: flex; gap: 12px; }
.timeline-number { width: 20px; height: 20px; border-radius: 50%; background-color: #0288d1; color: white; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; flex-shrink: 0; margin-top: 2px; }
.timeline-content h4 { margin: 0 0 2px 0; font-size: 13px; color: #1a233a; }
.timeline-content p { margin: 0 0 4px 0; font-size: 12px; color: #6b7280; }
.timeline-tag { font-size: 11px; color: #0288d1; }
.timeline-line { width: 1px; height: 24px; background-color: #e5e7eb; margin-left: 9px; margin-top: 4px; margin-bottom: 4px; }
.summary-footer { margin-top: 40px; font-size: 11px; color: #9ca3af; }
</style>