import { Component, OnInit } from '@angular/core';
import { ErrorType } from 'src/app/models/errorType';
import { ErrorMsg } from 'src/app/models/errorMsg';
import { LogService } from 'src/app/services/log.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CartComponent } from './cart/cart.component';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { MenuItemDetailComponent } from './menu-item-detail/menu-item-detail.component';
import { MenuItem } from 'src/app/models/menuItem';
import { Manufacturer } from 'src/app/models/manufacturer';
import { MenuItemService } from 'src/app/services/menuItemService';
import { CategoryFilterService } from 'src/app/services/categoryFilterService';
import { Observable, Subscription } from 'rxjs';
import { CartItemService } from 'src/app/services/cartItemService';
import { CartItem } from 'src/app/models/cartItem';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CartItemService, MenuItemService, CategoryFilterService, CategoryFilterComponent, MenuItemDetailComponent, 
              CartComponent, ErrorType, LogService, NgxSmartModalService],
})
export class HomeComponent implements OnInit {
  className: string = "HomeComponent";
  copywriteInfo: string = null;
  nextNotification: string = null;
  notifications: string[] = [];
  manufacturers: Manufacturer[] = [];
  menuItemsPerSelectedManufacturer: MenuItem[] = [];
  selectedManufacturer: string = "Corellia Mining Corporation";
  subs = new Subscription();
  menuItems$: MenuItem[] | Observable<MenuItem[]>;
  cartItems$: CartItem[] | Observable<CartItem[]>;

  public constructor(
    private menuItemService: MenuItemService,
    private cartItemService: CartItemService,
    public ngxSmartModalService: NgxSmartModalService,
    public categoryFilterComponent: CategoryFilterComponent,
    public menuItemDetailComponent: MenuItemDetailComponent,
    public cartComponent: CartComponent,
    public errorType: ErrorType,
    public logService: LogService
  ) {}

  ngOnInit() {
    let methodName: string = 'ngOnInit';

    try {
      this.loadSubscribers();
      this.prettyPrintCopywriteInfo();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  loadSubscribers() {
    let methodName: string = 'loadSubscribers';

    try {
      this.subs.add(this.menuItemService.stateChanged.subscribe(state => {
        if (state) {
          this.menuItems$ = state.menuItems;
          this.loadManufacturersMenu();
        }
      }));
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  get getManufacturers(): Manufacturer[] {
    let methodName: string = 'getManufacturers';

    try {
      this.SetSelectedManufacturer(this.selectedManufacturer); 
      return this.manufacturers;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  get getMenuItemsPerManufacturer() : MenuItem[] {
    let methodName: string = 'getMenuItemPerManufacturer';

    try {
      this.menuItems$.forEach(menuItem => {
        let formattedMenuItem = this.getFormattedMenuItem(menuItem);
        if(menuItem.manufacturer == this.selectedManufacturer) {
          if(this.isCategoryFilterSet()){
            this.categoryFilterComponent.filterCollection.forEach((f) => {

              if(f.isSelected){
                if(f.filterOption.costRange === formattedMenuItem.costRange ||
                   f.filterOption.crewRange === formattedMenuItem.crewRange) {
                   if(!this.isMenuItemLoaded(menuItem.name)){
                     this.menuItemsPerSelectedManufacturer.push(formattedMenuItem);
                   }
                }
              }
            });
          } else {
            this.menuItemsPerSelectedManufacturer.push(formattedMenuItem);
          }
        }
      });
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
    return this.menuItemsPerSelectedManufacturer;
  }

  getFormattedMenuItem(menuItem: MenuItem) : MenuItem {
    let methodName: string = 'getFormattedMenuItem';

    try {
      if(menuItem.cost == "unknown"){
        menuItem.cost = "3000";
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
    return menuItem;
  }

  get getCartCounter() : number {
    let methodName: string = 'getCartCounter';

    try {
      return this.cartItemService.getCartCount();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  isCategoryFilterSet() : boolean {
    let methodName: string = 'isCategoryFilterSet';

    try {
      let isFilterSet = false;
      this.categoryFilterComponent.filterCollection.forEach((o) => {
        if(o.isSelected){
          isFilterSet = true;
          return;
        }
      });
      return isFilterSet;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  isMenuItemLoaded(menuItemName: string) : boolean {
    let methodName: string = 'isMenuItemLoaded';

    try {
      let isFount = false;
      this.menuItemsPerSelectedManufacturer.forEach((m) => {
        if(m.name == menuItemName){
          isFount = true;
        }
      });
      return isFount;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  loadManufacturersMenu() {
    let methodName: string = 'loadManufacturersMenu';

    try {
      this.subs = this.menuItemService.get().subscribe(() => {
        this.menuItems$.forEach((menuItem) => {
          if(this.isManufacturerUnique(menuItem.manufacturer.toString())){
            var manufacturer = new Manufacturer(menuItem.manufacturer.toString(), false);
            this.manufacturers.push(manufacturer);
          }
        })
      });
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  SetSelectedManufacturer(manufacturerName: string) {
    let methodName: string = 'SetSelectedManufacturer';

    try {
      this.menuItemsPerSelectedManufacturer = [];

      this.manufacturers?.forEach(m => {
        m.isSelected = false;
      });

      this.manufacturers?.forEach(m => {
        if(m.name == manufacturerName){
          m.isSelected = true;
          this.selectedManufacturer = manufacturerName;
        }
      });
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  buildManufacturerList(longManufacturer: string){
    let methodName: string = 'buildManufacturerList';

    try {
      if(this.isManufacturerUnique(longManufacturer)){
        var manufacturer = new Manufacturer(longManufacturer, false);
        this.manufacturers.push(manufacturer);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  isManufacturerUnique(manufacturer: string) : boolean {
    let methodName: string = 'isManufacturerUnique';
    let result: boolean = true;
    
    try {
      this.manufacturers?.forEach(m => {
        if(m.name == manufacturer){
          result = false;
        }
      });
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return result;
  }

  openCategoryFilterModal() {
    let methodName: string = 'openCategoryFilterModal';

    try {
      this.closeAllModals();
      this.categoryFilterComponent.loadModal();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg); 
      this.logService.logHandler(errorMsg);
    }
  }

  openCartModal() {
    let methodName: string = 'openCartModal';

    try {
      this.closeAllModals();
      if(this.cartItemService.getCartCount() > 0){
        this.cartComponent.loadModal();
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  openMenuItemDetailModal(menuItem: MenuItem) : void {
    let methodName: string = 'openMenuItemDetailModal';

    try {
      if(menuItem !== null){
        this.closeAllModals();
        this.menuItemDetailComponent.loadModal(menuItem);
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, null);
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
      this.ngxSmartModalService.getModal('categoryFilter').close();
      this.ngxSmartModalService.getModal('menuItemDetail').close();
      this.ngxSmartModalService.getModal('cart').close();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private prettyPrintCopywriteInfo() {
    let methodName: string = 'prettyPrintCopywriteInfo';

    try {
      var date = new Date().toString().split(' ')[3];
      this.copywriteInfo = 'Silverskippy (c) ' + date;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  ngOnDestroy() {
    let methodName: string = 'ngOnDestroy';

    try {
      this.subs.unsubscribe();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
}
