
CONTEXTO GERAL DA MODIFICAÇÃO

Estou trabalhando na página individual de um programa dentro do sistema BRISA ONE, um Sistema de Gestão Acadêmica para acompanhar programas de formação em tecnologia baseados em edital.

IMPORTANTE:
Modifique APENAS a página individual do programa.
Não altere a navbar.
Não altere a página de Programas.
Não altere a página Pessoas.
Não altere Dashboard, Cadastro, Carreira ou qualquer outra tela do sistema.
Não recrie o sistema do zero.
Apenas ajuste, refine ou acrescente elementos dentro da página individual do programa.


Estilo visual:
Mantenha o estilo atual da interface:
- Layout limpo e profissional
- Fundo claro
- Cards brancos com bordas suaves
- Navbar azul-marinho
- Destaques em verde/teal
- Badges coloridos para status
- Ícones discretos
- Tabelas organizadas
- Espaçamento confortável
- Visual de sistema administrativo moderno

Comportamento esperado:
Como é um protótipo, simule as interações visualmente.
Modais, abas, botões, confirmações, alertas e uploads devem funcionar como demonstração visual, sem necessidade de backend real.

A seguir, aplique SOMENTE a modificação específica descrita neste prompt unicamente na aba etapas:

====================================================================
8. ABA “ETAPAS”
====================================================================

Essa aba substitui as antigas abas:
- Nivelamento
- Imersão
- Projetos

Dentro da aba “Etapas”, criar uma navegação interna com sub-abas:
1. Nivelamento
2. Prova
3. Imersão

Também pode ser usado um seletor segmentado no topo.

====================================================================
8.1 SUB-ABA “NIVELAMENTO”
====================================================================

Objetivo:
Mostrar informações da etapa de nivelamento, permitir cadastrar aluno individualmente, importar alunos por planilha, atualizar dados dos cursos e acompanhar progresso.

Topo da sub-aba:
Cards compactos:
- Alunos no nivelamento: 250
- Ativos: 229
- Cursos obrigatórios: 6
- Cursos não obrigatórios: 8
- Conclusão dos cursos obrigatorios: 78%
- Alertas: 5

Botões:
- “Atualizar dados”
- “Submeter dados dos cursos”
- “Cadastrar aluno”

“Atualizar dados” deve abrir modal semelhante ao processo seletivo, mas voltado para alunos do nivelamento:
Opções:
1. Importar alunos do nivelamento
2. Cadastrar aluno individualmente
3. Atualizar status de participação

Validação:
Se algum aluno estiver em outro programa vigente, exibir alerta.

Seção “Cursos”
Mostrar lista de cursos cadastrados no programa.
Cursos:
- Introdução à Plataforma de EaD da BRISA
- Lógica de Programação com Python
- Programação Python
- Organização de Computadores
- Banco de Dados
- Empreendedorismo e Gerência de Projetos
- Desenvolvimento de Aplicativos Mobile
- Business Intelligence
- Introdução a Big Data
- Introdução à Inteligência Artificial
- Introdução à Internet das Coisas
- Introdução à Engenharia de Requisitos
- Introdução ao Treinamento de IA
- Introdução à UI/UX

Cada curso deve aparecer como card ou linha com:
- Nome do curso
- Badge “Obrigatório” ou “Não obrigatório”
- Área
- Carga horária
- Percentual médio de conclusão dos alunos
- Barra de progresso
- Média de nota
- Quantidade de alunos concluídos

Os cursos obrigatórios devem ter badge mais chamativo.

Cursos devem ser clicáveis.
Ao clicar em um curso, abrir painel lateral ou modal com:
- Nome
- Descrição
- Área
- Carga horária
- Se é obrigatório ou não
- Média de conclusão
- Média de notas
- Alunos com pendência
- Última atualização via planilha

Botão “Submeter dados dos cursos”:
Abrir modal de upload:
- Título: “Submeter dados dos cursos”
- Área para arrastar arquivo CSV/XLSX
- Mostrar colunas esperadas:
  CPF, Nome, Curso, Percentual de conclusão, Nota, Status, Data de atualização
- Após upload, mostrar mensagem de sucesso e resumo:
  “229 registros atualizados”
  “5 alunos com pendências”
  “2 conflitos com outros programas vigentes”

Lista de alunos no nivelamento:
Deve ter menos destaque que cursos/prova.
Mostrar tabela compacta com:
- Nome
- CPF
- Percentual geral de conclusão
- Cursos obrigatórios concluídos
- Prova realizada?
- Nota da prova
- Status


====================================================================
8.1 SUB-ABA “NIVELAMENTO”
====================================================================

Objetivo:
Mostrar todas as informações da etapa de Nivelamento em um único espaço, incluindo alunos, cursos obrigatórios/não obrigatórios, progresso dos cursos e prova final.

