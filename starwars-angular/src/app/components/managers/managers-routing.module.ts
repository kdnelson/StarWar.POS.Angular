import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerCardComponent } from './manager-card/manager-card.component';
import { ManagerGridComponent } from './manager-grid/manager-grid.component';
import { ManagersComponent } from './managers.component';

const routes: Routes = [
  { path: '', component: ManagersComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ManagersRoutingModule {
  static components = [ ManagersComponent, ManagerCardComponent, ManagerGridComponent ];
}
