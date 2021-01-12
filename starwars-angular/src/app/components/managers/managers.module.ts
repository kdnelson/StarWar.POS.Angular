import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { ManagersRoutingModule } from './managers-routing.module';

@NgModule({
  imports:      [ ManagersRoutingModule, SharedModule ],
  declarations: [ ManagersRoutingModule.components ]
})
export class ManagersModule {}