import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../services/produto';
import { ProdutoDTO } from '../store/Produto.dto';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produtos-listagem.html',
  styleUrls: ['./produtos-listagem.scss'],
})
export class ProdutosComponent implements OnInit {
  produtos: ProdutoDTO[] = [];
  carregando = false;
  erro = '';

  filtroNome = '';
  filtroCategoria = '';
  filtroAtivo: 'todos' | 'ativos' | 'inativos' = 'ativos';

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    const ativo = this.filtroAtivo === 'todos' ? undefined : this.filtroAtivo === 'ativos';

    this.produtoService
      .listar(this.filtroNome || undefined, ativo, this.filtroCategoria || undefined)
      .subscribe({
        next: (dados) => {
          this.produtos = dados;
          this.carregando = false;
        },
        error: () => {
          this.erro = 'Não foi possível carregar os produtos.';
          this.carregando = false;
        },
      });
  }

  buscar(): void {
    this.carregar();
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroCategoria = '';
    this.filtroAtivo = 'ativos';
    this.carregar();
  }

  novo(): void {
    this.router.navigate(['/produtos/novo']);
  }

  editar(produto: ProdutoDTO): void {
    this.router.navigate(['/produtos', produto.id, 'editar']);
  }

  detalhar(produto: ProdutoDTO): void {
    this.router.navigate(['/produtos', produto.id]);
  }

  desativar(produto: ProdutoDTO): void {
    if (!produto.id) return;
    const confirmado = confirm(`Desativar o produto "${produto.nome}"?`);
    if (!confirmado) return;

    this.produtoService.desativar(produto.id).subscribe(() => this.carregar());
  }
}
