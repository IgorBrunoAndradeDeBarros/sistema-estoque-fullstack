import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoDTO, Unidade } from '../../models/estoque.models';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produto-form.html',
  styleUrls: ['./produto-form.scss'],
})
export class ProdutoFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly produtoService = inject(ProdutoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly unidades: Unidade[] = ['UN', 'KG', 'LT', 'CX', 'PCT'];

  form = this.fb.group({
    codigo: ['', [Validators.required]],
    nome: ['', [Validators.required, Validators.minLength(3)]],
    descricao: [''],
    categoria: ['', [Validators.required]],
    unidade: ['UN' as Unidade, [Validators.required]],
    precoCusto: [0, [Validators.required, Validators.min(0)]],
    estoqueMin: [0, [Validators.required, Validators.min(0)]],
    fornecedorId: [null as number | null, [Validators.required]],
    ativo: [true],
  });

  modoEdicao = false;
  produtoId: number | null = null;
  salvando = false;
  carregando = false;
  erro = '';

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.modoEdicao = true;
      this.produtoId = Number(param);
      this.carregarProduto(this.produtoId);
    }
  }

  carregarProduto(id: number): void {
    this.carregando = true;
    this.produtoService.buscarPorId(id).subscribe({
      next: (dto) => {
        this.form.patchValue({
          codigo: dto.codigo,
          nome: dto.nome,
          descricao: dto.descricao,
          categoria: dto.categoria,
          unidade: dto.unidade,
          precoCusto: dto.precoCusto,
          estoqueMin: dto.estoqueMin,
          ativo: dto.ativo,
        });
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar o produto.';
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
    const dto = this.form.getRawValue() as unknown as ProdutoDTO;

    const requisicao =
      this.modoEdicao && this.produtoId
        ? this.produtoService.atualizar(this.produtoId, dto)
        : this.produtoService.cadastrar(dto);

    requisicao.subscribe({
      next: () => this.router.navigate(['/produtos']),
      error: () => {
        this.erro = 'Não foi possível salvar o produto. Verifique os dados.';
        this.salvando = false;
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/produtos']);
  }

  get campo() {
    return this.form.controls;
  }
}
