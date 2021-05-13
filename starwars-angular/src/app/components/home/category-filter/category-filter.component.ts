import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CategoryFilter } from 'src/app/models/categoryFilter';
import { ErrorMsg } from 'src/app/models/errorMsg';
import { ErrorType } from 'src/app/models/errorType';
import { Filter } from 'src/app/models/filter';
import { CategoryFilterService } from 'src/app/services/categoryFilterService';
import { LogService } from '../../../services/log.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'category-filter-modal',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css'],
  providers: [ErrorType, LogService]
})
export class CategoryFilterComponent implements OnInit {
  className: string = "CategoryFilterComponent";
  subs = new Subscription();
  filters$: Filter[] | Observable<Filter[]>;
  filterCollection: Filter[] = [];
  private filter: Filter = {};

  constructor(
    public categoryFilterService: CategoryFilterService,
    public ngxSmartModalService: NgxSmartModalService,
    public errorType: ErrorType,
    public logService: LogService
  ) { }

  ngOnInit(): void {
    let methodName: string = 'ngOnInit';

    try {
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  loadSubscribers() {
    let methodName: string = 'loadSubscribers';

    try {
      this.subs.add(this.categoryFilterService.stateChanged.subscribe(state => {
        if (state) {
          this.filters$ = state.filters;
        }
      }));
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  resetForm(): void {
    let methodName: string = 'resetForm';

    try {
    } catch(errMsg){
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  loadModal() : void {
    let methodName: string = 'loadModal';
    this.closeAllModals();
    this.loadSubscribers();

    try {
      this.subs = this.categoryFilterService.get().subscribe(() => {
        var categoryFilter = new CategoryFilter();
 
        this.filterCollection = [];
        this.filters$.forEach((filter) => {
          this.filterCollection.push(filter);
        });

        categoryFilter.filters = this.filterCollection;
        this.ngxSmartModalService.setModalData(categoryFilter, 'categoryFilter', true);
        this.ngxSmartModalService.getModal('categoryFilter').open();
      });
    } catch(errMsg){
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  selectedFilter(filter: Filter, categoryFilter: CategoryFilter) {
    let methodName: string = 'selectedFilter';

    try {

      categoryFilter.filters.forEach((f) => {
        if(f.filterOption === filter.filterOption){
          this.categoryFilterService.toggleSelected(filter);
        }
      });

      if(filter !== null && categoryFilter !== null) {
        if(categoryFilter.filters !== null) {
          let filterNameIndex: number = this.searchFilterIndex(filter.name, categoryFilter.filters)
          if(filter.isSelected){
            filter.isSelected = false;
            categoryFilter.filters.splice(filterNameIndex, 1, filter);
          } else {
            if(filter !== this.filter){
              filter.isSelected = true;
              categoryFilter.filters.splice(filterNameIndex, 1, filter);
            }
            else {
              this.setFilterToNotSelected(categoryFilter.filters);
            }
          }
        } else {
          let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, 'categoryFilter.filters');
          this.logService.logHandler(errorMsg);
        }
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullMethodParam, 'categoryFilter');
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  selectedCategoryFilters(categoryFilter: CategoryFilter) {
    let methodName: string = 'selectedCategoryFilters';

    try {
      if(categoryFilter !== null){
        let filterNames: string[] = this.searchForSelectedFilters(categoryFilter);
        if(filterNames !== null) {
          if(filterNames.length > 0) {
            this.ngxSmartModalService.getModal('categoryFilter').close();
          }
        } else {
          let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, 'filterNames');
          this.logService.logHandler(errorMsg);
        }
      }else{
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullMethodParam, 'categoryFilter');
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private closeAllModals() : void {
    let methodName: string = 'closeAllModals';

    try {
      this.ngxSmartModalService.getModal('cart').close();
      this.ngxSmartModalService.getModal('menuItemDetail').close();  
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private searchForSelectedFilters(categoryFilter: CategoryFilter) : string[] {
    let methodName: string = 'searchForSelectedFilters';
    let filters: string[] = [];

    try {
      if(categoryFilter !== null){
        if(categoryFilter.filters !== null) {
          categoryFilter.filters.forEach((item, index) => {
            if(item.isSelected){
              filters.push(item.name);
            }
          });
        } else {
          let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, 'categoryFilter.filters');
          this.logService.logHandler(errorMsg);
        }
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullMethodParam, 'categoryFilter');
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return filters;
  }

  private searchFilterIndex(filter: string, filterNames: Filter[]) : number {
    let methodName: string = 'searchFilterIndex';

    let filterAtIndex = -1;

    try {
      if(filter !== null && filterNames !== null) {
        filterNames.forEach((item, index) => {
          if(item.name === filter)
          {
            filterAtIndex = index;
          }
        });  
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullMethodParam, 'filter OR filterNames');
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
    return filterAtIndex;
  }

  private setFilterToNotSelected(filters: Filter[]) {
    let methodName: string = 'setFilterToNotSelected';

    try {
      if(filters !== null) {
        filters.forEach((item, index) => {
          item.isSelected = false;
        });
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullMethodParam, 'filters');
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
}