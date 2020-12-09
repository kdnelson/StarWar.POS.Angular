import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomieRoutingModule } from './homie-routing.module';

@NgModule({
  imports:      [ HomieRoutingModule, CommonModule ],
  declarations: [ HomieRoutingModule.components ]
})
export class HomieModule {}