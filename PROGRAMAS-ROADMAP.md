# Roadmap de Implementação - Tela de Programas

## Status Atual
A tela de Programas está em construção. Atualmente implementado:
- ✅ Navbar correta
- ✅ Título e descrição
- ✅ Botões de ação (Cadastrar/Importar)
- ✅ Barra de busca
- ❌ Stat cards no topo
- ❌ Abas de filtro
- ❌ Dados detalhados dos programas
- ❌ Etapas visuais (stepper)
- ❌ Menu de ações por programa

---

## Implementação Fase 1: Stats Cards & Tabs

### 1.1 Stats Cards (6 colunas no topo)
**Localização:** Logo abaixo do título e botões, acima da busca

Cards a implementar:
- [ ] Total de programas (ícone Award/book)
- [ ] Programas ativos (ícone CheckCircle)
- [ ] Em espera (ícone Clock)
- [ ] Em imersão (ícone Users)
- [ ] Em nivelamento (ícone Building2)
- [ ] Encerrados (ícone CheckCircle cinza)

**Estilo:**
- Fundo branco
- Ícone pequeno no topo direito do card
- Número grande (peso 600)
- Label descritiva (peso normal)
- Borda: 1px #D1D6E8
- Sombra: 0 1px 4px rgba(23, 31, 74, 0.08)
- Hover: elevação suave

**Cores de ícones:**
- Total: #6377BA
- Ativos: #4CAF50 (verde)
- Espera: #2196F3 (azul)
- Imersão: #9C27B0 (roxo)
- Nivelamento: #FF9800 (laranja)
- Encerrados: #9AA4C0 (cinza)

---

### 1.2 Abas de Filtro
**Localização:** Logo após os stats cards, acima da busca

Abas a implementar:
- [ ] Programas ativos (4)
- [ ] Em espera (2)
- [ ] Todos os programas (18)
- [ ] Encerrados (7)

