import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueService } from './services/estoque.service';
import { AlertaDTO, ProdutoSaldoDTO } from './models/estoque.models';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/layout/sidebar/sidebar';
import { Navbar } from './components/layout/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Sidebar, Navbar],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent implements OnInit {
  alertas: AlertaDTO[] = [];
  produtosCriticos: ProdutoSaldoDTO[] = [];
  contadorNaoLidos = 0;

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.carregarDashboard();
  }

  carregarDashboard(): void {
    this.estoqueService.listarAlertas(false).subscribe((dados) => {
      this.alertas = dados;
    });

    this.estoqueService.contarAlertasNaoLidos().subscribe((dados) => {
      this.contadorNaoLidos = dados.count;
    });

    this.estoqueService.listarProdutosCriticos().subscribe((dados) => {
      this.produtosCriticos = dados;
    });
  }

  marcarComoLido(id: number): void {
    this.estoqueService.marcarAlertaComoLido(id).subscribe(() => {
      this.carregarDashboard();
    });
  }

  marcarTodosComoLidos(): void {
    this.estoqueService.marcarTodosComoLidos().subscribe(() => {
      this.carregarDashboard();
    });
  }
}
