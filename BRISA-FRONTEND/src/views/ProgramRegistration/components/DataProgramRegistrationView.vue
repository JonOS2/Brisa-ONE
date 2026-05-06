<template>
  <div class="step-container">
    
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
           :value="newPartnerName" 
           @input="$emit('update-partner-name', $event.target.value)"
           @keydown.enter.prevent="$emit('add-partner')" 
           type="text" 
           placeholder="Nome do parceiro" 
           class="form-input"
         />
         <button @click.prevent="$emit('add-partner')" class="btn-add-partner">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
           </svg>
           Adicionar
         </button>
       </div>
       
       <div v-if="formData.partners.length > 0" class="partner-tags-container">
         <div v-for="(partner, index) in formData.partners" :key="index" class="partner-tag">
           <span>{{ partner }}</span>
           <button @click.prevent="$emit('remove-partner', index)" class="btn-remove-tag">
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
             @blur="$emit('update-email-touched')"
             @keydown.enter="$event.target.blur()" 
             type="email" 
             placeholder="Ex: suporte@programa.edu.br" 
             :class="['form-input', { 'input-error': isEmailInvalid }]"
           />
           <span v-if="isEmailInvalid" class="error-text">
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
                @input="$emit('parse-date-input', 'publishDate')" 
                @keydown.enter="$event.target.blur()" 
                type="text" 
                placeholder="dd/mm/aaaa" 
                maxlength="10" 
                class="form-input" 
             />
             <svg @click="$emit('open-date-picker', 'publishDate')" class="date-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
             </svg>
           </div>
           
           <div v-if="activeDatePicker === 'publishDate'" class="custom-calendar">
              <div class="calendar-header">
                 <button type="button" class="cal-btn" @click.stop="$emit('prev-month')">‹</button>
                 <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                 <button type="button" class="cal-btn" @click.stop="$emit('next-month')">›</button>
              </div>
              <div class="calendar-grid">
                 <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                 <span 
                    v-for="(day, idx) in calendarDays" 
                    :key="idx" 
                    :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('publishDate', day), 'today': isToday(day) }]" 
                    @click.stop="$emit('select-date', day)"
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
                @input="$emit('parse-date-input', 'startDate')" 
                @keydown.enter="$event.target.blur()" 
                type="text" 
                placeholder="dd/mm/aaaa" 
                maxlength="10" 
                class="form-input" 
             />
             <svg @click="$emit('open-date-picker', 'startDate')" class="date-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
             </svg>
           </div>
           
           <div v-if="activeDatePicker === 'startDate'" class="custom-calendar">
              <div class="calendar-header">
                 <button type="button" class="cal-btn" @click.stop="$emit('prev-month')">‹</button>
                 <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                 <button type="button" class="cal-btn" @click.stop="$emit('next-month')">›</button>
              </div>
              <div class="calendar-grid">
                 <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                 <span 
                    v-for="(day, idx) in calendarDays" 
                    :key="idx" 
                    :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('startDate', day), 'today': isToday(day) }]" 
                    @click.stop="$emit('select-date', day)"
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
                @input="$emit('parse-date-input', 'endDate')" 
                @keydown.enter="$event.target.blur()" 
                type="text" 
                placeholder="dd/mm/aaaa" 
                maxlength="10" 
                class="form-input" 
             />
             <svg @click="$emit('open-date-picker', 'endDate')" class="date-icon cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
             </svg>
           </div>
           
           <div v-if="activeDatePicker === 'endDate'" class="custom-calendar">
              <div class="calendar-header">
                 <button type="button" class="cal-btn" @click.stop="$emit('prev-month')">‹</button>
                 <span>{{ monthNames[calendarDate.getMonth()] }} {{ calendarDate.getFullYear() }}</span>
                 <button type="button" class="cal-btn" @click.stop="$emit('next-month')">›</button>
              </div>
              <div class="calendar-grid">
                 <span v-for="d in weekDays" :key="d" class="cal-weekday">{{ d }}</span>
                 <span 
                    v-for="(day, idx) in calendarDays" 
                    :key="idx" 
                    :class="['cal-day', { 'empty': !day, 'selected': isSelectedDay('endDate', day), 'today': isToday(day) }]" 
                    @click.stop="$emit('select-date', day)"
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
</template>

<script>
export default {
  // Nome do componente Vue
  name: 'DataProgramRegistrationView',
  
  // Propriedades (Props): Todos os dados e funções que o Arquivo PAI passa para este Arquivo FILHO
  props: {
    // Objeto principal com os dados do programa (Nome, vagas, email, parceiros)
    formData: { type: Object, required: true },
    
    // Objeto com as datas em formato de visualização "DD/MM/AAAA"
    displayDates: { type: Object, required: true },
    
    // String indicando qual calendário está aberto no momento (ex: "publishDate")
    activeDatePicker: { type: String, default: null },
    
    // O Objeto Date nativo do JS usado para montar o mês e ano do cabeçalho do calendário
    calendarDate: { type: Date, required: true },
    
    // Arrays que contêm os nomes dos dias da semana (Dom, Seg...)
    weekDays: { type: Array, required: true },
    
    // Array que contém os nomes dos meses do ano (Janeiro, Fevereiro...)
    monthNames: { type: Array, required: true },
    
    // Matriz (Array) com os números do mês, incluindo os espaços vazios iniciais
    calendarDays: { type: Array, required: true },
    
    // Booleano indicando se o e-mail digitado passou no teste de validação
    isEmailInvalid: { type: Boolean, required: true },
    
    // Texto temporário digitado no input de adicionar parceiro
    newPartnerName: { type: String, required: true },
    
    // Função injetada pelo pai para verificar e colorir a data selecionada na matriz
    isSelectedDay: { type: Function, required: true },
    
    // Função injetada pelo pai para verificar e destacar o "Dia de hoje" na matriz
    isToday: { type: Function, required: true }
  }
}
</script>

<style scoped>
/* Como transformamos o CSS do Arquivo Pai em Global, 
   nenhuma regra visual (cores, bordas, grids) precisa ser duplicada aqui! 
   Este arquivo pega automaticamente os estilos da aplicação matriz.
*/
</style>