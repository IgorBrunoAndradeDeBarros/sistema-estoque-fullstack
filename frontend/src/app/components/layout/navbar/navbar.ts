import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent {
  @Input() contadorNaoLidos = 0;
  @Output() onToggleSidebar = new EventEmitter<void>();

  toggle() {
    this.onToggleSidebar.emit();
  }
}
