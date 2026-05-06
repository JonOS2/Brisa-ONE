<template>
  <div class="step-container">
    
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
         @dragstart="$emit('dragstart', index, $event)"
         @dragover.prevent="$emit('dragover', $event)"
         @dragenter.prevent="$emit('dragenter', index)"
         @drop="$emit('drop', index)"
         @dragend="$emit('dragend')"
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
                <button class="btn-stage-action" @click="$emit('open-edit-stage-modal', stage)">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                   </svg>
                   Editar
                </button>

               <button class="btn-stage-action" @click="$emit('duplicate-stage', stage)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Duplicar
               </button>

                <button class="btn-stage-action btn-danger" @click="$emit('confirm-delete-stage', stage)">
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
       <button class="btn-action-outline" @click="$emit('open-new-stage-modal')">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
         </svg>
         Adicionar Nova Etapa
       </button>
       <button class="btn-action-outline" @click="$emit('restore-default-stages')">
         <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path>
         </svg>
         Restaurar Estrutura Padrão
       </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EstructureProgramRegistrationView',
  // O componente "filho" recebe do "pai" a lista de etapas e o estado do arrasto
  props: {
    stageList: {
      type: Array,
      required: true
    },
    draggedStageIndex: {
      type: Number,
      default: null
    },
    draggedOverStageIndex: {
      type: Number,
      default: null
    }
  }
}
</script>

<style scoped>
/* O CSS Global do Pai fará todo o trabalho perfeitamente. Nenhuma classe extra necessária aqui! */
</style>