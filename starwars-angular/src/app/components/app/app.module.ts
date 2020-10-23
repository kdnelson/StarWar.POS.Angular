import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

import { AppComponent } from './app.component';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { CartComponent } from '../cart/cart.component';
import { MenuItemDetailComponent } from '../menu-item-detail/menu-item-detail.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '../home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryFilterComponent,
    CartComponent,
    MenuItemDetailComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    AppRoutingModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    NgxSmartModalModule.forRoot(),
  ],
  providers: [NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
