import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { Guid } from "guid-typescript";
import { of } from "rxjs";
import { ErrorMsg } from "../models/errorMsg";
import { ErrorType } from "../models/errorType";
import { FilterOption } from "../models/filterOptions";
import { MenuItem } from "../models/menuItem";
import { StoreActions } from "../models/storeActions";
import { StoreState } from "../models/storeState";
import { LogService } from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class MenuItemService extends ObservableStore<StoreState> {
  className: string = "MenuItemService";
  private initialState = {
    filter: null,
    filters: [],
    menuItem: null,
    menuItems: []
  }
  private vehiclesUrl = 'https://swapi.dev/api/vehicles/';
  private starShipsUrl = 'https://swapi.dev/api/starships/';

  constructor(
    public errorType: ErrorType,
    public logService: LogService
    ) {
      super({ 
          trackStateHistory: true, 
          logStateChanges: true 
      });
      this.init();
  }
 
  init() {
    let methodName: string = 'init';
 
    try {    
      this.setState(this.initialState, StoreActions.InitializeState);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
 
  get() {
    let methodName: string = 'get';
 
    try {    
      const menuItems = this.getState().menuItems;
      if (menuItems.length > 0) {
        console.log('Returning menuItems from store...');
        //this.filterMenuItems();
        return of(menuItems);
      }
      else {
        console.log('Calling menuItems from SWAPI...');
        this.fetchMenuItems();
        const menuItems = this.getState().menuItems;
        //this.filterMenuItems();
        return of(menuItems);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
  
  add(menuItem: MenuItem) {
    let methodName: string = 'add';
 
    try {              
      let state = this.getState();
      state.menuItems.push(menuItem);
      this.setState({ menuItems: state.menuItems }, StoreActions.AddMenuItem);       
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }
 
  remove() {
    let methodName: string = 'remove';
 
    try {    
      let state = this.getState();
      state.menuItems.splice(state.menuItems.length - 1, 1);
      this.setState({ menuItems: state.menuItems }, StoreActions.RemoveMenuItem);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }
 
  fetchMenuItems() {
    let methodName: string = 'fetchMenuItems';
 
    try {    
      this.getPagedVehicles(this.vehiclesUrl);
      this.getPagedStarShips(this.starShipsUrl);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }
 
  getPagedVehicles = (url) : Promise<MenuItem[]> => {
    return new Promise(async (resolve) => {   
      let response = await fetch(url)
      let data = await response.json();
        data.results.forEach(element => {
        let newMenuItem = this.createMenuItem(element);
        this.add(newMenuItem);
      });
      if (data.next !== null) {
        return setTimeout(() => resolve(this.getPagedVehicles(data.next)), 0);
      } else {
        return resolve(this.initialState.menuItems);
      }
    })
  }
  
  getPagedStarShips = (url): Promise<MenuItem[]> => {
    return new Promise(async (resolve) => {     
      let response = await fetch(url)
      let data = await response.json();
      data.results.forEach(element => {
        let newMenuItem = this.createMenuItem(element);
        this.add(newMenuItem);
      });
      if (data.next !== null) {
        return setTimeout(() => resolve(this.getPagedStarShips(data.next)), 0);
      } else {
        return resolve(this.initialState.menuItems);
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

  filterMenuItems() {
    let methodName: string = 'filterMenuItems';
 
    try {    
      var filteredMenuItems: MenuItem[] = [];          
      const menuItems = this.getState().menuItems;
      const filters = this.getState().filters;
      menuItems.forEach((menuItem) => {
        if(Number(menuItem.cost) !== NaN){
          filters.forEach((filter) => {
            if(filter.isSelected){
              switch(filter.filterOption){
                case FilterOption.NoFilter: return;
                case FilterOption.MaximumCost: 
                  if(Number(menuItem.cost) > 0 && Number(menuItem.cost) < 10000){
                    filteredMenuItems.push(menuItem);
                  }
                  break;
                case FilterOption.AverageCost: 
                  if(Number(menuItem.cost) > 9999 && Number(menuItem.cost) < 100000){
                    filteredMenuItems.push(menuItem);
                  }
                  break;
                case FilterOption.MaximumCost: 
                  if(Number(menuItem.cost) > 99999){
                    filteredMenuItems.push(menuItem);
                  }
                  break;
                case FilterOption.MinimumCrew: 
                  if(Number(menuItem.crew) > -1 && Number(menuItem.crew) < 50){
                    filteredMenuItems.push(menuItem);
                  }
                  break;
                case FilterOption.AverageCrew: 
                  if(Number(menuItem.crew) > 49 && Number(menuItem.crew) < 50000){
                    filteredMenuItems.push(menuItem);
                  }
                  break;
                case FilterOption.MaximumCrew: 
                  if(Number(menuItem.crew) > 49999){
                    filteredMenuItems.push(menuItem);
                  }
                  break;
              }
            }
          });
        }
      });
      this.setState({ menuItems: filteredMenuItems }, StoreActions.FilterMenuItem); 
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }
}