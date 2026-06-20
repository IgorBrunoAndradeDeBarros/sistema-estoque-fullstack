import { AlertaDTO, TipoAlerta } from '../../models/estoque.models';
import { Component, OnInit } from '@angular/core';
import { AlertaService } from '../../services/alerta';
import { CommonModule } from '@angular/common';

type Filtro = 'todos' | 'nao-lidos' | 'lidos';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alertas.html',
  styleUrls: ['./alertas.scss'],
})
export class AlertasComponent implements OnInit {
  alertas: AlertaDTO[] = [];
  carregando = false;
  erro = '';
  filtroAtivo: Filtro = 'todos';

  readonly tipoLabel: Record<TipoAlerta, string> = {
    ESTOQUE_MINIMO: 'Estoque mínimo',
    ESTOQUE_ZERADO: 'Estoque zerado',
  };

  constructor(private alertaService: AlertaService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    const lido = this.filtroAtivo === 'todos' ? undefined : this.filtroAtivo === 'lidos';

    this.alertaService.listar(lido).subscribe({
      next: (dados) => {
        this.alertas = dados;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar os alertas. Tente novamente.';
        this.carregando = false;
      },
    });
  }

  filtrarPor(filtro: Filtro): void {
    if (this.filtroAtivo === filtro) return;
    this.filtroAtivo = filtro;
    this.carregar();
  }

  marcarComoLido(alerta: AlertaDTO): void {
    if (alerta.lido) return;
    this.alertaService.marcarComoLido(alerta.id).subscribe(() => {
      alerta.lido = true;
      if (this.filtroAtivo === 'nao-lidos') {
        this.alertas = this.alertas.filter((a) => a.id !== alerta.id);
      }
    });
  }

  marcarTodosComoLidos(): void {
    if (this.totalNaoLidos === 0) return;
    this.alertaService.marcarTodosComoLidos().subscribe(() => this.carregar());
  }

  get totalNaoLidos(): number {
    return this.alertas.filter((a) => !a.lido).length;
  }
}
