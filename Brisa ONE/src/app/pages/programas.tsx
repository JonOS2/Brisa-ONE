import { useState, useEffect } from 'react';
import {
  Plus, Upload, Search, Eye, Edit2, BarChart3, Users, MoreVertical,
  Calendar, MapPin, Building2, TrendingUp, AlertTriangle, CheckCircle,
  Clock, Target, FileText, Award, X, Trash2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../components/ui/utils';

const tabs = [
  { id: 'ativos', label: 'Programas ativos', count: 4 },
  { id: 'espera', label: 'Em espera', count: 2 },
  { id: 'todos', label: 'Todos os programas', count: 18 },
  { id: 'encerrados', label: 'Encerrados', count: 7 },
];

const programas = [
  {
    id: 1,
    nome: 'Residência em TIC BRISA',
    turma: 'UFAL 2025.2',
    parceiro: 'EASY/UFAL',
    localidade: 'Maceió - AL',
    periodo: 'Ago/2025 → Jun/2026',
    status: 'andamento',
    etapaAtual: 'Imersão',
    inscritos: 612,
    ativos: 44,
    nivelamento: 0,
    imersao: 44,
    projetos: 10,
    orientadores: 4,
    proximoMarco: 'Avaliação parcial em 7 dias',
    progresso: 65,
  },
  {
    id: 2,
    nome: 'Programa de Inovação Tech',
    turma: 'UFPE 2026.1',
    parceiro: 'UFPE/C.E.S.A.R',
    localidade: 'Recife - PE',
    periodo: 'Fev/2026 → Dez/2026',
    status: 'andamento',
    etapaAtual: 'Nivelamento',
    inscritos: 540,
    ativos: 229,
    nivelamento: 229,
    imersao: 0,
    projetos: 0,
    orientadores: 2,
    proximoMarco: 'Prova final em 15 dias',
    progresso: 42,
  },
  {
    id: 3,
    nome: 'Tech Leaders Program',
    turma: 'UFRPE 2026.1',
    parceiro: 'UFRPE/Porto Digital',
    localidade: 'Recife - PE',
    periodo: 'Mar/2026 → Set/2026',
    status: 'inscricao',
    etapaAtual: 'Inscrição',
    inscritos: 342,
    ativos: 0,
    nivelamento: 0,
    imersao: 0,
    projetos: 0,
    orientadores: 0,
    proximoMarco: 'Encerramento de inscrições em 3 dias',
    progresso: 15,
  },
  {
    id: 4,
    nome: 'Residência em TIC BRISA',
    turma: 'UFAL 2024.2',
    parceiro: 'EASY/UFAL',
    localidade: 'Maceió - AL',
    periodo: 'Ago/2024 → Jun/2025',
    status: 'encerrado',
    etapaAtual: 'Encerrado',
    inscritos: 580,
    ativos: 0,
    nivelamento: 0,
    imersao: 0,
    projetos: 12,
    orientadores: 5,
    proximoMarco: '-',
    progresso: 100,
  },
];

const etapas = ['Inscrição', 'Seleção', 'Nivelamento', 'Imersão', 'Encerrado'];

export function Programas() {
  const [activeTab, setActiveTab] = useState('ativos');
  const [showFilters, setShowFilters] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [programaToDelete, setProgramaToDelete] = useState<typeof programas[0] | null>(null);
  const [showNovaTurmaModal, setShowNovaTurmaModal] = useState(false);
  const [selectedProgramaForTurma, setSelectedProgramaForTurma] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showOptionsMenu !== null) {
        const target = event.target as HTMLElement;
        if (!target.closest('.options-menu-container')) {
          setShowOptionsMenu(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOptionsMenu]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'andamento':
        return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'inscricao':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'encerrado':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'andamento':
        return 'Em andamento';
      case 'inscricao':
        return 'Inscrição aberta';
      case 'encerrado':
        return 'Encerrado';
      default:
        return status;
    }
  };

  const getEtapaIndex = (etapa: string) => {
    return etapas.indexOf(etapa);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-semibold text-slate-900 text-2xl">Programas</h1>
              <p className="text-sm text-slate-600 mt-1">
                Gerencie os programas cadastrados, acompanhe suas turmas, etapas e andamento geral.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowNovaTurmaModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nova turma
              </Button>
              <Button
                size="sm"
                className="bg-teal-500 hover:bg-teal-600 text-white"
                onClick={() => window.location.href = '/cadastro'}
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo programa
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-8 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-6 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-slate-600">Total de programas</div>
              <Award className="w-4 h-4 text-teal-500" />
            </div>
            <div className="text-2xl font-semibold text-slate-900">12</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-slate-600">Programas ativos</div>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-semibold text-slate-900">4</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-slate-600">Em espera</div>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-semibold text-slate-900">2</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-slate-600">Em imersão</div>
              <Users className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-semibold text-slate-900">3</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-slate-600">Em nivelamento</div>
              <Building2 className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-semibold text-slate-900">2</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-slate-600">Encerrados</div>
              <CheckCircle className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-semibold text-slate-900">7</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="border-b border-slate-200">
            <div className="flex items-center px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-4 text-sm font-medium border-b-2 transition-colors",
                    activeTab === tab.id
                      ? "border-teal-500 text-teal-700"
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                  )}
                >
                  {tab.label}
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome do programa, turma, parceiro, instituição ou localidade..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(showFilters && "bg-slate-100")}
              >
                Filtros avançados
                <Badge variant="secondary" className="ml-2 bg-teal-100 text-teal-700">
                  0
                </Badge>
              </Button>
              <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                Pesquisar
              </Button>
            </div>

            {showFilters && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Status</option>
                  <option>Ativo</option>
                  <option>Em andamento</option>
                  <option>Inscrição aberta</option>
                  <option>Encerrado</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Etapa atual</option>
                  <option>Inscrição</option>
                  <option>Nivelamento</option>
                  <option>Imersão</option>
                  <option>Encerrado</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Ano</option>
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Localidade</option>
                  <option>Maceió - AL</option>
                  <option>Recife - PE</option>
                  <option>Outras</option>
                </select>
              </div>
            )}
          </div>

          {/* Listagem */}
          <div className="divide-y divide-slate-200">
            {programas.map((programa) => {
              const etapaIndex = getEtapaIndex(programa.etapaAtual);
              return (
                <div key={programa.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-6">
                    {/* Bloco Esquerdo */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900 text-lg">
                              {programa.nome}
                            </h3>
                            <Badge className="bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1">
                              <Users className="w-3.5 h-3.5 mr-1.5 inline" />
                              Turma {programa.turma}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-slate-600 mb-2">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5" />
                              {programa.parceiro}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {programa.localidade}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {programa.periodo}
                            </span>
                          </div>
                        </div>
                        <Badge className={cn("border", getStatusColor(programa.status))}>
                          {getStatusLabel(programa.status)}
                        </Badge>
                      </div>

                      {/* Etapas */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          {etapas.map((etapa, index) => (
                            <div key={index} className="flex items-center">
                              <div
                                className={cn(
                                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                                  index === etapaIndex
                                    ? "bg-teal-100 text-teal-700 border border-teal-200"
                                    : index < etapaIndex
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                    : "bg-slate-100 text-slate-500 border border-slate-200"
                                )}
                              >
                                {etapa}
                              </div>
                              {index < etapas.length - 1 && (
                                <div
                                  className={cn(
                                    "w-6 h-0.5 mx-1",
                                    index < etapaIndex ? "bg-emerald-400" : "bg-slate-200"
                                  )}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full"
                            style={{ width: `${programa.progresso}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Indicadores */}
                      <div className="grid grid-cols-6 gap-3 mb-3">
                        <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
                          <div className="text-xs text-slate-600 mb-0.5">Inscritos</div>
                          <div className="font-semibold text-slate-900">{programa.inscritos}</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
                          <div className="text-xs text-slate-600 mb-0.5">Ativos</div>
                          <div className="font-semibold text-teal-600">{programa.ativos}</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
                          <div className="text-xs text-slate-600 mb-0.5">Nivelamento</div>
                          <div className="font-semibold text-slate-900">{programa.nivelamento}</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
                          <div className="text-xs text-slate-600 mb-0.5">Imersão</div>
                          <div className="font-semibold text-slate-900">{programa.imersao}</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
                          <div className="text-xs text-slate-600 mb-0.5">Projetos</div>
                          <div className="font-semibold text-slate-900">{programa.projetos}</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
                          <div className="text-xs text-slate-600 mb-0.5">Orientadores</div>
                          <div className="font-semibold text-slate-900">{programa.orientadores}</div>
                        </div>
                      </div>

                      {/* Próximo Marco */}
                      {programa.proximoMarco !== '-' && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-amber-500" />
                          <span className="text-slate-600">Próximo marco:</span>
                          <span className="font-medium text-amber-600">{programa.proximoMarco}</span>
                        </div>
                      )}
                    </div>

                    {/* Ações */}
                    <div className="flex flex-col gap-2 relative">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/programas/${programa.id}`}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/?programa=${encodeURIComponent(programa.nome + ' - Turma ' + programa.turma)}`}
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/pessoas?programa=${encodeURIComponent(programa.nome + ' - Turma ' + programa.turma)}`}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Pessoas
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/cadastro?edit=${programa.id}`}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <div className="relative options-menu-container">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowOptionsMenu(showOptionsMenu === programa.id ? null : programa.id)}
                        >
                          <MoreVertical className="w-4 h-4 mr-2" />
                          Opções
                        </Button>
                        {showOptionsMenu === programa.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => {
                                setProgramaToDelete(programa);
                                setShowDeleteModal(true);
                                setShowOptionsMenu(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Excluir programa
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Mostrando <span className="font-medium">1-4</span> de <span className="font-medium">18</span> programas
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="bg-teal-50 text-teal-700 border-teal-200">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Nova Turma */}
      {showNovaTurmaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Criar nova turma</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Selecione um programa existente para criar uma nova turma mantendo as regras do edital.
                </p>
              </div>
              <button onClick={() => setShowNovaTurmaModal(false)} className="p-2 hover:bg-slate-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Lista de Programas Disponíveis */}
                <div className="col-span-1">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Programas disponíveis</h3>
                  <div className="space-y-2">
                    {[
                      { id: 1, nome: 'Residência em TIC BRISA', instituicao: 'EASY/UFAL', turmas: 3, status: 'Ativo' },
                      { id: 2, nome: 'Programa de Inovação Tech', instituicao: 'UFPE/C.E.S.A.R', turmas: 2, status: 'Ativo' },
                      { id: 3, nome: 'Formação Avançada em Software', instituicao: 'UFRPE/Porto Digital', turmas: 1, status: 'Modelo disponível' },
                      { id: 4, nome: 'Residência em Dados e IA', instituicao: 'IFPE', turmas: 2, status: 'Ativo' },
                    ].map((prog) => (
                      <button
                        key={prog.id}
                        onClick={() => setSelectedProgramaForTurma(prog.id)}
                        className={cn(
                          "w-full p-3 rounded-lg border-2 text-left transition-all",
                          selectedProgramaForTurma === prog.id
                            ? "border-teal-500 bg-teal-50"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        )}
                      >
                        <div className="font-medium text-sm text-slate-900 mb-1">{prog.nome}</div>
                        <div className="text-xs text-slate-600 mb-2">{prog.instituicao}</div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">{prog.turmas} turmas</span>
                          <Badge className="bg-emerald-50 text-emerald-700 text-xs">{prog.status}</Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detalhes do Programa Selecionado */}
                <div className="col-span-2">
                  {selectedProgramaForTurma ? (
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Regras herdadas do programa</h3>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Nome do programa</div>
                            <div className="text-sm font-medium text-slate-900">Residência em TIC BRISA</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Executora/parceira</div>
                            <div className="text-sm font-medium text-slate-900">EASY/UFAL</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Modalidade do nivelamento</div>
                            <div className="text-sm font-medium text-slate-900">Remoto e assíncrono</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Duração do nivelamento</div>
                            <div className="text-sm font-medium text-slate-900">2 meses</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Duração da imersão</div>
                            <div className="text-sm font-medium text-slate-900">6 meses</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Carga horária da imersão</div>
                            <div className="text-sm font-medium text-slate-900">480 horas</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Vagas para nivelamento</div>
                            <div className="text-sm font-medium text-slate-900">250</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Vagas para imersão</div>
                            <div className="text-sm font-medium text-slate-900">50</div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-300">
                          <div className="text-xs text-slate-600 mb-2">Critérios de cotas</div>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-purple-50 text-purple-700 text-xs">PCD/Neurodivergente</Badge>
                            <Badge className="bg-purple-50 text-purple-700 text-xs">Negro/Pardo</Badge>
                            <Badge className="bg-purple-50 text-purple-700 text-xs">Mulheres</Badge>
                            <Badge className="bg-purple-50 text-purple-700 text-xs">45+</Badge>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-300">
                          <div className="text-xs text-slate-600 mb-2">Cursos obrigatórios</div>
                          <div className="text-xs text-slate-700">
                            Introdução à Plataforma EaD, Lógica de Programação, Programação Python,
                            Organização de Computadores, Banco de Dados, Empreendedorismo e Gerência de Projetos
                          </div>
                        </div>
                      </div>

                      {/* Formulário de Nova Turma */}
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Dados da nova turma</h3>

                      <div className="space-y-6">
                        {/* Identificação */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                          <h4 className="text-xs font-semibold text-slate-700 uppercase mb-3">Identificação da turma</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Nome da turma *</label>
                              <input type="text" placeholder="Ex: Turma UFAL 2026.1" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Localidade *</label>
                              <input type="text" placeholder="Ex: Maceió - AL" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-xs font-medium text-slate-700 mb-1">Instituição parceira/local</label>
                              <input type="text" placeholder="Ex: UFAL" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                          </div>
                        </div>

                        {/* Inscrição */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                          <h4 className="text-xs font-semibold text-slate-700 uppercase mb-3">Inscrição e seleção</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Data de publicação do edital</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Divulgação dos selecionados</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Inscrição: Data inicial</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Inscrição: Data final</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                          </div>
                        </div>

                        {/* Nivelamento */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                          <h4 className="text-xs font-semibold text-slate-700 uppercase mb-3">Nivelamento</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Confirmação: Data inicial</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Confirmação: Data final</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Início do nivelamento</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Fim do nivelamento</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Prova final</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Divulgação selecionados para imersão</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                          </div>
                        </div>

                        {/* Imersão */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                          <h4 className="text-xs font-semibold text-slate-700 uppercase mb-3">Imersão</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Confirmação: Data inicial</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Confirmação: Data final</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Início da imersão</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Fim da imersão</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                          </div>
                        </div>

                        {/* Avaliações */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                          <h4 className="text-xs font-semibold text-slate-700 uppercase mb-3">Avaliações e encerramento</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Avaliação parcial</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Avaliação final</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Emissão dos certificados</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[400px]">
                      <div className="text-center">
                        <Target className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-sm text-slate-500">Selecione um programa ao lado para começar</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setShowNovaTurmaModal(false)}>Cancelar</Button>
              <Button
                className={cn(
                  "bg-teal-500 hover:bg-teal-600 text-white",
                  !selectedProgramaForTurma && "opacity-50 cursor-not-allowed"
                )}
                disabled={!selectedProgramaForTurma}
                onClick={() => {
                  if (selectedProgramaForTurma) {
                    setShowNovaTurmaModal(false);
                    setSelectedProgramaForTurma(null);
                    // Simular toast de sucesso
                    alert('Turma criada com sucesso!');
                  }
                }}
              >
                Criar turma
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Excluir Programa */}
      {showDeleteModal && programaToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Excluir programa?</h2>
              <button onClick={() => setShowDeleteModal(false)} className="p-2 hover:bg-slate-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-700 mb-2">
                    Essa ação removerá o programa <span className="font-semibold">{programaToDelete.nome} - Turma {programaToDelete.turma}</span> da listagem.
                  </p>
                  <p className="text-sm text-slate-600">
                    Confirme apenas se tiver certeza de que deseja excluir este programa.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  // Aqui seria a lógica de exclusão
                  setShowDeleteModal(false);
                  setProgramaToDelete(null);
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir programa
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
