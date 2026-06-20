import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovimentacaoDTO } from '../models/estoque.models';

@Injectable({
  providedIn: 'root',
})
export class MovimentacaoService {
  private apiUrl = `${environment.apiUrl}/movimentacoes`;

  constructor(private http: HttpClient) {}

  registrarEntrada(dto: MovimentacaoDTO): Observable<MovimentacaoDTO> {
    return this.http.post<MovimentacaoDTO>(`${this.apiUrl}/entrada`, dto);
  }

  registrarSaida(dto: MovimentacaoDTO): Observable<MovimentacaoDTO> {
    return this.http.post<MovimentacaoDTO>(`${this.apiUrl}/saida`, dto);
  }

  registrarAjuste(dto: MovimentacaoDTO): Observable<MovimentacaoDTO> {
    return this.http.post<MovimentacaoDTO>(`${this.apiUrl}/ajuste`, dto);
  }

  listar(
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
    return this.http.get<MovimentacaoDTO[]>(this.apiUrl, { params });
  }

  buscarPorId(id: number): Observable<MovimentacaoDTO> {
    return this.http.get<MovimentacaoDTO>(`${this.apiUrl}/${id}`);
  }
}
