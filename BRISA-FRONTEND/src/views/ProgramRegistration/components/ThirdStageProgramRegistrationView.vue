<template>
  <div class="step-container">
    
    <div class="step-header">
       <h2>Etapa 2 — Imersão</h2>
       <p>Configure projetos, avaliações, presença e benefícios</p>
    </div>

    <div class="tabs-container">
       <div class="tab-pill" :class="{ active: activeTab === 'visao-geral' }" @click="activeTab = 'visao-geral'">Visão Geral</div>
       <div class="tab-pill" :class="{ active: activeTab === 'projetos' }" @click="activeTab = 'projetos'">Projetos e Grupos</div>
       <div class="tab-pill" :class="{ active: activeTab === 'presenca' }" @click="activeTab = 'presenca'">Presença</div>
       <div class="tab-pill" :class="{ active: activeTab === 'avaliacoes' }" @click="activeTab = 'avaliacoes'">Avaliações</div>
       <div class="tab-pill" :class="{ active: activeTab === 'beneficios' }" @click="activeTab = 'beneficios'">Benefícios</div>
    </div>

    <div v-if="activeTab === 'visao-geral'" class="card-section">
       <div class="section-title">
          <h3>Configuração Geral da Imersão</h3>
          <p>Dados principais da etapa de imersão</p>
       </div>
       <div class="form-row two-cols">
         <div class="form-group">
           <label>Nome da Etapa</label>
           <input v-model="imersaoForm.nome" type="text" class="form-input"/>
         </div>
         <div class="form-group">
           <label>Modalidade</label>
           <select v-model="imersaoForm.modalidade" class="form-input form-select">
             <option value="Híbrida">Híbrida</option>
             <option value="Presencial">Presencial</option>
             <option value="Online">Online</option>
           </select>
         </div>
       </div>
       <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
         <div class="form-group">
           <label>Carga Horária Total</label>
           <input v-model="imersaoForm.cargaHoraria" type="number" class="form-input"/>
         </div>
         <div class="form-group">
           <label>Duração (meses)</label>
           <input v-model="imersaoForm.duracaoMeses" type="number" class="form-input"/>
         </div>
         <div class="form-group">
           <label>Média de Horas Semanais</label>
           <input v-model="imersaoForm.mediaHoras" type="number" class="form-input"/>
         </div>
       </div>
       <div class="form-row two-cols">
         <div class="form-group relative">
           <label>Data de Início</label>
           <input v-model="imersaoForm.dataInicio" type="text" placeholder="dd/mm/aaaa" class="form-input"/>
         </div>
         <div class="form-group relative">
           <label>Data de Fim</label>
           <input v-model="imersaoForm.dataFim" type="text" placeholder="dd/mm/aaaa" class="form-input"/>
         </div>
       </div>
    </div>

    <div v-if="activeTab === 'projetos'" class="card-section">
       <div class="section-title">
          <h3>Projetos e Formação de Grupos</h3>
          <p>Configure a estrutura de projetos e equipes</p>
       </div>
       <div class="list-item-row toggle-row-simple" :style="imersaoForm.hasProjetos ? 'border-bottom: none; padding-bottom: 8px;' : ''">
         <span class="list-item-title">Projetos serão definidos nesta etapa?</span>
         <label class="toggle-switch"><input type="checkbox" v-model="imersaoForm.hasProjetos" class="toggle-input"><span class="toggle-slider"></span></label>
       </div>
       <div v-if="imersaoForm.hasProjetos" class="nested-block">
          <div class="list-item-row toggle-row-simple" style="padding-bottom: 16px;">
            <span class="list-item-title">Grupos serão montados pelo sistema/coordenação?</span>
            <label class="toggle-switch"><input type="checkbox" v-model="imersaoForm.hasGrupos" class="toggle-input"><span class="toggle-slider"></span></label>
          </div>
          <div class="form-row two-cols">
             <div class="form-group"><label>Tamanho Mínimo do Grupo</label><input v-model="imersaoForm.minGroup" type="number" class="form-input"/></div>
             <div class="form-group"><label>Tamanho Máximo do Grupo</label><input v-model="imersaoForm.maxGroup" type="number" class="form-input"/></div>
          </div>
          <div class="form-group">
            <label>Professor Orientador</label>
            <select v-model="imersaoForm.orientador" class="form-input form-select"><option value="vinculado">Professor Vinculado</option></select>
          </div>
       </div>
    </div>

    <div v-if="activeTab === 'presenca'" class="card-section">
       <div class="section-title">
          <h3>Regras de Frequência e Presença</h3>
          <p>Configure as políticas de presença e justificativas</p>
       </div>

       <div class="warning-alert-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span>As regras de presença são aplicadas automaticamente pelo sistema e geram notificações aos alunos e coordenação.</span>
       </div>

       <div class="list-item-row toggle-row-simple">
          <span class="list-item-title">Encontros Presenciais Obrigatórios</span>
          <label class="toggle-switch"><input type="checkbox" v-model="imersaoForm.presenca.encontrosObrigatorios" class="toggle-input"><span class="toggle-slider"></span></label>
       </div>

       <div class="list-item-row toggle-row-simple" :style="imersaoForm.presenca.frequenciaSemanal ? 'border-bottom: none; padding-bottom: 0;' : ''">
          <span class="list-item-title">Frequência Semanal com Professor Orientador</span>
          <label class="toggle-switch"><input type="checkbox" v-model="imersaoForm.presenca.frequenciaSemanal" class="toggle-input"><span class="toggle-slider"></span></label>
       </div>

       <div v-if="imersaoForm.presenca.frequenciaSemanal" class="nested-block" style="padding-top: 16px;">
          <div class="form-row two-cols">
             <div class="form-group"><label>Frequência Mínima (%)</label><input v-model="imersaoForm.presenca.minFrequencia" type="number" class="form-input"/></div>
             <div class="form-group">
                <label>Dia/horário padrão</label>
                <select v-model="imersaoForm.presenca.diaHorarioPadrao" class="form-input form-select"><option value="">Selecione</option></select>
             </div>
          </div>
       </div>

       <div class="list-item-row toggle-row-simple" style="margin-top: 16px;">
          <span class="list-item-title">Contabilização de Faltas</span>
          <label class="toggle-switch"><input type="checkbox" v-model="imersaoForm.presenca.contabilizarFaltas" class="toggle-input"><span class="toggle-slider"></span></label>
       </div>

       <div class="rules-container" style="margin-top: 24px;">
          <h4 class="sub-section-label">Regras de Advertência e Exclusão</h4>
          <div class="rule-card">
             <div class="rule-text"><strong>2ª falta injustificada — Advertência</strong><p>Sistema notifica automaticamente</p></div>
             <label class="toggle-switch"><input type="checkbox" checked class="toggle-input"><span class="toggle-slider"></span></label>
          </div>
          <div class="rule-card">
             <div class="rule-text"><strong>3ª falta injustificada — Exclusão</strong><p>Exclusão automática do programa</p></div>
             <label class="toggle-switch"><input type="checkbox" checked class="toggle-input"><span class="toggle-slider"></span></label>
          </div>
          <div class="rule-card">
             <div class="rule-text"><strong>6ª falta total — Exclusão</strong><p>Independente de justificativa</p></div>
             <label class="toggle-switch"><input type="checkbox" checked class="toggle-input"><span class="toggle-slider"></span></label>
          </div>
       </div>

       <div class="form-group" style="margin-top: 24px;">
          <label>Análise de Justificativas</label>
          <select class="form-input form-select"><option>Responsável pela Análise</option></select>
       </div>
    </div>

    <div v-if="activeTab === 'avaliacoes'" class="card-section">
       <div class="section-title">
          <h3>Sistema de Avaliações</h3>
          <p>Configure as avaliações parcial e final com critérios múltiplos</p>
       </div>

       <div class="grading-group-header">
          <span>Avaliação Parcial</span> <span class="weight-label">Peso: 40%</span>
       </div>
       <div class="criteria-list">
          <div class="criteria-item"><span>1. Nota do Grupo do Projeto</span> <label class="toggle-switch"><input type="checkbox" checked class="toggle-input"><span class="toggle-slider"></span></label></div>
          <div class="criteria-item sub"><span>Avaliação pela banca</span> <label class="toggle-switch"><input type="checkbox" checked class="toggle-input"><span class="toggle-slider"></span></label></div>
          <div class="criteria-item sub"><span>Apresentação do projeto</span> <label class="toggle-switch"><input type="checkbox" checked class="toggle-input"><span class="toggle-slider"></span></label></div>
          <div class="criteria-item"><span>2. Nota de Participação</span> <label class="toggle-switch"><input type="checkbox" checked class="toggle-input"><span class="toggle-slider"></span></label></div>
          <div class="criteria-item"><span>3. Nota de Comportamento e Desempenho</span> <label class="toggle-switch"><input type="checkbox" checked class="toggle-input"><span class="toggle-slider"></span></label></div>
       </div>

       <div class="grading-group-header" style="margin-top: 32px;">
          <span>Avaliação Final</span> <span class="weight-label">Peso: 60%</span>
       </div>
       <div class="criteria-list">
          <div class="criteria-item"><span>1. Nota do Grupo do Projeto</span> <label class="toggle-switch"><input type="checkbox" checked class="toggle-input"><span class="toggle-slider"></span></label></div>
          <div class="criteria-item sub"><span>Apresentação final</span> <label class="toggle-switch"><input type="checkbox" checked class="toggle-input"><span class="toggle-slider"></span></label></div>
          <div class="criteria-item"><span>2. Nota de Participação</span> <label class="toggle-switch"><input type="checkbox" checked class="toggle-input"><span class="toggle-slider"></span></label></div>
       </div>

       <div class="formula-box" style="margin-top: 32px; background-color: #0f172a;">
          <span class="formula-label" style="color: #94a3b8;">Fórmula de Cálculo Final</span>
          <div class="formula-text" style="color: white; font-family: monospace;">
             Nota Final = (Avaliação Parcial x 40%) + (Avaliação Final x 60%)
          </div>
       </div>

       <div class="form-group" style="margin-top: 24px;">
          <div style="display: flex; justify-content: space-between;"><label>Peso da Avaliação Parcial</label><span style="color: #0d9488; font-weight: 600;">40%</span></div>
          <input type="range" class="form-range" v-model="imersaoForm.avaliacoes.pesoParcial" min="0" max="100">
       </div>
       <div class="form-group">
          <div style="display: flex; justify-content: space-between;"><label>Peso da Avaliação Final</label><span style="color: #0d9488; font-weight: 600;">60%</span></div>
          <input type="range" class="form-range" v-model="imersaoForm.avaliacoes.pesoFinal" min="0" max="100">
       </div>

       <div class="form-group" style="margin-top: 24px;">
          <label>Regra de Aprovação Final</label>
          <select class="form-input form-select"><option>Baseado em % da maior nota</option></select>
          <input type="number" class="form-input" style="margin-top: 8px; width: 80px;" v-model="imersaoForm.avaliacoes.minScore">
       </div>
    </div>

    <div v-if="activeTab === 'beneficios'" class="card-section">
       <div class="section-title">
          <h3>Bolsa e Auxílios</h3>
          <p>Configure os benefícios financeiros do programa</p>
       </div>

       <div class="list-item-row toggle-row-simple" :style="imersaoForm.beneficios.hasBolsa ? 'border-bottom: none;' : ''">
          <span class="list-item-title">Programa oferece bolsa?</span>
          <label class="toggle-switch"><input type="checkbox" v-model="imersaoForm.beneficios.hasBolsa" class="toggle-input"><span class="toggle-slider"></span></label>
       </div>

       <div v-if="imersaoForm.beneficios.hasBolsa" class="nested-block">
          <div class="form-row two-cols">
             <div class="form-group"><label>Valor da Bolsa (R$)</label><input v-model="imersaoForm.beneficios.valorBolsa" type="text" class="form-input"/></div>
             <div class="form-group"><label>Quantidade de Meses</label><input v-model="imersaoForm.beneficios.mesesBolsa" type="number" class="form-input"/></div>
          </div>
          <div class="list-item-row toggle-row-simple"><span class="list-item-title">Exigir conta bancária em nome do aluno</span><label class="toggle-switch"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label></div>
          <div class="list-item-row toggle-row-simple" style="border: none;"><span class="list-item-title">Exigir assinatura digital de recibo</span><label class="toggle-switch"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label></div>
       </div>

       <div class="section-title" style="margin-top: 32px;">
          <h3>Equipamentos em Comodato</h3>
          <p>Empréstimo de equipamentos aos participantes</p>
       </div>

       <div class="list-item-row toggle-row-simple" :style="imersaoForm.beneficios.hasNotebook ? 'border-bottom: none;' : ''">
          <span class="list-item-title">Oferece notebook em comodato?</span>
          <label class="toggle-switch"><input type="checkbox" v-model="imersaoForm.beneficios.hasNotebook" class="toggle-input"><span class="toggle-slider"></span></label>
       </div>

       <div v-if="imersaoForm.beneficios.hasNotebook" class="nested-block">
          <div class="form-group"><label>Modelo/Especificação do Equipamento</label><input type="text" class="form-input" placeholder="Ex: Notebook Intel i5, 8GB RAM..."/></div>
          <div class="form-group"><label>Prazo de Devolução</label><select class="form-input form-select"><option>Selecione</option></select></div>
       </div>

       <div class="section-title" style="margin-top: 32px;">
          <h3>Contratos e Documentação</h3>
          <p>Requisitos legais e documentais</p>
       </div>
       <div class="list-item-row toggle-row-simple" style="border-bottom: 1px solid #f3f4f6;">
          <span class="list-item-title">Exigir assinatura de contrato?</span>
          <label class="toggle-switch"><input type="checkbox" checked class="toggle-input"><span class="toggle-slider"></span></label>
       </div>
       <div class="form-group" style="margin-top: 16px;"><label>Prazo para Assinatura dos Contratos (dias)</label><input type="number" class="form-input" value="5"/></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ThirdStageProgramRegistrationView',
  props: {
    currentStep: { type: Number, required: true }
  },
  data() {
    return {
      activeTab: 'visao-geral',
      imersaoForm: {
        nome: 'Imersão', modalidade: 'Híbrida', cargaHoraria: 960, duracaoMeses: 6, mediaHoras: 40,
        dataInicio: '', dataFim: '', local: '', integInicio: '', integFim: '',
        hasProjetos: true, hasGrupos: true, minGroup: 3, maxGroup: 5, orientador: 'vinculado',
        presenca: {
          encontrosObrigatorios: true, frequenciaSemanal: true, minFrequencia: 75, diaHorarioPadrao: '', contabilizarFaltas: true
        },
        avaliacoes: {
          pesoParcial: 40, pesoFinal: 60, minScore: 70
        },
        beneficios: {
          hasBolsa: true, valorBolsa: '1.500', mesesBolsa: 6, hasNotebook: true
        }
      }
    };
  }
}
</script>

<style scoped>
/* Tabs / Pílulas */
.tabs-container {
  display: flex;
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
  margin-bottom: 24px;
}
.tab-pill {
  flex: 1;
  text-align: center;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}
.tab-pill.active {
  background-color: white;
  color: #1a233a;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Alerta Amarelo Presença */
.warning-alert-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #fffbeb;
  border: 1px solid #fef3c7;
  color: #92400e;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 20px;
}

/* Regras de Falta */
.rule-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 8px;
}
.rule-text strong { display: block; font-size: 13px; color: #1a233a; }
.rule-text p { font-size: 12px; color: #6b7280; margin: 0; }

/* Avaliações */
.grading-group-header {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 14px;
  color: #1a233a;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f3f4f6;
}
.weight-label { color: #0d9488; }
.criteria-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 13px;
  color: #374151;
}
.criteria-item.sub { padding-left: 24px; color: #6b7280; font-size: 12px; }

/* Blocos Aninhados */
.nested-block {
  margin-top: 8px;
  padding-left: 20px;
  border-left: 2px solid #a7f3d0;
}

/* Auxiliares */
.sub-section-label { font-size: 13px; font-weight: 600; color: #4b5563; margin-bottom: 12px; }
</style>