import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Manager } from 'src/app/models/manager';
import { TrackByService } from 'src/app/services/track-by-service';

@Component({
  selector: 'cm-manager-grid',
  templateUrl: './manager-grid.component.html',
  styleUrls: ['./manager-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerGridComponent implements OnInit {

  @Input() managers: Manager[] = [];

  constructor(
    public trackbyService: TrackByService
  ) { }

  ngOnInit(): void {
  }
}