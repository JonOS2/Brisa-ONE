Atualize a tela “Pessoas” do sistema BRISA ONE com base no layout atual. Mantenha a mesma identidade visual: navbar azul escura no topo, fundo claro, cards brancos com bordas suaves, botões arredondados, tabela limpa, badges coloridas e espaçamento consistente.

Contexto da tela:
Essa tela serve para gerenciar todas as pessoas cadastradas no sistema e acompanhar os vínculos dessas pessoas com programas, turmas e etapas. Uma mesma pessoa pode existir uma única vez no cadastro geral, mas pode estar vinculada a diferentes programas/turmas ao longo do tempo. A tela precisa ajudar o gestor a identificar novos alunos, alunos já existentes no sistema e possíveis conflitos de vínculo em programas simultâneos.

MODIFICAÇÕES NA TELA PRINCIPAL

1. Navbar
- Manter a navbar como está.
- A seção ativa deve continuar sendo “Pessoas”.

2. Cabeçalho da página
- Manter título “Pessoas”.
- Manter subtítulo: “Gerencie todas as pessoas cadastradas no sistema e acompanhe seus vínculos com programas e etapas.”
- Manter os botões:
  - “Modelo de planilha”
  - “Nova pessoa”
  - “Submeter planilha”
- Corrigir o texto do botão para “Nova pessoa”, no singular.
- Remover qualquer botão/ícone de atualização manual da tela, especialmente nas ações da tabela.

3. Cards de indicadores
Manter os cards superiores, mas ajustar os textos se necessário:
- Total de Pessoas
- Pessoas Ativas
- Em Programas Ativos
- Em Nivelamento
- Em Imersão
- Novos Cadastros (30d)

4. Abas
Manter apenas as seguintes abas:
- Pessoas Ativas
- Programas em Andamento
- Todas as Pessoas

Remover completamente a aba “Histórico”.

5. Filtros e busca
Manter a barra de busca com placeholder:
“Buscar por nome, CPF, e-mail ou identificador...”

Manter os filtros:
- Programa
- Etapa
- Status
- Cota
- Gênero
- Estado de residência
- Cidade de residência
- Instituição


Adicionar um botão “Pesquisar” ao lado do botão “Filtros avançados”.
A ordem deve ser:
[Campo de busca grande] [Filtros avançados] [Pesquisar]

O botão “Pesquisar” deve ter destaque visual moderado, usando a cor principal do sistema.

6. Tabela de pessoas

Atualizar a tabela para que ela não fique sobrecarregada visualmente. Como existem muitos dados possíveis sobre cada pessoa, a tela deve ter um controle de visualização de colunas.

Adicionar, acima da tabela e próximo aos filtros, um botão/dropdown chamado “Colunas”.

Esse botão deve abrir um painel pequeno com checkboxes para o gestor escolher quais colunas deseja visualizar na tabela.

Colunas visíveis por padrão:
- Nome
- CPF
- E-mail
- Programas
- Etapa Atual
- Status
- Ações

Colunas opcionais no controle “Colunas”:
- Gênero
- Idade
- Cota
- Cidade/UF
- Instituição
- Tipo de formação
- Curso
- Última atualização

A tabela deve se adaptar às colunas selecionadas. Quando poucas colunas estiverem ativas, ela deve ocupar bem o espaço disponível. Quando muitas colunas forem ativadas, permitir rolagem horizontal apenas como comportamento secundário/fallback, sem ser a solução principal da tela.

Na coluna “Nome”, exibir:
- Nome da pessoa em destaque

Na coluna “CPF”, exibir o CPF formatado.

Na coluna “E-mail”, exibir o e-mail principal da pessoa.

Na coluna “Programas”, manter o padrão de badge com o nome do programa. Quando houver mais de um programa, mostrar:
- Badge do programa principal
- Badge pequena “+1” ou “+2”

Ao passar o mouse ou clicar no “+1/+2”, mostrar um pequeno tooltip/popover com os demais programas vinculados.

Na coluna “Etapa Atual”, usar texto simples ou badge discreta:
- Inscrição
- Nivelamento
- Imersão
- Concluída

