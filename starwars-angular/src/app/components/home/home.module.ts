import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports:      
  [ 
    HomeRoutingModule, 
    CommonModule, 
    NgxSmartModalModule.forRoot() 
  ],
  declarations: [ HomeRoutingModule.components ]
})
export class HomeModule {}