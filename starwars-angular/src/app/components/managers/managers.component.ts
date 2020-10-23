import { Component, OnInit } from '@angular/core';
import { Manager } from 'src/app/models/manager';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  private className: "ManagersComponent";
  title: string = "Managers";
  managers: Manager[] = [];

  get filteredManagers() {
    return this.managers;
  }

  constructor() { }

  ngOnInit(): void {
    this.getManagers();
  }

  getManagers(){
    this.managers = [
      new Manager(1, "AAAA", true, 48),
      new Manager(2, "BBBB", true, 48),
      new Manager(3, "CCCC", true, 48),
      new Manager(4, "DDDD", true, 48),
      new Manager(5, "EEEE", true, 48),
      new Manager(6, "FFFF", true, 48),
      new Manager(7, "GGGG", true, 48),
      new Manager(8, "HHHH", true, 48),
      new Manager(9, "IIII", true, 48)
    ]
  }
}