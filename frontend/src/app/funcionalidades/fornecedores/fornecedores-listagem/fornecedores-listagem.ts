import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FornecedorService } from '../services/fornecedor';
import { FornecedorDTO } from '../store/Fornecedor.dto';

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './fornecedores-listagem.html',
  styleUrls: ['./fornecedores-listagem.scss'],
})
export class FornecedoresComponent implements OnInit {
  fornecedores = signal<FornecedorDTO[]>([]);
  carregando = signal(false);
  erro = signal('');

  filtroNome = '';
  filtroCnpj = '';

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');
    this.fornecedorService
      .listar(this.filtroNome || undefined, this.filtroCnpj || undefined)
      .subscribe({
        next: (dados) => {
          this.fornecedores.set(dados);
          this.carregando.set(false);
        },
        error: () => {
          this.erro.set('Não foi possível carregar os fornecedores.');
          this.carregando.set(false);
        },
      });
  }

  buscar(): void {
    this.carregar();
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroCnpj = '';
    this.carregar();
  }

  novo(): void {
    this.router.navigate(['/fornecedores/novo']);
  }

  editar(fornecedor: FornecedorDTO): void {
    this.router.navigate(['/fornecedores', fornecedor.id, 'editar']);
  }

  desativar(fornecedor: FornecedorDTO): void {
    if (!fornecedor.id) return;
    const confirmado = confirm(`Desativar o fornecedor "${fornecedor.razaoSocial}"?`);
    if (!confirmado) return;

    this.fornecedorService.desativar(fornecedor.id).subscribe(() => this.carregar());
  }
}
