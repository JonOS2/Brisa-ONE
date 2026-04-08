# BRISA — Sistema de Gestão Acadêmica
## Roadmap Analytics & Melhorias

**Documento base**: `requirements.pdf` (26 de março de 2026)  
**Status**: v1.0 — Roadmap Detalhado  
**Objetivo**: Analytics avançados e relatórios operacionais que transformam o BRISA de um sistema de registro para uma plataforma de inteligência acadêmica.

---

## 🎯 Visão Geral

### Três Fases de Implementação

| Fase | Foco | Duração | Impacto |
|------|------|---------|--------|
| **Fase 1** | Gráficos imediatos com dados existentes | 8–16 dias | Alto (6 dashboards/relatórios iniciais) |
| **Fase 2** | Correção e expansão do backend | 16–22 horas | Crítico (habilita Fase 3) |
| **Fase 3** | Relatórios avançados e análise financeira | 4–8 semanas | Transformacional

### Arquitetura

```
Frontend (Vue 3)
  ├─ DashboardView (hub agregando analytics)
  ├─ CourseProgressionChart (funil)
  ├─ EnrollmentTimelineChart (linha temporal)
  ├─ CareerProgressionChart (egressos)
  ├─ ExamQuestionsChart (top 15)
  ├─ AccessHeatmapChart (horários)
  └─ SystemActivityChart (logs)

Backend (Spring Boot)
  ├─ Controllers: /api/analytics/*
  ├─ Services: AnalyticsService, ReportService
  ├─ Repositories: CourseProgressionRepo, EnrollmentRepo, ...
  ├─ DTOs: CourseProgressionDTO, EnrollmentChartDTO, ...
  └─ Queries: SQL otimizadas em @Query(nativeQuery=true)

Database
  ├─ Novas colunas: PeopleModel.cota, EnrollmentModel.frequencia, ...
  ├─ Novas tabelas: class_courses, city_points_config, cota_config
  └─ Migrations: V1.x__Analytics_Setup.sql
```

---

## 📋 FASE 1 — Imediato (8–16 dias)

Relatórios que usam dados **já existentes** no backend. Foco em **validação rápida** e **visibilidade**.

### 1.1 | Funil de Cursos por Turma

**Objetivo**: Visualizar quantos alunos estão em cada status (Não iniciado → Em andamento → Concluído) para cada turma.

**Status de dados**: ✅ **Possível hoje** — tabelas `course_progressions`, `enrollments`, `classes` existem.

**Componentes a criar**:
- **Backend**
  - Endpoint: `GET /api/analytics/course-progression-funnel?classId={id}`
  - DTO: `CourseProgressionFunnelDTO`
  - Query exemplo (já recomendada no PDF):
    ```sql
    SELECT c.code AS turma, cp.status, COUNT(*) AS total
    FROM course_progressions cp
    JOIN enrollments e ON cp.people_id = e.people_id
    JOIN classes c ON e.class_id = c.id
    WHERE (classId IS NULL OR c.id = ?1)
    GROUP BY c.code, cp.status
    ORDER BY c.code, cp.status;
    ```
  - Repositório: `CourseProgressionRepository`
  - Service: `AnalyticsService.getCourseProgressionFunnel()`

- **Frontend**
  - Componente: `src/components/analytics/CourseProgressionFunnel.vue` (Chart.js — barras empilhadas)
  - Rota em `DashboardView`: `/dashboard` → panel lateral seletor de turmas
  - Integração em `src/services/analyticsService.js`

**Estimativa**: 2–3 dias (backend query + endpoint + DTO + frontend chart)

**Dependências**:
- Chart.js ou similar já disponível no projeto
- Dados de `course_progressions` preenchidos no banco

---

### 1.2 | Conclusões ao Longo do Tempo (Linha Temporal)

**Objetivo**: Gráfico de linha mostrando quantos cursos foram concluídos por dia/semana/mês — identifica picos e tendências.

**Status de dados**: ✅ **Possível hoje** — `CourseProgressionModel.date` e `.status` existem.

**Componentes a criar**:
- **Backend**
  - Endpoint: `GET /api/analytics/course-completions?granularity={day|week|month}`
  - DTO: `CourseCompletionTimelineDTO`
  - Query exemplo (base do PDF):
    ```sql
    SELECT DATE_TRUNC('week', date) AS periodo, COUNT(*) AS conclusoes
    FROM course_progressions
    WHERE status = 'CONCLUIDO'
    GROUP BY periodo
    ORDER BY periodo;
    ```
  - Service: `AnalyticsService.getCourseCompletionTimeline()`

- **Frontend**
  - Componente: `src/components/analytics/CourseCompletionTimeline.vue` (Chart.js — line)
  - Selector: dia/semana/mês (enum)
  - Integração em `analyticsService.js`

**Estimativa**: 1–2 dias

**Dependências**: Nenhuma além de dados preenchidos.

---

### 1.3 | Evolução dos Egressos por Cargo

**Objetivo**: Linha dual mostrando empregados vs desempregados ao longo do tempo; barras de cargos mais frequentes.

**Status de dados**: ✅ **Possível hoje** — `CareerProgressionModel` tem `surveyDate`, `status`, `position`, `company`, `city`.

**Componentes a criar**:
- **Backend**
  - Endpoints:
    - `GET /api/analytics/career-progression/employment-timeline` → série temporal empregados/desempregados
    - `GET /api/analytics/career-progression/positions` → ranking de cargos
    - `GET /api/analytics/career-progression/employment-rate?classId={id}` → taxa % por turma
  - DTOs: `CareerProgressionTimelineDTO`, `PositionStatsDTO`
  - Queries:
    ```sql
    -- Linha dual
    SELECT DATE_TRUNC('month', cp.survey_date) AS mes,
           CASE WHEN cp.status = 'EMPREGADO' THEN 'empregado' ELSE 'desempregado' END AS tipo,
           COUNT(*) AS total
    FROM career_progressions cp
    GROUP BY mes, tipo
    ORDER BY mes, tipo;
    
    -- Cargos
    SELECT cp.position, COUNT(*) AS total
    FROM career_progressions cp
    WHERE cp.status = 'EMPREGADO'
    GROUP BY cp.position
    ORDER BY total DESC;
    
    -- Taxa por turma
    SELECT c.code AS turma,
           ROUND(100.0 * SUM(CASE WHEN cp.status = 'EMPREGADO' THEN 1 ELSE 0 END) / COUNT(*), 1) AS pct
    FROM career_progressions cp
    JOIN enrollments e ON cp.people_id = e.people_id
    JOIN classes c ON e.class_id = c.id
    GROUP BY c.code
    ORDER BY pct DESC;
    ```
  - Service: `AnalyticsService.getCareerProgression*()`

- **Frontend**
  - Componentes:
    - `CareerProgressionTimeline.vue` (Chart.js — linha dual)
    - `CareerPositionsChart.vue` (Chart.js — barras horizontais)
    - `EmploymentRateByClass.vue` (tabela + KPI)
  - Integração em `DashboardView` e `analyticsService`

**Estimativa**: 2–3 dias

**Dependências**: Dados de career_progressions preenchidos.

---

### 1.4 | Top 15 Questões (Acertos/Erros)

**Objetivo**: Quais 15 questões da prova têm maior taxa de erro? Ajuda identificar conteúdo mal compreendido.

**Status de dados**: ✅ **Possível hoje** — `ExamAnswerModel`, `ExamQuestionModel`, `KnowledgeAreaModel` existem.

**Componentes a criar**:
- **Backend**
  - Endpoint: `GET /api/analytics/exam-questions/top-errors?limit=15`
  - DTO: `ExamQuestionStatsDTO`
  - Query exemplo (base do PDF):
    ```sql
    SELECT eq.question_number, ka.name AS area_conhecimento,
           ROUND(100.0 * SUM(CASE WHEN ea.is_correct THEN 0 ELSE 1 END) / COUNT(*), 1) AS pct_erro,
           COUNT(*) AS total_tentativas
    FROM exam_answers ea
    JOIN exam_questions eq ON ea.exam_question_id = eq.id
    JOIN knowledge_areas ka ON eq.subject_id = ka.id
    GROUP BY eq.question_number, ka.name
    ORDER BY pct_erro DESC
    LIMIT 15;
    ```
  - Servico: `AnalyticsService.getTopErrorQuestions()`

