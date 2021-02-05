import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Guid } from "guid-typescript";
import { element } from "protractor";
import { forkJoin, of, from } from 'rxjs';
import { tap, map, switchMap, catchError, mergeMap, concatMap, toArray } from 'rxjs/operators';
import { ErrorMsg } from "../models/errorMsg";
import { ErrorType } from "../models/errorType";
import { MenuItem } from "../models/menuItem";
import { LogService } from "./log.service";

@Injectable({
    providedIn: 'root'
  })
  export class HttpClientService {
    className: string = "HttpClientService";
    allMenuItems: MenuItem[] = [];

    baseUrl = 'https://swapi.dev/api/';
  
    constructor(
      private http: HttpClient,
      public errorType: ErrorType,
      public logService: LogService
      ) {}
  
    loadRawMenuItems() {
      //this.recursiveCall(0).then(() => console.log('done'));
      this.getPagedVehicles('https://swapi.dev/api/vehicles/');
      this.getPagedStarShips('https://swapi.dev/api/starships/');
    }

    getVehicle(name: string) {
      if (name) {
        return this.http.get(this.baseUrl + 'vehicles/?search=' + name)
          .pipe(
            map(res => res['results']),
            catchError(error => of(null))
          )
      }
      return of(null);
    }
  
    getVehicles() {
      return this.http.get(this.baseUrl + 'vehicles/')
        .pipe(
          tap(res => {
            console.log('Before getVehicles map');
          }),
          map(res => {
            return res['results'];
          }),
          tap(res => {
            console.log('After getVehicles map');
          })
        )
    }

    getStarShip(name: string) {
        if (name) {
            return this.http.get(this.baseUrl + 'starships/?search=' + name)
            .pipe(
                map(res => res['results']),
                catchError(error => of(null))
            )
        }
        return of(null);
    }
    
    getStarShips() {
        return this.http.get(this.baseUrl + 'starships/')
            .pipe(
                tap(res => {
                  console.log('Before getStarShips map');
                }),
                map(res => {
                    return res['results'];
                }),
                tap(res => {
                  console.log('After getStarShips map');
                })
            );
    }

    // async getPagedVehicles(url) : Promise<MenuItem[]> {
    //   let menuItems: MenuItem[] = [];
    //   let response = await fetch(url)
    //   let data = await response.json()      
    //   data.results.forEach(element => {
    //     menuItems.push(this.createMenuItem(element));
    //   });
    //   if(data.next !== null){
    //     this.getPagedVehicles(data.next)
    //   } else {
    //     return menuItems; 
    //   }
    // }

    recursiveCall = (index) => {
      return new Promise((resolve) => {
          console.log(index);
          if (index < 3) {
              return setTimeout(() => resolve(this.recursiveCall(++index)), 0);
          } else {
              return resolve(0);
          }
      })
    }

    getPagedVehicles = (url) : Promise<MenuItem[]> => {
      return new Promise(async (resolve) => {   
        let response = await fetch(url)
        let data = await response.json();
        data.results.forEach(element => {
          let newMenuItem = this.createMenuItem(element);
          this.allMenuItems.push(newMenuItem);
        });
        if (data.next !== null) {
          return setTimeout(() => resolve(this.getPagedVehicles(data.next)), 0);
        } else {
          return resolve(this.allMenuItems);
        }
      })
    }

    getPagedStarShips = (url): Promise<MenuItem[]> => {
      return new Promise(async (resolve) => {     
        let response = await fetch(url)
        let data = await response.json();
        data.results.forEach(element => {
          let newMenuItem = this.createMenuItem(element);
          this.allMenuItems.push(newMenuItem);
        });
        if (data.next !== null) {
          return setTimeout(() => resolve(this.getPagedStarShips(data.next)), 0);
        } else {
          return resolve(this.allMenuItems);
        }
      })
    }


    // async getPagedStarShips(url) : Promise<MenuItem[]> {
    //   let menuItems: MenuItem[] = [];
    //   let response = await fetch(url)
    //   let data = await response.json()      
    //   data.results.forEach(element => {
    //     menuItems.push(this.createMenuItem(element));
    //   });
    //   if(data.next !== null){
    //     this.getPagedStarShips(data.next)
    //   } else { 
    //     return menuItems; 
    //   }
    // }

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


    getVehiclesAndStarShips() {
      return forkJoin([
        this.getVehicles(),
        this.getStarShips()
      ])
      .pipe(
        map((res) => {
          return { vehicles: res[0], starships: res[1] };
        }),
        catchError(error => of(error))
      );
    }
  
    getPersonsAndHomeworlds() {
      return this.http.get(this.baseUrl + 'people/')
        .pipe(
          switchMap(res => {
            // convert array to observable
            return from(res['results']);
          }),
          // concatMap((person: any) => {
          mergeMap((person: any) => { 
              return this.http.get(this.convertHttps(person['homeworld']))
                .pipe(
                  map(hw => {
                    person['homeworld'] = hw;
                    return person;
                  })
                );
          }),
          toArray()
        );
    }
  
    getPersonAndHomeworld(id: string) {
      const url = this.baseUrl + 'people/' + id + '/';
      return this.http.get(url)
        .pipe(
          switchMap(character => {
            return this.http.get(this.convertHttps(character['homeworld']))
              .pipe(
                map(hw => {
                  character['homeworld'] = hw;
                  return character;
                })
              )
          })
        );
    }
  
    convertHttps(url) {
      if (url) {
        return url.replace('http://', 'https://');
      }
      return url;
    }
  }