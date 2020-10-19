import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

import { AppComponent } from './components/app/app.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { CartComponent } from './components/cart/cart.component';
import { MenuItemDetailComponent } from './components/menu-item-detail/menu-item-detail.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppRoutingModule } from './components/app/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CoreModule } from './components/core/core.module';
import { SharedModule } from './components/shared/shared.module';

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
    AppRoutingModule,
    CoreModule,
    SharedModule,
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
  providers: [NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
