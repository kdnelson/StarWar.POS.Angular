import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LogService } from 'src/app/services/log.service';

@NgModule({
  imports: [ CommonModule ],
  exports: [ CommonModule ],
  declarations: [],
  providers: [LogService]
})
export class SharedModule {}