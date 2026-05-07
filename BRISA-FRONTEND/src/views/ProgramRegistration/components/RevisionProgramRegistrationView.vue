<template>
  <div class="step-container">
    
    <div class="step-header">
       <h2>Revisão Final</h2>
       <p>Revise todas as configurações antes de publicar o edital</p>
    </div>

    <div class="card-section validation-card">
       <div class="validation-content">
          <div class="validation-info">
             <div class="validation-header-row">
                <span class="icon-circle-outline"><i class="fa-solid fa-check-double"></i></span>
                <div>
                   <h3 class="validation-title">Validações Automáticas</h3>
                   <p class="validation-subtitle">6 de 8 verificações aprovadas</p>
                </div>
             </div>

             <ul class="check-list">
                <li class="check-item success"><i class="fa-solid fa-circle-check"></i> Dados do programa completos</li>
                <li class="check-item success"><i class="fa-solid fa-circle-check"></i> Estrutura de etapas configurada</li>
                <li class="check-item success"><i class="fa-solid fa-circle-check"></i> Formulário de inscrição definido</li>
                <li class="check-item warning"><i class="fa-solid fa-circle-exclamation"></i> Prova do nivelamento sem data definida</li>
                <li class="check-item success"><i class="fa-solid fa-circle-check"></i> Sistema de avaliação configurado</li>
                <li class="check-item warning"><i class="fa-solid fa-circle-exclamation"></i> Critério de certificação não especificado</li>
                <li class="check-item success"><i class="fa-solid fa-circle-check"></i> Cotas configuradas (100% distribuído)</li>
                <li class="check-item success"><i class="fa-solid fa-circle-check"></i> Benefícios e contratos definidos</li>
             </ul>
          </div>

          <div class="validation-progress-box">
             <div class="progress-circle">
                <span class="progress-value">75%</span>
                <span class="progress-label">Completo</span>
             </div>
          </div>
       </div>
    </div>

    <div class="card-section">
       <div class="section-title-row">
          <div class="section-title-review">
             <i class="fa-solid fa-file-invoice"></i>
             <h3>Dados do Programa</h3>
          </div>
          <button class="btn-edit-review" @click="$emit('go-to-step', 1)">
             <i class="fa-solid fa-pen"></i> Editar
          </button>
       </div>
       
       <div class="review-grid">
          <div class="review-item">
             <small>Nome do Programa</small>
             <span>{{ formData.programName || 'Não informado' }}</span>
          </div>
          <div class="review-item">
             <small>Turma/Edição</small>
             <span>{{ formData.batchName || 'Não informado' }}</span>
          </div>
          <div class="review-item">
             <small>Executora</small>
             <span>{{ formData.executor || 'Não informado' }}</span>
          </div>
          <div class="review-item">
             <small>Status</small>
             <span class="status-badge outline-badge">Rascunho</span>
          </div>
       </div>
    </div>

    <div class="card-section">
       <div class="section-title-review">
          <i class="fa-solid fa-calendar-days"></i>
          <h3>Timeline do Processo Seletivo</h3>
       </div>
       
       <div class="review-timeline">
          <div class="timeline-step">
             <div class="timeline-point">0</div>
             <div class="timeline-info">
                <strong>Período de Inscrições</strong>
                <p>{{ displayDates.startDate || 'Não definido' }} até {{ displayDates.endDate || 'Não definido' }}</p>
             </div>
          </div>
          <div v-for="stage in stageList" :key="stage.id" class="timeline-step">
             <div class="timeline-point">{{ stage.id + 1 }}</div>
             <div class="timeline-info">
                <strong>{{ stage.title }}</strong>
                <p>{{ stage.modality }} • {{ stage.duration }}</p>
             </div>
          </div>
       </div>
    </div>

    <div class="card-section">
       <div class="section-title-row">
          <div class="section-title-review">
             <i class="fa-solid fa-users-gear"></i>
             <h3>Etapas e Capacidade</h3>
          </div>
          <button class="btn-edit-review" @click="$emit('go-to-step', 2)">
             <i class="fa-solid fa-pen"></i> Editar
          </button>
       </div>
       
       <div class="review-table">
          <div v-for="stage in stageList" :key="stage.id" class="review-table-row">
             <div class="row-main">
                <span class="row-id">{{ stage.id + 1 }}</span>
                <div class="row-text">
                   <strong>{{ stage.title }}</strong>
                   <p>{{ stage.type }}</p>
                </div>
             </div>
             <div class="row-side">
                <span class="row-value">{{ stage.slots }}</span>
                <p>{{ stage.modality }}</p>
             </div>
          </div>
       </div>
    </div>

    <div class="card-section">
       <div class="section-title-review">
          <i class="fa-solid fa-percent"></i>
          <h3>Cotas e Elegibilidade</h3>
       </div>
       <div class="quota-review-list">
          <div class="quota-review-item"><span>Ampla concorrência</span><strong>{{ inscriptionForm.quotas.ampla }}%</strong></div>
          <div class="quota-review-item"><span>PCD / Neurodivergentes</span><strong>{{ inscriptionForm.quotas.pcd }}%</strong></div>
          <div class="quota-review-item"><span>Negros e pardos</span><strong>{{ inscriptionForm.quotas.negros }}%</strong></div>
          <div class="quota-review-item"><span>45+</span><strong>{{ inscriptionForm.quotas.age45 }}%</strong></div>
       </div>
    </div>

    <div class="card-section">
       <div class="section-title-review">
          <i class="fa-solid fa-gavel"></i>
          <h3>Regras de Classificação e Aprovação</h3>
       </div>
       <div class="rules-review-box">
          <div class="rule-review-item">
             <strong>Etapa Inscrição — Nivelamento</strong>
             <p>250 candidatos classificados por ordem de inscrição</p>
          </div>
          <div class="rule-review-item">
             <strong>Etapa Nivelamento — Imersão</strong>
             <p>50 aprovados com base em: Nota de prova (70%) + Cursos opcionais (30%)</p>
          </div>
          <div class="rule-review-item">
             <strong>Aprovação Final da Imersão</strong>
             <p>Avaliação Parcial (40%) + Avaliação Final (60%) com critérios múltiplos</p>
          </div>
       </div>
    </div>

    <div class="card-section">
       <div class="section-title-review">
          <i class="fa-solid fa-hand-holding-dollar"></i>
          <h3>Benefícios da Imersão</h3>
       </div>
       <div class="benefits-grid">
          <div class="benefit-item"><i class="fa-solid fa-circle-check"></i> Bolsa mensal durante 6 meses</div>
          <div class="benefit-item"><i class="fa-solid fa-circle-check"></i> Notebook em comodato</div>
          <div class="benefit-item"><i class="fa-solid fa-circle-check"></i> Certificado de conclusão</div>
       </div>
    </div>

    <div class="review-footer">
       <button class="btn-footer-back" @click="$emit('go-to-step', 5)">
          <i class="fa-solid fa-arrow-left"></i> Voltar e Editar
       </button>
       <div class="footer-right">
          <button class="btn-footer-back" @click="$emit('save-draft')">
             <i class="fa-solid fa-floppy-disk"></i> Salvar Rascunho
          </button>
          <button class="btn-publish">
             <i class="fa-solid fa-paper-plane"></i> Publicar Edital
          </button>
       </div>
    </div>

  </div>
