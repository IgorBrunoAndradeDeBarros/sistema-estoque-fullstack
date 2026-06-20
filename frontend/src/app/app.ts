import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AlertaService } from './services/alerta';
import { ProdutoService } from './services/produto';
import { AlertaDTO, ProdutoSaldoDTO } from './models/estoque.models';
import { SidebarComponent } from './components/layout/sidebar/sidebar';
import { NavbarComponent } from './components/layout/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent implements OnInit {
  private readonly alertaService = inject(AlertaService);
  private readonly produtoService = inject(ProdutoService);

  alertas: AlertaDTO[] = [];
  produtosCriticos: ProdutoSaldoDTO[] = [];
  contadorNaoLidos = 0;

  ngOnInit(): void {
    this.carregarDashboard();
  }

  carregarDashboard(): void {
    this.alertaService.listar(false).subscribe((dados: AlertaDTO[]) => {
      this.alertas = dados;
    });

    this.alertaService.contarNaoLidos().subscribe((dados) => {
      this.contadorNaoLidos = dados.total;
    });

    this.produtoService.listarCriticos().subscribe((dados: ProdutoSaldoDTO[]) => {
      this.produtosCriticos = dados;
    });
  }

  marcarComoLido(id: number): void {
    this.alertaService.marcarComoLido(id).subscribe(() => {
      this.carregarDashboard();
    });
  }

  marcarTodosComoLidos(): void {
    this.alertaService.marcarTodosComoLidos().subscribe(() => {
      this.carregarDashboard();
    });
  }
}
