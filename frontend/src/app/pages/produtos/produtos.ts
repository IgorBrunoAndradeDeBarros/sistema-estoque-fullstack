import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueService } from '../../services/estoque.service';
import { ProdutoDTO } from '../../models/estoque.models';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  produtos: ProdutoDTO[] = [];

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.estoqueService.listarProdutos().subscribe((dados) => {
      this.produtos = dados;
    });
  }

  desativar(id?: number): void {
    if (id) {
      this.estoqueService.desativarProduto(id).subscribe(() => this.carregarProdutos());
    }
  }
}
