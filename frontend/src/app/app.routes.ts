import { Routes } from '@angular/router';
import { ProdutosComponent } from './pages/produtos/produtos';
import { ProdutoFormComponent } from './pages/produto-form/produto-form';
import { FornecedoresComponent } from './pages/fornecedores/fornecedores';
import { FornecedorFormComponent } from './pages/fornecedor-form/fornecedor-form';
import { MovimentacoesComponent } from './pages/movimentacoes/movimentacoes';
import { MovimentacaoFormComponent } from './pages/movimentacao-form/movimentacao-form';
import { AlertasComponent } from './pages/alertas/alertas';
import { HomeComponent } from './pages/home/components/home-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'produtos', component: ProdutosComponent },
  { path: 'produtos/novo', component: ProdutoFormComponent },
  { path: 'produtos/:id/editar', component: ProdutoFormComponent },

  { path: 'fornecedores', component: FornecedoresComponent },
  { path: 'fornecedores/novo', component: FornecedorFormComponent },
  { path: 'fornecedores/:id/editar', component: FornecedorFormComponent },

  { path: 'movimentacoes', component: MovimentacoesComponent },
  { path: 'movimentacoes/registrar', component: MovimentacaoFormComponent },

  { path: 'alertas', component: AlertasComponent },

  { path: '**', redirectTo: '' },
];
