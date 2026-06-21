import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertasWidgetComponent } from './alertas-widget/alertas-widget';
import { SaldosListComponent } from './saldos-list/saldos-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AlertasWidgetComponent, SaldosListComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {}
