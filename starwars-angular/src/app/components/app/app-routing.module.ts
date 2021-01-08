import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const app_routes: Routes = [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', loadChildren: () => import('../home/home.module').then(o => o.HomeModule) },
        { path: 'managers', loadChildren: () => import('../managers/managers.module').then(o => o.ManagersModule) },        
        { path: 'manager/:id', data: { preload: true }, loadChildren: () => import('../manager/manager.module').then(m => m.ManagerModule) },
        { path: '**', redirectTo: '/home', pathMatch: 'full' }
    ];  

//  TODO: Use this...  Why would you add data?
//   { path: 'customers/:id', data: { preload: true }, loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },

@NgModule({
  imports: [ RouterModule.forRoot(app_routes, { useHash: true, onSameUrlNavigation: 'reload',  /* enableTracing: true */}) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }