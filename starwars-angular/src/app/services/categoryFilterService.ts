import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { of } from "rxjs";
import { CategoryFilter } from "../models/categoryFilter";
import { ErrorMsg } from "../models/errorMsg";
import { ErrorType } from "../models/errorType";
import { Filter } from "../models/filter";
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
      this.init();
  }
 
  init() {
    let methodName: string = 'init';
 
    try {    
      let filters = this.fetchFilters();
      filters.forEach((filter) => {
        this.add(filter);
      });
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
 
  get() {
    let methodName: string = 'get';
 
    try {    
      const filters = this.getState().filters;
      return of(filters);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
  
  add(filter: Filter) {
    let methodName: string = 'add';
 
    try {              
      let state = this.getState();
      state.filters.push(filter);
      this.setState({ filters: state.filters }, StoreActions.AddFilter);       
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
      state.filters.splice(state.filters.length - 1, 1);
      this.setState({ filters: state.filters }, StoreActions.RemoveFilter);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }

  fetchFilters(): Filter[] {
    let methodName: string = 'fetchFilters';
 
    try {  
      let filters: Filter[] = [
        new Filter('Empire', false),
        new Filter('Rebels', false),
        new Filter('Outer-Rim', false),
        new Filter('Agriculture', false),
        new Filter('Minning', false),
        new Filter('Manufacturer', false),
        new Filter('Supplier', false)
      ];
      return filters;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }
}