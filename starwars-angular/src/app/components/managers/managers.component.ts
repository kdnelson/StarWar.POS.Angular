import { Component, OnInit } from '@angular/core';
import { Manager } from 'src/app/models/manager';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  private className: "ManagersComponent";
  isManagerCard: boolean;
  title: string = "Managers";
  managers: Manager[] = [];

  get filteredManagers() {
    return this.managers;
  }

  constructor() { }

  ngOnInit(): void {
    this.isManagerCard = true;
    this.getManagers();
  }

  changeDisplayMode() {
    this.isManagerCard = !this.isManagerCard;
  }

  getManagers(){
    this.managers = [
      new Manager(1, "AAAA"),
      new Manager(2, "BBBB"),
      new Manager(3, "CCCC"),
      new Manager(4, "DDDD"),
      new Manager(5, "EEEE"),
      new Manager(6, "FFFF"),
      new Manager(7, "GGGG"),
      new Manager(8, "HHHH"),
      new Manager(9, "IIII"),
      new Manager(10, "JJJJ"),
      new Manager(11, "KKKK"),
      new Manager(12, "LLLL"),
      new Manager(13, "MMMM"),
      new Manager(14, "NNNN"),
      new Manager(15, "OOOO"),
      new Manager(16, "PPPP"),
      new Manager(17, "QQQQ"),
      new Manager(18, "RRRR")
    ]
  }
}