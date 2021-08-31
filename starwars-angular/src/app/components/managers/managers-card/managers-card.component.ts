import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Manager } from 'src/app/models/manager';

@Component({
  selector: 'cm-managers-card',
  templateUrl: './managers-card.component.html',
  styleUrls: ['./managers-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagersCardComponent implements OnInit {
  className: string = "ManagersCardComponent";
  @Input() managers: Manager[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}