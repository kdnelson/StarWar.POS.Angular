import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManagerRoutingModule } from './manager-routing.module';

@NgModule({
  imports:      [ ManagerRoutingModule, CommonModule ],
  declarations: [ ManagerRoutingModule.components ]
})
export class ManagerModule {}