import { Component, OnInit, signal, computed } from '@angular/core';
import { AlertaService } from '../../services/alerta';
import { CommonModule } from '@angular/common';
import { AlertaDTO } from '../../enums/estoque.models';
import { TipoAlerta } from '../../enums/enums';

type Filtro = 'todos' | 'nao-lidos' | 'lidos';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alertas.html',
  styleUrls: ['./alertas.scss'],
})
export class AlertasComponent implements OnInit {
  alertas = signal<AlertaDTO[]>([]);
  carregando = signal(false);
  erro = signal('');
  filtroAtivo: Filtro = 'todos';

  readonly tipoLabel: Record<TipoAlerta, string> = {
    ESTOQUE_MINIMO: 'Estoque mínimo',
    ESTOQUE_ZERADO: 'Estoque zerado',
  };

  totalNaoLidos = computed(() => this.alertas().filter((a) => !a.lido).length);

  constructor(private alertaService: AlertaService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');
    const lido = this.filtroAtivo === 'todos' ? undefined : this.filtroAtivo === 'lidos';

    this.alertaService.listar(lido).subscribe({
      next: (dados) => {
        this.alertas.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os alertas. Tente novamente.');
        this.carregando.set(false);
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
        this.alertas.update((lista) => lista.filter((a) => a.id !== alerta.id));
      } else {
        this.alertas.update((lista) => [...lista]);
      }
    });
  }

  marcarTodosComoLidos(): void {
    if (this.totalNaoLidos() === 0) return;
    this.alertaService.marcarTodosComoLidos().subscribe(() => this.carregar());
  }
}
