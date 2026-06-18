import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstoqueService } from '../../services/estoque.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produto-form.html',
  styleUrls: ['./produto-form.scss'],
})
export class ProdutoFormComponent {
  @Output() aoSalvar = new EventEmitter<void>();
  @Output() aoCancelar = new EventEmitter<void>();

  produtoForm: FormGroup;
  salvando = false;

  constructor(
    private fb: FormBuilder,
    private estoqueService: EstoqueService,
  ) {
    this.produtoForm = this.fb.group({
      codigo: ['', Validators.required],
      nome: ['', Validators.required],
      categoria: ['', Validators.required],
      unidade: ['UN', Validators.required], // Valor padrão como UN
      preco: [0, [Validators.required, Validators.min(0.01)]],
      ativo: [true],
    });
  }

  salvar(): void {
    if (this.produtoForm.valid) {
      this.salvando = true;
      const dto = this.produtoForm.value;

      this.estoqueService.cadastrarProduto(dto).subscribe({
        next: () => {
          alert('Produto cadastrado com sucesso!');
          this.aoSalvar.emit();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao cadastrar produto.');
          this.salvando = false;
        },
      });
    } else {
      this.produtoForm.markAllAsTouched();
    }
  }

  cancelar(): void {
    this.aoCancelar.emit();
  }
}
