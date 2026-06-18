import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueService } from '../../services/estoque.service';
import { ProdutoSaldoDTO, AlertaDTO } from '../../models/estoque.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  produtosCriticos: ProdutoSaldoDTO[] = [];
  alertasRecentes: AlertaDTO[] = [];

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.estoqueService.listarProdutosCriticos().subscribe((dados) => {
      this.produtosCriticos = dados;
    });

    this.estoqueService.listarAlertas(false).subscribe((dados) => {
      this.alertasRecentes = dados.slice(0, 5);
    });
  }
}
