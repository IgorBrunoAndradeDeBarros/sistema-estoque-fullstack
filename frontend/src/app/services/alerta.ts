import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AlertaDTO, AlertaCountDTO } from '../models/estoque.models';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private apiUrl = `${environment.apiUrl}/alertas`;

  constructor(private http: HttpClient) {}

  listar(lido?: boolean): Observable<AlertaDTO[]> {
    let params = new HttpParams();
    if (lido !== undefined) params = params.set('lido', lido.toString());
    return this.http.get<AlertaDTO[]>(this.apiUrl, { params });
  }

  contarNaoLidos(): Observable<AlertaCountDTO> {
    return this.http.get<AlertaCountDTO>(`${this.apiUrl}/count`);
  }

  marcarComoLido(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/ler`, {});
  }

  marcarTodosComoLidos(): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/ler-todos`, {});
  }
}
