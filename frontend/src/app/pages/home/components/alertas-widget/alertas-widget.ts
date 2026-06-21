import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertaService } from '../../../../services/alerta';
import { AlertaDTO } from '../../../../enums/estoque.models';

@Component({
  selector: 'app-alertas-widget',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './alertas-widget.html',
  styleUrls: ['./alertas-widget.scss'],
})
export class AlertasWidgetComponent implements OnInit {
  private readonly alertaService = inject(AlertaService);

  alertas = signal<AlertaDTO[]>([]);
  carregando = signal(false);
  erro = signal('');

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');
    this.alertaService.listar(false).subscribe({
      next: (dados) => {
        this.alertas.set(dados.slice(0, 5));
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os alertas.');
        this.carregando.set(false);
      },
    });
  }

  marcarComoLido(alerta: AlertaDTO): void {
    this.alertaService.marcarComoLido(alerta.id).subscribe(() => {
      this.alertas.update((lista) => lista.filter((a) => a.id !== alerta.id));
    });
  }
}
