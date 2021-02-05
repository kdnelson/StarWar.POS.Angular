import { HttpClient } from '@angular/common/http';
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
  className: string = "SubjectService";
  menuItems: MenuItem[] = [];
  private behaviorSubject$;
  behaviorSubjectObservable$: Observable<MenuItem[]>;

  constructor(
    public errorType: ErrorType,
    public logService: LogService) { 
        this.loadBehaviorSubjects(); 
    }

    loadBehaviorSubjects() {
    this.initBehaviorSubjects();

    this.getPagedVehicles('https://swapi.dev/api/vehicles/').then((element) => {
      element => element.forEach(o => this.menuItems.push(o))
      let clone: MenuItem[] = JSON.parse(JSON.stringify(this.menuItems));
      this.behaviorSubject$.next(clone);
    });

    this.getPagedStarShips('https://swapi.dev/api/starships/').then((element) => {
      element => element.forEach(o => this.menuItems.push(o))
      let clone: MenuItem[] = JSON.parse(JSON.stringify(this.menuItems));
      this.behaviorSubject$.next(clone);
    });
  }

  initBehaviorSubjects() {
    this.behaviorSubject$ = new BehaviorSubject(this.menuItems);
    this.behaviorSubjectObservable$ = this.behaviorSubject$.asObservable();
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