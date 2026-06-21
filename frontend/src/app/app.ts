import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AlertaService } from './services/alerta';
import { ProdutoService } from './funcionalidades/produtos/services/produto';
import { SidebarComponent } from './components/layout/sidebar/sidebar';
import { NavbarComponent } from './components/layout/navbar/navbar';
import { AlertaDTO } from './enums/estoque.models';
import { ProdutoSaldoDTO } from './funcionalidades/produtos/store/Produto.dto';

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
  sidebarAberta = true;

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

  alternarSidebar(): void {
    this.sidebarAberta = !this.sidebarAberta;
  }
}
