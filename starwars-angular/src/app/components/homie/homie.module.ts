import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { HomieRoutingModule } from './homie-routing.module';

@NgModule({
  imports:      [ HomieRoutingModule, CommonModule, NgxSmartModalModule.forRoot() ],
  declarations: [ HomieRoutingModule.components ]
})
export class HomieModule {}