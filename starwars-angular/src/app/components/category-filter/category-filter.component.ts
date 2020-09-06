import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FilterName } from 'src/app/models/filterName';
import { CategoryFilter } from 'src/app/models/categoryFilter';

@Component({
  selector: 'category-filter-modal',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {
  private filterName: FilterName = {};
  private filterNames: FilterName[] = [];

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
      let categoryFilterNames: FilterName[] = [
        new FilterName('Empire', false),
        new FilterName('Rebels', false),
        new FilterName('Outer-Rim', false),
        new FilterName('Agriculture', false),
        new FilterName('Minning', false)];
      if(categoryFilterNames !== null){
        if(categoryFilterNames.length > 0)
        {   
          let categoryFilter: CategoryFilter = this.createCategoryFilter(categoryFilterNames);
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

  private createCategoryFilter(filterNames: FilterName[]) : CategoryFilter {
    let methodName: string = 'createCategoryFilter';

    let categoryFilter = new CategoryFilter();
    try {
      if(filterNames !== null){
        if(categoryFilter.filterNames !== null) {
          categoryFilter.filterNames = filterNames;
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

  selectedFilterName(filterName: FilterName, categoryFilter: CategoryFilter) {
    let methodName: string = 'selectedFilterName';

    try {
      if(filterName !== null && categoryFilter !== null) {
        if(categoryFilter.filterNames !== null) {
          let filterNameIndex: number = this.searchFilterNameIndex(filterName.name, categoryFilter.filterNames)
          if(filterName.isSelected){
            filterName.isSelected = false;
            categoryFilter.filterNames.splice(filterNameIndex, 1, filterName);
          } else {
            if(filterName !== this.filterName){
              filterName.isSelected = true;
              categoryFilter.filterNames.splice(filterNameIndex, 1, filterName);
            }
            else {
              this.setFilterNameToNotSelected(categoryFilter.filterNames);
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

  private searchFilterNameIndex(filterName: string, filterNames: FilterName[]) : number {
    let methodName: string = 'searchFilterNameIndex';

    let filterNameAtIndex = -1;

    try {
      if(filterName !== null && filterNames !== null) {
        filterNames.forEach((item, index) => {
          if(item.name === filterName)
          {
            filterNameAtIndex = index;
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
    return filterNameAtIndex;
  }

  private setFilterNameToNotSelected(filterNames: FilterName[]) {
    let methodName: string = 'setFilterNameToNotSelected';

    try {
      if(filterNames !== null) {
        filterNames.forEach((item, index) => {
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
      let filterNames: string[] = this.searchForSelectedFilterNames(categoryFilter);
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

  private searchForSelectedFilterNames(categoryFilter: CategoryFilter) : string[] {
    let methodName: string = 'searchForSelectedFilterNames';
    let filterNames: string[] = [];

    try {
      if(categoryFilter !== null){
        if(categoryFilter.filterNames !== null) {
          categoryFilter.filterNames.forEach((item, index) => {
            if(item.isSelected){
              filterNames.push(item.name);
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

    return filterNames;
  }
}
