import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FornecedorDTO } from '../models/estoque.models';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  private apiUrl = `${environment.apiUrl}/fornecedores`;

  constructor(private http: HttpClient) {}

  listar(nome?: string, cnpj?: string): Observable<FornecedorDTO[]> {
    let params = new HttpParams();
    if (nome) params = params.set('nome', nome);
    if (cnpj) params = params.set('cnpj', cnpj);
    return this.http.get<FornecedorDTO[]>(this.apiUrl, { params });
  }

  buscarPorId(id: number): Observable<FornecedorDTO> {
    return this.http.get<FornecedorDTO>(`${this.apiUrl}/${id}`);
  }

  cadastrar(dto: FornecedorDTO): Observable<FornecedorDTO> {
    return this.http.post<FornecedorDTO>(this.apiUrl, dto);
  }

  atualizar(id: number, dto: FornecedorDTO): Observable<FornecedorDTO> {
    return this.http.put<FornecedorDTO>(`${this.apiUrl}/${id}`, dto);
  }

  desativar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
