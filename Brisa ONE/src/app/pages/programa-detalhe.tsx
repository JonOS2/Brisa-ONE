import { useState } from 'react';
import {
  ArrowLeft, Edit2, MapPin, Calendar, Building2, TrendingUp, AlertTriangle,
  CheckCircle, Upload, Download, Users, Target, Clock, Award, BookOpen,
  GraduationCap, Briefcase, X, ChevronRight, Search, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../components/ui/utils';

const tabs = [
  { id: 'visao-geral', label: 'Visão Geral' },
  { id: 'pessoas', label: 'Pessoas' },
  { id: 'processo-seletivo', label: 'Processo Seletivo' },
  { id: 'etapas', label: 'Etapas' },
];

const grupos = [
  {
    id: 1,
    nome: 'Grupo 03',
    tema: 'Plataforma de Gestão Acadêmica',
    orientador: 'Prof. João Silva',
    membros: 5,
    mediaParcial: 7.8,
    mediaFinal: 8.4,
    status: 'ok',
    proximaApresentacao: '03/05/2026',
  },
  {
    id: 2,
    nome: 'Grupo 07',
    tema: 'Sistema de Controle de Estoque',
    orientador: 'Prof. Maria Santos',
    membros: 4,
    mediaParcial: 8.2,
    mediaFinal: 8.9,
    status: 'ok',
    proximaApresentacao: '03/05/2026',
  },
  {
    id: 3,
    nome: 'Grupo 12',
    tema: 'App de Mobilidade Urbana',
    orientador: 'Prof. Carlos Oliveira',
    membros: 5,
    mediaParcial: 6.5,
    mediaFinal: 7.2,
    status: 'atencao',
    proximaApresentacao: '03/05/2026',
  },
];

const cronograma = [
  { marco: 'Período de Inscrição', data: '01/02 - 28/02', status: 'concluido' },
  { marco: 'Divulgação Resultado Preliminar', data: '05/03', status: 'concluido' },
  { marco: 'Período de Recursos', data: '06/03 - 10/03', status: 'concluido' },
  { marco: 'Resultado Final', data: '15/03', status: 'concluido' },
  { marco: 'Confirmação de Participação', data: '16/03 - 20/03', status: 'concluido' },
  { marco: 'Nivelamento', data: '21/03 - 30/04', status: 'concluido' },
  { marco: 'Prova Final', data: '01/05', status: 'concluido' },
  { marco: 'Divulgação Imersão', data: '10/05', status: 'concluido' },
  { marco: 'Assinatura de Contratos', data: '11/05 - 20/05', status: 'andamento' },
  { marco: 'Início da Imersão', data: '01/06', status: 'proximo' },
  { marco: 'Treinamento Presencial', data: '01/06 - 07/06', status: 'proximo' },
  { marco: 'Avaliação Parcial', data: '15/08', status: 'futuro' },
  { marco: 'Avaliação Final', data: '15/11', status: 'futuro' },
  { marco: 'Emissão de Certificados', data: '30/11', status: 'futuro' },
];

export function ProgramaDetalhe() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('visao-geral');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [editSection, setEditSection] = useState('dados-gerais');
  const [showAtualizarDadosModal, setShowAtualizarDadosModal] = useState(false);
  const [atualizarDadosAction, setAtualizarDadosAction] = useState<string | null>(null);

  // Etapas tab states
  const [etapasSubTab, setEtapasSubTab] = useState('nivelamento');
  const [showEnviarMensagemModal, setShowEnviarMensagemModal] = useState(false);
  const [mensagemDestinatarios, setMensagemDestinatarios] = useState('pendentes');
  const [showSubmeterCursosModal, setShowSubmeterCursosModal] = useState(false);
  const [showSubmeterProvaModal, setShowSubmeterProvaModal] = useState(false);
  const [showCursoDetalheModal, setShowCursoDetalheModal] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState<any>(null);
  const [showImportarImersaoModal, setShowImportarImersaoModal] = useState(false);
  const [showSubmeterNotasImersaoModal, setShowSubmeterNotasImersaoModal] = useState(false);
  const [tipoAvaliacaoImersao, setTipoAvaliacaoImersao] = useState('parcial');
  const [grupoExpandido, setGrupoExpandido] = useState<number | null>(null);
  const [grupoTabAtiva, setGrupoTabAtiva] = useState('resumo');
  const [avaliacaoSubTab, setAvaliacaoSubTab] = useState('banca');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header do Programa */}
      <header className="bg-white border-b border-slate-200">
        <div className="px-8 py-6">
          <div className="flex items-start justify-between mb-6">
            <button
              onClick={() => navigate('/programas')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Voltar para Programas</span>
            </button>
            <Button
              size="sm"
              className="bg-teal-500 hover:bg-teal-600 text-white"
              onClick={() => setShowEditModal(true)}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Editar programa
            </Button>
          </div>

          {/* Informações principais */}
          <div>
            <div className="mb-3">
              <h1 className="font-semibold text-slate-900 text-2xl mb-3">
                Residência em TIC BRISA – EASY/UFAL
              </h1>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1.5 text-sm">
                  <Users className="w-4 h-4 mr-1.5 inline" />
                  Turma UFAL 2025.2
                </Badge>
                <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1.5 text-sm">
                  Em andamento
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 border border-purple-200 px-3 py-1.5 text-sm">
                  Etapa: Imersão
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  EASY/UFAL
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Maceió - AL
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Ago/2025 → Jun/2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Resumo */}
        <div className="px-8 pb-6">
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Inscritos</div>
              <div className="flex items-baseline gap-2 mb-1">
                <div className="text-2xl font-semibold text-slate-900">612</div>
                <div className="text-xs text-slate-500">+48 em lista</div>
              </div>
              <div className="text-xs text-slate-500">Candidatos cadastrados</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Nivelamento</div>
              <div className="flex items-baseline gap-2 mb-1">
                <div className="text-2xl font-semibold text-slate-900">250</div>
                <div className="text-xs text-slate-500">229 ativos</div>
              </div>
              <div className="text-xs text-slate-500">Selecionados</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Imersão</div>
              <div className="flex items-baseline gap-2 mb-1">
                <div className="text-2xl font-semibold text-teal-600">50</div>
                <div className="text-xs text-slate-500">10 grupos</div>
              </div>
              <div className="text-xs text-slate-500">Aprovados para fase final</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Alertas Críticos</div>
              <div className="flex items-baseline gap-2 mb-1">
                <div className="text-2xl font-semibold text-amber-600">7</div>
                <div className="text-xs text-amber-600">3 em risco</div>
              </div>
              <div className="text-xs text-slate-500">Pendências ativas</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-slate-200 overflow-x-auto">
          <div className="px-8 flex items-center min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0",
                  activeTab === tab.id
                    ? "border-teal-500 text-teal-700"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Conteúdo das Abas */}
      <div className="px-8 py-6">
        {/* Visão Geral */}
        {activeTab === 'visao-geral' && (
          <div className="space-y-4">
            {/* Cabeçalho da Situação Atual */}
            <div className="bg-gradient-to-r from-teal-50 to-purple-50 rounded-lg border border-teal-200 p-4">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-base font-semibold text-slate-900">Situação Atual</h3>
                <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs">Em andamento</Badge>
                <Badge className="bg-purple-100 text-purple-700 border border-purple-200 text-xs">Etapa: Imersão</Badge>
              </div>
              <div className="grid grid-cols-6 gap-3 mb-2">
                <div>
                  <div className="text-xs text-slate-600">Período da etapa</div>
                  <div className="text-sm font-semibold text-slate-900">17/11/2025 a 18/05/2026</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600">Próximo marco</div>
                  <div className="text-sm font-semibold text-teal-700">Avaliação parcial</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600">Data</div>
                  <div className="text-sm font-semibold text-slate-900">03/03/2026</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600">Modelo</div>
                  <div className="text-sm font-semibold text-slate-900">Híbrido</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600">Carga horária</div>
                  <div className="text-sm font-semibold text-slate-900">480h</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600">Local</div>
                  <div className="text-sm font-semibold text-slate-900">Maceió - AL</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 border-t border-teal-200 pt-2">
                A turma está em desenvolvimento dos projetos, com avaliação parcial como próximo marco.
              </p>
            </div>

            {/* Ciclo do Programa */}
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900 text-sm">Ciclo do Programa</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">Progresso Geral</span>
                  <span className="text-lg font-bold text-teal-600">65%</span>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                <div className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex items-center gap-1">
                {['Inscrição', 'Processo Seletivo', 'Nivelamento', 'Prova', 'Imersão', 'Avaliação Final', 'Encerramento'].map((etapa, index) => (
                  <div key={index} className="flex items-center flex-1">
                    <div
                      className={cn(
                        "px-1.5 py-1 rounded text-xs font-medium w-full text-center",
                        index === 4 ? "bg-teal-100 text-teal-700 border border-teal-300" :
                        index < 4 ? "bg-emerald-50 text-emerald-600" :
                        "bg-slate-100 text-slate-500"
                      )}
                    >
                      {etapa}
                    </div>
                    {index < 6 && <div className={cn("w-1 h-0.5", index < 4 ? "bg-emerald-400" : "bg-slate-200")} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo por Etapa */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3 text-sm">Resumo por Etapa</h3>
              <div className="grid grid-cols-3 gap-3">
                {/* Processo Seletivo */}
                <div className="bg-white rounded-lg border border-slate-200 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900 text-sm">Processo Seletivo</h4>
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs">Concluído</Badge>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Inscritos</span>
                      <span className="font-semibold text-slate-900">612</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Vagas nivelamento</span>
                      <span className="font-semibold text-slate-900">250</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Pendências doc.</span>
                      <span className="font-semibold text-amber-600">22</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Conflitos</span>
                      <span className="font-semibold text-amber-600">3</span>
                    </div>
                  </div>
                  <button className="w-full mt-2 text-xs text-teal-600 hover:text-teal-700 font-medium">Ver detalhes →</button>
                </div>

                {/* Nivelamento */}
                <div className="bg-white rounded-lg border border-slate-200 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900 text-sm">Nivelamento</h4>
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs">Concluído</Badge>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Selecionados</span>
                      <span className="font-semibold text-slate-900">250</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Ativos</span>
                      <span className="font-semibold text-slate-900">229</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Cursos obrigatórios</span>
                      <span className="font-semibold text-slate-900">6</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Prova final</span>
                      <span className="font-semibold text-slate-900">22/10/2025</span>
                    </div>
                  </div>
                  <button className="w-full mt-2 text-xs text-teal-600 hover:text-teal-700 font-medium">Ver detalhes →</button>
                </div>

                {/* Imersão */}
                <div className="bg-white rounded-lg border border-slate-200 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900 text-sm">Imersão</h4>
                    <Badge className="bg-teal-100 text-teal-700 text-xs">Em andamento</Badge>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Aprovados</span>
                      <span className="font-semibold text-slate-900">50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Alunos ativos</span>
                      <span className="font-semibold text-slate-900">44</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Grupos formados</span>
                      <span className="font-semibold text-slate-900">10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Avaliação Final</span>
                      <span className="font-semibold text-slate-900">30/11/2025</span>
                    </div>
                  </div>
                  <button className="w-full mt-2 text-xs text-teal-600 hover:text-teal-700 font-medium">Ver detalhes →</button>
                </div>
              </div>
            </div>

            {/* Cronograma Resumido */}
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900 mb-3 text-sm">Cronograma Resumido</h3>
              <div className="space-y-2">
                {cronograma.slice(0, 6).map((marco, index) => (
                  <div key={index} className="flex items-center gap-3 py-1.5 border-b border-slate-100 last:border-0">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                      marco.status === 'concluido' && "bg-emerald-100",
                      marco.status === 'andamento' && "bg-teal-100",
                      marco.status === 'proximo' && "bg-blue-100",
                      marco.status === 'futuro' && "bg-slate-100"
                    )}>
                      {marco.status === 'concluido' && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                      {marco.status === 'andamento' && <TrendingUp className="w-3 h-3 text-teal-600" />}
                      {marco.status === 'proximo' && <Clock className="w-3 h-3 text-blue-600" />}
                      {marco.status === 'futuro' && <Calendar className="w-3 h-3 text-slate-400" />}
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm text-slate-900">{marco.marco}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-600">{marco.data}</span>
                        <Badge className={cn(
                          "text-xs",
                          marco.status === 'concluido' && "bg-emerald-100 text-emerald-700",
                          marco.status === 'andamento' && "bg-teal-100 text-teal-700",
                          marco.status === 'proximo' && "bg-blue-100 text-blue-700",
                          marco.status === 'futuro' && "bg-slate-100 text-slate-600"
                        )}>
                          {marco.status === 'concluido' && 'Concluído'}
                          {marco.status === 'andamento' && 'Em andamento'}
                          {marco.status === 'proximo' && 'Próximo'}
                          {marco.status === 'futuro' && 'Futuro'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 text-xs text-teal-600 hover:text-teal-700 font-medium">Ver cronograma completo →</button>
            </div>

            {/* Distribuição dos Alunos */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3 text-sm">Distribuição dos Alunos</h3>
              <div className="grid grid-cols-2 gap-3">
                {/* Distribuição por Cota */}
                <div className="bg-white rounded-lg border border-slate-200 p-3">
                  <h4 className="font-medium text-slate-900 mb-2 text-xs">Por Cota</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Ampla Concorrência', valor: 45, cor: 'bg-blue-500' },
                      { label: 'Mulheres', valor: 25, cor: 'bg-purple-500' },
                      { label: 'Negros/Pardos', valor: 15, cor: 'bg-amber-500' },
                      { label: 'PCD/Neurodivergente', valor: 10, cor: 'bg-teal-500' },
                      { label: '45+', valor: 5, cor: 'bg-slate-500' },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs text-slate-600">{item.label}</span>
                          <span className="text-xs font-semibold text-slate-900">{item.valor}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className={cn("h-1.5 rounded-full", item.cor)} style={{ width: `${item.valor}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distribuição por Gênero */}
                <div className="bg-white rounded-lg border border-slate-200 p-3">
                  <h4 className="font-medium text-slate-900 mb-2 text-xs">Por Gênero</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Feminino', valor: 42 },
                      { label: 'Masculino', valor: 56 },
                      { label: 'Outro', valor: 1 },
                      { label: 'Não inf.', valor: 1 },
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-bold text-slate-900">{item.valor}%</div>
                        <div className="text-xs text-slate-600">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distribuição por Cidade/UF */}
                <div className="bg-white rounded-lg border border-slate-200 p-3">
                  <h4 className="font-medium text-slate-900 mb-2 text-xs">Por Cidade/UF</h4>
                  <div className="space-y-1.5">
                    {[
                      { local: 'Maceió - AL', qtd: 32 },
                      { local: 'Arapiraca - AL', qtd: 8 },
                      { local: 'Rio Largo - AL', qtd: 5 },
                      { local: 'Outros municípios', qtd: 5 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                        <span className="text-xs text-slate-700">{item.local}</span>
                        <span className="text-xs font-semibold text-slate-900">{item.qtd}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distribuição por Tipo de Formação */}
                <div className="bg-white rounded-lg border border-slate-200 p-3">
                  <h4 className="font-medium text-slate-900 mb-2 text-xs">Por Tipo de Formação</h4>
                  <div className="space-y-1.5">
                    {[
                      { tipo: 'Graduação em andamento', qtd: 28 },
                      { tipo: 'Graduação concluída', qtd: 15 },
                      { tipo: 'Curso técnico', qtd: 5 },
                      { tipo: 'Outros cursos', qtd: 2 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                        <span className="text-xs text-slate-700">{item.tipo}</span>
                        <span className="text-xs font-semibold text-slate-900">{item.qtd}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Últimas Atualizações */}
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900 mb-3 text-sm">Últimas Atualizações</h3>
              <div className="space-y-1">
                {[
                  { acao: 'Planilha de notas da prova importada', responsavel: 'Ana Souza', data: '24/10/2025 14:32', status: 'concluído' },
                  { acao: 'Dados dos cursos atualizados', responsavel: 'Carlos Lima', data: '21/10/2025 09:18', status: 'concluído' },
                  { acao: 'Lista de aprovados para imersão atualizada', responsavel: 'Mariana Torres', data: '30/10/2025 16:05', status: 'concluído' },
                  { acao: 'Contratos pendentes identificados', responsavel: 'Sistema', data: '05/11/2025 10:44', status: 'atenção' },
                  { acao: 'Notas da avaliação parcial aguardando envio', responsavel: 'Sistema', data: '25/02/2026 08:20', status: 'pendente' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 py-2 border-b border-slate-100 last:border-0">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full flex-shrink-0",
                      item.status === 'concluído' && "bg-emerald-500",
                      item.status === 'atenção' && "bg-amber-500",
                      item.status === 'pendente' && "bg-slate-400",
                      item.status === 'crítico' && "bg-red-500"
                    )} />
                    <div className="flex-1 flex items-center justify-between gap-3">
                      <span className="text-xs text-slate-900">{item.acao}</span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-slate-600">{item.responsavel}</span>
                        <span className="text-xs text-slate-500">{item.data}</span>
                        <Badge className={cn(
                          "text-xs",
                          item.status === 'concluído' && "bg-emerald-100 text-emerald-700",
                          item.status === 'atenção' && "bg-amber-100 text-amber-700",
                          item.status === 'pendente' && "bg-slate-100 text-slate-600",
                          item.status === 'crítico' && "bg-red-100 text-red-700"
                        )}>
                          {item.status === 'concluído' && 'Concluído'}
                          {item.status === 'atenção' && 'Atenção'}
                          {item.status === 'pendente' && 'Pendente'}
                          {item.status === 'crítico' && 'Crítico'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Aba Etapas (Nivelamento + Imersão + Projetos) */}
        {activeTab === 'etapas' && (
          <div className="space-y-4">
            {/* Sub-tabs para Etapas */}
            <div className="bg-white border-b border-slate-200">
              <div className="px-8 flex items-center gap-1">
                <button
                  onClick={() => setEtapasSubTab('nivelamento')}
                  className={cn(
                    "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                    etapasSubTab === 'nivelamento'
                      ? "border-teal-500 text-teal-700"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  )}
                >
                  Nivelamento
                </button>
                <button
                  onClick={() => setEtapasSubTab('imersao')}
                  className={cn(
                    "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                    etapasSubTab === 'imersao'
                      ? "border-teal-500 text-teal-700"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  )}
                >
                  Imersão
                </button>
              </div>
            </div>

            {/* Sub-aba Nivelamento */}
            {etapasSubTab === 'nivelamento' && (
              <div className="space-y-4">
                {/* Cards principais */}
                <div className="grid grid-cols-7 gap-3">
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Alunos no nivelamento</div>
                    <div className="text-2xl font-semibold text-slate-900">250</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Ativos</div>
                    <div className="text-2xl font-semibold text-teal-600">229</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Cursos obrigatórios</div>
                    <div className="text-2xl font-semibold text-slate-900">6</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Cursos não obrigatórios</div>
                    <div className="text-2xl font-semibold text-slate-600">8</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Conclusão obrigatórios</div>
                    <div className="text-2xl font-semibold text-teal-600">78%</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Nota de corte prova</div>
                    <div className="text-2xl font-semibold text-amber-600">39</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Alertas</div>
                    <div className="text-2xl font-semibold text-red-600">5</div>
                  </div>
                </div>

                {/* Último e-mail enviado */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <div>
                        <span className="text-sm font-medium text-blue-900">Último e-mail enviado: </span>
                        <span className="text-sm text-blue-700">21/10/2025 às 09:18 por Ana Souza → 37 alunos com pendências</span>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 text-xs">Enviado</Badge>
                  </div>
                </div>

                {/* Botões de ação */}
                <div className="flex items-center gap-2">
                  <Button onClick={() => setShowAtualizarDadosModal(true)} variant="outline" size="sm">
                    Atualizar dados
                  </Button>
                  <Button onClick={() => setShowSubmeterCursosModal(true)} variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Submeter dados dos cursos
                  </Button>
                  <Button onClick={() => setShowSubmeterProvaModal(true)} variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Submeter notas da prova
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Cadastrar aluno
                  </Button>
                  <Button onClick={() => setShowEnviarMensagemModal(true)} size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                    Enviar mensagem
                  </Button>
                </div>

                {/* Seção Cursos */}
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <h3 className="font-semibold text-slate-900 mb-4">Cursos do Nivelamento</h3>
                  <div className="space-y-2">
                    {[
                      { nome: 'Introdução à Plataforma de EaD da BRISA', obrigatorio: true, area: 'Introdução', cargaHoraria: 4, conclusao: 95, media: 8.5, concluidos: 217, pendentes: 12 },
                      { nome: 'Lógica de Programação com Python', obrigatorio: true, area: 'Programação', cargaHoraria: 20, conclusao: 88, media: 7.8, concluidos: 201, pendentes: 28 },
                      { nome: 'Programação Python', obrigatorio: true, area: 'Programação', cargaHoraria: 40, conclusao: 82, media: 7.5, concluidos: 187, pendentes: 42 },
                      { nome: 'Organização de Computadores', obrigatorio: true, area: 'Fundamentos', cargaHoraria: 24, conclusao: 79, media: 7.2, concluidos: 180, pendentes: 49 },
                      { nome: 'Banco de Dados', obrigatorio: true, area: 'Dados', cargaHoraria: 32, conclusao: 75, media: 7.1, concluidos: 171, pendentes: 58 },
                      { nome: 'Empreendedorismo e Gerência de Projetos', obrigatorio: true, area: 'Gestão', cargaHoraria: 16, conclusao: 85, media: 8.0, concluidos: 194, pendentes: 35 },
                      { nome: 'Desenvolvimento de Aplicativos Mobile', obrigatorio: false, area: 'Desenvolvimento', cargaHoraria: 32, conclusao: 62, media: 7.4, concluidos: 142, pendentes: 87 },
                      { nome: 'Business Intelligence', obrigatorio: false, area: 'Dados', cargaHoraria: 24, conclusao: 58, media: 7.3, concluidos: 132, pendentes: 97 },
                      { nome: 'Introdução a Big Data', obrigatorio: false, area: 'Dados', cargaHoraria: 20, conclusao: 55, media: 7.2, concluidos: 125, pendentes: 104 },
                      { nome: 'Introdução à Inteligência Artificial', obrigatorio: false, area: 'IA', cargaHoraria: 24, conclusao: 51, media: 7.5, concluidos: 116, pendentes: 113 },
                      { nome: 'Introdução à Internet das Coisas', obrigatorio: false, area: 'IoT', cargaHoraria: 20, conclusao: 48, media: 7.1, concluidos: 109, pendentes: 120 },
                      { nome: 'Introdução à Engenharia de Requisitos', obrigatorio: false, area: 'Engenharia', cargaHoraria: 16, conclusao: 53, media: 7.4, concluidos: 121, pendentes: 108 },
                      { nome: 'Introdução ao Treinamento de IA', obrigatorio: false, area: 'IA', cargaHoraria: 20, conclusao: 45, media: 7.0, concluidos: 103, pendentes: 126 },
                      { nome: 'Introdução à UI/UX', obrigatorio: false, area: 'Design', cargaHoraria: 16, conclusao: 50, media: 7.6, concluidos: 114, pendentes: 115 },
                    ].map((curso, index) => (
                      <button
                        key={index}
                        onClick={() => { setCursoSelecionado(curso); setShowCursoDetalheModal(true); }}
                        className="w-full flex items-center justify-between py-3 px-3 border border-slate-200 rounded-lg hover:border-teal-300 hover:bg-teal-50/30 transition-all text-left"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span className="text-sm font-medium text-slate-900">{curso.nome}</span>
                          {curso.obrigatorio && (
                            <Badge className="bg-red-100 text-red-700 border border-red-200 text-xs">Obrigatório</Badge>
                          )}
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-xs">{curso.area}</Badge>
                          <span className="text-xs text-slate-500">{curso.cargaHoraria}h</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-xs text-slate-500 mb-1">{curso.concluidos} concluídos · {curso.pendentes} pendentes</div>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-slate-200 rounded-full h-2">
                                <div className={cn("h-2 rounded-full", curso.conclusao >= 80 ? "bg-emerald-500" : curso.conclusao >= 60 ? "bg-amber-500" : "bg-red-500")} style={{ width: `${curso.conclusao}%` }}></div>
                              </div>
                              <span className="text-sm font-medium text-slate-900 w-12 text-right">{curso.conclusao}%</span>
                            </div>
                          </div>
                          <div className="text-sm text-slate-700 font-medium w-12 text-right">Média: {curso.media}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Alerta de pendências */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span className="text-sm text-amber-900">37 alunos ainda possuem pendências em cursos obrigatórios</span>
                    </div>
                    <Button onClick={() => { setMensagemDestinatarios('pendentes'); setShowEnviarMensagemModal(true); }} size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                      Enviar mensagem
                    </Button>
                  </div>
                </div>

                {/* Seção Prova Final */}
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <h3 className="font-semibold text-slate-900 mb-4">Prova Final do Nivelamento</h3>

                  <div className="grid grid-cols-6 gap-3 mb-4">
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <div className="text-xs text-slate-600 mb-1">Data da prova</div>
                      <div className="text-sm font-semibold text-slate-900">22/10/2025</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <div className="text-xs text-slate-600 mb-1">Questões</div>
                      <div className="text-2xl font-semibold text-slate-900">80</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <div className="text-xs text-slate-600 mb-1">Duração</div>
                      <div className="text-sm font-semibold text-slate-900">1 hora</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <div className="text-xs text-slate-600 mb-1">Média geral</div>
                      <div className="text-2xl font-semibold text-teal-600">63.4</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <div className="text-xs text-slate-600 mb-1">Maior nota</div>
                      <div className="text-2xl font-semibold text-emerald-600">78</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <div className="text-xs text-slate-600 mb-1">Nota de corte</div>
                      <div className="text-2xl font-semibold text-amber-600">39</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-900">
                      <strong>Critério de aprovação:</strong> A aprovação no nivelamento considera nota igual ou superior a 50% da maior nota obtida na turma, além da conclusão dos cursos obrigatórios.
                    </p>
                  </div>
                </div>

                {/* Lista compacta de alunos */}
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <h4 className="font-medium text-slate-900 mb-3">Alunos do Nivelamento</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-600 uppercase">Nome</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-600 uppercase">CPF</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-600 uppercase">% Geral</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-600 uppercase">Obr. Concluídos</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-600 uppercase">Obr. Pendentes</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-600 uppercase">Prova?</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-600 uppercase">Nota Prova</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {[
                          { nome: 'Ana Silva', cpf: '123.456.789-00', percentual: 92, concluidos: 6, pendentes: 0, prova: true, nota: 72, status: 'aprovado' },
                          { nome: 'Bruno Costa', cpf: '234.567.890-11', percentual: 85, concluidos: 6, pendentes: 0, prova: true, nota: 65, status: 'aprovado' },
                          { nome: 'Camila Santos', cpf: '345.678.901-22', percentual: 75, concluidos: 5, pendentes: 1, prova: true, nota: 58, status: 'pendente-obrigatorio' },
                          { nome: 'Daniel Lima', cpf: '456.789.012-33', percentual: 68, concluidos: 4, pendentes: 2, prova: true, nota: 48, status: 'pendente-obrigatorio' },
                          { nome: 'Eduarda Rocha', cpf: '567.890.123-44', percentual: 58, concluidos: 3, pendentes: 3, prova: false, nota: null, status: 'aguardando-prova' },
                        ].map((aluno, index) => (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="px-3 py-2 whitespace-nowrap font-medium text-slate-900">{aluno.nome}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-slate-600">{aluno.cpf}</td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-slate-200 rounded-full h-1.5">
                                  <div className={cn("h-1.5 rounded-full", aluno.percentual >= 80 ? "bg-emerald-500" : aluno.percentual >= 60 ? "bg-amber-500" : "bg-red-500")} style={{ width: `${aluno.percentual}%` }}></div>
                                </div>
                                <span className="text-slate-700 font-medium">{aluno.percentual}%</span>
                              </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-emerald-700 font-medium">{aluno.concluidos}/6</td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              {aluno.pendentes > 0 ? (
                                <span className="text-red-700 font-medium">{aluno.pendentes}</span>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              {aluno.prova ? (
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <X className="w-4 h-4 text-red-500" />
                              )}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap font-medium text-slate-900">
                              {aluno.nota !== null ? aluno.nota : '-'}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <Badge variant="secondary" className={cn(
                                "text-xs",
                                aluno.status === 'aprovado' && "bg-emerald-100 text-emerald-700",
                                aluno.status === 'pendente-obrigatorio' && "bg-amber-100 text-amber-700",
                                aluno.status === 'aguardando-prova' && "bg-slate-100 text-slate-700"
                              )}>
                                {aluno.status === 'aprovado' && 'Aprovado'}
                                {aluno.status === 'pendente-obrigatorio' && 'Pendente obrigatório'}
                                {aluno.status === 'aguardando-prova' && 'Aguardando prova'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-aba Imersão */}
            {etapasSubTab === 'imersao' && (
              <div className="space-y-4">
                {/* Cards principais da imersão */}
                <div className="grid grid-cols-6 gap-3">
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Total de grupos</div>
                    <div className="text-2xl font-semibold text-slate-900">10</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Total de alunos</div>
                    <div className="text-2xl font-semibold text-teal-600">50</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Alunos ativos</div>
                    <div className="text-2xl font-semibold text-emerald-600">44</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Nota de corte parcial</div>
                    <div className="text-sm font-semibold text-amber-600">3,75</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Nota de corte final</div>
                    <div className="text-xs font-semibold text-amber-600">75% da maior</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="text-xs text-slate-600 mb-1">Alunos em risco</div>
                    <div className="text-2xl font-semibold text-red-600">3</div>
                  </div>
                </div>

                {/* Botões de ação da imersão */}
                <div className="flex items-center gap-2">
                  <Button onClick={() => setShowImportarImersaoModal(true)} variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Importar alunos da imersão
                  </Button>
                  <Button onClick={() => setShowSubmeterNotasImersaoModal(true)} variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Submeter notas
                  </Button>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Atualizar presença
                  </Button>
                  <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Cadastrar grupo
                  </Button>
                </div>

                {/* Grupos */}
                <div className="space-y-3">
                  {grupos.map((grupo) => (
                    <div key={grupo.id} className="bg-white rounded-lg border border-slate-200">
                      <div className="p-4 border-b border-slate-200 cursor-pointer hover:bg-slate-50" onClick={() => setGrupoExpandido(grupoExpandido === grupo.id ? null : grupo.id)}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-slate-900">{grupo.nome}</h4>
                              <Badge className={cn("text-xs", grupo.status === 'ok' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                                {grupo.status === 'ok' ? 'OK' : 'Atenção'}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-slate-600">Orientador: </span>
                                <span className="font-medium text-slate-900">{grupo.orientador}</span>
                              </div>
                              <div>
                                <span className="text-slate-600">Projeto: </span>
                                <span className="font-medium text-slate-900">{grupo.tema}</span>
                              </div>
                              <div>
                                <span className="text-slate-600">Alunos: </span>
                                <span className="font-medium text-teal-600">{grupo.membros}</span>
                              </div>
                              <div>
                                <span className="text-slate-600">Média parcial: </span>
                                <span className="font-medium text-emerald-600">{grupo.mediaParcial}</span>
                                <span className="text-slate-600 ml-2">Final: </span>
                                <span className="font-medium text-emerald-600">{grupo.mediaFinal}</span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className={cn("w-5 h-5 text-slate-400 transition-transform", grupoExpandido === grupo.id && "rotate-90")} />
                        </div>
                      </div>

                      {grupoExpandido === grupo.id && (
                        <div className="p-4">
                          {/* Tabs internas do grupo */}
                          <div className="border-b border-slate-200 mb-4">
                            <div className="flex items-center gap-1">
                              {['resumo', 'avaliacao-parcial', 'avaliacao-final', 'presenca'].map((tab) => (
                                <button
                                  key={tab}
                                  onClick={() => setGrupoTabAtiva(tab)}
                                  className={cn(
                                    "px-3 py-2 text-xs font-medium border-b-2 transition-colors",
                                    grupoTabAtiva === tab
                                      ? "border-teal-500 text-teal-700"
                                      : "border-transparent text-slate-600 hover:text-slate-900"
                                  )}
                                >
                                  {tab === 'resumo' && 'Resumo'}
                                  {tab === 'avaliacao-parcial' && 'Avaliação Parcial'}
                                  {tab === 'avaliacao-final' && 'Avaliação Final'}
                                  {tab === 'presenca' && 'Presença'}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Conteúdo das tabs do grupo - versão resumida por limitação de espaço */}
                          {grupoTabAtiva === 'resumo' && (
                            <div className="space-y-3">
                              <div className="text-sm text-slate-700">
                                <p><strong>Projeto:</strong> {grupo.tema}</p>
                                <p><strong>Empresa parceira:</strong> BRISA</p>
                                <p className="text-xs text-slate-600 mt-2">Última atualização de notas: 25/04/2026</p>
                              </div>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead className="bg-slate-50">
                                    <tr>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-slate-600">Aluno</th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-slate-600">Média Parcial</th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-slate-600">Média Final</th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-slate-600">Situação</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-200">
                                    {['João Silva', 'Maria Santos', 'Carlos Oliveira', 'Ana Costa', 'Pedro Lima'].map((nome, i) => {
                                      const mediaParcial = [4.2, 3.8, 4.5, 4.0, 3.5][i];
                                      const mediaFinal = [4.5, 4.1, 4.7, 4.3, 3.8][i];
                                      return (
                                        <tr key={i}>
                                          <td className="px-3 py-2 font-medium text-slate-900">{nome}</td>
                                          <td className="px-3 py-2">
                                            <span className={cn("font-medium", mediaParcial >= 3.75 ? "text-emerald-600" : "text-amber-600")}>{mediaParcial}</span>
                                          </td>
                                          <td className="px-3 py-2">
                                            <span className={cn("font-medium", mediaFinal >= 3.75 ? "text-emerald-600" : "text-amber-600")}>{mediaFinal}</span>
                                          </td>
                                          <td className="px-3 py-2">
                                            <Badge variant="secondary" className={cn("text-xs", mediaFinal >= 3.75 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                                              {mediaFinal >= 3.75 ? 'Regular' : 'Atenção'}
                                            </Badge>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {(grupoTabAtiva === 'avaliacao-parcial' || grupoTabAtiva === 'avaliacao-final') && (
                            <div className="space-y-3">
                              <div className="border-b border-slate-200">
                                <div className="flex items-center gap-1">
                                  {['banca', 'pares', 'orientador', 'final'].map((sub) => (
                                    <button
                                      key={sub}
                                      onClick={() => setAvaliacaoSubTab(sub)}
                                      className={cn(
                                        "px-3 py-1.5 text-xs font-medium border-b-2 transition-colors",
                                        avaliacaoSubTab === sub
                                          ? "border-teal-500 text-teal-700"
                                          : "border-transparent text-slate-600 hover:text-slate-900"
                                      )}
                                    >
                                      {sub.charAt(0).toUpperCase() + sub.slice(1)}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="text-sm text-slate-600">
                                <p>Conteúdo da avaliação {grupoTabAtiva === 'avaliacao-parcial' ? 'parcial' : 'final'} - {avaliacaoSubTab}</p>
                                <p className="text-xs mt-2">Tabelas com critérios e notas por avaliador seriam exibidas aqui.</p>
                              </div>
                            </div>
                          )}

                          {grupoTabAtiva === 'presenca' && (
                            <div className="space-y-3">
                              <p className="text-sm text-slate-700">Presença dos alunos nos encontros semanais</p>
                              <div className="text-xs text-slate-600">
                                <p>• 2 faltas não justificadas: alerta amarelo</p>
                                <p>• 3 faltas não justificadas: alerta vermelho / risco de exclusão</p>
                                <p>• 6 faltas totais: alerta crítico</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Aba Pessoas */}
        {activeTab === 'pessoas' && (
          <div className="space-y-4">
            {/* Filtros */}
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nome, CPF ou e-mail..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                  Pesquisar
                </Button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Etapa</option>
                  <option>Inscrição</option>
                  <option>Nivelamento</option>
                  <option>Imersão</option>
                  <option>Concluído</option>
                  <option>Desligado</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Status</option>
                  <option>Ativa</option>
                  <option>Pendente</option>
                  <option>Concluída</option>
                  <option>Desligada</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Cota</option>
                  <option>Ampla Concorrência</option>
                  <option>PCD/Neurodivergente</option>
                  <option>Negro/Pardo</option>
                  <option>Mulher</option>
                  <option>45+</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Cidade</option>
                  <option>Maceió - AL</option>
                  <option>Arapiraca - AL</option>
                  <option>Rio Largo - AL</option>
                  <option>Outras</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Gênero</option>
                  <option>Feminino</option>
                  <option>Masculino</option>
                  <option>Outro</option>
                  <option>Não informado</option>
                </select>
              </div>
            </div>

            {/* Tabela de Pessoas */}
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Nome</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">CPF</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">E-mail</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Gênero</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Idade</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Cota</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Cidade</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Etapa Atual</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-slate-600 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {[
                      {
                        id: 1,
                        nome: 'Ana Carolina Silva',
                        cpf: '123.456.789-00',
                        email: 'ana.silva@email.com',
                        genero: 'Feminino',
                        idade: 24,
                        cota: 'Mulher',
                        cidade: 'Maceió - AL',
                        etapa: 'Imersão',
                        status: 'ativa',
                      },
                      {
                        id: 2,
                        nome: 'Bruno Henrique Costa',
                        cpf: '234.567.890-11',
                        email: 'bruno.costa@email.com',
                        genero: 'Masculino',
                        idade: 22,
                        cota: 'Ampla Concorrência',
                        cidade: 'Maceió - AL',
                        etapa: 'Imersão',
                        status: 'ativa',
                      },
                      {
                        id: 3,
                        nome: 'Camila Rodrigues Santos',
                        cpf: '345.678.901-22',
                        email: 'camila.santos@email.com',
                        genero: 'Feminino',
                        idade: 26,
                        cota: 'Negro/Pardo',
                        cidade: 'Arapiraca - AL',
                        etapa: 'Imersão',
                        status: 'ativa',
                      },
                      {
                        id: 4,
                        nome: 'Daniel Oliveira Lima',
                        cpf: '456.789.012-33',
                        email: 'daniel.lima@email.com',
                        genero: 'Masculino',
                        idade: 28,
                        cota: 'PCD/Neurodivergente',
                        cidade: 'Maceió - AL',
                        etapa: 'Imersão',
                        status: 'ativa',
                      },
                      {
                        id: 5,
                        nome: 'Eduarda Mendes Rocha',
                        cpf: '567.890.123-44',
                        email: 'eduarda.rocha@email.com',
                        genero: 'Feminino',
                        idade: 23,
                        cota: 'Mulher',
                        cidade: 'Rio Largo - AL',
                        etapa: 'Imersão',
                        status: 'ativa',
                      },
                    ].map((pessoa) => (
                      <tr key={pessoa.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-medium text-slate-900 text-sm">{pessoa.nome}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-600">{pessoa.cpf}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-600">{pessoa.email}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-700">{pessoa.genero}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-700">{pessoa.idade}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge variant="secondary" className="bg-purple-50 text-purple-700 text-xs">{pessoa.cota}</Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-700">{pessoa.cidade}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{pessoa.etapa}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge variant="secondary" className={cn(
                            "text-xs",
                            pessoa.status === 'ativa' && "bg-emerald-100 text-emerald-700",
                            pessoa.status === 'pendente' && "bg-amber-100 text-amber-700",
                            pessoa.status === 'concluida' && "bg-blue-100 text-blue-700",
                            pessoa.status === 'desligada' && "bg-slate-100 text-slate-700"
                          )}>
                            {pessoa.status === 'ativa' && 'Ativa'}
                            {pessoa.status === 'pendente' && 'Pendente'}
                            {pessoa.status === 'concluida' && 'Concluída'}
                            {pessoa.status === 'desligada' && 'Desligada'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <button
                            className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                            title="Visualizar pessoa"
                            onClick={() => window.location.href = `/pessoas/${pessoa.id}`}
                          >
                            <Eye className="w-4 h-4 text-slate-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    Mostrando <span className="font-medium">1-5</span> de <span className="font-medium">44</span> pessoas vinculadas a este programa
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>Anterior</Button>
                    <Button variant="outline" size="sm" className="bg-teal-50 text-teal-700 border-teal-200">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">Próximo</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Aba Processo Seletivo */}
        {activeTab === 'processo-seletivo' && (
          <div className="space-y-4">
            {/* Cards do Processo Seletivo */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <div className="text-xs text-slate-600 mb-1">Total de inscritos</div>
                <div className="text-2xl font-semibold text-slate-900">612</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <div className="text-xs text-slate-600 mb-1">Vagas para nivelamento</div>
                <div className="text-2xl font-semibold text-teal-600">250</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <div className="text-xs text-slate-600 mb-1">Data final de inscrição</div>
                <div className="text-sm font-semibold text-slate-900">04/08/2025</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <div className="text-xs text-slate-600 mb-1">Lista de espera</div>
                <div className="text-2xl font-semibold text-amber-600">48</div>
              </div>
            </div>

            {/* Distribuição de Vagas por Cotas */}
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900 text-sm">Distribuição de Vagas por Cotas</h3>
                <Button
                  size="sm"
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                  onClick={() => setShowAtualizarDadosModal(true)}
                >
                  Atualizar dados
                </Button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { label: 'Ampla concorrência', valor: 124, cor: 'bg-blue-500' },
                  { label: 'PCD/Neurodivergente', valor: 13, cor: 'bg-teal-500' },
                  { label: 'Negros/Pardos', valor: 50, cor: 'bg-amber-500' },
                  { label: 'Mulheres', valor: 50, cor: 'bg-purple-500' },
                  { label: '45+', valor: 13, cor: 'bg-slate-500' },
                ].map((item, index) => (
                  <div key={index} className="text-center p-2 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900 mb-1">{item.valor}</div>
                    <div className="text-xs text-slate-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerta de Conflitos */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-amber-900">3 alunos encontrados em outro programa vigente</span>
              </div>
              <button className="text-sm font-medium text-amber-700 hover:text-amber-800">Ver conflitos →</button>
            </div>

            {/* Tabela de Inscritos */}
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Nome</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">CPF</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">E-mail</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Gênero</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Idade</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Cota</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Cidade</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Formação</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {[
                      {
                        id: 1,
                        nome: 'Ana Carolina Silva',
                        cpf: '123.456.789-00',
                        email: 'ana.silva@email.com',
                        genero: 'Feminino',
                        idade: 24,
                        cota: 'Mulher',
                        cidade: 'Maceió - AL',
                        formacao: 'Graduação',
                        status: 'aprovado',
                      },
                      {
                        id: 2,
                        nome: 'Bruno Henrique Costa',
                        cpf: '234.567.890-11',
                        email: 'bruno.costa@email.com',
                        genero: 'Masculino',
                        idade: 22,
                        cota: 'Ampla Concorrência',
                        cidade: 'Maceió - AL',
                        formacao: 'Graduação',
                        status: 'aprovado',
                      },
                      {
                        id: 3,
                        nome: 'Camila Rodrigues Santos',
                        cpf: '345.678.901-22',
                        email: 'camila.santos@email.com',
                        genero: 'Feminino',
                        idade: 26,
                        cota: 'Negro/Pardo',
                        cidade: 'Arapiraca - AL',
                        formacao: 'Técnico',
                        status: 'conflito',
                      },
                      {
                        id: 4,
                        nome: 'Daniel Oliveira Lima',
                        cpf: '456.789.012-33',
                        email: 'daniel.lima@email.com',
                        genero: 'Masculino',
                        idade: 28,
                        cota: 'PCD/Neurodivergente',
                        cidade: 'Maceió - AL',
                        formacao: 'Graduação',
                        status: 'lista-espera',
                      },
                      {
                        id: 5,
                        nome: 'Eduarda Mendes Rocha',
                        cpf: '567.890.123-44',
                        email: 'eduarda.rocha@email.com',
                        genero: 'Feminino',
                        idade: 23,
                        cota: 'Mulher',
                        cidade: 'Rio Largo - AL',
                        formacao: 'Graduação',
                        status: 'inscrito',
                      },
                      {
                        id: 6,
                        nome: 'Fernando Santos Alves',
                        cpf: '678.901.234-55',
                        email: 'fernando.alves@email.com',
                        genero: 'Masculino',
                        idade: 25,
                        cota: 'Ampla Concorrência',
                        cidade: 'Maceió - AL',
                        formacao: 'Graduação',
                        status: 'nao-selecionado',
                      },
                    ].map((pessoa) => (
                      <tr key={pessoa.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900 text-sm">{pessoa.nome}</span>
                            {pessoa.status === 'conflito' && (
                              <AlertTriangle className="w-4 h-4 text-amber-500" title="Conflito em outro programa" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-600">{pessoa.cpf}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-600">{pessoa.email}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-700">{pessoa.genero}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-700">{pessoa.idade}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge variant="secondary" className="bg-purple-50 text-purple-700 text-xs">{pessoa.cota}</Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-700">{pessoa.cidade}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-700">{pessoa.formacao}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge variant="secondary" className={cn(
                            "text-xs",
                            pessoa.status === 'inscrito' && "bg-blue-100 text-blue-700",
                            pessoa.status === 'em-analise' && "bg-purple-100 text-purple-700",
                            pessoa.status === 'lista-espera' && "bg-amber-100 text-amber-700",
                            pessoa.status === 'aprovado' && "bg-emerald-100 text-emerald-700",
                            pessoa.status === 'nao-selecionado' && "bg-slate-100 text-slate-700",
                            pessoa.status === 'conflito' && "bg-red-100 text-red-700"
                          )}>
                            {pessoa.status === 'inscrito' && 'Inscrito'}
                            {pessoa.status === 'em-analise' && 'Em análise'}
                            {pessoa.status === 'lista-espera' && 'Lista de espera'}
                            {pessoa.status === 'aprovado' && 'Aprovado'}
                            {pessoa.status === 'nao-selecionado' && 'Não selecionado'}
                            {pessoa.status === 'conflito' && 'Conflito em outro programa'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    Mostrando <span className="font-medium">1-6</span> de <span className="font-medium">612</span> inscritos
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>Anterior</Button>
                    <Button variant="outline" size="sm" className="bg-teal-50 text-teal-700 border-teal-200">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">Próximo</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Outras abas com placeholder */}
        {!['visao-geral', 'pessoas', 'processo-seletivo', 'etapas'].includes(activeTab) && (
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
            <p className="text-slate-600">Conteúdo da aba <strong>{tabs.find(t => t.id === activeTab)?.label}</strong> em desenvolvimento</p>
          </div>
        )}
      </div>

      {/* Modal: Editar Programa */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Editar programa</h2>
                <p className="text-sm text-slate-600 mt-1">Revise e atualize as informações cadastradas para esta turma.</p>
              </div>
              <button
                onClick={() => setShowDiscardModal(true)}
                className="p-2 hover:bg-slate-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar de Seções */}
              <div className="w-64 bg-slate-50 border-r border-slate-200 p-4 overflow-y-auto">
                <nav className="space-y-1">
                  {[
                    { id: 'dados-gerais', label: 'Dados gerais' },
                    { id: 'parceiros', label: 'Parceiros e localização' },
                    { id: 'inscricao', label: 'Inscrição e processo seletivo' },
                    { id: 'cotas', label: 'Cotas e vagas' },
                    { id: 'nivelamento', label: 'Nivelamento' },
                    { id: 'prova', label: 'Prova final' },
                    { id: 'imersao', label: 'Imersão e projetos' },
                    { id: 'avaliacoes', label: 'Avaliações' },
                    { id: 'cronograma', label: 'Cronograma' },
                    { id: 'regras', label: 'Regras e documentos' },
                  ].map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setEditSection(section.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between",
                        editSection === section.id
                          ? "bg-teal-100 text-teal-700"
                          : "text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      {section.label}
                      {editSection === section.id && <ChevronRight className="w-4 h-4" />}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Conteúdo do Formulário */}
              <div className="flex-1 p-6 overflow-y-auto">
                {editSection === 'dados-gerais' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 mb-4">Dados gerais</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nome do programa</label>
                        <input type="text" defaultValue="Residência em TIC BRISA" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Código/Turma</label>
                        <input type="text" defaultValue="UFAL 2025.2" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Data de início</label>
                        <input type="date" defaultValue="2025-08-01" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Data de término</label>
                        <input type="date" defaultValue="2026-06-30" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Status do programa</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                          <option>Em andamento</option>
                          <option>Planejamento</option>
                          <option>Encerrado</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Etapa atual</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                          <option>Imersão</option>
                          <option>Nivelamento</option>
                          <option>Inscrição</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {editSection === 'parceiros' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 mb-4">Parceiros e localização</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Instituição executora</label>
                        <input type="text" defaultValue="EASY/UFAL" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Empresa parceira</label>
                        <input type="text" defaultValue="EASY" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Cidade</label>
                        <input type="text" defaultValue="Maceió" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                          <option>AL</option>
                          <option>PE</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {editSection === 'cotas' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 mb-4">Cotas e vagas</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Vagas no nivelamento</label>
                        <input type="number" defaultValue="250" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Vagas na imersão</label>
                        <input type="number" defaultValue="50" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Critérios de cotas</label>
                        <div className="space-y-2">
                          {['PCD/Neurodivergente', 'Negro/Pardo', 'Mulheres', '45+'].map((cota) => (
                            <label key={cota} className="flex items-center gap-2">
                              <input type="checkbox" defaultChecked className="rounded" />
                              <span className="text-sm text-slate-700">{cota}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!['dados-gerais', 'parceiros', 'cotas'].includes(editSection) && (
                  <div className="text-center py-12">
                    <p className="text-slate-600">Formulário para <strong>{editSection}</strong> em desenvolvimento</p>
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDiscardModal(true)}>
                Descartar mudanças
              </Button>
              <Button
                className="bg-teal-500 hover:bg-teal-600 text-white"
                onClick={() => {
                  setShowEditModal(false);
                  alert('Alterações salvas com sucesso!');
                }}
              >
                Salvar alterações
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirmar Descarte */}
      {showDiscardModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">Descartar alterações?</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-700">
                Você tem alterações não salvas. Deseja realmente descartar essas mudanças?
              </p>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDiscardModal(false)}>
                Continuar editando
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  setShowDiscardModal(false);
                  setShowEditModal(false);
                }}
              >
                Descartar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Enviar mensagem */}
      {showEnviarMensagemModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Enviar mensagem aos alunos</h2>
                <p className="text-sm text-slate-600 mt-1">Comunique os alunos sobre pendências na conclusão dos cursos obrigatórios do nivelamento.</p>
              </div>
              <button onClick={() => setShowEnviarMensagemModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Destinatários</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="destinatarios"
                      checked={mensagemDestinatarios === 'todos'}
                      onChange={() => setMensagemDestinatarios('todos')}
                      className="text-teal-600"
                    />
                    <span className="text-sm text-slate-700">Todos os alunos do nivelamento</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="destinatarios"
                      checked={mensagemDestinatarios === 'pendentes'}
                      onChange={() => setMensagemDestinatarios('pendentes')}
                      className="text-teal-600"
                    />
                    <span className="text-sm text-slate-700">Apenas alunos com cursos obrigatórios pendentes</span>
                  </label>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mt-3 text-sm">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-slate-600">Total selecionados: </span>
                      <span className="font-semibold text-slate-900">{mensagemDestinatarios === 'todos' ? '229' : '37'}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Com pendências: </span>
                      <span className="font-semibold text-amber-700">37</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Sem pendências: </span>
                      <span className="font-semibold text-emerald-700">{mensagemDestinatarios === 'todos' ? '192' : '0'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assunto do e-mail</label>
                <input
                  type="text"
                  defaultValue="Pendência na conclusão dos cursos obrigatórios"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mensagem</label>
                <textarea
                  rows={6}
                  defaultValue="Olá, identificamos que você ainda possui pendências em um ou mais cursos obrigatórios da etapa de Nivelamento. A conclusão desses cursos é necessária para continuar no processo, conforme as regras do edital. Acesse a plataforma e regularize sua situação dentro do prazo."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none"
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setShowEnviarMensagemModal(false)}>Cancelar</Button>
              <Button
                className="bg-teal-500 hover:bg-teal-600 text-white"
                onClick={() => {
                  setShowEnviarMensagemModal(false);
                  alert(`Mensagem enviada com sucesso para ${mensagemDestinatarios === 'todos' ? '229' : '37'} alunos.`);
                }}
              >
                Enviar mensagem
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Submeter dados dos cursos */}
      {showSubmeterCursosModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Submeter dados dos cursos</h2>
                <p className="text-sm text-slate-600 mt-1">Envie a planilha com os dados de conclusão e notas dos cursos</p>
              </div>
              <button onClick={() => setShowSubmeterCursosModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-slate-700 mb-3">A planilha deve conter as seguintes colunas:</p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {['CPF', 'Nome', 'Curso', 'Percentual de conclusão', 'Nota', 'Status', 'Data de atualização'].map((col, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span className="text-slate-700">{col}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-teal-400 hover:bg-teal-50/30 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-900 mb-1">Clique para selecionar ou arraste o arquivo</p>
                <p className="text-xs text-slate-600">Formatos aceitos: .xlsx, .xls, .csv (máx. 10MB)</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-900 mb-2">Após o envio, o sistema processará:</p>
                <ul className="text-xs text-blue-700 space-y-1 ml-4 list-disc">
                  <li>Atualização dos percentuais de conclusão</li>
                  <li>Registro das notas obtidas</li>
                  <li>Identificação de alunos com pendências em cursos obrigatórios</li>
                  <li>Verificação de conflitos com outros programas vigentes</li>
                </ul>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setShowSubmeterCursosModal(false)}>Cancelar</Button>
              <Button
                className="bg-teal-500 hover:bg-teal-600 text-white"
                onClick={() => {
                  setShowSubmeterCursosModal(false);
                  alert('Planilha processada: 229 registros atualizados, 37 alunos com pendências em obrigatórios, 2 conflitos detectados.');
                }}
              >
                Submeter planilha
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Submeter notas da prova */}
      {showSubmeterProvaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Submeter notas da prova</h2>
                <p className="text-sm text-slate-600 mt-1">Envie a planilha com as notas finais e o desempenho por questão</p>
              </div>
              <button onClick={() => setShowSubmeterProvaModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-slate-700 mb-3">A planilha deve conter as seguintes colunas:</p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="text-sm space-y-1">
                    <p><strong>Obrigatórias:</strong> CPF, Nome, Nota final, Tempo de conclusão</p>
                    <p><strong>Questões:</strong> Q1, Q2, Q3... Q80 (respostas ou pontuação por questão)</p>
                    <p><strong>Opcional:</strong> Área/Assunto (para análise por tema)</p>
                  </div>
                </div>
              </div>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-teal-400 hover:bg-teal-50/30 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-900 mb-1">Clique para selecionar ou arraste o arquivo</p>
                <p className="text-xs text-slate-600">Formatos aceitos: .xlsx, .xls, .csv (máx. 10MB)</p>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setShowSubmeterProvaModal(false)}>Cancelar</Button>
              <Button
                className="bg-teal-500 hover:bg-teal-600 text-white"
                onClick={() => {
                  setShowSubmeterProvaModal(false);
                  alert('229 notas processadas com sucesso!');
                }}
              >
                Submeter notas
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Detalhes do curso */}
      {showCursoDetalheModal && cursoSelecionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{cursoSelecionado.nome}</h2>
                <div className="flex items-center gap-2 mt-1">
                  {cursoSelecionado.obrigatorio && (
                    <Badge className="bg-red-100 text-red-700 border border-red-200 text-xs">Obrigatório</Badge>
                  )}
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-xs">{cursoSelecionado.area}</Badge>
                </div>
              </div>
              <button onClick={() => { setShowCursoDetalheModal(false); setCursoSelecionado(null); }} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div className="text-xs text-slate-600 mb-1">Carga horária</div>
                  <div className="text-lg font-semibold text-slate-900">{cursoSelecionado.cargaHoraria}h</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div className="text-xs text-slate-600 mb-1">Média de conclusão</div>
                  <div className="text-lg font-semibold text-teal-600">{cursoSelecionado.conclusao}%</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div className="text-xs text-slate-600 mb-1">Média de notas</div>
                  <div className="text-lg font-semibold text-emerald-600">{cursoSelecionado.media}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div className="text-xs text-slate-600 mb-1">Alunos concluídos</div>
                  <div className="text-lg font-semibold text-slate-900">{cursoSelecionado.concluidos}</div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-900">Alunos com pendência</span>
                </div>
                <p className="text-sm text-amber-700">{cursoSelecionado.pendentes} alunos ainda não concluíram este curso</p>
              </div>
              <div className="text-sm text-slate-600">
                <p><strong>Descrição:</strong> Curso focado em {cursoSelecionado.area.toLowerCase()}, essencial para o desenvolvimento das competências necessárias no programa.</p>
                <p className="mt-2 text-xs"><strong>Última atualização via planilha:</strong> 21/10/2025 às 09:18</p>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <Button onClick={() => { setShowCursoDetalheModal(false); setCursoSelecionado(null); }}>Fechar</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Importar alunos da imersão */}
      {showImportarImersaoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Importar alunos da imersão</h2>
              <button onClick={() => setShowImportarImersaoModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-teal-400 hover:bg-teal-50/30 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-900 mb-1">Envie a planilha com os alunos da imersão</p>
                <p className="text-xs text-slate-600">Formatos aceitos: .xlsx, .xls, .csv</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">Validação automática de conflitos</p>
                    <p className="text-xs text-amber-700 mt-1">O sistema verificará se algum aluno já está vinculado a outro programa vigente.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setShowImportarImersaoModal(false)}>Cancelar</Button>
              <Button
                className="bg-teal-500 hover:bg-teal-600 text-white"
                onClick={() => {
                  setShowImportarImersaoModal(false);
                  alert('Planilha importada com sucesso!');
                }}
              >
                Importar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Submeter notas imersão */}
      {showSubmeterNotasImersaoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Submeter notas</h2>
              <button onClick={() => setShowSubmeterNotasImersaoModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de avaliação</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTipoAvaliacaoImersao('parcial')}
                    className={cn(
                      "flex-1 px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all",
                      tipoAvaliacaoImersao === 'parcial'
                        ? "border-teal-500 bg-teal-50 text-teal-700"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    )}
                  >
                    Avaliação Parcial
                  </button>
                  <button
                    onClick={() => setTipoAvaliacaoImersao('final')}
                    className={cn(
                      "flex-1 px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all",
                      tipoAvaliacaoImersao === 'final'
                        ? "border-teal-500 bg-teal-50 text-teal-700"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    )}
                  >
                    Avaliação Final
                  </button>
                </div>
              </div>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-teal-400 hover:bg-teal-50/30 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-900 mb-1">Envie a planilha de notas</p>
                <p className="text-xs text-slate-600">Formatos aceitos: .xlsx, .xls, .csv</p>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setShowSubmeterNotasImersaoModal(false)}>Cancelar</Button>
              <Button
                className="bg-teal-500 hover:bg-teal-600 text-white"
                onClick={() => {
                  setShowSubmeterNotasImersaoModal(false);
                  alert(`Notas da avaliação ${tipoAvaliacaoImersao} importadas com sucesso!`);
                }}
              >
                Submeter notas
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Atualizar Dados do Processo Seletivo */}
      {showAtualizarDadosModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Atualizar dados do processo seletivo</h2>
              <button
                onClick={() => {
                  setShowAtualizarDadosModal(false);
                  setAtualizarDadosAction(null);
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!atualizarDadosAction && (
                <div>
                  <p className="text-sm text-slate-700 mb-6">Escolha uma das ações abaixo para atualizar os dados do processo seletivo:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setAtualizarDadosAction('cadastrar-individual')}
                      className="p-6 border-2 border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all text-left group"
                    >
                      <Users className="w-8 h-8 text-teal-600 mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-2">Cadastrar aluno individualmente</h3>
                      <p className="text-sm text-slate-600">Adicione um novo candidato manualmente ao processo seletivo</p>
                    </button>

                    <button
                      onClick={() => setAtualizarDadosAction('importar-inscritos')}
                      className="p-6 border-2 border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all text-left group"
                    >
                      <Upload className="w-8 h-8 text-teal-600 mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-2">Importar planilha de inscritos</h3>
                      <p className="text-sm text-slate-600">Envie uma planilha com a lista de candidatos inscritos</p>
                    </button>

                    <button
                      onClick={() => setAtualizarDadosAction('importar-aprovados')}
                      className="p-6 border-2 border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all text-left group"
                    >
                      <CheckCircle className="w-8 h-8 text-teal-600 mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-2">Importar planilha de aprovados</h3>
                      <p className="text-sm text-slate-600">Atualize os status dos candidatos aprovados via planilha</p>
                    </button>

                    <button
                      onClick={() => setAtualizarDadosAction('atualizar-lista-espera')}
                      className="p-6 border-2 border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all text-left group"
                    >
                      <Clock className="w-8 h-8 text-teal-600 mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-2">Atualizar lista de espera</h3>
                      <p className="text-sm text-slate-600">Gerencie a lista de espera e convocações adicionais</p>
                    </button>
                  </div>
                </div>
              )}

              {atualizarDadosAction === 'cadastrar-individual' && (
                <div>
                  <button
                    onClick={() => setAtualizarDadosAction(null)}
                    className="text-sm text-teal-600 hover:text-teal-700 mb-4 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Voltar
                  </button>
                  <h3 className="font-semibold text-slate-900 mb-4">Cadastrar aluno individualmente</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo</label>
                        <input type="text" placeholder="Digite o nome completo" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">CPF</label>
                        <input type="text" placeholder="000.000.000-00" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                        <input type="email" placeholder="exemplo@email.com" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Gênero</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                          <option value="">Selecione</option>
                          <option>Feminino</option>
                          <option>Masculino</option>
                          <option>Outro</option>
                          <option>Não informado</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Data de nascimento</label>
                        <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Cidade/UF</label>
                        <input type="text" placeholder="Maceió - AL" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de formação</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                          <option value="">Selecione</option>
                          <option>Graduação em andamento</option>
                          <option>Graduação concluída</option>
                          <option>Curso técnico</option>
                          <option>Outros cursos de exatas/tecnologia</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Instituição</label>
                        <input type="text" placeholder="Nome da instituição" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Cota</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                          <option value="">Selecione</option>
                          <option>Ampla Concorrência</option>
                          <option>PCD/Neurodivergente</option>
                          <option>Negro/Pardo</option>
                          <option>Mulher</option>
                          <option>45+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Status inicial</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                          <option value="">Selecione</option>
                          <option>Inscrito</option>
                          <option>Em análise</option>
                          <option>Aprovado</option>
                          <option>Lista de espera</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                      <div className="flex gap-2">
                        <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">Validação automática</p>
                          <p className="text-xs text-blue-700 mt-1">
                            O sistema verificará automaticamente se este CPF já está vinculado a outro programa vigente.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {atualizarDadosAction === 'importar-inscritos' && (
                <div>
                  <button
                    onClick={() => setAtualizarDadosAction(null)}
                    className="text-sm text-teal-600 hover:text-teal-700 mb-4 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Voltar
                  </button>
                  <h3 className="font-semibold text-slate-900 mb-4">Importar planilha de inscritos</h3>

                  <div className="mb-6">
                    <p className="text-sm text-slate-700 mb-4">
                      Envie uma planilha Excel ou CSV com os dados dos candidatos inscritos. A planilha deve conter as seguintes colunas:
                    </p>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-slate-700">Nome completo</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-slate-700">CPF</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-slate-700">E-mail</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-slate-700">Gênero</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-slate-700">Data de nascimento</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-slate-700">Cidade/UF</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-slate-700">Tipo de formação</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-slate-700">Instituição</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-slate-700">Cota</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-teal-400 hover:bg-teal-50/30 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-900 mb-1">Clique para selecionar ou arraste o arquivo</p>
                    <p className="text-xs text-slate-600">Formatos aceitos: .xlsx, .xls, .csv (máx. 10MB)</p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                    <div className="flex gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-900">Validação de conflitos</p>
                        <p className="text-xs text-amber-700 mt-1">
                          Após o envio, o sistema verificará automaticamente se algum CPF já está vinculado a outro programa vigente e sinalizará os conflitos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {atualizarDadosAction === 'importar-aprovados' && (
                <div>
                  <button
                    onClick={() => setAtualizarDadosAction(null)}
                    className="text-sm text-teal-600 hover:text-teal-700 mb-4 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Voltar
                  </button>
                  <h3 className="font-semibold text-slate-900 mb-4">Importar planilha de aprovados</h3>

                  <div className="mb-6">
                    <p className="text-sm text-slate-700 mb-4">
                      Envie uma planilha com a lista final de candidatos aprovados. O sistema atualizará automaticamente o status de cada candidato.
                    </p>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-slate-900 mb-2">Colunas necessárias:</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-slate-700">CPF</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-slate-700">Nome completo</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          <span className="text-slate-700">Status</span>
                          <span className="text-xs text-slate-500">(Aprovado / Lista de espera)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-teal-400 hover:bg-teal-50/30 transition-colors cursor-pointer">
                    <CheckCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-900 mb-1">Clique para selecionar ou arraste o arquivo</p>
                    <p className="text-xs text-slate-600">Formatos aceitos: .xlsx, .xls, .csv (máx. 10MB)</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                    <div className="flex gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Atualização automática de status</p>
                        <p className="text-xs text-blue-700 mt-1">
                          Candidatos listados na planilha terão seu status atualizado para "Aprovado" ou "Lista de espera".
                          Os demais candidatos serão marcados como "Não selecionado".
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                    <div className="flex gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-900">Verificação de conflitos</p>
                        <p className="text-xs text-amber-700 mt-1">
                          O sistema verificará se algum aprovado já está vinculado a outro programa vigente e sinalizará esses casos para análise manual.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {atualizarDadosAction === 'atualizar-lista-espera' && (
                <div>
                  <button
                    onClick={() => setAtualizarDadosAction(null)}
                    className="text-sm text-teal-600 hover:text-teal-700 mb-4 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Voltar
                  </button>
                  <h3 className="font-semibold text-slate-900 mb-4">Atualizar lista de espera</h3>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-slate-900">48</div>
                        <div className="text-xs text-slate-600">Candidatos em espera</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-teal-600">250</div>
                        <div className="text-xs text-slate-600">Vagas disponíveis</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-900">250</div>
                        <div className="text-xs text-slate-600">Vagas preenchidas</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 mb-4">
                    Gerencie convocações adicionais para preencher vagas disponíveis a partir da lista de espera.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Quantidade de convocações</label>
                      <input
                        type="number"
                        min="1"
                        max="48"
                        placeholder="Digite a quantidade"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                      <p className="text-xs text-slate-500 mt-1">Máximo: 48 candidatos disponíveis</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Prazo para confirmação</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Observações (opcional)</label>
                      <textarea
                        rows={3}
                        placeholder="Adicione informações relevantes sobre esta convocação..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                    <div className="flex gap-2">
                      <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Convocação automática</p>
                        <p className="text-xs text-blue-700 mt-1">
                          Os candidatos convocados receberão notificação por e-mail e terão seu status atualizado para "Em análise" até a confirmação.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAtualizarDadosModal(false);
                  setAtualizarDadosAction(null);
                }}
              >
                Cancelar
              </Button>
              {atualizarDadosAction && (
                <Button
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                  onClick={() => {
                    setShowAtualizarDadosModal(false);
                    setAtualizarDadosAction(null);
                    alert('Dados atualizados com sucesso!');
                  }}
                >
                  {atualizarDadosAction === 'cadastrar-individual' && 'Cadastrar aluno'}
                  {atualizarDadosAction === 'importar-inscritos' && 'Importar planilha'}
                  {atualizarDadosAction === 'importar-aprovados' && 'Importar e atualizar'}
                  {atualizarDadosAction === 'atualizar-lista-espera' && 'Convocar candidatos'}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
