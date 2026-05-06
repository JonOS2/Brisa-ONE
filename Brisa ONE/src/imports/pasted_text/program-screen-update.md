Quero fazer pequenas modificações na tela “Programas” já existente, mantendo o mesmo layout, identidade visual, cores, espaçamentos, navbar e padrão visual da interface atual do BRISA ONE.

Use a tela existente como referência principal. Não redesenhe a tela do zero. Apenas ajuste os botões superiores e adicione os comportamentos solicitados.

1. Remover botão “Importar edital”

Na área superior direita da tela, onde atualmente existem os botões:
- Importar edital
- Nova turma
- Novo programa

Remova completamente o botão “Importar edital”.

A tela deve ficar apenas com:
- Nova turma
- Novo programa

Mantenha o botão “Nova turma” com estilo secundário/outline.
Mantenha o botão “Novo programa” com destaque em verde/teal, como já está na tela atual.

2. Funcionalidade do botão “Nova turma”

Ao clicar no botão “Nova turma”, abrir um modal centralizado sobre a tela.

O modal deve seguir o mesmo estilo visual da aplicação:
- Fundo branco
- Bordas arredondadas
- Sombra suave
- Cabeçalho com título
- Botão de fechar no canto superior direito
- Layout organizado, limpo e profissional

Título do modal:
“Criar nova turma”

Subtítulo:
“Selecione um programa existente para criar uma nova turma mantendo as regras do edital.”

O modal deve ter duas áreas principais:

A) Lista de programas disponíveis

Na lateral esquerda do modal, exibir uma lista de programas já cadastrados. 
Cada item da lista deve parecer um card selecionável.

Exemplos de programas:
- Residência em TIC BRISA
- Programa de Inovação Tech
- Formação Avançada em Software
- Residência em Dados e IA

Cada card deve mostrar:
- Nome do programa
- Instituição/parceiro
- Quantidade de turmas já existentes
- Status do programa, como “Ativo” ou “Modelo disponível”

Permitir estado visual de seleção:
- Quando o usuário clicar em um programa, o card selecionado deve ganhar destaque com borda verde/teal e fundo levemente colorido.

B) Detalhes do programa selecionado

Na lateral direita do modal, exibir os dados relevantes do programa selecionado, em modo somente leitura, como se fossem informações herdadas do edital.

Exibir dados como:
- Nome do programa
- Executora/parceira
- Público-alvo
- Modalidade do nivelamento
- Duração do nivelamento
- Duração da imersão
- Carga horária da imersão
- Quantidade de vagas para nivelamento
- Quantidade de vagas para imersão
- Critérios de cotas
- Cursos obrigatórios
- Critérios principais de avaliação

Essas informações devem aparecer em cards pequenos ou blocos organizados, deixando claro que são regras herdadas do programa original e não devem ser editadas nesse modal.

Exemplo de dados compatíveis com o edital:
- Nivelamento remoto e assíncrono
- Nivelamento com duração de 2 meses
- Imersão híbrida com duração de 6 meses
- Imersão com 480 horas
- 250 vagas para nivelamento
- 50 vagas para imersão
- Cotas: PCD/Neurodivergente, Negro/Pardo, Mulheres, 45+
- Cursos obrigatórios: Introdução à Plataforma EaD, Lógica de Programação, Programação Python, Organização de Computadores, Banco de Dados, Empreendedorismo e Gerência de Projetos
- Avaliação da imersão composta por nota do grupo, nota dos pares e nota do professor/orientador

3. Campos editáveis para a nova turma

Depois que o usuário selecionar um programa, mostrar apenas os campos necessários para definir a nova turma.

Não permitir editar as regras do programa dentro desse modal.
O usuário deve preencher somente as novas datas e identificação da turma.

Campos editáveis:
- Nome da turma
  Exemplo: “Turma UFAL 2026.1”
- Localidade
  Exemplo: “Maceió - AL”
- Instituição parceira/local
  Exemplo: “UFAL”
- Data de publicação do edital
- Período de inscrição
  - Data inicial
  - Data final
- Divulgação dos selecionados para nivelamento
- Confirmação de participação no nivelamento
  - Data inicial
  - Data final
- Início do nivelamento
- Fim do nivelamento
- Data da prova final do nivelamento
- Divulgação dos selecionados para imersão
- Confirmação de participação na imersão
  - Data inicial
  - Data final
- Início da imersão
- Fim da imersão
- Data da avaliação parcial
- Data da avaliação final
- Emissão dos certificados

Esses campos devem ser organizados por seções:
- Identificação da turma
- Inscrição e seleção
- Nivelamento
- Imersão
- Avaliações e encerramento

Use inputs de data, campos de texto e pequenos cards/separadores para manter o formulário visualmente organizado.

4. Rodapé do modal

No rodapé do modal, adicionar os botões:
- Cancelar
- Criar turma

O botão “Criar turma” deve ficar desabilitado visualmente enquanto nenhum programa estiver selecionado.
Depois que um programa for selecionado, o botão deve ficar ativo.

Ao clicar em “Criar turma”, simular a criação da turma e fechar o modal, retornando para a tela de Programas.

Pode exibir um pequeno toast ou alerta no canto superior direito:
“Turma criada com sucesso.”

5. Funcionalidade do botão “Novo programa”

O botão “Novo programa” não deve abrir modal.

Ao clicar em “Novo programa”, o usuário deve ser levado para a tela de “Cadastro de Edital”.

Simule essa navegação dentro do protótipo:
- Pode trocar para uma tela já existente chamada “Cadastro”
- Ou criar/mostrar um estado de tela com o título “Cadastro de Edital”
- A navegação deve deixar claro que o usuário saiu da tela de Programas e foi para o fluxo de cadastro progressivo de edital.

Importante:
O botão “Novo programa” representa a criação de um programa totalmente novo a partir de um novo edital.
O botão “Nova turma” representa a criação de uma nova turma baseada em um programa já existente, reaproveitando as regras do edital e alterando apenas as datas e informações específicas da turma.

6. Manter o restante da tela

Não alterar:
- Navbar
- Cards de indicadores
- Lista de programas
- Botões de ação dos cards
- Campo de busca
- Filtros avançados
- Visual geral dos programas

Apenas remova o botão “Importar edital”, adicione o modal do botão “Nova turma” e configure o botão “Novo programa” para navegar até “Cadastro de Edital”.
