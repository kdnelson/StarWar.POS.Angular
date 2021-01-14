import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LogService } from 'src/app/services/logService';
import { NotificationService } from 'src/app/services/notificationService';
import { TrackByService } from 'src/app/services/track-by-service';

@NgModule({
  imports: [ CommonModule ],
  exports: [ CommonModule ],
  declarations: [],
  providers: [LogService, NotificationService, TrackByService]
})
export class SharedModule {}