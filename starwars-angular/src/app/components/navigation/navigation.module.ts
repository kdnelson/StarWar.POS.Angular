import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';

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
  imports: [
    SharedModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    CommonModule,
    NgbModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      app_routes, 
      { 
        useHash: true, 
        onSameUrlNavigation: 'reload',  /* enableTracing: true */
      }),
  ],
  exports: [RouterModule, NavigationComponent],
  declarations: [NavigationComponent],
  providers: [],
})
export class NavigationModule {}