Importante:
Dentro da sub-aba “Nivelamento”, separar visualmente o conteúdo em duas grandes áreas:
1. Cursos
2. Prova Final

A aba Etapas deve ter apenas:
- Nivelamento
- Imersão


====================================================================
TOPO DA SUB-ABA “NIVELAMENTO”
====================================================================

No topo da sub-aba, mostrar cards compactos com os principais indicadores:

- Alunos no nivelamento: 250
- Ativos: 229
- Cursos obrigatórios: 6
- Cursos não obrigatórios: 8
- Conclusão dos cursos obrigatórios: 78%
- Nota de corte da prova: 39
- Alertas: 5

Adicionar também um indicador discreto sobre comunicação:

Último e-mail enviado:
- Data/hora: “21/10/2025 às 09:18”
- Responsável: “Ana Souza”
- Destinatários: “37 alunos com pendências”
- Status: “Enviado”

Esse indicador pode aparecer como um pequeno card ao lado dos cards principais ou como uma linha informativa logo abaixo dos botões.

Botões principais:
- “Atualizar dados”
- “Submeter dados dos cursos”
- “Submeter notas da prova”
- “Cadastrar aluno”
- “Enviar mensagem”

====================================================================
MODAL “ENVIAR MENSAGEM”
====================================================================

Ao clicar no botão “Enviar mensagem”, abrir um modal com o título:
“Enviar mensagem aos alunos”

Subtítulo:
“Comunique os alunos sobre pendências na conclusão dos cursos obrigatórios do nivelamento.”

Dentro do modal, deve existir uma seção de seleção de destinatários:

Opções de destinatários:
1. Todos os alunos do nivelamento
2. Apenas alunos com cursos obrigatórios pendentes

A opção “Apenas alunos com cursos obrigatórios pendentes” deve vir selecionada por padrão.

Mostrar um resumo dinâmico dos destinatários:
- Total de alunos selecionados: 37
- Alunos com cursos obrigatórios pendentes: 37
- Alunos sem pendências: 0

Se o usuário selecionar “Todos os alunos do nivelamento”, atualizar visualmente o resumo:
- Total de alunos selecionados: 229
- Alunos com cursos obrigatórios pendentes: 37
- Alunos sem pendências: 192

Campos do modal:
- Assunto do e-mail
  Exemplo preenchido: “Pendência na conclusão dos cursos obrigatórios”

- Mensagem
  Exemplo preenchido:
  “Olá, identificamos que você ainda possui pendências em um ou mais cursos obrigatórios da etapa de Nivelamento. A conclusão desses cursos é necessária para continuar no processo, conforme as regras do edital. Acesse a plataforma e regularize sua situação dentro do prazo.”


Rodapé do modal:
- Botão secundário: “Cancelar”
- Botão primário: “Enviar mensagem”

Comportamento de protótipo:
- Ao clicar em “Enviar mensagem”, exibir confirmação:
  “Mensagem enviada com sucesso para 37 alunos.”
- Após o envio, atualizar o indicador de último e-mail enviado na sub-aba Nivelamento:
  - Último e-mail enviado: data e horário atual simulados
  - Responsável: usuário logado
  - Destinatários: quantidade selecionada
  - Status: Enviado

Caso o usuário tente fechar o modal sem enviar:
- Fechar normalmente, sem necessidade de confirmação.

====================================================================
MODAL “ATUALIZAR DADOS”
====================================================================

“Atualizar dados” deve abrir um modal voltado para os alunos do nivelamento.

Opções:
1. Importar alunos do nivelamento
2. Cadastrar aluno individualmente
3. Atualizar status de participação

Validação:
Se algum aluno estiver em outro programa vigente, exibir alerta.

Exemplo de alerta:
“2 alunos encontrados em outro programa vigente.”
Botão/link: “Ver conflitos”

====================================================================
ÁREA 1 — CURSOS
====================================================================

Criar uma seção visual chamada “Cursos do Nivelamento”.

Essa seção deve mostrar os cursos cadastrados no programa, separando claramente obrigatórios e não obrigatórios.

Cursos:
- Introdução à Plataforma de EaD da BRISA
- Lógica de Programação com Python
- Programação Python
- Organização de Computadores
- Banco de Dados
- Empreendedorismo e Gerência de Projetos
- Desenvolvimento de Aplicativos Mobile
- Business Intelligence
- Introdução a Big Data
- Introdução à Inteligência Artificial
- Introdução à Internet das Coisas
- Introdução à Engenharia de Requisitos
- Introdução ao Treinamento de IA
- Introdução à UI/UX

Cada curso deve aparecer como card ou linha com:
- Nome do curso
- Badge “Obrigatório” ou “Não obrigatório”
- Área
- Carga horária
- Percentual médio de conclusão dos alunos
- Barra de progresso
- Média de nota
- Quantidade de alunos concluídos
- Quantidade de alunos com pendência

