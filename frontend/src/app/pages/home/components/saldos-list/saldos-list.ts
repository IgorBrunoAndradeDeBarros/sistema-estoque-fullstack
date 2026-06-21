import { Component, OnInit, computed, signal } from '@angular/core';
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
  saldos = signal<SaldoDTO[]>([]);
  carregando = signal(false);
  erro = signal('');

  valorTotalEstoque = computed(() =>
    this.saldos().reduce((total, s) => total + s.quantidade * s.custoMedio, 0),
  );

  constructor(private saldoService: SaldoService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');
    this.saldoService.listar().subscribe({
      next: (dados) => {
        this.saldos.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os saldos.');
        this.carregando.set(false);
      },
    });
  }
}
