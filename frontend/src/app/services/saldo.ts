import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SaldoDTO } from '../models/estoque.models';

@Injectable({
  providedIn: 'root',
})
export class SaldoService {
  private apiUrl = `${environment.apiUrl}/saldos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<SaldoDTO[]> {
    return this.http.get<SaldoDTO[]>(this.apiUrl);
  }

  buscarPorProdutoId(produtoId: number): Observable<SaldoDTO> {
    return this.http.get<SaldoDTO>(`${this.apiUrl}/${produtoId}`);
  }
}
