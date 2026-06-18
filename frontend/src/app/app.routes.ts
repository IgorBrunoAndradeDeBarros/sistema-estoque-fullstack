import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { FornecedoresComponent } from './pages/fornecedores/fornecedores.component';
import { MovimentacoesComponent } from './pages/movimentacoes/movimentacoes.component';
import { AlertasComponent } from './pages/alertas/alertas.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'fornecedores', component: FornecedoresComponent },
  { path: 'movimentacoes', component: MovimentacoesComponent },
  { path: 'alertas', component: AlertasComponent },
  { path: '**', redirectTo: '' }, // Fallback para home
];
