import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstoqueService } from '../../services/estoque.service';
import { FornecedorDTO } from '../../models/estoque.models';

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss'],
})
export class FornecedoresComponent implements OnInit {
  fornecedores: FornecedorDTO[] = [];

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.carregarFornecedores();
  }

  carregarFornecedores(): void {
    this.estoqueService.listarFornecedores().subscribe((dados) => {
      this.fornecedores = dados;
    });
  }
}
