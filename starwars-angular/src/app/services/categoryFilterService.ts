import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { Guid } from "guid-typescript";
import { of } from "rxjs";
import { CategoryFilter } from "../models/categoryFilter";
import { ErrorMsg } from "../models/errorMsg";
import { ErrorType } from "../models/errorType";
import { Filter } from "../models/filter";
import { MenuItem } from "../models/menuItem";
import { StoreActions } from "../models/storeActions";
import { StoreState } from "../models/storeState";
import { LogService } from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryFilterService extends ObservableStore<StoreState> {
  className: string = "CategoryFilterService";
  categoryFilter: CategoryFilter;

  constructor(
    public errorType: ErrorType,
    public logService: LogService
    ) {
      super({ 
          trackStateHistory: true, 
          logStateChanges: true 
      });
      //this.init();
  }
 
  // init() {
  //   let methodName: string = 'init';
 
  //   try {    
  //     //let state = this.getState();
  //     //this.setState({ categoryFilter: state.categoryFilter }, StoreActions.AddCategoryFilters);
  //   } catch (errMsg) {
  //     let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
  //     this.logService.logHandler(errorMsg);
  //   }
  // }
 
  // get() {
  //   let methodName: string = 'get';
 
  //   try {    
  //     const categoryFilter = this.getState().categoryFilter;
  //     categoryFilter.filters = [];
  //     categoryFilter.filters = this.fetchFilters();
  //   } catch (errMsg) {
  //     let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
  //     this.logService.logHandler(errorMsg);
  //   }
  // }
  
  // add(menuItem: MenuItem) {
  //   let methodName: string = 'add';
 
  //   try {              
  //     let state = this.getState();
  //     state.menuItems.push(menuItem);
  //     this.setState({ menuItems: state.menuItems }, StoreActions.AddMenuItem);       
  //   } catch (errMsg) {
  //     let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
  //     this.logService.logHandler(errorMsg);
  //   } finally {
  //     console.log('State History:', this.stateHistory);
  //   }
  // }
 
  // remove() {
  //   let methodName: string = 'remove';
 
  //   try {    
  //     let state = this.getState();
  //     state.menuItems.splice(state.menuItems.length - 1, 1);
  //     this.setState({ menuItems: state.menuItems }, StoreActions.RemoveMenuItem);
  //   } catch (errMsg) {
  //     let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
  //     this.logService.logHandler(errorMsg);
  //   } finally {
  //     console.log('State History:', this.stateHistory);
  //   }
  // }

  // fetchFilters(): Filter[] {
  //   let methodName: string = 'fetchFilters';
 
  //   try {  
  //     return null;  
  //   } catch (errMsg) {
  //     let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
  //     this.logService.logHandler(errorMsg);
  //   } finally {
  //     console.log('State History:', this.stateHistory);
  //   }
  // }
}