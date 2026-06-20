import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaldoDTO } from '../../../../enums/estoque.models';
import { SaldoService } from '../../../../services/saldo';


@Component({
  selector: 'app-saldos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saldos-list.html',
  styleUrls: ['./saldos-list.scss'],
})
export class SaldosListComponent implements OnInit {
  saldos: SaldoDTO[] = [];
  carregando = false;
  erro = '';

  constructor(private saldoService: SaldoService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.saldoService.listar().subscribe({
      next: (dados) => {
        this.saldos = dados;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar os saldos.';
        this.carregando = false;
      },
    });
  }

  get valorTotalEstoque(): number {
    return this.saldos.reduce((total, s) => total + s.quantidade * s.custoMedio, 0);
  }
}
