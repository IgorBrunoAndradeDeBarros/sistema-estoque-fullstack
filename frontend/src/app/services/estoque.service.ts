import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AlertaDTO,
  AlertaCountDTO,
  FornecedorDTO,
  MovimentacaoDTO,
  ProdutoDTO,
  ProdutoDetalheDTO,
  ProdutoSaldoDTO,
  SaldoDTO,
} from '../models/estoque.models';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  listarAlertas(lido?: boolean): Observable<AlertaDTO[]> {
    let params = new HttpParams();
    if (lido !== undefined) params = params.set('lido', lido.toString());
    return this.http.get<AlertaDTO[]>(`${this.apiUrl}/alertas`, { params });
  }

  contarAlertasNaoLidos(): Observable<AlertaCountDTO> {
    return this.http.get<AlertaCountDTO>(`${this.apiUrl}/alertas/count`);
  }

  marcarAlertaComoLido(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/alertas/${id}/ler`, {});
  }

  marcarTodosComoLidos(): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/alertas/ler-todos`, {});
  }

  listarFornecedores(nome?: string, cnpj?: string): Observable<FornecedorDTO[]> {
    let params = new HttpParams();
    if (nome) params = params.set('nome', nome);
    if (cnpj) params = params.set('cnpj', cnpj);
    return this.http.get<FornecedorDTO[]>(`${this.apiUrl}/fornecedores`, { params });
  }

  buscarFornecedorPorId(id: number): Observable<FornecedorDTO> {
    return this.http.get<FornecedorDTO>(`${this.apiUrl}/fornecedores/${id}`);
  }

  cadastrarFornecedor(dto: FornecedorDTO): Observable<FornecedorDTO> {
    return this.http.post<FornecedorDTO>(`${this.apiUrl}/fornecedores`, dto);
  }

  atualizarFornecedor(id: number, dto: FornecedorDTO): Observable<FornecedorDTO> {
    return this.http.put<FornecedorDTO>(`${this.apiUrl}/fornecedores/${id}`, dto);
  }

  desativarFornecedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/fornecedores/${id}`);
  }

  listarProdutos(nome?: string, ativo?: boolean, categoria?: string): Observable<ProdutoDTO[]> {
    let params = new HttpParams();
    if (nome) params = params.set('nome', nome);
    if (ativo !== undefined) params = params.set('ativo', ativo.toString());
    if (categoria) params = params.set('categoria', categoria);
    return this.http.get<ProdutoDTO[]>(`${this.apiUrl}/produtos`, { params });
  }

  buscarProdutoPorId(id: number): Observable<ProdutoDetalheDTO> {
    return this.http.get<ProdutoDetalheDTO>(`${this.apiUrl}/produtos/${id}`);
  }

  cadastrarProduto(dto: ProdutoDTO): Observable<ProdutoDTO> {
    return this.http.post<ProdutoDTO>(`${this.apiUrl}/produtos`, dto);
  }

  atualizarProduto(id: number, dto: ProdutoDTO): Observable<ProdutoDTO> {
    return this.http.put<ProdutoDTO>(`${this.apiUrl}/produtos/${id}`, dto);
  }

  desativarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/produtos/${id}`);
  }

  listarProdutosCriticos(): Observable<ProdutoSaldoDTO[]> {
    return this.http.get<ProdutoSaldoDTO[]>(`${this.apiUrl}/produtos/criticos`);
  }

  registrarEntrada(dto: MovimentacaoDTO): Observable<MovimentacaoDTO> {
    return this.http.post<MovimentacaoDTO>(`${this.apiUrl}/movimentacoes/entrada`, dto);
  }

  registrarSaida(dto: MovimentacaoDTO): Observable<MovimentacaoDTO> {
    return this.http.post<MovimentacaoDTO>(`${this.apiUrl}/movimentacoes/saida`, dto);
  }

  registrarAjuste(dto: MovimentacaoDTO): Observable<MovimentacaoDTO> {
    return this.http.post<MovimentacaoDTO>(`${this.apiUrl}/movimentacoes/ajuste`, dto);
  }

  listarMovimentacoes(
    tipo?: string,
    produtoId?: number,
    de?: string,
    ate?: string,
  ): Observable<MovimentacaoDTO[]> {
    let params = new HttpParams();
    if (tipo) params = params.set('tipo', tipo);
    if (produtoId) params = params.set('produtoId', produtoId.toString());
    if (de) params = params.set('de', de);
    if (ate) params = params.set('ate', ate);
    return this.http.get<MovimentacaoDTO[]>(`${this.apiUrl}/movimentacoes`, { params });
  }

  listarSaldos(): Observable<SaldoDTO[]> {
    return this.http.get<SaldoDTO[]>(`${this.apiUrl}/saldos`);
  }

  buscarSaldoPorProduto(produtoId: number): Observable<SaldoDTO> {
    return this.http.get<SaldoDTO>(`${this.apiUrl}/saldos/${produtoId}`);
  }
}
