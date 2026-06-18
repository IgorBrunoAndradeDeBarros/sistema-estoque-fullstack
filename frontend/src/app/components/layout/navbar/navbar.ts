import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EstoqueService } from '../../../services/estoque.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  contadorNaoLidos = 0;

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.atualizarContador();
  }

  atualizarContador(): void {
    this.estoqueService.contarAlertasNaoLidos().subscribe((dados) => {
      this.contadorNaoLidos = dados.count;
    });
  }
}
