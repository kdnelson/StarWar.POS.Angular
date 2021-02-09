import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorMsg } from '../models/errorMsg';
import { ErrorType } from '../models/errorType';
import { MenuItem } from '../models/menuItem';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  className: string = "BehaviorSubjectService";
  menuItems: MenuItem[] = [];
  private vehiclesUrl = 'https://swapi.dev/api/vehicles/';
  private starShipsUrl = 'https://swapi.dev/api/starships/';
  private behaviorSubjectMenuItems$;
  behaviorSubjectMenuItemsObservable$: Observable<MenuItem[]>;

  constructor(
    public errorType: ErrorType,
    public logService: LogService) {
      //this.recursiveCall(0).then(() => console.log('done')); 
      this.loadBehaviorSubjects();
    }

  recursiveCall = (index) => {
    return new Promise((resolve) => {
        console.log(index);
        if (index < 5) {
            return setTimeout(() => resolve(this.recursiveCall(++index)), 0);
        } else {
            return resolve(0);
        }
    })
  }

  loadBehaviorSubjects() {
      let methodName: string = 'loadBehaviorSubjects';

      try {     
        this.initBehaviorSubjects();

        this.getPagedVehicles(this.vehiclesUrl).then((element) => {
          element => element.forEach(o => this.menuItems.push(o))
          let clone: MenuItem[] = JSON.parse(JSON.stringify(this.menuItems));
          this.behaviorSubjectMenuItems$.next(clone);
        });

        this.getPagedStarShips(this.starShipsUrl).then((element) => {
          element => element.forEach(o => this.menuItems.push(o))
          let clone: MenuItem[] = JSON.parse(JSON.stringify(this.menuItems));
          this.behaviorSubjectMenuItems$.next(clone);
        });
      } catch (errMsg) {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
        this.logService.logHandler(errorMsg);
      }
  }

  initBehaviorSubjects() {
    let methodName: string = 'initBehaviorSubjects';

    try {
      this.behaviorSubjectMenuItems$ = new BehaviorSubject(this.menuItems);
      this.behaviorSubjectMenuItemsObservable$ = this.behaviorSubjectMenuItems$.asObservable();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  getPagedVehicles = (url) : Promise<MenuItem[]> => {
    return new Promise(async (resolve) => {   
      let response = await fetch(url)
      let data = await response.json();
      data.results.forEach(element => {
        let newMenuItem = this.createMenuItem(element);
        this.menuItems.push(newMenuItem);
      });
      if (data.next !== null) {
        return setTimeout(() => resolve(this.getPagedVehicles(data.next)), 0);
      } else {
        return resolve(this.menuItems);
      }
    })
  }

  getPagedStarShips = (url): Promise<MenuItem[]> => {
    return new Promise(async (resolve) => {     
      let response = await fetch(url)
      let data = await response.json();
      data.results.forEach(element => {
        let newMenuItem = this.createMenuItem(element);
        this.menuItems.push(newMenuItem);
      });
      if (data.next !== null) {
        return setTimeout(() => resolve(this.getPagedStarShips(data.next)), 0);
      } else {
        return resolve(this.menuItems);
      }
    })
  }

  createMenuItem(rawMenuItem: any) : MenuItem {
    let methodName: string = 'createMenuItem';
    var result: MenuItem = null;

    try {   
      result = new MenuItem(
        Guid.create().toString(),
        rawMenuItem.name, 
        rawMenuItem.manufacturer, 
        rawMenuItem.cost_in_credits, 
        rawMenuItem.length, 
        rawMenuItem.max_atmosphering_speed, 
        rawMenuItem.crew, 
        rawMenuItem.passengers, 
        rawMenuItem.cargo_capacity, 
        rawMenuItem.consumables
      );
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return result;
  }
}