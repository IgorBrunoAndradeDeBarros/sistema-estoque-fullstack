import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProdutosComponent } from './pages/produtos/produtos';
import { FornecedoresComponent } from './pages/fornecedores/fornecedores';
import { MovimentacoesComponent } from './pages/movimentacoes/movimentacoes';
import { AlertasComponent } from './pages/alertas/alertas';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'fornecedores', component: FornecedoresComponent },
  { path: 'movimentacoes', component: MovimentacoesComponent },
  { path: 'alertas', component: AlertasComponent },
  { path: '**', redirectTo: '' },
];
