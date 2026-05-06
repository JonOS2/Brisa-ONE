import { useState } from 'react';
import { Upload, UserPlus, Search, Download, MoreVertical, Eye, Edit2, X, Columns3, FileUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../components/ui/utils';

const tabs = [
  { id: 'ativos', label: 'Pessoas Ativas', count: 234 },
  { id: 'programas', label: 'Programas em Andamento', count: 187 },
  { id: 'todas', label: 'Todas as Pessoas', count: 1543 },
];

const mockPessoas = [
  {
    id: 1,
    nome: 'Ana Carolina Silva',
    cpf: '123.456.789-00',
    email: 'ana.silva@email.com',
    genero: 'Feminino',
    idade: 24,
    cota: 'Mulher',
    cidade: 'Recife',
    uf: 'PE',
    instituicao: 'UFPE',
    tipoFormacao: 'Ciência da Computação',
    curso: 'Ciência da Computação',
    programas: ['Programa de Inovação 2026', 'Tech Leaders 2025'],
    etapaAtual: 'Imersão',
    status: 'ativa',
    ultimaAtualizacao: '15/04/2026'
  },
  {
    id: 2,
    nome: 'Bruno Henrique Costa',
    cpf: '234.567.890-11',
    email: 'bruno.costa@email.com',
    genero: 'Masculino',
    idade: 22,
    cota: 'Ampla Concorrência',
    cidade: 'Garanhuns',
    uf: 'PE',
    instituicao: 'UFRPE',
    tipoFormacao: 'Engenharia de Computação',
    curso: 'Engenharia de Computação',
    programas: ['Programa de Inovação 2026'],
    etapaAtual: 'Nivelamento',
    status: 'ativa',
    ultimaAtualizacao: '20/04/2026'
  },
  {
    id: 3,
    nome: 'Camila Rodrigues Santos',
    cpf: '345.678.901-22',
    email: 'camila.santos@email.com',
    genero: 'Feminino',
    idade: 26,
    cota: 'Negro/Pardo',
    cidade: 'Recife',
    uf: 'PE',
    instituicao: 'IFPE',
    tipoFormacao: 'Técnico',
    curso: 'Técnico em Informática',
    programas: ['Tech Leaders 2025'],
    etapaAtual: 'Inscrição',
    status: 'pendente',
    ultimaAtualizacao: '18/04/2026'
  },
];

const stats = [
  { label: 'Total de Pessoas', value: '1.543', trend: '+12%' },
  { label: 'Pessoas Ativas', value: '234', trend: '+8%' },
  { label: 'Em Programas Ativos', value: '187', trend: '+15%' },
  { label: 'Em Nivelamento', value: '89', trend: '+5%' },
  { label: 'Em Imersão', value: '52', trend: '+3%' },
  { label: 'Novos Cadastros (30d)', value: '47', trend: '+21%' },
];

export function Pessoas() {
  const [activeTab, setActiveTab] = useState('ativos');
  const [showFilters, setShowFilters] = useState(false);
  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [showNovaPessoaModal, setShowNovaPessoaModal] = useState(false);
  const [showSubmeterPlanilhaModal, setShowSubmeterPlanilhaModal] = useState(false);
  const [showModeloPlanilhaModal, setShowModeloPlanilhaModal] = useState(false);
  const [planilhaTab, setPlanilhaTab] = useState('novos');

  const [visibleColumns, setVisibleColumns] = useState({
    nome: true,
    cpf: true,
    email: true,
    programas: true,
    etapaAtual: true,
    status: true,
    genero: false,
    idade: false,
    cota: false,
    cidadeUf: false,
    instituicao: false,
    tipoFormacao: false,
    curso: false,
    ultimaAtualizacao: false,
  });

  const toggleColumn = (column: string) => {
    setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa':
        return 'bg-emerald-100 text-emerald-700';
      case 'pendente':
        return 'bg-amber-100 text-amber-700';
      case 'concluida':
        return 'bg-blue-100 text-blue-700';
      case 'reprovada':
        return 'bg-red-100 text-red-700';
      case 'desclassificada':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativa': return 'Ativa';
      case 'pendente': return 'Pendente';
      case 'concluida': return 'Concluída';
      case 'reprovada': return 'Reprovada';
      case 'desclassificada': return 'Desclassificada';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-semibold text-slate-900 text-2xl">Pessoas</h1>
              <p className="text-sm text-slate-600 mt-1">
                Gerencie todas as pessoas cadastradas no sistema e acompanhe seus vínculos com programas e etapas.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowModeloPlanilhaModal(true)}>
                <Download className="w-4 h-4 mr-2" />
                Modelo de planilha
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowNovaPessoaModal(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Nova pessoa
              </Button>
              <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white" onClick={() => setShowSubmeterPlanilhaModal(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Submeter planilha
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border border-slate-200 p-4">
              <div className="text-xs text-slate-600 mb-1">{stat.label}</div>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-semibold text-slate-900">{stat.value}</div>
                <div className="text-xs text-teal-600 font-medium">{stat.trend}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8">
        <div className="bg-white rounded-lg border border-slate-200">
          {/* Tabs */}
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
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome, CPF, e-mail ou identificador..."
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
              <div className="grid grid-cols-4 gap-3">
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Programa</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Etapa</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Status</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Cota</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Gênero</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Estado de residência</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Cidade de residência</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                  <option>Instituição</option>
                </select>
              </div>
            )}
          </div>

          {/* Controle de Colunas */}
          <div className="px-6 py-3 border-b border-slate-200 bg-slate-50">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowColumnsMenu(!showColumnsMenu)}
              >
                <Columns3 className="w-4 h-4 mr-2" />
                Colunas
              </Button>

              {showColumnsMenu && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-10 p-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={visibleColumns.genero} onChange={() => toggleColumn('genero')} className="rounded" />
                      <span className="text-sm text-slate-700">Gênero</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={visibleColumns.idade} onChange={() => toggleColumn('idade')} className="rounded" />
                      <span className="text-sm text-slate-700">Idade</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={visibleColumns.cota} onChange={() => toggleColumn('cota')} className="rounded" />
                      <span className="text-sm text-slate-700">Cota</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={visibleColumns.cidadeUf} onChange={() => toggleColumn('cidadeUf')} className="rounded" />
                      <span className="text-sm text-slate-700">Cidade/UF</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={visibleColumns.instituicao} onChange={() => toggleColumn('instituicao')} className="rounded" />
                      <span className="text-sm text-slate-700">Instituição</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={visibleColumns.tipoFormacao} onChange={() => toggleColumn('tipoFormacao')} className="rounded" />
                      <span className="text-sm text-slate-700">Tipo de formação</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={visibleColumns.curso} onChange={() => toggleColumn('curso')} className="rounded" />
                      <span className="text-sm text-slate-700">Curso</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={visibleColumns.ultimaAtualizacao} onChange={() => toggleColumn('ultimaAtualizacao')} className="rounded" />
                      <span className="text-sm text-slate-700">Última atualização</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {visibleColumns.nome && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Nome</th>}
                  {visibleColumns.cpf && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">CPF</th>}
                  {visibleColumns.email && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">E-mail</th>}
                  {visibleColumns.genero && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Gênero</th>}
                  {visibleColumns.idade && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Idade</th>}
                  {visibleColumns.cota && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Cota</th>}
                  {visibleColumns.cidadeUf && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Cidade/UF</th>}
                  {visibleColumns.instituicao && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Instituição</th>}
                  {visibleColumns.tipoFormacao && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Formação</th>}
                  {visibleColumns.curso && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Curso</th>}
                  {visibleColumns.programas && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Programas</th>}
                  {visibleColumns.etapaAtual && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Etapa Atual</th>}
                  {visibleColumns.status && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>}
                  {visibleColumns.ultimaAtualizacao && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Última Atualização</th>}
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {mockPessoas.map((pessoa) => (
                  <tr key={pessoa.id} className="hover:bg-slate-50 transition-colors">
                    {visibleColumns.nome && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-slate-900">{pessoa.nome}</div>
                      </td>
                    )}
                    {visibleColumns.cpf && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">{pessoa.cpf}</div>
                      </td>
                    )}
                    {visibleColumns.email && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">{pessoa.email}</div>
                      </td>
                    )}
                    {visibleColumns.genero && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-700">{pessoa.genero}</div>
                      </td>
                    )}
                    {visibleColumns.idade && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-700">{pessoa.idade}</div>
                      </td>
                    )}
                    {visibleColumns.cota && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary" className="bg-purple-50 text-purple-700 text-xs">{pessoa.cota}</Badge>
                      </td>
                    )}
                    {visibleColumns.cidadeUf && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-700">{pessoa.cidade}/{pessoa.uf}</div>
                      </td>
                    )}
                    {visibleColumns.instituicao && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 text-xs">{pessoa.instituicao}</Badge>
                      </td>
                    )}
                    {visibleColumns.tipoFormacao && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-700">{pessoa.tipoFormacao}</div>
                      </td>
                    )}
                    {visibleColumns.curso && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-700">{pessoa.curso}</div>
                      </td>
                    )}
                    {visibleColumns.programas && (
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {pessoa.programas.length === 1 ? (
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-xs">
                              {pessoa.programas[0]}
                            </Badge>
                          ) : (
                            <>
                              <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-xs">
                                {pessoa.programas[0]}
                              </Badge>
                              <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-xs" title={pessoa.programas.slice(1).join(', ')}>
                                +{pessoa.programas.length - 1}
                              </Badge>
                            </>
                          )}
                        </div>
                      </td>
                    )}
                    {visibleColumns.etapaAtual && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{pessoa.etapaAtual}</div>
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary" className={cn("text-xs", getStatusColor(pessoa.status))}>
                          {getStatusLabel(pessoa.status)}
                        </Badge>
                      </td>
                    )}
                    {visibleColumns.ultimaAtualizacao && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">{pessoa.ultimaAtualizacao}</div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1 hover:bg-slate-100 rounded transition-colors" title="Visualizar">
                          <Eye className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-1 hover:bg-slate-100 rounded transition-colors" title="Editar">
                          <Edit2 className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-1 hover:bg-slate-100 rounded transition-colors" title="Mais opções">
                          <MoreVertical className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Mostrando <span className="font-medium">1-3</span> de <span className="font-medium">234</span> pessoas
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

      {/* Modal: Nova Pessoa */}
      {showNovaPessoaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Cadastrar nova pessoa</h2>
                <p className="text-sm text-slate-600 mt-1">Preencha os dados pessoais, acadêmicos e o vínculo inicial da pessoa com um programa/turma.</p>
              </div>
              <button onClick={() => setShowNovaPessoaModal(false)} className="p-2 hover:bg-slate-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Seção 1: Vínculo */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Vínculo com programa/turma</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Programa *</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                      <option>Programa de Inovação 2026</option>
                      <option>Tech Leaders 2025</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Turma *</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                      <option>Turma 1</option>
                      <option>UFAL 2025.2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Etapa inicial *</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                      <option>Inscrição</option>
                      <option>Nivelamento</option>
                      <option>Imersão</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status inicial</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                      <option>Ativa</option>
                      <option>Pendente</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Seção 2: Dados Pessoais */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-slate-900 mb-4">Dados pessoais</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome do aluno *</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Data de nascimento *</label>
                    <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gênero</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                      <option>Feminino</option>
                      <option>Masculino</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Cota *</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                      <option>Ampla Concorrência</option>
                      <option>PCD/Neurodivergente</option>
                      <option>Negro/Pardo</option>
                      <option>Mulher</option>
                      <option>45+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">CPF *</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="000.000.000-00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">E-mail *</label>
                    <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                    <input type="tel" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Estado de residência</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                      <option>PE</option>
                      <option>AL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Cidade de residência</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Seção 3: Dados Acadêmicos */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-slate-900 mb-4">Dados acadêmicos</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de formação</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                      <option>Engenharia de Computação, Ciência da Computação ou outros cursos relacionados a TIC</option>
                      <option>Outros cursos de ciências exatas ou tecnológicos</option>
                      <option>Técnico na área de exatas concluído</option>
                      <option>Engenharia (exceto de Software/Computação)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Instituição</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Curso</label>
                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status da formação</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                      <option>Cursando</option>
                      <option>Concluído</option>
                      <option>Trancado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Data de conclusão</label>
                    <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setShowNovaPessoaModal(false)}>Cancelar</Button>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">Cadastrar pessoa</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Submeter Planilha */}
      {showSubmeterPlanilhaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Submeter planilha de alunos</h2>
                <p className="text-sm text-slate-600 mt-1">Envie uma planilha com os dados dos alunos e revise a prévia antes de confirmar o cadastro.</p>
              </div>
              <button onClick={() => setShowSubmeterPlanilhaModal(false)} className="p-2 hover:bg-slate-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Upload */}
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <FileUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-sm text-slate-600 mb-2">Arraste a planilha aqui ou clique para selecionar</p>
                <p className="text-xs text-slate-500 mb-4">Formatos aceitos: .xlsx, .csv</p>
                <Button variant="outline">Selecionar arquivo</Button>
              </div>

              {/* Vínculo obrigatório */}
              <div className="grid grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Programa de destino *</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm">
                    <option>Programa de Inovação 2026</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Turma de destino *</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm">
                    <option>UFAL 2025.2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Etapa inicial *</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm">
                    <option>Inscrição</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status inicial *</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm">
                    <option>Ativa</option>
                  </select>
                </div>
              </div>

              {/* Resumo */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-xs text-blue-700 mb-1">Total de linhas</div>
                  <div className="text-2xl font-semibold text-blue-900">150</div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                  <div className="text-xs text-emerald-700 mb-1">Novos cadastros</div>
                  <div className="text-2xl font-semibold text-emerald-900">95</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <div className="text-xs text-amber-700 mb-1">Já existentes</div>
                  <div className="text-2xl font-semibold text-amber-900">52</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="text-xs text-red-700 mb-1">Alertas</div>
                  <div className="text-2xl font-semibold text-red-900">3</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-slate-200">
                <div className="flex gap-1">
                  <button
                    onClick={() => setPlanilhaTab('novos')}
                    className={cn(
                      "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                      planilhaTab === 'novos'
                        ? "border-teal-500 text-teal-700"
                        : "border-transparent text-slate-600"
                    )}
                  >
                    Novos cadastros (95)
                  </button>
                  <button
                    onClick={() => setPlanilhaTab('existentes')}
                    className={cn(
                      "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                      planilhaTab === 'existentes'
                        ? "border-teal-500 text-teal-700"
                        : "border-transparent text-slate-600"
                    )}
                  >
                    Já cadastrados (52)
                  </button>
                </div>
              </div>

              {/* Prévia */}
              {planilhaTab === 'novos' && (
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-600">Nome</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-600">CPF</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-600">E-mail</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-600">Cota</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-3 text-slate-900">João Silva Santos</td>
                        <td className="px-4 py-3 text-slate-600">123.456.789-00</td>
                        <td className="px-4 py-3 text-slate-600">joao@email.com</td>
                        <td className="px-4 py-3"><Badge className="bg-purple-50 text-purple-700 text-xs">Ampla</Badge></td>
                        <td className="px-4 py-3"><Badge className="bg-emerald-50 text-emerald-700 text-xs"><CheckCircle2 className="w-3 h-3 mr-1 inline" />Pronto</Badge></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {planilhaTab === 'existentes' && (
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-600">Nome</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-600">CPF</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-600">Programas vinculados</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-600">Alerta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-3 text-slate-900">Ana Silva</td>
                        <td className="px-4 py-3 text-slate-600">987.654.321-00</td>
                        <td className="px-4 py-3"><Badge className="bg-blue-50 text-blue-700 text-xs">Tech Leaders 2025</Badge></td>
                        <td className="px-4 py-3"><Badge className="bg-amber-50 text-amber-700 text-xs"><AlertTriangle className="w-3 h-3 mr-1 inline" />Conflito: programa simultâneo</Badge></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setShowSubmeterPlanilhaModal(false)}>Cancelar</Button>
              <Button variant="outline">Baixar relatório de inconsistências</Button>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">Confirmar importação</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Modelo de Planilha */}
      {showModeloPlanilhaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Modelo de planilha de alunos</h2>
              <button onClick={() => setShowModeloPlanilhaModal(false)} className="p-2 hover:bg-slate-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">
                Baixe um arquivo modelo com todas as colunas necessárias para cadastro e vínculo dos alunos ao programa.
              </p>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
                <div className="text-xs font-medium text-slate-700 mb-2">Colunas principais:</div>
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                  <div>• Nome</div>
                  <div>• CPF</div>
                  <div>• E-mail</div>
                  <div>• Data de nascimento</div>
                  <div>• Gênero</div>
                  <div>• Cota</div>
                  <div>• Estado</div>
                  <div>• Cidade</div>
                  <div>• Tipo de formação</div>
                  <div>• Instituição</div>
                  <div>• Curso</div>
                  <div>• Status da formação</div>
                </div>
              </div>

              <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                <Download className="w-4 h-4 mr-2" />
                Baixar modelo .xlsx
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
