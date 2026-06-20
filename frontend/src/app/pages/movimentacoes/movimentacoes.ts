import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovimentacaoService } from '../../services/movimentacao';
import { MovimentacaoDTO } from '../../models/estoque.models';

@Component({
  selector: 'app-movimentacoes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movimentacoes.html',
  styleUrls: ['./movimentacoes.scss'],
})
export class MovimentacoesComponent implements OnInit {
  private readonly movimentacaoService = inject(MovimentacaoService);

  movimentacoes: MovimentacaoDTO[] = [];
  carregando = false;
  erro = '';

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.movimentacaoService.listar().subscribe({
      next: (dados: MovimentacaoDTO[]) => {
        this.movimentacoes = dados;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar as movimentações.';
        this.carregando = false;
      },
    });
  }
}
