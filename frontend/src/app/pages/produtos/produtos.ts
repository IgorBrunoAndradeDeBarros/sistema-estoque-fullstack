import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueService } from '../../services/estoque.service';
import { ProdutoDTO } from '../../models/estoque.models';
import { ProdutoFormComponent } from '../produto-form/produto-form';


@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, ProdutoFormComponent],
  templateUrl: './produtos.html',
  styleUrls: ['./produtos.scss'],
})
export class ProdutosComponent implements OnInit {
  produtos: ProdutoDTO[] = [];
  exibindoFormulario = false;

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
    if (id && confirm('Tem certeza que deseja desativar este produto?')) {
      this.estoqueService.desativarProduto(id).subscribe(() => this.carregarProdutos());
    }
  }

  abrirFormulario(): void {
    this.exibindoFormulario = true;
  }

  fecharFormularioEAtualizar(): void {
    this.exibindoFormulario = false;
    this.carregarProdutos();
  }
}
