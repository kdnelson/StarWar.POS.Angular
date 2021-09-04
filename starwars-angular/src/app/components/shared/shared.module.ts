import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { TrackByService } from 'src/app/services/trackBy.service';

@NgModule({
  imports: [ CommonModule ],
  exports: [ CommonModule ],
  declarations: [],
  providers: [LogService, TrackByService]
})
export class SharedModule {}