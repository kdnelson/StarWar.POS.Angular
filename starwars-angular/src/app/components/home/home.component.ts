import { Component } from '@angular/core';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { MenuItemDetailComponent } from '../menu-item-detail/menu-item-detail.component';
import { CartComponent } from '../cart/cart.component';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [  
    './home.component-xs.css', // Smartphone portrait 
    './home.component-s.css',  // Smartphone landscape (not supported)
    './home.component-m.css',  // Tablet portrait
    './home.component-l.css',  // Tablet landscape
    './home.component-xl.css', // Desktop landscape
    './home.component-common.css' // common style accross home pages
  ],
  providers: [CategoryFilterComponent, MenuItemDetailComponent, CartComponent],
})
export class HomeComponent {
  title = 'Home';

  public constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public categoryFilterComponent: CategoryFilterComponent,
    public menuItemDetailComponent: MenuItemDetailComponent,
    public cartComponent: CartComponent,
  ) {}

  get getTicketCounter() : number {
    let methodName: string = 'getTicketCounter';

    try {
      return 3;
    } catch (errMsg) {
      // let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      // this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  get getMenuItemDetailsPerCategory() : any[] {
    let methodName: string = 'getMenuItemDetailsPerCategory';

    // try {
    //   this.toggleIsFilterSet();
    //   this.searchMenuItemDetailsPerCategory();
    // } catch (errMsg) {
    //   let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
    //   this.errorMsgComponent.loadModal(errorMsg);
    // }
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
  }

  private closeAllModals() : void {
    let methodName: string = 'closeAllModals';

    try {
      this.ngxSmartModalService.getModal('categoryFilter').close();
      this.ngxSmartModalService.getModal('menuItemDetail').close();
      this.ngxSmartModalService.getModal('cart').close(); 
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  openCategoryFilterModal() {
    let methodName: string = 'openCategoryFilterModal';

    try {
      this.closeAllModals();
      this.categoryFilterComponent.loadModal();
    } catch (errMsg) {
      // let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      // this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  openMenuItemDetailModal() {
    let methodName: string = 'openMenuItemDetailModal';

    try {
      this.closeAllModals();
      this.menuItemDetailComponent.loadModal();
    } catch (errMsg) {
      // let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      // this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  openCartModal() {
    let methodName: string = 'openCartModal';

    try {
      this.closeAllModals();
      this.cartComponent.loadModal();
    } catch (errMsg) {
      // let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      // this.errorMsgComponent.loadModal(errorMsg);
    }
  }
}