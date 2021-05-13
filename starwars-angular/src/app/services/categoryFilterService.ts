import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { of } from "rxjs";
import { CategoryFilter } from "../models/categoryFilter";
import { ErrorMsg } from "../models/errorMsg";
import { ErrorType } from "../models/errorType";
import { Filter } from "../models/filter";
import { FilterOption } from "../models/filterOptions";
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

  toggleSelected(searchFilter: Filter) {
    let methodName: string = 'toggleSelected';
 
    try {              
      let state = this.getState();
      state.filters.forEach((filter) => {
        if(filter.filterOption === searchFilter.filterOption) {
          if(filter.isSelected){
            filter.isSelected = false;
          }else {
            filter.isSelected = true;
          }
        }
      });
      this.setState({ filters: state.filters }, StoreActions.ToggleSelectedFilter);       
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
        new Filter('1 to 9,999 credits', false, FilterOption.MinimumCost),
        new Filter('10,000 to 999,999 credits', false, FilterOption.AverageCost),
        new Filter('1 Million+ credits', false, FilterOption.MaximumCost),
        new Filter('0 to 49 crew', false, FilterOption.MinimumCrew),
        new Filter('50 to 49,999 crew', false, FilterOption.AverageCrew),
        new Filter('50 Thousand+ crew', false, FilterOption.MaximumCrew)
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