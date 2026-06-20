import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../services/fornecedor';
import { FornecedorDTO } from '../store/Fornecedor.dto';

@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fornecedor-form.html',
  styleUrls: ['./fornecedor-form.scss'],
})
export class FornecedorFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly fornecedorService = inject(FornecedorService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  form = this.fb.group({
    razaoSocial: ['', [Validators.required, Validators.minLength(3)]],
    cnpj: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required]],
    ativo: [true],
  });

  modoEdicao = false;
  fornecedorId: number | null = null;
  salvando = false;
  carregando = false;
  erro = '';

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.modoEdicao = true;
      this.fornecedorId = Number(param);
      this.carregarFornecedor(this.fornecedorId);
    }
  }

  carregarFornecedor(id: number): void {
    this.carregando = true;
    this.fornecedorService.buscarPorId(id).subscribe({
      next: (dto) => {
        this.form.patchValue(dto);
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar o fornecedor.';
        this.carregando = false;
      },
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    this.erro = '';
    const dto = this.form.getRawValue() as FornecedorDTO;

    const requisicao =
      this.modoEdicao && this.fornecedorId
        ? this.fornecedorService.atualizar(this.fornecedorId, dto)
        : this.fornecedorService.cadastrar(dto);

    requisicao.subscribe({
      next: () => this.router.navigate(['/fornecedores']),
      error: () => {
        this.erro = 'Não foi possível salvar o fornecedor. Verifique os dados.';
        this.salvando = false;
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/fornecedores']);
  }

  get campo() {
    return this.form.controls;
  }
}