**Estilo:**
- Background branco
- Texto cinza (#50619E) por padrão
- Aba ativa: underline teal (#17A2B8 ou teal-500) com texto #171F4A
- Border-bottom: 1px #E1E6F0
- Hover: texto mais escuro
- Contador em badge pequeno ao lado do label

**Comportamento:**
- Aba ativa por padrão: "Programas ativos"
- Ao clicar, filtrar a listagem de programas
- Atualizar contadores em tempo real

---

## Implementação Fase 2: Dados Completos dos Programas

### 2.1 Listagem Principal (Cards/Linhas)
**Localização:** Abaixo da barra de busca

Cada item representa um programa e deve mostrar:

#### 2.1.1 Cabeçalho do Card
- [ ] Nome do programa (ex: "Residência em TIC BRISA") - **texto grande, peso 600**
- [ ] Badge de turma (ex: "Turma UFAL 2025.2") - **badge teal background**
- [ ] Ícone de editar (link para editar programa) - **topo direito**

#### 2.1.2 Informações Principais
- [ ] Parceiro/Instituição (ex: "EASY/UFAL") com ícone building
- [ ] Localidade (ex: "Maceió - AL") com ícone mappin
- [ ] Período (ex: "Ago/2025 → Jun/2026") com ícone calendar
- [ ] Status badge (ex: "Em andamento") - cores por status:
  - `andamento` → teal
  - `inscricao` → blue
  - `encerrado` → gray

#### 2.1.3 Etapas Visuais (Stepper)
- [ ] Etapas: Inscrição → Seleção → Nivelamento → Imersão → Encerrado
- [ ] Etapa atual destaca em **teal** ou **bold**
- [ ] Etapas passadas: checkbox ✓
- [ ] Etapas futuras: cinza claro
- [ ] Conectores entre etapas (linhas horizontais)

**Estilos:**
```
[Inscrição ✓] —— [Seleção ✓] —— [Nivelamento 🔵] —— [Imersão] —— [Encerrado]
```

#### 2.1.4 Stats em Linha (Mini Cards)
- [ ] Inscritos: `612`
- [ ] Ativos: `44`
- [ ] Nivelamento: `0`
- [ ] Imersão: `44`
- [ ] Projetos: `10`
- [ ] Orientadores: `4`

**Estilo:**
- Cards pequenos em linha
- Número grande (peso 600)
- Label descritiva pequena
- Background: #E8EBF5
- Borda: none

#### 2.1.5 Próximo Marco
- [ ] Ícone clock (laranja)
- [ ] Texto: "Avaliação parcial em 7 dias" (em laranja se urgente)
- [ ] Separado em destaque abaixo dos stats

#### 2.1.6 Menu de Ações (Dropdown/Context)
- [ ] Ícone de menu (3 pontos) no canto inferior direito
- [ ] Ao clicar, exibir opções:
  - Visualizar (eye icon)
  - Dashboard (chart icon)
  - Pessoas (users icon)
  - Editar (pencil icon)
  - Opções (more icon)

---

## Implementação Fase 3: Filtros & Barra de Busca

### 3.1 Barra de Busca Melhorada
**Localização:** Ao lado dos botões ou em linha separada

- [ ] Placeholder: "Buscar por nome do programa, turma, parceiro, instituição ou localidade..."
- [ ] Ícone search no início
- [ ] Button "Pesquisar" na direita
- [ ] Botão "Filtros avançados" com badge numérico (ex: "0")

### 3.2 Filtros (Oculto até expandir)
- [ ] Status do programa
- [ ] Etapa atual
- [ ] Instituição parceira
- [ ] Localidade
- [ ] Período
- [ ] Tipo de programa

---

## Implementação Fase 4: Responsividade & Detalhes

### 4.1 Layout Responsivo
- [ ] Desktop (1024px+): Cards em linha única com todas as informações
- [ ] Tablet (768px-1023px): Cards empilhados, informações condensadas
- [ ] Mobile (<768px): Drawer ou collapse para detalhes

### 4.2 Estados de Carga
- [ ] Loading spinner enquanto carrega programas
- [ ] Empty state se nenhum programa encontrado
- [ ] Error state com mensagem e retry

### 4.3 Interações
- [ ] Hover no card: elevação e border highlight
- [ ] Clique no card: navegar para detalhes do programa
- [ ] Menu de ações: dropdown com efeito smooth
- [ ] Abas: transição suave

---

## Cores do Brisa ONE (Referência)

| Elemento | Cor | Código |
|----------|-----|--------|
| Primary (Navy) | #171F4A | |
| Secondary | #2A3566 | |
| Muted | #50619E | |
| Border | #D1D6E8 | |
| Background | #F4F5FA | |
| Accent/Teal | #17A2B8 | |
| Success | #4CAF50 | |
| Warning | #FF9800 | |
| Info | #2196F3 | |
| Error | #D4183D | |

---

## Tipografia (Brisa ONE)

| Elemento | Tamanho | Peso | Cor |
|----------|---------|------|-----|
| H1 (Títulos) | 28px | 600 | #171F4A |
| H2 (Subtítulos) | 20px | 600 | #171F4A |
| Label | 14px | 500 | #171F4A |
| Body | 14px | 400 | #171F4A |
| Small | 12px | 400 | #50619E |

---

## Estrutura de Dados Esperada

```typescript
interface Programa {
  id: number;
  nome: string;
  turma: string;
  parceiro: string;
  localidade: string;
  periodo: string;
  status: 'andamento' | 'inscricao' | 'encerrado' | 'espera';
  etapaAtual: string;
  inscritos: number;
  ativos: number;
  nivelamento: number;
  imersao: number;
  projetos: number;
  orientadores: number;
  proximoMarco: string;
  progresso: number;
}
```

---

## Checklist de Implementação por Fase

### Fase 1: Stats & Tabs
- [ ] Implementar componente `StatCard.vue`
- [ ] Implementar componente `TabFilter.vue`
- [ ] Integrar dados no ProgramsView
- [ ] Teste de renderização

### Fase 2: Dados Detalhados
- [ ] Implementar componente `ProgramaCard.vue` (redesign)
- [ ] Implementar componente `EtapasStepper.vue`
- [ ] Implementar componente `StatsRow.vue`
- [ ] Integrar menu de ações
- [ ] Teste de renderização

### Fase 3: Filtros
- [ ] Melhorar input de busca
- [ ] Implementar filtros avançados
- [ ] Integrar lógica de filtro no backend

### Fase 4: Refinamento
- [ ] Testes responsivos (desktop, tablet, mobile)
- [ ] Testes de estados (loading, empty, error)
- [ ] Otimização de performance
- [ ] Build final e validação

---

## Arquivos a Modificar/Criar

### Modificar:
- `BRISA-FRONTEND/src/views/ProgramsView.vue` - Estrutura principal

### Criar:
- `BRISA-FRONTEND/src/components/StatCard.vue` - Card de estatísticas
- `BRISA-FRONTEND/src/components/TabFilter.vue` - Abas de filtro
- `BRISA-FRONTEND/src/components/ProgramaCard.vue` - Card redesenhado do programa
- `BRISA-FRONTEND/src/components/EtapasStepper.vue` - Etapas visuais
- `BRISA-FRONTEND/src/components/StatsRow.vue` - Linha de estatísticas
- `BRISA-FRONTEND/src/components/ActionsMenu.vue` - Menu de ações

---

## Próximos Passos

1. **Fase 1 (Stats & Tabs):** Começar pela implementação dos stat cards e abas de filtro
2. **Fase 2 (Dados):** Depois redesenhar o card do programa com todos os dados
3. **Fase 3 (Filtros):** Implementar busca e filtros avançados
4. **Fase 4 (Polish):** Responsividade, estados de carga, testes

**Estimativa:** ~6-8 horas para todas as fases
