import { TipoMovimentacao } from '../../../enums/enums';


export interface MovimentacaoDTO {
  id?: number;
  tipo: TipoMovimentacao;
  produtoId: number;
  quantidade: number;
  custoUnit: number;
  docRef: string;
  motivo: string;
  dataHora: string;
}
