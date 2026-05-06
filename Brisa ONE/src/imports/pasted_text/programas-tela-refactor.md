Vamos fazer umas modificações na tela atual de “Programas” do sistema BRISA ONE. A tela já está em um bom caminho, então mantenha a identidade visual, cores, espaçamentos, navbar superior, estilo dos cards, badges, botões e organização geral. Faça apenas as modificações abaixo.

Objetivo da tela:
Permitir que o gestor visualize, pesquise, filtre e acesse ações relacionadas aos programas cadastrados no sistema.

1. Ajuste nas opções de visualização dos programas

Atualmente existem várias opções como:
- Programas Ativos
- Em Andamento
- Todas as Turmas
- Histórico

Reduza essa área para apenas três abas/opções de visualização:

- Programas ativos
- Em espera
- Todos os programas
- Encerrados

Comportamento esperado:
- “Programas ativos” deve mostrar programas que estão em execução ou com alguma etapa em andamento.
- “Em espera” deve mostrar programas cadastrados que ainda não começaram ou estão aguardando início.
- “Todos os programas” deve mostrar todos os programas, incluindo ativos, em espera e encerrados.
- “Encerrados” deve mostrar todos os programas que ja foram encerrados.

Use o mesmo padrão visual de abas já existente, com a aba selecionada destacada em verde/azul-esverdeado e contadores pequenos ao lado do nome.

2. Reorganização dos cards de indicadores

Os cards de indicadores não devem ficar embaixo das opções de visualização dos programas.

Reposicione os cards de indicadores para ficarem antes das abas de visualização.

Estrutura sugerida da tela:

- Header da página:
  - Título “Programas”
  - Subtítulo “Gerencie os programas cadastrados, acompanhe suas turmas, etapas e andamento geral.”
  - Botões no canto direito:
    - Importar edital
    - Nova turma
    - Novo programa

- Logo abaixo do header:
  - Cards de indicadores gerais

- Depois dos cards:
  - Abas de visualização:
    - Programas ativos
    - Em espera
    - Todos os programas

- Depois das abas:
  - Área de busca e filtros

- Depois:
  - Lista de programas

3. Cards de indicadores

Mantenha os cards com aparência parecida com a tela atual, mas organize-os acima das abas.

Cards sugeridos:
- Total de programas
- Programas ativos
- Em espera
- Em imersão
- Em nivelamento
- Encerrados

Os cards devem ter:
- Título pequeno
- Número em destaque
- Ícone discreto no canto direito
- Bordas arredondadas
- Fundo branco
- Borda suave
- Visual limpo, igual ao estilo atual da tela

4. Área de busca e filtros

Seguindo o modelo utilizado na tela de Pessoas, a área de busca deve ter:

- Campo de busca textual
- Botão “Pesquisar”
- Botão “Filtros avançados”

O botão “Pesquisar” deve ficar ao lado do campo de busca e antes do botão “Filtros avançados”.

Placeholder do campo de busca:
“Buscar por nome do programa, turma, parceiro, instituição ou localidade...”

Layout sugerido:
[ Campo de busca grande ] [ Pesquisar ] [ Filtros avançados ]

O botão “Pesquisar” deve ter destaque visual moderado, usando a cor principal do sistema.
O botão “Filtros avançados” pode manter o estilo secundário com contador de filtros ativos.

5. Destaque maior para a turma do programa

Em cada card/linha de programa, as informações atuais estão boas e devem ser mantidas, mas a turma precisa ter mais destaque.

Hoje a turma aparece junto com outras informações, de forma muito discreta. Ajuste para que a turma fique mais evidente.

Sugestão visual:
- O nome do programa continua sendo o título principal.
- Logo abaixo ou ao lado do título, exibir a turma como uma badge destacada.

Exemplo:
Título:
Residência em TIC BRISA

Badge de turma em destaque:
Turma UFAL 2025.2

A turma deve ter:
- Fundo suave em azul ou verde claro
- Texto mais forte
- Borda arredondada
- Ícone pequeno opcional de calendário ou turma
- Mais destaque do que informações como localidade e período

As demais informações podem continuar aparecendo:
- Parceiro/instituição
- Localidade
- Período
- Etapa atual
- Status
- Quantidade de inscritos
- Quantidade de ativos
- Quantidade em nivelamento
- Quantidade em imersão
- Projetos
- Orientadores
- Próximo marco

6. Botões de ação de cada programa

Mantenha os botões laterais de cada programa, mas ajuste/garanta o comportamento esperado de cada um:

Botão “Visualizar”:
- Deve manter o comportamento atual.
- Ao clicar, abre a página individual de visualização daquele programa.
- Essa página individual já existe, então apenas preserve o fluxo.

Botão “Dashboard”:
- Deve abrir a página de Dashboard já existente no sistema.
- A página deve ser aberta com um filtro aplicado especificamente para aquele programa.
- Exemplo visual na página de destino:
  - Dashboard
  - Filtro aplicado: “Residência em TIC BRISA — Turma UFAL 2025.2”

Botão “Pessoas”:
- Deve abrir a tela de Pessoas já existente.
- A tela deve ser exibida com uma pesquisa/filtro aplicado especificamente para aquele programa.
- Exemplo:
  - Pessoas vinculadas ao programa “Residência em TIC BRISA — Turma UFAL 2025.2”

Botão “Editar”:
- Deve abrir a tela de Cadastro de Edital.
- A tela deve carregar o programa selecionado em modo de edição.
- O objetivo é permitir modificações nos dados do programa, edital, etapas, critérios e informações relacionadas.
- O usuário não deve começar um cadastro do zero; ele deve editar o programa já selecionado.

Botão “Opções”:
- Deve abrir um menu suspenso.
- Por enquanto, esse menu deve conter apenas a opção:
  - Excluir programa

Ao clicar em “Excluir programa”:
- Exibir um modal de confirmação antes de excluir.
- O modal deve ter tom de alerta e informar que a ação pode remover o programa da listagem.
- Botões do modal:
  - Cancelar
  - Excluir programa

Texto sugerido do modal:
Título: “Excluir programa?”
Descrição: “Essa ação removerá o programa da listagem. Confirme apenas se tiver certeza de que deseja excluir este programa.”
Botão secundário: “Cancelar”
Botão destrutivo: “Excluir programa”

7. Manter consistência visual

Não redesenhe a tela inteira do zero. Faça uma evolução da tela atual.

Mantenha:
- Navbar superior atual
- Cores principais do sistema
- Fundo claro
- Cards brancos com bordas suaves
- Badges coloridas
- Botões com ícones
- Layout em lista para os programas
- Estilo limpo, administrativo e profissional

8. Resultado esperado

A nova tela deve ficar mais organizada, com uma hierarquia visual melhor:

- Primeiro: visão geral por indicadores
- Depois: escolha do tipo de listagem
- Depois: busca e filtros
- Depois: lista de programas com ações claras

A tela deve parecer pronta para um sistema real de gestão acadêmica, mantendo o padrão visual já criado no BRISA ONE.
