import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

import { AppComponent } from './components/app/app.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryFilterComponent,
    CartComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [ NgxSmartModalService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
