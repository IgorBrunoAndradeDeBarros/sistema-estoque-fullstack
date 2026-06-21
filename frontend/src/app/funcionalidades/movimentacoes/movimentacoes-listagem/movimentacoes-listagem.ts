import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovimentacaoService } from '../services/movimentacao';
import { MovimentacaoDTO } from '../store/Movimentacao.dto';

@Component({
  selector: 'app-movimentacoes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movimentacoes-listagem.html',
  styleUrls: ['./movimentacoes-listagem.scss'],
})
export class MovimentacoesComponent implements OnInit {
  private readonly movimentacaoService = inject(MovimentacaoService);

  movimentacoes = signal<MovimentacaoDTO[]>([]);
  carregando = signal(false);
  erro = signal('');

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');
    this.movimentacaoService.listar().subscribe({
      next: (dados: MovimentacaoDTO[]) => {
        this.movimentacoes.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar as movimentações.');
        this.carregando.set(false);
      },
    });
  }
}