Os cursos obrigatórios devem ter badge mais chamativo, pois a não conclusão implica reprovação/desclassificação do aluno no nivelamento.

Cursos devem ser clicáveis.
Ao clicar em um curso, abrir painel lateral ou modal com:
- Nome
- Descrição
- Área
- Carga horária
- Se é obrigatório ou não
- Média de conclusão
- Média de notas
- Alunos com pendência
- Última atualização via planilha

Botão “Submeter dados dos cursos”:
Abrir modal de upload:
- Título: “Submeter dados dos cursos”
- Área para arrastar arquivo CSV/XLSX
- Mostrar colunas esperadas:
  CPF, Nome, Curso, Percentual de conclusão, Nota, Status, Data de atualização

Após upload, mostrar mensagem de sucesso e resumo:
- “229 registros atualizados”
- “37 alunos com cursos obrigatórios pendentes”
- “5 alunos com pendências críticas”
- “2 conflitos com outros programas vigentes”

Após a submissão da planilha, caso existam alunos com cursos obrigatórios pendentes, mostrar um alerta discreto abaixo da seção de cursos:
“37 alunos ainda possuem pendências em cursos obrigatórios.”
Botão de ação: “Enviar mensagem”

Esse botão deve abrir o mesmo modal “Enviar mensagem”, já filtrado para “Apenas alunos com cursos obrigatórios pendentes”.

====================================================================
ÁREA 2 — PROVA FINAL DO NIVELAMENTO
====================================================================

A prova deve ficar dentro da sub-aba “Nivelamento”, abaixo da seção de Cursos
Criar uma seção chamada:
“Prova Final do Nivelamento”

Essa seção deve ter um card próprio, com separação visual em relação aos cursos.

Objetivo:
Mostrar os dados da prova final do nivelamento, sem criar uma nova aba.

Cards/indicadores da prova:
- Data da prova: 22/10/2025
- Quantidade de questões: 80
- Duração: 1 hora
- Média geral: 63,4
- Maior nota: 78
- Nota de corte: 39

Critério visual:
Mostrar uma observação curta:
“A aprovação no nivelamento considera nota igual ou superior a 50% da maior nota obtida na turma, além da conclusão dos cursos obrigatórios.”

Botão:
“Submeter notas da prova”

Modal de upload da prova:
- Título: “Submeter notas da prova”
- Subtítulo: “Envie a planilha com as notas finais e o desempenho por questão.”
- Arquivo CSV/XLSX
- Colunas esperadas:
  CPF, Nome, Nota final, Tempo de conclusão, Q1, Q2, Q3... Q80, Área/Assunto

Após upload, mostrar resumo:
- “229 notas processadas”

Gráficos dentro da seção da prova:
- Distribuição de notas
- Tempo médio de conclusão
- Taxa de acerto por questão
- Taxa de acerto por assunto

Evitar excesso de gráficos grandes.
Usar cards e gráficos compactos.


====================================================================
LISTA DE ALUNOS NO NIVELAMENTO
====================================================================

Ao final da sub-aba, mostrar uma lista compacta dos alunos do nivelamento.

Essa lista deve ter menos destaque do que as seções “Cursos” e “Prova Final”.

Tabela:
- Nome
- CPF
- Percentual geral de conclusão
- Cursos obrigatórios concluídos
- Cursos obrigatórios pendentes
- Prova realizada?
- Nota da prova
- Status

Status possíveis:
- Regular
- Pendente em obrigatório
- Aguardando prova
- Aprovado
- Lista de espera
- Reprovado
- Conflito em outro programa

Regras visuais:
- Alunos com cursos obrigatórios pendentes devem ter badge amarelo ou laranja.
- Alunos próximos do prazo final com pendências obrigatórias devem ter alerta vermelho.
- Alunos que não concluíram cursos obrigatórios não devem aparecer como aprovados, mesmo que tenham nota suficiente na prova.

====================================================================
ORGANIZAÇÃO VISUAL DA SUB-ABA
====================================================================

A ordem final da sub-aba “Nivelamento” deve ser:

1. Cards principais do nivelamento
2. Indicador de último e-mail enviado
3. Botões de ação
4. Seção “Cursos do Nivelamento”
5. Seção “Prova Final do Nivelamento”
6. Lista compacta de alunos no nivelamento

A prova deve estar visualmente separada dos cursos, mas dentro da mesma sub-aba “Nivelamento”.
Não criar aba ou sub-aba própria para “Prova”.

====================================================================
8.2 SUB-ABA “IMERSÃO”
====================================================================

Objetivo:
Mostrar a fase final do programa, seus alunos, grupos, avaliações parcial/final, notas e riscos.

Topo da sub-aba:
Cards:
- Total de grupos: 10
- Total de alunos: 50
- Alunos ativos: 44
- Nota de corte parcial: 3,75
- Nota de corte final: 75% da maior pontuação
- Alunos em risco: 3

Botões:
- “Importar alunos da imersão”
- “Submeter notas”
- “Atualizar presença”
- “Cadastrar grupo”

“Importar alunos da imersão”:
Modal de upload com validação de conflito em outro programa vigente.

“Submeter notas”:
Modal de upload com opção de escolher:
- Avaliação parcial ou Avaliação final

A tela de imersão deve organizar os alunos por grupo.

Cada grupo deve aparecer como um card grande com cabeçalho contendo:
- Nome do grupo
- Professor orientador
- Empresa parceira
- Projeto em desenvolvimento
- Quantidade de alunos
- Média parcial
- Média final
- Status do grupo

Exemplo:
Grupo 01 — Orion
Orientador: Prof. João Silva
Empresa parceira: BRISA
Projeto: Plataforma de Gestão Acadêmica
Alunos: 5
Média parcial: 4,2
Média final: 4,5

Dentro de cada card de grupo, criar abas internas:
1. Resumo
2. Avaliação parcial
3. Avaliação final
4. Presença

====================================================================
8.2.1 GRUPO > ABA “RESUMO”
====================================================================

Mostrar tabela com:
- Nome do aluno
- Média da avaliação parcial
- Média da avaliação final
- Situação
- Alertas

Médias abaixo da nota de corte devem aparecer em vermelho.
Médias próximas da nota de corte devem aparecer em laranja.
Médias seguras devem aparecer em verde.

Também mostrar:
- Projeto do grupo
- Descrição curta do projeto
- Empresa parceira
- Professor orientador
- Última atualização das notas

====================================================================
8.2.2 GRUPO > ABA “AVALIAÇÃO PARCIAL”
====================================================================

A avaliação parcial deve ter sub-abas internas:
1. Banca
2. Pares
3. Orientador
4. Final

Sub-aba “Banca”:
Mostrar nota dos avaliadores e média.
A banca deve ser representada por:
- Professor orientador
- Gestor/coordenador do projeto
- Convidado da empresa parceira

Tabela:
- Avaliador
- Papel
- Nota
- Observação

Também mostrar média da banca.

Sub-aba “Pares”:
Mostrar lista de alunos do grupo e a média recebida em cada critério:
- Colaboração
- Liderança
- Empatia
- Respeito
- Liberdade

Tabela:
- Aluno avaliado
- Colaboração
- Liderança
- Empatia
- Respeito
- Liberdade
- Média dos pares

Interação:
Ao clicar no nome de um aluno, abrir um card/painel detalhado mostrando qual colega deu cada nota em cada critério.
Exemplo:
Aluno avaliado: Maria Souza
Notas recebidas:
- João: Colaboração 5, Liderança 4, Empatia 5...
- Ana: Colaboração 4, Liderança 5, Empatia 4...

Sub-aba “Orientador”:
Mostrar critérios:
- Proatividade
- Comunicação
- Organização
- Resiliência
- Trabalho em Equipe

Tabela:
- Aluno
- Proatividade
- Comunicação
- Organização
- Resiliência
- Trabalho em Equipe
- Média do orientador

Sub-aba “Final”:
Mostrar composição da avaliação parcial:
- Nome do aluno
- Nota da banca
- Nota dos pares
- Nota do orientador
- Média das avaliações
- Peso aplicado
- Situação

Médias abaixo da nota de corte devem ficar em vermelho.

====================================================================
8.2.3 GRUPO > ABA “AVALIAÇÃO FINAL”
====================================================================

A avaliação final deve ter a mesma estrutura da avaliação parcial:
Sub-abas:
1. Banca
2. Pares
3. Orientador
4. Final

Mostrar os mesmos critérios, tabelas e interações.
Na sub-aba “Final”, indicar visualmente que a avaliação final tem peso maior na composição final do aluno.

Mostrar também um resumo:
Nota final do aluno = avaliação parcial + avaliação final ponderada.
Usar visual simples, sem deixar a tela poluída.

====================================================================
8.2.4 GRUPO > ABA “PRESENÇA”
====================================================================

Adicionar uma aba de presença dentro do grupo, pois a imersão possui encontros presenciais obrigatórios com o professor orientador.

Mostrar:
- Lista de encontros semanais
- Data
- Status da presença de cada aluno
- Faltas justificadas
- Faltas não justificadas
- Alunos em risco

Regras visuais:
- 2 faltas não justificadas: alerta amarelo
- 3 faltas não justificadas: alerta vermelho / risco de exclusão
- 6 faltas totais: alerta crítico
