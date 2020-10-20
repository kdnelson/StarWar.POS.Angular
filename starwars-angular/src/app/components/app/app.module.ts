import { NgModule } from '@angular/core';
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
import { SharedModule } from '../../shared/shared.module';

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
    SharedModule,
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
