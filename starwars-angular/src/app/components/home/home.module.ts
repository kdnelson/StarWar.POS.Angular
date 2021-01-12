import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports:      
  [ 
    HomeRoutingModule, 
    SharedModule, 
    NgxSmartModalModule.forRoot() 
  ],
  declarations: [ HomeRoutingModule.components ]
})
export class HomeModule {}