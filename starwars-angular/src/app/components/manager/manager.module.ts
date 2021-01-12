import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { ManagerRoutingModule } from './manager-routing.module';

@NgModule({
  imports:      [ ManagerRoutingModule, SharedModule ],
  declarations: [ ManagerRoutingModule.components ]
})
export class ManagerModule {}