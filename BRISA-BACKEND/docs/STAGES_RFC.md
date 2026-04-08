# RFC — Modelagem: Etapas por Turma (Seleção, Nivelamento, Imersão)

Data: 2026-04-02

Referências:
- Requisitos extraídos: [BRISA-FRONTEND/docs/requirements.txt](BRISA-FRONTEND/docs/requirements.txt)
- Edital base: [BRISA-FRONTEND/docs/Edital_UFAL_v1.txt](BRISA-FRONTEND/docs/Edital_UFAL_v1.txt)

Resumo objetivo
-----------------
Este RFC propõe uma modelagem genérica e configurável para representar as "etapas" de cada turma
(Seleção, Nivelamento, Imersão), os candidatos por etapa e as configurações por turma, de modo que:

- Siga as regras do Edital_UFAL_v1 (Nivelamento = 250, Imersão = 50 (10 equipes × 5), cotas etc.)
- Mantenha valores do edital como defaults, mas totalmente configuráveis por `class`/turma
- Permita queries/analytics por etapa (ex.: funil por etapa)

Decisões principais
--------------------
- Manter o sistema genérico: as etapas são registros configuráveis por turma. Nomes canônicos: SELECAO, NIVELAMENTO, IMERSAO.
- Representar participantes da etapa por uma tabela `stage_candidates` (histórico/status/score/ordenação).
- Para `Imersao` suportar configuração de `immersion_capacity` e `immersion_team_size` na `classes` (defaults: 50 e 5).

Proposta de modelo de dados
---------------------------

1) Tabela `stages`

Fields (suggestão PostgreSQL):

```
CREATE TABLE stages (
  id BIGSERIAL PRIMARY KEY,
  class_id BIGINT NOT NULL REFERENCES classes(id),
  name VARCHAR(40) NOT NULL, -- e.g. 'SELECAO','NIVELAMENTO','IMERSAO'
  display_name VARCHAR(120),
  capacity INTEGER, -- capacidade para esta etapa na turma (nullable -> use default da classe)
  "order" INTEGER NOT NULL DEFAULT 1,
  required BOOLEAN NOT NULL DEFAULT true,
  metadata JSONB, -- espaço livre para regras extras
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX idx_stages_class ON stages(class_id);
```

2) Tabela `stage_candidates`

```
CREATE TABLE stage_candidates (
  id BIGSERIAL PRIMARY KEY,
  stage_id BIGINT NOT NULL REFERENCES stages(id),
  people_id BIGINT NOT NULL REFERENCES people(id),
  status VARCHAR(30) NOT NULL, -- e.g. 'PENDING','APPROVED','REJECTED'
  score DOUBLE PRECISION,
  rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE INDEX idx_stage_candidates_stage ON stage_candidates(stage_id);
CREATE UNIQUE INDEX ux_stage_person ON stage_candidates(stage_id, people_id);
```

3) Alterações na tabela `classes` (configurações por turma)

```
ALTER TABLE classes
  ADD COLUMN default_selection_capacity INTEGER DEFAULT 350,
  ADD COLUMN default_leveling_capacity INTEGER DEFAULT 250,
  ADD COLUMN default_immersion_capacity INTEGER DEFAULT 50,
  ADD COLUMN immersion_team_size INTEGER DEFAULT 5,
  ADD COLUMN qtd_vagas INTEGER NULL; -- disponível conforme roadmap
```

Racional: defaults seguem o edital, mas as colunas permitem override por turma.

API / Contratos (proposta)
-------------------------

1) Gestão de etapas por turma

- GET /api/classes/{classId}/stages
  - Retorna lista de stages para a turma
  - Response: [{ id, name, displayName, capacity, order, required, metadata }]

- POST /api/classes/{classId}/stages
  - Body: { name, displayName?, capacity?, order?, required?, metadata? }
  - Cria etapa configurada para a turma

- PUT /api/stages/{stageId}
  - Atualiza etapa

2) Candidatos / Movimentação

- GET /api/stages/{stageId}/candidates
  - Lista candidatos e status

- POST /api/stages/{stageId}/candidates
  - Body: { peopleId, score?, status? }
  - Insere/atualiza candidato para a etapa

- POST /api/stages/{stageId}/candidates/bulk
  - Body: [{ peopleId, score?, status? }, ...] (para importações ou confirmações em massa)

3) Analytics com filtro por etapa

- GET /api/analytics/course-progression-funnel?classId={id}&stage={SELECAO|NIVELAMENTO|IMERSAO}&stageId={id}
  - Quando `stage` ou `stageId` informado, o funil considerará apenas alunos que constam como `stage_candidates` no estágio indicado.
  - Response: [{ status: 'NAO_INICIADO'|'EM_ANDAMENTO'|'CONCLUIDO', total: 123 }]

Observação: para retrocompatibilidade, se nenhum `stage` for passado, usa-se comportamento atual (toda turma).

DTOs (propostos)
----------------

- StageDTO: { id, classId, name, displayName, capacity, order, required, metadata }
- StageCandidateDTO: { id, stageId, peopleId, status, score, rank }
- ClassStageConfigDTO: { classId, defaultSelectionCapacity, defaultLevelingCapacity, defaultImmersionCapacity, immersionTeamSize }

Back-end: repositórios e serviços
---------------------------------

- `StageRepository` (JPA) com métodos: findByClassId, findByNameAndClassId
- `StageCandidateRepository` com métodos: findByStageId, findByStageIdAndStatus
- `AnalyticsService` deve ganhar sobrecarga para filtrar por stage/stageId quando aplicável.

Validações de regras (Edital)
----------------------------

- Nivelamento: class-level default = 250; selecionar os 250 melhores por pontuação.
- Imersão: default = 50; se `immersion_team_size=5` então número de equipes = capacity / team_size.
- Cotas: respeitar políticas já presentes (PCD 5%, negros/pardos 20%, mulheres 20%, 45+ 5%) no momento da chamada para formalização; as cotas são aplicadas durante a seleção (business logic).

Migração e compatibilidade
--------------------------

- Estratégia: criar novas colunas com valores DEFAULT; criar novas tabelas sem tocar dados existentes.
- Nome sugerido (Flyway): `src/main/resources/db/migration/V2__stages_and_stage_candidates.sql` contendo as instruções acima.
- Após deploy da migration, executar um script de backfill opcional para criar etapas padrão (SELECAO, NIVELAMENTO, IMERSAO) para turmas recentes se desejado.

Exemplo de arquivo de migration (skeleton)

```
-- V2__stages_and_stage_candidates.sql
BEGIN;
-- adiciona colunas em classes
ALTER TABLE classes ADD COLUMN default_selection_capacity integer DEFAULT 350;
ALTER TABLE classes ADD COLUMN default_leveling_capacity integer DEFAULT 250;
ALTER TABLE classes ADD COLUMN default_immersion_capacity integer DEFAULT 50;
ALTER TABLE classes ADD COLUMN immersion_team_size integer DEFAULT 5;

-- cria stages
CREATE TABLE stages (
  id BIGSERIAL PRIMARY KEY,
  class_id BIGINT NOT NULL,
  name VARCHAR(40) NOT NULL,
  display_name VARCHAR(120),
  capacity INTEGER,
  "order" INTEGER DEFAULT 1,
  required BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- cria stage_candidates
CREATE TABLE stage_candidates (
  id BIGSERIAL PRIMARY KEY,
  stage_id BIGINT NOT NULL,
  people_id BIGINT NOT NULL,
  status VARCHAR(30) NOT NULL,
  score DOUBLE PRECISION,
  rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

COMMIT;
```

Front-end impacto
------------------

- `DashboardView` e componentes analytics: permitir filtro por etapa/stageId; atualizar `analyticsService` para enviar `stage` or `stageId` as query params.
- Nova tela/controls: painel de configuração da turma (Admin): definir capacities e `immersion_team_size`.
- Fluxos de seleção: endpoints para confirmar participação (link por email) e para importar candidatos aprovados para `stage_candidates`.

Testes e QA
----------

1) Unit tests: repositórios e services (StageRepository, StageCandidateRepository, AnalyticsService filter).
2) Integration: migration applied, criar dados seed: criar uma turma, criar as 3 stages, criar 300 candidatos com scores, garantir que Nivelamento selecione 250 e Imersão selecione 50.
3) Front-end: manual smoke test — selecionar turma, escolher etapa, validar números do funil.

Estimativa de implementação (apenas modelagem + migrations + endpoints básicos + front-end hooks):
- Backend entities + repositories + migrations: 6–10 horas
- AnalyticsService updates + controller endpoints: 4–6 horas
- Frontend hooks + simple UI selectors: 3–5 horas

Próximos passos propostos
-----------------------
1) Revisar este RFC e aceitar ou pedir mudanças (nomes de campos, enum values).
2) Se aprovado: gerar a migration `V2__stages_and_stage_candidates.sql` e criar as entidades Java (StageModel, StageCandidateModel), repositórios e controllers mínimas.
3) Atualizar `AnalyticsService` para suportar `stage` filter e testes automatizados.
4) Implementar UI mínimo de configuração de turma e seleção de etapa no `DashboardView`.

Observações finais
------------------
Este RFC prioriza compatibilidade e configuração por turma. Os defaults refletem o Edital_UFAL_v1, mas todas as capacidades são sobregraváveis por turma para acomodar futuros processos seletivos com regras diferentes.

Se aprovar, eu posso gerar o patch de código (entities + repositories + migration SQL) automaticamente e abrir para revisão.
