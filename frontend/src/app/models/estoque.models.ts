export interface AlertaDTO {
  id: number;
  mensagem: string;
  lido: boolean;
  dataCriacao: string;
}

export interface AlertaCountDTO {
  count: number;
}

export interface FornecedorDTO {
  id?: number;
  nome: string;
  cnpj: string;
  ativo?: boolean;
}

export interface MovimentacaoDTO {
  id?: number;
  produtoId: number;
  quantidade: number;
  tipo: 'ENTRADA' | 'SAIDA' | 'AJUSTE';
  dataMovimentacao?: string;
  observacao?: string;
}

export interface ProdutoDTO {
  id?: number;
  codigo: string;
  nome: string;
  categoria: string;
  unidade: string;
  preco: number;
  ativo: boolean;
}

export interface ProdutoDetalheDTO extends ProdutoDTO {
  descricao?: string;
  fornecedorId?: number;
}

export interface ProdutoSaldoDTO {
  produtoId: number;
  nomeProduto: string;
  quantidadeAtual: number;
  quantidadeMinima: number;
}

export interface SaldoDTO {
  id: number;
  produtoId: number;
  quantidade: number;
  atualizadoEm: string;
}
