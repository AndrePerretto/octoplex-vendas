import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidovendasPageRoutingModule } from './pedidovendas-routing.module';

import { PedidovendasPage } from './pedidovendas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidovendasPageRoutingModule
  ],
  declarations: [PedidovendasPage]
})
export class PedidovendasPageModule {}