Na coluna “Status”, usar badges coloridas:
- Ativa
- Pendente
- Concluída
- Reprovada
- Desclassificada

Na coluna opcional “Instituição”, usar badges com exemplos:
- UFPE
- UFAL
- IFPE
- IFAL

Na coluna opcional “Cota”, usar badges com exemplos:
- Ampla Concorrência
- PCD/Neurodivergente
- Negro/Pardo
- Mulher
- 45+

Na coluna opcional “Gênero”, usar texto simples:
- Feminino
- Masculino
- Outro
- Não informado

Na coluna opcional “Idade”, calcular visualmente a partir da data de nascimento nos dados fictícios. Exibir apenas o número da idade, exemplo: “24”.

Na coluna “Ações”, manter apenas:
- Visualizar
- Editar
- Mais opções

Remover o ícone de atualização/histórico/refresh das ações da tabela.

Ao clicar em “Visualizar”, abrir um painel lateral ou modal de detalhes da pessoa com todos os dados completos:
- Dados pessoais
- Dados acadêmicos
- Vínculos com programas/turmas
- Etapa atual em cada programa
- Status
- Histórico de atualizações ou vínculos, se necessário

Importante:
A tabela principal deve priorizar leitura rápida e tomada de decisão. Dados complementares devem ficar acessíveis pelo controle de colunas ou pelo detalhe da pessoa, sem poluir a visualização inicial.


MODAL: NOVA PESSOA

Ao clicar em “Nova pessoa”, abrir um modal grande e organizado para cadastro individual.

Título do modal:
“Cadastrar nova pessoa”

Subtítulo:
“Preencha os dados pessoais, acadêmicos e o vínculo inicial da pessoa com um programa/turma.”

O modal deve ter três seções:

SEÇÃO 1 — Vínculo com programa/turma
Campos:
- Programa
- Turma
- Etapa inicial
- Status inicial

Exemplos de valores:
Programa: Programa de Inovação 2026, Tech Leaders 2025, Residência em TIC BRISA-UFAL
Turma: Turma 1, Turma 2, UFAL2025.1, UFAL2025.2
Etapa inicial: Inscrição, Nivelamento, Imersão
Status inicial: Ativa, Pendente, Concluída, Reprovada, Desclassificada

SEÇÃO 2 — Dados pessoais
Campos:
- Nome do aluno
- Data de nascimento
- Gênero
- Cota
- CPF
- E-mail
- Telefone
- LinkedIn
- Endereço
- Estado de residência
- Cidade de residência
- CEP
- Outros dados de endereço

O campo “Cota” deve permitir apenas uma opção:
- Ampla Concorrência
- PCD/Neurodivergente
- Negro/Pardo
- Mulher
- 45+

SEÇÃO 3 — Dados acadêmicos
Campos:
- Tipo de formação
- Instituição
- Curso
- Status da formação
- Data de conclusão

O campo “Tipo de formação” deve permitir apenas uma opção::
- Engenharia (exceto os de Engenharia de Software, Engenharia de Computação ou similares) 
- Outros cursos de ciências exatas ou tecnológicos (exceto os de Engenharia de Software, Engenharia de Computação ou similares) 
- Técnico na área de exatas concluído
- Engenharia de Computação, Ciência da Computação ou outros cursos relacionados a TIC

Exemplos para “Status da formação”:
- Cursando
- Concluído
- Trancado
- Não informado

Rodapé do modal:
- Botão secundário “Cancelar”
- Botão principal “Cadastrar pessoa”

O modal deve ser visualmente organizado, com campos em grid de duas colunas no desktop, labels claras e indicação de campos obrigatórios: Nome, CPF, E-mail, Data de nascimento, Cota, Programa, Turma e Etapa inicial.

MODAL: SUBMETER PLANILHA

Ao clicar em “Submeter planilha”, abrir um modal grande de importação.

Título:
“Submeter planilha de alunos”

Subtítulo:
“Envie uma planilha com os dados dos alunos e revise a prévia antes de confirmar o cadastro.”

Parte superior do modal:
- Área grande de upload com borda tracejada
- Ícone de upload
- Texto: “Arraste a planilha aqui ou clique para selecionar”
- Formatos aceitos: .xlsx, .csv
- Botão “Selecionar arquivo”

Abaixo da área de upload, mostrar um bloco “Estrutura esperada da planilha” com as colunas:

Dados Pessoais:
- Nome do Aluno
- Data de Nascimento
- Gênero
- Cota
- CPF
- Email
- Telefone
- Linkedin
- Endereço
- Estado de Residencia
- Cidade de Residencia
- Cep
- Outros dados de endereço

Dados Acadêmicos:
- Tipo de formação
- Instituição
- Curso
- Status
- Data de conclusão

Também incluir no modal uma seleção obrigatória antes da importação:
- Programa de destino
- Turma de destino
- Etapa inicial
- Status inicial

Após selecionar/enviar a planilha, mostrar uma prévia dividida em duas listas/tabs dentro do modal:

ABA 1 — Novos cadastros
Mostrar alunos que ainda não existem no sistema.
Colunas:
- Nome
- CPF
- E-mail
- Gênero
- Idade
- Cota
- Cidade/UF
- Formação
- Status da importação

Status da importação:
- Pronto para cadastrar
- Dados incompletos
- CPF inválido
- E-mail inválido

ABA 2 — Já cadastrados no sistema
Mostrar alunos que já existem no sistema e serão apenas vinculados a um novo programa/turma.
Colunas:
- Nome
- CPF
- E-mail
- Programas vinculados
- Programa/turma de destino
- Situação
- Alerta

Na coluna “Programas vinculados”, mostrar badges com os programas atuais da pessoa.
Na coluna “Alerta”, destacar em amarelo ou vermelho quando a pessoa já estiver vinculada a outro programa que ocorre simultaneamente ao programa/turma de destino.

Exemplos de alerta:
- “Sem conflito”
- “Atenção: aluno já vinculado a programa ativo”
- “Conflito: programa simultâneo em andamento”
- “Bloqueio sugerido: aluno já cursando nivelamento em outra turma”
- “Bloqueio sugerido: aluno já participou da imersão em outra turma”

Criar uma área de resumo no modal:
- Total de linhas lidas
- Novos cadastros
- Pessoas já existentes
- Alertas encontrados
- Erros de validação

Rodapé do modal:
- Botão “Cancelar”
- Botão secundário “Baixar relatório de inconsistências”
- Botão principal “Confirmar importação”

O botão “Confirmar importação” deve parecer desabilitado quando houver erros críticos.

MODAL: MODELO DE PLANILHA

Ao clicar em “Modelo de planilha”, abrir um pequeno modal ou dropdown explicando que o modelo contém os campos obrigatórios para importação.

Mostrar:
Título: “Modelo de planilha de alunos”
Texto: “Baixe um arquivo modelo com todas as colunas necessárias para cadastro e vínculo dos alunos ao programa.”
Botão principal: “Baixar modelo .xlsx”

Também mostrar uma prévia compacta das colunas principais:
Nome, CPF, E-mail, Data de nascimento, Gênero, Cota, LinkedIn, Estado, Cidade, Tipo de formação, Instituição, Curso, Status da formação.

COMPORTAMENTO VISUAL ESPERADO

- Não precisa implementar lógica real de backend, mas a interface deve simular os estados principais.
- Usar dados fictícios coerentes com o contexto do sistema.
- Manter a tela responsiva.
- Evitar poluição visual: usar modais bem organizados, seções com títulos e grids.
- Preservar o estilo atual do sistema.
- Usar linguagem clara, profissional e adequada para gestores acadêmicos.
- Priorizar a ideia de cadastro geral de pessoas + vínculos com programas/turmas.

IMPORTANTE

A tela não deve tratar “pessoa” como duplicada quando ela aparece em mais de um programa. O CPF deve ser entendido como identificador principal da pessoa. Se o CPF já existir, o sistema deve mostrar o aluno como “já cadastrado” e permitir apenas criar um novo vínculo com programa/turma, exibindo alertas quando houver conflito com programa simultâneo.
