import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, of, from } from 'rxjs';
import { tap, map, switchMap, catchError, mergeMap, concatMap, toArray } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class HttpClientService {
  
    allRawVehicles: any[] = [];
    allRawStarShips: any[] = [];
    baseUrl = 'https://swapi.dev/api/';
  
    constructor(private http: HttpClient) {
      this.loadRawMenuItems();
    }
  
    loadRawMenuItems() {
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

    async getPagedVehicles(url) {
      let response = await fetch(url)
      let data = await response.json()      
      this.allRawVehicles.push(data.results);
      if(data.next !== null){
        this.getPagedVehicles(data.next)
      }
    }

    async getPagedStarShips(url) {
      let response = await fetch(url)
      let data = await response.json()      
      this.allRawStarShips.push(data.results);
      if(data.next !== null){
        this.getPagedStarShips(data.next)
      }
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