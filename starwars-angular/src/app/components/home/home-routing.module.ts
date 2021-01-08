import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { MenuItemDetailComponent } from './menu-item-detail/menu-item-detail.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    { 
        path: '', component: HomeComponent,
    }
  ];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class HomeRoutingModule {
  static components = [ HomeComponent, CategoryFilterComponent, 
    MenuItemDetailComponent, CartComponent];
}
