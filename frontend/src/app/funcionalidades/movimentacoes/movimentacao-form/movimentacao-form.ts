import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovimentacaoService } from '../services/movimentacao';
import { TipoMovimentacao } from '../../../enums/enums';
import { MovimentacaoDTO } from '../store/Movimentacao.dto';

@Component({
  selector: 'app-movimentacao-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movimentacao-form.html',
  styleUrls: ['./movimentacao-form.scss'],
})
export class MovimentacaoFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly movimentacaoService = inject(MovimentacaoService);
  private readonly router = inject(Router);

  readonly tipos: { valor: TipoMovimentacao; label: string }[] = [
    { valor: 'ENTRADA', label: 'Entrada' },
    { valor: 'SAIDA', label: 'Saída' },
    { valor: 'AJUSTE', label: 'Ajuste' },
  ];

  form = this.fb.group({
    tipo: ['ENTRADA' as TipoMovimentacao, [Validators.required]],
    produtoId: [null as number | null, [Validators.required]],
    quantidade: [0, [Validators.required, Validators.min(1)]],
    custoUnit: [0],
    docRef: [''],
    motivo: [''],
  });

  salvando = false;
  erro = '';

  ngOnInit(): void {
    this.form.get('tipo')?.valueChanges.subscribe(() => this.ajustarValidadores());
    this.ajustarValidadores();
  }

  private ajustarValidadores(): void {
    const tipo = this.form.get('tipo')?.value;
    const custoUnit = this.form.get('custoUnit');

    if (tipo === 'ENTRADA') {
      custoUnit?.setValidators([Validators.required, Validators.min(0.01)]);
    } else {
      custoUnit?.clearValidators();
    }
    custoUnit?.updateValueAndValidity({ emitEvent: false });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    this.erro = '';
    const valores = this.form.getRawValue();
    const dto: MovimentacaoDTO = {
      tipo: valores.tipo as TipoMovimentacao,
      produtoId: valores.produtoId as number,
      quantidade: valores.quantidade as number,
      custoUnit: valores.custoUnit ?? 0,
      docRef: valores.docRef ?? '',
      motivo: valores.motivo ?? '',
      dataHora: new Date().toISOString(),
    };

    let requisicao;
    switch (dto.tipo) {
      case 'ENTRADA':
        requisicao = this.movimentacaoService.registrarEntrada(dto);
        break;
      case 'SAIDA':
        requisicao = this.movimentacaoService.registrarSaida(dto);
        break;
      default:
        requisicao = this.movimentacaoService.registrarAjuste(dto);
    }

    requisicao.subscribe({
      next: () => this.router.navigate(['/movimentacoes']),
      error: () => {
        this.erro = 'Não foi possível registrar a movimentação. Verifique os dados.';
        this.salvando = false;
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/movimentacoes']);
  }

  get campo() {
    return this.form.controls;
  }

  get exigeCusto(): boolean {
    return this.form.get('tipo')?.value === 'ENTRADA';
  }
}