- **Frontend**
  - Componente: `ExamQuestionsChart.vue` (Chart.js — barras horizontais, eixo X = % erro)
  - Cores: escala de vermelho (>80% erro) a verde (<20%)
  - Integração em `DashboardView`

**Estimativa**: 2–3 dias

**Dependências**: Dados de exam_answers e exam_questions preenchidos.

---

### 1.5 | Heatmap de Horários de Acesso

**Objetivo**: Matriz dia_semana × hora mostrando quando os alunos mais acessam a plataforma — ajuda programar notificações.

**Status de dados**: ✅ **Possível hoje** — `CourseProgressionModel.lastAccess` existe.

**Componentes a criar**:
- **Backend**
  - Endpoint: `GET /api/analytics/access-heatmap`
  - Query exemplo (base do PDF):
    ```sql
    SELECT EXTRACT(DOW FROM cp.last_access) AS dia_semana,
           EXTRACT(HOUR FROM cp.last_access) AS hora,
           COUNT(*) AS acessos
    FROM course_progressions cp
    WHERE cp.last_access IS NOT NULL
    GROUP BY dia_semana, hora
    ORDER BY dia_semana, hora;
    ```
  - DTO: `AccessHeatmapDTO`
  - Serviço: `AnalyticsService.getAccessHeatmap()`

- **Frontend**
  - Componente: `AccessHeatmapChart.vue` (ChartJS heatmap, tabela colorida com gradiente)
  - Rótulos: dias (segunda a domingo), horas (00:00 a 23:00)
  - Integração em `DashboardView`

**Estimativa**: 1–2 dias

**Dependências**: Dados de last_access preenchidos.

---

### 1.6 | Dashboard de Atividade do Sistema (Logs)

**Objetivo**: Volume de ações por tipo (`CREATE`, `UPDATE`, `DELETE`, etc); picos de atividade diária; usuários mais ativos.

**Status de dados**: ✅ **Possível hoje** — `SystemLogModel` existe (zero backend necessário segundo PDF).

**Componentes a criar**:
- **Backend**
  - Endpoints:
    - `GET /api/analytics/system-logs/volume-by-action` → conta por LogAction
    - `GET /api/analytics/system-logs/daily-activity` → série temporal
    - `GET /api/analytics/system-logs/top-users` → ranking de usuários
  - Queries:
    ```sql
    -- Volume por ação
    SELECT sl.action, COUNT(*) AS total
    FROM system_logs sl
    GROUP BY sl.action
    ORDER BY total DESC;
    
    -- Atividade diária
    SELECT DATE_TRUNC('day', sl.created_at) AS dia,
           COUNT(*) AS operacoes
    FROM system_logs sl
    GROUP BY dia
    ORDER BY dia;
    
    -- Top usuários
    SELECT u.email, COUNT(*) AS operacoes
    FROM system_logs sl
    JOIN users u ON sl.user_id = u.id
    GROUP BY u.email
    ORDER BY operacoes DESC
    LIMIT 20;
    ```
  - DTOs: `SystemLogStatsDTO`, `DailyActivityDTO`, `TopUserDTO`
  - Serviço: `AnalyticsService.getSystemLog*()`

- **Frontend**
  - Componentes:
    - `SystemActivityChart.vue` (Chart.js — barras por ação)
    - `DailyActivityTimeline.vue` (linhas de pico/vale)
    - `TopUsersTable.vue` (tabela com badge de role)
  - Integração em `DashboardView`

**Estimativa**: 1 dia (já existe model, só precisa queries)

**Dependências**: SystemLogModel preenchido.

---

## 🔧 FASE 2 — Backend (16–22 horas)

**Objetivo**: Adicionar campos e tabelas críticas que **bloqueiam** Fase 3 e habilita relatórios mais sofisticados da Fase 1.

### 2.1 | Adicionar Campos de Cota em PeopleModel

**Por quê**: Desbloqueia filtros por cota em relatórios de prova e seleção.

**Mudanças**:
- `PeopleModel`:
  ```java
  @Enumerated(EnumType.STRING)
  @Column(name = "cota", nullable = false, columnDefinition = "VARCHAR(50) DEFAULT 'AMPLA_CONCORRENCIA'")
  private CotaType cota; // ENUM: AMPLA_CONCORRENCIA, PCD, RACA_COR, ...
  
  @Column(name = "tipo_cota", length = 100)
  private String tipoCota; // Detalhamento se PCD → MOTORA, AUDITIVA, VISUAL, etc.
  ```
