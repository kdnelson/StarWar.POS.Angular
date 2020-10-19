import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';

const app_routes: Routes = [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'home/:filter', component: HomeComponent },
        { path: 'manager', loadChildren: () => import('../manager/manager.module').then(o => o.ManagerModule) },        
        { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ];  

//  TODO: Use this...
//   { path: '', pathMatch: 'full', redirectTo: '/customers' },
//   { path: 'customers/:id', data: { preload: true }, loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
//   { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
//   { path: 'orders', data: { preload: true }, loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
//   { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
//   { path: '**', pathMatch: 'full', redirectTo: '/customers' } // catch any unfound routes and redirect to home page

@NgModule({
  imports: [ RouterModule.forRoot(app_routes, { useHash: true, onSameUrlNavigation: 'reload',  /* enableTracing: true */}) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }