import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertaService } from '../../../services/alerta';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent implements OnInit {
  contadorNaoLidos = 0;

  constructor(private alertaService: AlertaService) {}

  ngOnInit(): void {
    this.atualizarContador();
  }

  atualizarContador(): void {
    this.alertaService.contarNaoLidos().subscribe({
      next: (dados) => {
        this.contadorNaoLidos = dados.total;
      },
      error: (err) => console.error('Erro ao buscar contador de alertas', err),
    });
  }
}
