import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FilterTag } from 'src/app/models/filterTags';
import { CategoryFilter } from 'src/app/models/categoryFilter';

@Component({
  selector: 'category-filter-modal',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {
  private filterTagFilter: FilterTag = {};
  private filterTags: FilterTag[] = [];

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

  closeAllModals() : void {
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

    try {
      let categoryFilterTags: FilterTag[] = [
        new FilterTag('Empire', false),
        new FilterTag('Rebels', false),
        new FilterTag('Outer-Rim', false),
        new FilterTag('Agriculture', false),
        new FilterTag('Minning', false)];
      if(categoryFilterTags !== null){
        if(categoryFilterTags.length > 0)
        {
          this.closeAllModals();
          let categoryFilter: CategoryFilter = this.createCategoryFilter(categoryFilterTags);
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

  private createCategoryFilter(filterTags: FilterTag[]) : CategoryFilter {
    let methodName: string = 'createCategoryFilter';

    let categoryFilter = new CategoryFilter();
    try {
      if(filterTags !== null){
        if(categoryFilter.filterTags !== null) {
          categoryFilter.filterTags = filterTags;
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

  selectedFilterTag(filterTag: FilterTag, categoryFilter: CategoryFilter) {
    let methodName: string = 'selectedFilterTag';

    try {
      if(filterTag !== null && categoryFilter !== null) {
        if(categoryFilter.filterTags !== null) {
          let filterTagIndex: number = this.searchFilterTagIndex(filterTag.name, categoryFilter.filterTags)
          if(filterTag.isSelected){
            filterTag.isSelected = false;
            categoryFilter.filterTags.splice(filterTagIndex, 1, filterTag);
          } else {
            if(filterTag !== this.filterTagFilter){
              filterTag.isSelected = true;
              categoryFilter.filterTags.splice(filterTagIndex, 1, filterTag);
            }
            else {
              this.setFilterTagToNotSelected(categoryFilter.filterTags);
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

  private searchFilterTagIndex(filterTag: string, filterTags: FilterTag[]) : number {
    let methodName: string = 'searchFilterTagIndex';

    let filterTagAtIndex = -1;

    try {
      if(filterTag !== null && filterTags !== null) {
        filterTags.forEach((item, index) => {
          if(item.name === filterTag)
          {
            filterTagAtIndex = index;
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
    return filterTagAtIndex;
  }

  private setFilterTagToNotSelected(filterTags: FilterTag[]) {
    let methodName: string = 'setFilterTagToNotSelected';

    try {
      if(filterTags !== null) {
        filterTags.forEach((item, index) => {
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
      let filterTags: string[] = this.searchForSelectedFilterTags(categoryFilter);
      if(filterTags !== null) {
        if(filterTags.length > 0) {
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

  private searchForSelectedFilterTags(categoryFilter: CategoryFilter) : string[] {
    let methodName: string = 'searchForSelectedFilterTags';
    let filterTags: string[] = [];

    try {
      if(categoryFilter !== null){
        if(categoryFilter.filterTags !== null) {
          categoryFilter.filterTags.forEach((item, index) => {
            if(item.isSelected){
              filterTags.push(item.name);
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

    return filterTags;
  }
}
