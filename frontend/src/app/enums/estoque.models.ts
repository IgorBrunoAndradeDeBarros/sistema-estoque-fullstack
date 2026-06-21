import { TipoAlerta } from './enums';

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
  criadoEm: string;
}

export interface SaldoDTO {
  produtoId: number;
  codigoProduto: string;
  nomeProduto: string;
  quantidade: number;
  custoMedio: number;
}
