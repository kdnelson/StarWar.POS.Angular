import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagersCardComponent } from './managers-card/managers-card.component';
import { ManagersGridComponent } from './managers-grid/managers-grid.component';
import { ManagersComponent } from './managers.component';

const routes: Routes = [
  { path: '', component: ManagersComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ManagersRoutingModule {
  static components = [ ManagersComponent, ManagersCardComponent, ManagersGridComponent ];
}
