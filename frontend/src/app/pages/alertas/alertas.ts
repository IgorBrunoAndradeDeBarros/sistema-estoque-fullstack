import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueService } from '../../services/estoque.service';
import { AlertaDTO } from '../../models/estoque.models';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alertas.html',
  styleUrls: ['./alertas.scss'],
})
export class AlertasComponent implements OnInit {
  alertas: AlertaDTO[] = [];

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.carregarAlertas();
  }

  carregarAlertas(): void {
    this.estoqueService.listarAlertas().subscribe((dados) => {
      this.alertas = dados;
    });
  }

  marcarLido(id: number): void {
    this.estoqueService.marcarAlertaComoLido(id).subscribe(() => this.carregarAlertas());
  }

  marcarTodosLidos(): void {
    this.estoqueService.marcarTodosComoLidos().subscribe(() => this.carregarAlertas());
  }
}
