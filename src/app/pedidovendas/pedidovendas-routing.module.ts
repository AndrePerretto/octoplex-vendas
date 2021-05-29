import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidovendasPage } from './pedidovendas.page';

const routes: Routes = [
  {
    path: '',
    component: PedidovendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidovendasPageRoutingModule {}
