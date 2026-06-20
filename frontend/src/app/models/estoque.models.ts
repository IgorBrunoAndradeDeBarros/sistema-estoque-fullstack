// ==========================================
// ENUMS
// ==========================================

export type TipoAlerta = 'ESTOQUE_MINIMO' | 'ESTOQUE_ZERADO';

export type TipoMovimentacao = 'ENTRADA' | 'SAIDA' | 'AJUSTE';

export type Unidade = 'UN' | 'KG' | 'LT' | 'CX' | 'PCT';

// ==========================================
// DTOS
// ==========================================

export interface AlertaCountDTO {
  total: number;
}

export interface AlertaDTO {
  id: number;
  produtoId: number;
  nomeProduto: string;
  tipo: TipoAlerta;
  mensagem: string;
  lido: boolean;
  criadoEm: string; // LocalDateTime mapeado como string ISO
}

export interface FornecedorDTO {
  id?: number;
  razaoSocial: string;
  cnpj: string;
  email: string;
  telefone: string;
  ativo: boolean;
}

export interface MovimentacaoDTO {
  id?: number;
  tipo: TipoMovimentacao;
  produtoId: number;
  quantidade: number;
  custoUnit: number;
  docRef: string;
  motivo: string;
  dataHora: string; // LocalDateTime mapeado como string ISO
}

export interface ProdutoDTO {
  id?: number;
  codigo: string;
  nome: string;
  descricao: string;
  categoria: string;
  unidade: Unidade;
  precoCusto: number;
  estoqueMin: number;
  fornecedorId: number;
  ativo: boolean;
}

export interface ProdutoDetalheDTO {
  id: number;
  codigo: string;
  nome: string;
  descricao: string;
  categoria: string;
  unidade: Unidade;
  precoCusto: number;
  estoqueMin: number;
  ativo: boolean;
  nomeFornecedor: string;
  quantidade: number;
  custoMedio: number;
}

export interface ProdutoSaldoDTO {
  id: number;
  codigo: string;
  nome: string;
  estoqueMin: number;
  quantidadeAtual: number;
}

export interface SaldoDTO {
  produtoId: number;
  codigoProduto: string;
  nomeProduto: string;
  quantidade: number;
  custoMedio: number;
}
