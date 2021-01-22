import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationModule } from '../navigation/navigation.module';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, NavigationModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