</template>

<script>
export default {
  // Componente Filho Limpo: Ele só recebe as Props do Pai e NÃO importa arquivos externos.
  name: 'RevisionProgramRegistrationView',
  props: {
    formData: { type: Object, required: true },
    stageList: { type: Array, required: true },
    inscriptionForm: { type: Object, required: true },
    nivelamentoForm: { type: Object, required: true },
    displayDates: { type: Object, required: true },
    currentStep: { type: Number, required: true }
  }
}
</script>

<style scoped>
/* ESTILOS ESPECÍFICOS DA REVISÃO */

.section-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title-review {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #1e1b4b;
}

.section-title-review i {
  color: #0d9488;
  font-size: 18px;
}

.section-title-review h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.btn-edit-review {
  background: transparent;
  border: 1px solid #d1d5db;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  color: #4b5563;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Card de Validação */
.validation-card {
  background-color: #fffbeb;
  border: 1px solid #fde68a;
}

.validation-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.validation-header-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.icon-circle-outline {
  width: 40px;
  height: 40px;
  border: 2px solid #f59e0b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f59e0b;
}

.validation-title { color: #92400e; font-size: 18px; margin: 0; }
.validation-subtitle { color: #b45309; font-size: 13px; margin: 0; }

.check-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 40px;
}

.check-item {
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.check-item.success { color: #065f46; }
.check-item.success i { color: #10b981; }
.check-item.warning { color: #92400e; }
.check-item.warning i { color: #f59e0b; }

.validation-progress-box {
  padding-left: 40px;
  border-left: 1px solid #fde68a;
  text-align: center;
}

.progress-circle {
  width: 100px;
  height: 100px;
  border: 8px solid #fde68a;
  border-top-color: #f59e0b;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.progress-value { font-size: 24px; font-weight: 700; color: #1e1b4b; }
.progress-label { font-size: 10px; color: #6b7280; text-transform: uppercase; }

/* Grid de Dados */
.review-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.review-item small { display: block; color: #6b7280; font-size: 11px; margin-bottom: 4px; }
.review-item span { color: #1a233a; font-weight: 500; font-size: 14px; }

/* Timeline */
.review-timeline {
  margin-top: 10px;
}

.timeline-step {
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
  position: relative;
}

.timeline-step:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 16px;
  top: 32px;
  bottom: 0;
  width: 2px;
  background-color: #f3f4f6;
}

.timeline-point {
  width: 32px;
  height: 32px;
  background-color: #0d9488;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  z-index: 1;
}

.timeline-info strong { display: block; font-size: 14px; color: #1a233a; }
.timeline-info p { font-size: 13px; color: #6b7280; margin: 2px 0 0; }

/* Tabelas e Cotas */
.review-table-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
}

.row-main { display: flex; align-items: center; gap: 16px; }
.row-id { color: #0d9488; font-weight: 600; }
.row-text strong { font-size: 14px; color: #1a233a; }
.row-text p { font-size: 12px; color: #9ca3af; margin: 0; }
.row-side { text-align: right; }
.row-value { font-weight: 600; color: #0d9488; font-size: 14px; }
.row-side p { font-size: 11px; color: #9ca3af; margin: 0; }

.quota-review-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
}

.quota-review-item { text-align: center; }
.quota-review-item span { display: block; font-size: 11px; color: #6b7280; margin-bottom: 4px; }
.quota-review-item strong { font-size: 16px; color: #1e1b4b; }

/* Regras e Benefícios */
.rules-review-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rule-review-item {
  padding: 12px 16px;
  background-color: #f0fdfa;
  border-radius: 8px;
}

.rule-review-item strong { font-size: 13px; color: #0d9488; }
.rule-review-item p { font-size: 13px; color: #374151; margin: 4px 0 0; }

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #1a233a;
}

.benefit-item i { color: #10b981; }

/* Footer */
.review-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.footer-right {
  display: flex;
  gap: 12px;
}

.btn-publish {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>