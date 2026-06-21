import { Unidade } from '../../../enums/enums';

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
