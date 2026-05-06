<template>
  <div class="step-container">
    
    <div class="step-header">
       <h2>Etapa 2 — Imersão</h2>
       <p>Configure os projetos práticos e benefícios (Em desenvolvimento...)</p>
    </div>

    <div class="card-section" style="text-align: center; padding: 60px 20px;">
       <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px;">
         <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
         <path d="M2 17l10 5 10-5"></path>
         <path d="M2 12l10 5 10-5"></path>
       </svg>
       <h3 style="font-size: 18px; color: #374151; margin: 0 0 8px 0; font-weight: 600;">Módulo em Construção</h3>
       <p style="color: #6b7280; font-size: 14px; margin: 0; max-width: 400px; margin: 0 auto;">
         A área de configuração de imersão e desenvolvimento de projetos práticos será disponibilizada nas próximas atualizações do sistema.
       </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ThirdStageProgramRegistrationView',
  props: {
    // Recebe o número da etapa atual do pai, caso queira usar na interface
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