import { Routes } from '@angular/router';
import { ProdutosComponent } from './funcionalidades/produtos/produtos-listagem/produtos-listagem';
import { ProdutoFormComponent } from './funcionalidades/produtos/produto-form/produto-form';
import { FornecedorFormComponent } from './funcionalidades/fornecedores/fornecedor-form/fornecedor-form';
import { MovimentacoesComponent } from './funcionalidades/movimentacoes/movimentacoes-listagem/movimentacoes-listagem';
import { MovimentacaoFormComponent } from './funcionalidades/movimentacoes/movimentacao-form/movimentacao-form';
import { AlertasComponent } from './pages/alertas/alertas';
import { HomeComponent } from './pages/home/components/home-component';
import { FornecedoresComponent } from './funcionalidades/fornecedores/fornecedores-listagem/fornecedores-listagem';

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
