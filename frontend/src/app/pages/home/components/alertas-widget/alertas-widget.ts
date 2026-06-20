import { Component, OnInit, inject } from '@angular/core';
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

  alertas: AlertaDTO[] = [];
  carregando = false;
  erro = '';

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.alertaService.listar(false).subscribe({
      next: (dados) => {
        this.alertas = dados.slice(0, 5);
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar os alertas.';
        this.carregando = false;
      },
    });
  }

  marcarComoLido(alerta: AlertaDTO): void {
    this.alertaService.marcarComoLido(alerta.id).subscribe(() => {
      this.alertas = this.alertas.filter((a) => a.id !== alerta.id);
    });
  }
}