- Nova `Enum CotaType`
- Migração: `V1.5__Add_Cota_To_People.sql`

**Estimativa**: 3–4 horas (migration, entity, testes)

---

### 2.2 | Adicionar Campo de Frequência em EnrollmentModel

**Por quê**: Necessário para fórmula de Relação de Aprovados (nota + frequência + cursos).

**Mudanças**:
- `EnrollmentModel`:
  ```java
  @Column(name = "frequencia", nullable = true)
  private Double frequencia; // 0.0 a 1.0 (percentual)
  ```
- Migração: `V1.6__Add_Frequencia_To_Enrollment.sql`

**Estimativa**: 2–3 horas

---

### 2.3 | Adicionar Campos Financeiros em ProgramModel

**Por quê**: Análise de custo por aluno, KPI para Softex/MCTI.

**Mudanças**:
- `ProgramModel`:
  ```java
  @Column(name = "valor_programa", precision = 19, scale = 2)
  private BigDecimal valorPrograma; // Contrato principal
  
  @Column(name = "entidade_fomento", length = 255)
  private String entidadeFomento; // Ex: Softex, MCTI, ...
  
  @ManyToOne
  @JoinColumn(name = "coordenador_geral_id")
  private User coordenadorGeral; // Novo coordenador
  ```
- Migração: `V1.7__Add_Financial_Fields_To_Program.sql`

**Estimativa**: 2–3 horas

---

### 2.4 | Criar Tabela class_courses

**Por quê**: Relaciona turmas com cursos previstos e marca obrigatoriedade — possibilita "% de conclusão por aluno".

**Schema**:
```sql
CREATE TABLE class_courses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  class_id BIGINT NOT NULL,
  course_id BIGINT NOT NULL,
  obrigatorio BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_class_course (class_id, course_id),
  FOREIGN KEY (class_id) REFERENCES classes(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
```

**Entity JPA**:
```java
@Entity
@Table(name = "class_courses")
public class ClassCourse {
  @Id @GeneratedValue
  private Long id;
  
  @ManyToOne @JoinColumn(name = "class_id")
  private ClassModel classModel;
  
  @ManyToOne @JoinColumn(name = "course_id")
  private CourseModel courseModel;
  
  @Column(name = "obrigatorio")
  private Boolean obrigatorio = true;
}
```

**Migração**: `V1.8__Create_ClassCourses_Table.sql`

**Estimativa**: 4–6 horas

---

### 2.5 | Criar Tabelas de Configuração

**Por quê**: Habilita parametrização de cotas, pontos por cidade, mapeamento de regras.

