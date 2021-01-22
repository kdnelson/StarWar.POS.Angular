import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ErrorType } from 'src/app/models/errorType';
import { Manager } from 'src/app/models/manager';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-manager-details',
  templateUrl: './manager-details.component.html',
  styleUrls: ['./manager-details.component.css']
})
export class ManagerDetailsComponent implements OnInit {
  className: string = "ManagerDetailsComponent";
  manager: Manager;

  constructor(
    private route: ActivatedRoute,
    public errorType: ErrorType,
    public logService: LogService,
    ) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe((params: Params) => {
      const id =+ params['id'];
      if (id) {
        // service lookup on id
        this.manager = new Manager(1, "Darth Vader");
      }
    });
  }
}