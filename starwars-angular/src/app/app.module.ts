import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

import { AppComponent } from './components/app/app.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { MenuItemDetailComponent } from './components/menu-item-detail/menu-item-detail.component';
import { ManagerComponent } from './components/manager/manager.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryFilterComponent,
    CartComponent,
    HomeComponent,
    MenuItemDetailComponent,
    ManagerComponent,
    NavigationComponent
  ],
  imports: [
    RouterModule.forRoot([      
      { path: 'manager', component: ManagerComponent },  
      { path: 'home', component: HomeComponent },
      { path: 'home/:filter', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },   
    ], { useHash: true, onSameUrlNavigation: 'reload'}),
    BrowserModule,
    CommonModule,
    NgbModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    NgxSmartModalModule.forRoot(),
  ],
  providers: [ NgxSmartModalService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
