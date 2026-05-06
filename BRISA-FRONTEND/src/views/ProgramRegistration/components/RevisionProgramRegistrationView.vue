<template>
  <div class="step-container">
    
    <div class="step-header">
       <h2>Revisão Final</h2>
       <p>Revise todos os dados e publique o edital (Em desenvolvimento...)</p>
    </div>

    <div class="card-section" style="text-align: center; padding: 60px 20px;">
       <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px;">
         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
         <polyline points="14 2 14 8 20 8"></polyline>
         <line x1="16" y1="13" x2="8" y2="13"></line>
         <line x1="16" y1="17" x2="8" y2="17"></line>
         <polyline points="10 9 9 9 8 9"></polyline>
       </svg>
       <h3 style="font-size: 18px; color: #374151; margin: 0 0 8px 0; font-weight: 600;">Módulo em Construção</h3>
       <p style="color: #6b7280; font-size: 14px; margin: 0; max-width: 400px; margin: 0 auto;">
         A área de resumo em tela cheia e publicação final do edital será disponibilizada nas próximas atualizações do sistema.
       </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'RevisionProgramRegistrationView',
  props: {
    // Recebe o número da etapa atual do pai
    currentStep: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
/* O CSS Global do Pai fará todo o trabalho perfeitamente. Nenhuma classe extra necessária aqui! */
</style>