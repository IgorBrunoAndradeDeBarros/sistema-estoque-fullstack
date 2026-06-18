import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueService } from '../../services/estoque.service';
import { MovimentacaoDTO } from '../../models/estoque.models';

@Component({
  selector: 'app-movimentacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movimentacoes.html',
  styleUrls: ['./movimentacoes.scss'],
})
export class MovimentacoesComponent implements OnInit {
  movimentacoes: MovimentacaoDTO[] = [];

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.estoqueService.listarMovimentacoes().subscribe((dados) => {
      this.movimentacoes = dados;
    });
  }
}
