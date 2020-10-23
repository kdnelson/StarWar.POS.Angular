import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Manager } from 'src/app/models/manager';
import { TrackByService } from 'src/app/services/track-by-service';

@Component({
  selector: 'cm-manager-card',
  templateUrl: './manager-card.component.html',
  styleUrls: ['./manager-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerCardComponent implements OnInit {

  @Input() managers: Manager[] = [];

  constructor(
    public trackbyService: TrackByService
  ) { }

  ngOnInit(): void {
  }
}