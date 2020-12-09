import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomieComponent } from './homie.component';

const routes: Routes = [
    { 
        path: '', component: HomieComponent,
    }
  ];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HomieRoutingModule {
  static components = [ HomieComponent ];
}
