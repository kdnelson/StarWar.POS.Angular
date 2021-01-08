import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { CartComponent } from '../cart/cart.component';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { MenuItemDetailComponent } from '../menu-item-detail/menu-item-detail.component';
import { HomieComponent } from './homie.component';

const routes: Routes = [
    { 
        path: '', component: HomieComponent,
    }
  ];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class HomieRoutingModule {
  static components = [ HomieComponent, CategoryFilterComponent, 
    MenuItemDetailComponent, CartComponent];
}
