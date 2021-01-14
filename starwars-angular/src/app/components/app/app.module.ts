import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavigationModule } from '../navigation/navigation.module';

@NgModule({
  declarations: [AppComponent],
  imports: [NavigationModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
