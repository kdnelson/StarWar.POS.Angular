import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManagersRoutingModule } from './managers-routing.module';

@NgModule({
  imports:      [ ManagersRoutingModule, CommonModule ],
  declarations: [ ManagersRoutingModule.components ]
})
export class ManagersModule {}