#### 2.5a | Tabela city_points_config
```sql
CREATE TABLE city_points_config (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  city VARCHAR(255) NOT NULL UNIQUE,
  pontos INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### 2.5b | Tabela cota_config
```sql
CREATE TABLE cota_config (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  programa_id BIGINT NOT NULL,
  tipo_cota VARCHAR(50) NOT NULL,
  vagas INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_program_cota (programa_id, tipo_cota),
  FOREIGN KEY (programa_id) REFERENCES programs(id)
);
```

**Entities JPA**: `CityPointsConfig`, `CotaConfig`

**Migração**: `V1.9__Create_Config_Tables.sql`

**Estimativa**: 4–6 horas

---

### 2.6 | Corrigir Templates de E-mail

**Por quê**: Referências a "Duel Shop" (legacy) precisam ser removidas.

**Arquivos**:
- `BRISA-BACKEND/src/main/resources/templates/email/email-verification.html`
- `BRISA-BACKEND/src/main/resources/templates/email/reset-password.html`
- `BRISA-BACKEND/src/main/resources/templates/email/course-alert.html`

**Mudanças**: Remover tudo que mencione "Duel Shop" e substituir por "BRISA — Sistema de Gestão Acadêmica".

**Estimativa**: 1 hora

---

## 🚀 FASE 3 — Avançado (4–8 semanas)

Relatórios sofisticados, análise comparativa e exportação.

### 3.1 | Relação de Aprovados com Fórmula Composta

**Objetivo**: Ranking automático de aprovados aplicando fórmula: **nota + frequência × cursos_concluidos + pontos_cidade**, com desempate por idade e parametrização de cotas.

**Componentes**:
- **Backend**
  - Endpoint: `POST /api/analytics/approved-ranking`
  - Body:
    ```json
    {
      "classId": 123,
      "peso_nota": 0.5,
      "peso_frequencia": 0.2,
      "peso_cursos": 0.2,
      "peso_cidade": 0.1,
      "cota_config": {
        "AMPLA_CONCORRENCIA": 10,
        "PCD": 2,
        "RACA_COR": 3
      }
    }
    ```
  - Response: ranking com espaço ocupado por cota
  - Lógica complexa em `ApprovedRankingService`

- **Frontend**
  - Página completa: `/approved-ranking/:classId`
  - Tabela interativa com filtro por cota
  - Checkbox para ativar cada peso

**Estimativa**: 1–2 semanas

---

### 3.2 | Mapa Geográfico de Turmas e Alunos

**Objetivo**: Visualizar distribuição geográfica de alunos por turma (mapa interativo com marcadores por cidade/estado).

**Componentes**:
- **Frontend**: Integração com LeafletJS ou Mapbox
- **Backend**: Endpoint agregando alunos por cidade/turma

**Estimativa**: 3–4 dias

---

### 3.3 | Análise Financeira

**Objetivo**: Custo por aluno formado = valor_programa / alunos_formados; comparativo entre turmas e programas.

**Estimativa**: 2–3 dias (backend queries + dashboard financeiro)

---

### 3.4 | API /api/analytics/* Completa e Otimizada

**Objetivo**: Consoildar todos os endpoints de analytics em um pacote coerente com:
- Paginação
- Cache (Redis)
- Filtros avançados (data, status, cota, turma)
- Rate limiting

**Estimativa**: 1–2 semanas

---

### 3.5 | Exportação em PDF/Excel

**Objetivo**: Download de qualquer gráfico/relatório em PDF ou XLSX compilado.

**Tecnologia**: Apache POI (Excel), iText ou Flying Saucer (PDF)

**Estimativa**: 1–2 semanas

---

## 📊 Lacunas e Inconsistências Críticas

| Item | Status | Impacto | Fase |
|------|--------|--------|------|
| Remover referências "Duel Shop" de templates | ⚠️ Crítico | Alto | 2 |
| `completionDate` nulo em EnrollmentModel | ⚠️ Crítico | Alto | 2 |
| `CourseModel` sem `data_inclusao` | ⚠️ Menor | Baixo | 2 |
| `ProgramModel` sem `valor_programa` | ⚠️ Crítico | Alto | 2 |

---

## 🎯 Checklist de Implementação

### Fase 1 — Imediato
- [ ] 1.1 Funil de cursos por turma
- [ ] 1.2 Conclusões temporais
- [ ] 1.3 Evolução dos egressos
- [ ] 1.4 Top 15 questões
- [ ] 1.5 Heatmap de horários
- [ ] 1.6 Atividade do sistema

### Fase 2 — Backend
- [ ] 2.1 Adicionar cota em PeopleModel
- [ ] 2.2 Adicionar frequencia em EnrollmentModel
- [ ] 2.3 Adicionar campos financeiros em ProgramModel
- [ ] 2.4 Criar tabela class_courses
- [ ] 2.5 Criar configurações globais
- [ ] 2.6 Corrigir templates de e-mail

### Fase 3 — Avançado
- [ ] 3.1 Relação de aprovados
- [ ] 3.2 Mapa geográfico
- [ ] 3.3 Análise financeira
- [ ] 3.4 API /api/analytics/*
- [ ] 3.5 Exportação PDF/Excel

---

## 📞 Próximas Ações

1. **Confirmação do roadmap**: Validar prioridades e estimativas com o time.
2. **Começar pela Fase 1**: Implementar em paralelo os 6 itens, priorizando funil + evolução dos egressos.
3. **Executar Fase 2 em paralelo**: Migrations do backend podem rodar simultaneamente com Fase 1 frontend.
4. **Definir célula de analytics**: Designar point person para cada fase.

---

**Gerado em**: 2 de abril de 2026  
**Base**: `BRISA - Analytics & Roadmap de Melhorias v1.0`  
**Próxima revisão**: Após Fase 1 completa
