import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerDetailsComponent } from './manager-details/manager-details.component';

import { ManagerComponent } from './manager.component';

const routes: Routes = [
  { path: '', component: ManagerComponent,
    children: [
      { path: 'details', component: ManagerDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ManagerRoutingModule {
  static components = [ ManagerComponent, ManagerDetailsComponent ];
}
