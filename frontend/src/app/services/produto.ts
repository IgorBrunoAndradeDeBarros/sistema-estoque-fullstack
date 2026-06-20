import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProdutoDTO, ProdutoDetalheDTO, ProdutoSaldoDTO } from '../models/estoque.models';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = `${environment.apiUrl}/produtos`;

  constructor(private http: HttpClient) {}

  listar(nome?: string, ativo?: boolean, categoria?: string): Observable<ProdutoDTO[]> {
    let params = new HttpParams();
    if (nome) params = params.set('nome', nome);
    if (ativo !== undefined) params = params.set('ativo', ativo.toString());
    if (categoria) params = params.set('categoria', categoria);
    return this.http.get<ProdutoDTO[]>(this.apiUrl, { params });
  }

  buscarPorId(id: number): Observable<ProdutoDetalheDTO> {
    return this.http.get<ProdutoDetalheDTO>(`${this.apiUrl}/${id}`);
  }

  cadastrar(dto: ProdutoDTO): Observable<ProdutoDTO> {
    return this.http.post<ProdutoDTO>(this.apiUrl, dto);
  }

  atualizar(id: number, dto: ProdutoDTO): Observable<ProdutoDTO> {
    return this.http.put<ProdutoDTO>(`${this.apiUrl}/${id}`, dto);
  }

  desativar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  listarCriticos(): Observable<ProdutoSaldoDTO[]> {
    return this.http.get<ProdutoSaldoDTO[]>(`${this.apiUrl}/criticos`);
  }
}
