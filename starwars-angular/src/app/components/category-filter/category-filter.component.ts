import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CategoryFilter } from 'src/app/models/categoryFilter';
import { Filter } from 'src/app/models/filter';

@Component({
  selector: 'category-filter-modal',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {
  private filter: Filter = {};
  private filterList: Filter[] = [];

  constructor(
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit(): void {
  }

  resetForm(): void {
    let methodName: string = 'resetForm';

    try {
    } catch(errMsg){
      //  let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      //  this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  private closeAllModals() : void {
    let methodName: string = 'closeAllModals';

    try {
      this.ngxSmartModalService.getModal('cart').close();
      this.ngxSmartModalService.getModal('menuItemDetail').close();  
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  loadModal() : void {
    let methodName: string = 'loadModal';
    this.closeAllModals();

    try {
      let categoryFilters: Filter[] = [
        new Filter('Empire', false),
        new Filter('Rebels', false),
        new Filter('Outer-Rim', false),
        new Filter('Agriculture', false),
        new Filter('Minning', false),
        new Filter('Manufacturer', false),
        new Filter('Supplier', false)
      ];
      if(categoryFilters !== null){
        if(categoryFilters.length > 0)
        {   
          let categoryFilter: CategoryFilter = this.createCategoryFilter(categoryFilters);
          this.ngxSmartModalService.setModalData(categoryFilter, 'categoryFilter', true);
          this.ngxSmartModalService.getModal('categoryFilter').open();
        }
      } else {
        //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, 'categoryFilterTags');
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch(errMsg){
      //  let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      //  this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  private createCategoryFilter(filters: Filter[]) : CategoryFilter {
    let methodName: string = 'createCategoryFilter';

    let categoryFilter = new CategoryFilter();
    try {
      if(filters !== null){
        if(categoryFilter.filters !== null) {
          categoryFilter.filters = filters;
        } else {
          //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, 'categoryFilter.filterTags');
          //this.errorMsgComponent.loadModal(errorMsg);
        }
      } else {
        //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, 'filterTags');
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
    return categoryFilter;
  }

  selectedFilter(filter: Filter, categoryFilter: CategoryFilter) {
    let methodName: string = 'selectedFilter';

    try {
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
          //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, 'categoryFilter.filterTags');
          //this.errorMsgComponent.loadModal(errorMsg);
        }
      } else {
        // errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
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
        //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
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
        //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  selectedCategoryFilters(categoryFilter: CategoryFilter) {
    let methodName: string = 'selectedCategoryFilters';

    try {
      let filterNames: string[] = this.searchForSelectedFilters(categoryFilter);
      if(filterNames !== null) {
        if(filterNames.length > 0) {
          //this.baseHelper.setCategoryFilter(filterTags);
          this.ngxSmartModalService.getModal('categoryFilter').close();
        }
      } else {
        //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, 'filterTags');
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
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
          //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, 'categoryFilter.filterTags');
          //this.errorMsgComponent.loadModal(errorMsg);
        }
      } else {
        //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }

    return filters;
  }
}
